import User  from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateToken.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body

        if(!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ success: false, message: "Invalid email"})
        }

        if(password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters"})
        }
        
        const existingEmail = await User.findOne({ email: email})

        if(existingEmail) {
            return res.status(400).json({ success: false, message: "Email alreadt exists"})
        }

        const existingUsername = await User.findOne({ username: username})

        if(existingUsername) {
            return res.status(400).json({ success: false, message: "Username alreadt exists"})
        }
        
        const salt = await bcrypt.genSalt(10)     
        const hashPassword = await bcrypt.hash(password, salt)

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

        const newUser = new User({
            email,
            password: hashPassword,
            username,
            image
        })

        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save()

        res.status(201).json({ success: true, user: {...newUser._doc, password:""}})


    } catch (error) {
        console.error("Error in signup controller: ", error.message);
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}`})
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required"})
        }        

        const user = await User.findOne({ email: email})
        if(!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials"})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials"})
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: ""
            }
        })
    } catch (error) {
        console.error("Error in login controller ", error.message);
        res.status(500).json({ success: false, message:`Internal Server Error ${error.message}`})
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-kayflix")
        res.status(200).json({ success: true, message: "Logged out successfully."})
    } catch (error) {
        console.error("Error in logout controller", error.message);
        res.status(500).json({ success: false, message:`Internal Server Error ${error.message}`})
    }
}


export const authCheck = async (req, res) => {
    try {
    //   const user = await User.findById(req.user._id).select("-password");
    //   res.status(200).json(user);
        console.log("req.user", req.user);
        res.status(200).json({ success: true, user:req.user});
    } catch (error) {
      console.error("Error in authCheck controller", error.message);
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
  };