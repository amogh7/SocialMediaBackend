const express=require("express");
const { protectRoute } = require("../Controller/AuthController");
const { createPost,getPostsForUser, likePost,commentOnPost, getUserLikedPost, getUserCommentPost} = require("../Controller/PostController");
const postRouter=express.Router();





//.create a post
postRouter.use(protectRoute)
postRouter.post("/createPost",createPost)
postRouter.get("/getPosts",getPostsForUser)
postRouter.get("/getLikes",getUserLikedPost)
postRouter.get("/getComments",getUserCommentPost)
postRouter.post("/likePost",likePost)
postRouter.post("/commentPost",commentOnPost)
module.exports=postRouter