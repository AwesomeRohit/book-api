import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateCookieAndSetToken from "../utilities/genToken.js";
import redis from "../utilities/redis.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {

    try {
        const {
            username,
            email,
            password,
            confirmPassword
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password Doesnt Match!"
            })
        }
        const emailCheck = await User.findOne({
            email
        });

        if (emailCheck) {
            return res.status(401).json({
                message: "Email already in use!"
            })
        }
        const user = await User.findOne({
            username
        })

        if (user) return res.status(400).json({
            message: "user already exists"
        })

        //hashing password generating salt

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash,

        })
        if (newUser) {

            generateCookieAndSetToken(newUser._id, res);

            const sessionKey = `session:${newUser._id}`
            await redis.set(sessionKey, JSON.stringify({username : newUser.username}), "EX", 60*60*60);
            console.log("Session Data Set in Redis:", { username: newUser.username });

            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            })
        } else {
            res.status(400).json({
                error: "Invalid User Data!"
            })
        }


    } catch (error) {
        console.log("Error in signUp controller", error.message);
        res.status(500).json({
            error: error.message
        });

    }
}
export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) return res.status(500).json({ message: "Invalid Usernmae Or Password" })
        
            //generating json web token for the login
        generateCookieAndSetToken(user._id, res);
        
        //redis session implementation
        const sessionKey = `session:${user._id}`;
        await redis.set(sessionKey, JSON.stringify({username : user.username}), "EX", 60*60*60);
        console.log("this is your session key", sessionKey);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
        console.log("Login Succesfully!")

    } catch (error) {
        console.log("error in Login controller ", error.message)
        res.status(500).json({ error: error.message })
    }
}

export const logout = async (req,res) =>{

    const token = req.cookies.jwt;

    try {
           const decoded = jwt.verify(token,process.env.JWT_SECRET);

           res.cookie("jwt", "", {maxAge:0})

           const sessionKey = `session:${decoded.userId}`;
           await redis.del(sessionKey);
        return res.status(500).json({message : " Logged Out Succesfully!"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}