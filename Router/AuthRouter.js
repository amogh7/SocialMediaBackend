const express=require("express");
const authRouter=express.Router();
const User=require("../Models/UserModel");
const bcrypt=require("bcrypt");
const { signIn,login,logout,protectRoute,isLoggedIn} = require("../Controller/AuthController");

//Sign In
authRouter.post("/signin",signIn)

//Login
authRouter.post("/login",login)

authRouter.get("/isLoggedIn",isLoggedIn)
authRouter.get("/logout",protectRoute,logout)
module.exports=authRouter