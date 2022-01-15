const Post=require("../Models/PostModel");
const User=require("../Models/UserModel");
const Like=require("../Models/Likes");
const Comment=require("../Models/Comments");
const jwt=require("jsonwebtoken");
const res = require("express/lib/response");



async function createPost(req,res){
    try{
        console.log("hellodsfad")
        
        
            const user=await User.findById(req.id)
           if(user){

         const content=req.body.content
         const title=req.body.title
         console.log(content,"contetntt")
         const newPost=await Post.create({
             title:title,
             content:content,
             currentUser:user
         })
         
         console.log(newPost)
         let userUpdated=await User.findByIdAndUpdate(req.id, { $push: { posts: newPost} }).populate("posts")
         console.log(userUpdated)
         res.status(200).json({
            message:"Successfully Created new Post" ,  
            data:newPost,
            user:userUpdated
        })

        }
    }
    catch(error){
        res.status(200).json({
            message:"error creating post" ,  
            error
        })

    }

}
async function getPostsForUser(req,res){
    try{
    let token=req.cookies.jwt
    console.log(token)
    const payload=jwt.verify(token,process.env.SECRET_KEY);
    console.log(payload,"payload");
    const allPosts= await Post.find({user:payload.id})
    res.status(200).json({
        message:"Successfully got all posts" ,  
        posts:allPosts
    })

    }
    
    catch(error){
        res.status(200).json({
            message:"error in getting posts" ,  
            
        })
    
    }
}

async function likePost(req,res){
try{
    console.log(req.body.postId)
const post=await Post.findById(req.body.postId)
console.log(post.currentUser.toString(),"Post")
const currentUser=await User.findById(req.id)
console.log(req.id,"currentUser");

const newLike= await Like.create({
    post:post,
    user:currentUser
})
console.log(newLike,"newLike")

let updatedPost=await Post.findByIdAndUpdate(req.body.postId,{ $push: { likes: newLike} }).populate("likes");

if(post.currentUser.toString()!==req.id){
    console.log("inside if condition");
 res.status(200).json({
    message:"successfuly liked and notified",
    likeData:newLike,    
    })
    
}
else{
res.status(200).json({
message:"successfuly liked your own post",
data:newLike,
})
}

}
catch(error){
    res.status(500).json({
        error
        })
}

}


async function commentOnPost(req,res){
    try{
        console.log(req.body.postId)
    const post=await Post.findById(req.body.postId)
    console.log(post.currentUser.toString(),"Post")
    const userValue=post.currentUser.toString()
    const currentUser=await User.findById(req.id)
    console.log(req.id,"currentUser");
    
    const newComment= await Comment.create({
        message:req.body.message,
        post:post,
        user:currentUser
    })
    console.log(newComment,"newComment")
    
    let updatedComment=await Post.findByIdAndUpdate(req.body.postId,{ $push: { comments: newComment} }).populate("comments");
    console.log(updatedComment);

    if(currentUser["_id"].toString()!==userValue){
        console.log("inside if condition");
     res.status(200).json({
        message:"successfuly commentd and notified",
        data:newComment,    
        })
    }
    
         res.status(200).json({
          message:"successfuly commented on your own post",
            data:newComment,
    })
    
    
    }
    catch(error){
        res.status(500).json({
            error
            })
    }
    
    }
   
async function getUserLikedPost(req,res){
try{
    const post=await Post.findById(req.body.postId).populate({path:"likes",select:["user"]});
    const usersArray=[];
    for(let i=0;i<post.likes.length;i++){
        const user=await User.findById(post.likes[i].user);
        usersArray.push(user);
    }
    res.status(200).json({

        message:"Successfuly got people that like my posts",
        list:usersArray
    })
}
catch(error){
    res.status(500).json({
       error
    })
}
}   
async function getUserCommentPost(req,res){
    try{
        const post=await Post.findById(req.body.postId).populate({path:"comments",select:["user"]});
        const usersArray=[];
        for(let i=0;i<post.comments.length;i++){
            const user=await User.findById(post.comments[i].user);
            usersArray.push(user);
        }
        res.status(200).json({
    
            message:"Successfuly got people that commented on my posts",
            list:usersArray
        })
    }
    catch(error){
        res.status(500).json({
           error
        })
    }
    
} 
async function getUserCommentLikePost(){

} 

async function likeComment(){

}

 

async function undolike(req,res){

}



module.exports.createPost=createPost;
module.exports.getPostsForUser=getPostsForUser;
module.exports.likePost=likePost;
module.exports.commentOnPost=commentOnPost
module.exports.getUserLikedPost=getUserLikedPost
module.exports.getUserCommentPost=getUserCommentPost
