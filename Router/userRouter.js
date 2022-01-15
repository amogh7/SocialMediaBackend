
const express=require("express");
const { protectRoute } = require("../Controller/AuthController");
const { createPost,getPostsForUser } = require("../Controller/PostController");
const { getAllusers } = require("../Controller/UserController");

const userRouter=express.Router();




//.create a post

userRouter.get("/getAllUsers",getAllusers)
module.exports=userRouter