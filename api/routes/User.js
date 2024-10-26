const express = require("express");
const userRoute = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../tokenGenerate")
const protect = require("../middleware/Auth")

userRoute.post("/login", AsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(user && (await user.matchPassword(password)) )
        {
            res.json({
                _id: user.id,
                name: user.name,
                email : user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            })

        } else {
            res.status(401);
            throw new Error("Invalid Email or Password");
        }
    }
))

//register route
userRoute.post("/register", AsyncHandler( async(req, res) => {
    const {name, email, password} = req.body;
    const existUser = await User.findOne({email});
    if(existUser) {
        res.status(400);
        throw new Error("User already exists")
    } else {
        const user = await User.create({
            name,
            email,
            password
        })

        if(user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            })
        } else{
            res.status(400);
            throw new Error("Invalid User Data");
            
        }
    }
}))


//profile data
userRoute.get("/profile", protect, AsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
        })
    }else {
        res.status(404);
        throw new Error("USER NOT FOUND");
    }
}))




module.exports = userRoute;



//postman post req testing
// header Content-Type   application/json
// body  raw {
 //   "email":"admin@node.com",
  //  "password":"123456"
//}