import User from "../../models/User.js";

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) =>{
    const { user, pwd } = req.body;
    //Check if the username and password are provided
    if (!user || !pwd) return res.sendStatus(400).json({'message': 'Username and password are reqiured.'});

    const foundUser = await User.findOne({username: user }).exec();
    if(!foundUser) return res.sendStatus(401);

    // Check if the password is correct
    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        const roles = foundUser.roles;
        const accessToken = jwt.sign(
            {"UserInfo": {
                "username" : foundUser.username,
                "roles" : roles,
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        );
        const refreshToken = jwt.sign(
            {"username" : foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        console.log("Here");
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        res.cookie('jwt', refreshToken, { httpOnly: true,secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({ accessToken });
    }else{
        res.sendStatus(401);
    }

}