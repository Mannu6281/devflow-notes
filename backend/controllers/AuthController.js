import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({error: "All fields are required"})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return  res.status(400).json({error: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name, email, password: hashedPassword
        });
        const saved= await user.save();
        res.status(201).json({message: "User registered successfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({error: "All fields are required"})
        }
        const user = await User.findOne({email : email})
        if(!user){
            return res.status(400).json({error: "Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error: "Invalid credentials"})
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(200).json({token, user: {id: user._id, name: user.name, email: user.email}})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}