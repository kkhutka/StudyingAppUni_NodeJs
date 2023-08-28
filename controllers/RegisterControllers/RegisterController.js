import User from "../../models/User.js";

import bcrypt from 'bcrypt';

export const newUser = async (req,res) => {
    const { user,email, pwd } = req.body;

    //Check if the username, email and password are provided
    if (!user || !email || !pwd) return res.status(400).json({'message': 'Username, email and password are reqiured.'});


    // Check if there is a duplicate of username or email in database
    const duplicateName = await User.findOne({username: user }).exec();
    const duplicateEmail = await User.findOne({email: email }).exec();

    if (duplicateName || duplicateEmail) return res.sendStatus(409);
    try{
        //Adding new user to database
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = await User.create({ 
            "username":user, 
            "email":email, 
            "password":hashedPwd,
            "roles": ['user'],
        });
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err){
        res.status(500).json({'message' : err.message});
    }
}