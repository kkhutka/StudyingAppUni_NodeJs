import User from "../models/User.js";
import { informAboutError } from "../utils/informAboutError.js";



export const getByUsername = async (req, res) => {
    try {
        const  username  = req.body.username;
        if (username) {
            const users = await User.find({ username, })
            return res.json(users);
        }
        const users = await User.find();
        res.json(users );
    } catch (error) {
        informAboutError(error, 500, "Can't get users",res);
    }
}

export const getOne = async (req, res) => {

    try {
        console.log("get request is okay")
        const userId = req.params.id;
        const user = await User.find({_id: userId});

        res.json(user);
    } catch (error) {
        informAboutError(error, 500, "Can't get user",res);
    }
}

export const remove = async (req, res) => {
    try {
        const userId = req.params.id;

        const doc = await User.findOneAndDelete(
            {
                _id: userId,
            })
        if (!doc) {
            return informAboutError(error, 404, "User is not found", res);
        }
        res.json({
            success: true,
        })    
    }
    catch (error) {
        return informAboutError(error, 500, "Can't delete user", res);

    }
}



