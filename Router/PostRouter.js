const express=require("express");
const { protectRoute } = require("../Controller/AuthController");
const { createPost,getPostsForUser, likePost,commentOnPost, getUserLikedPost, getUserCommentPost, likeComment, getUserCommentLike, undoLike} = require("../Controller/PostController");
const postRouter=express.Router();




//.create a post
postRouter.use(protectRoute)
//An api to create a post
postRouter.post("/createPost",createPost)

postRouter.get("/getPosts",getPostsForUser)

//An api to get List of users liked a post
postRouter.get("/getLikes/:id",getUserLikedPost)

//An api to like a post
postRouter.post("/likePost/:id",likePost)

//An api to get List of users commented on a post
postRouter.get("/getComments/:id",getUserCommentPost)

//An api to get List of users liked on a comment
postRouter.get("/getCommentsLike/:id",getUserCommentLike)

postRouter.post("/undoLike/:id",undoLike)
//An api to comment on a post
postRouter.post("/commentPost/:id",commentOnPost)

//An api to like a comment
postRouter.post("/likeComment/:id",likeComment);
module.exports=postRouter