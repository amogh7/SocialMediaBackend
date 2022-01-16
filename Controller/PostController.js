const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");
const Like = require("../Models/Likes");
const Comment = require("../Models/Comments");
const CommentLike = require("../Models/CommentLikes");
const jwt = require("jsonwebtoken");
// Create a post
async function createPost(req, res) {
  try {
    const user = await User.findById(req.id);
    if (user) {
      const content = req.body.content;
      const title = req.body.title;

      const newPost = await Post.create({
        title: title,
        content: content,
        currentUser: user,
      });

      let userUpdated = await User.findByIdAndUpdate(req.id, {
        $push: { posts: newPost },
      }).populate("posts");

      res.status(200).json({
        message: "Successfully Created new Post",
        data: newPost,
        user: userUpdated,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "error creating post",
      error,
    });
  }
}
//get All posts 
async function getPostsForUser(req, res) {
  try {
    const allPosts = await Post.find();
    res.status(200).json({
      message: "Successfully got all posts",
      posts: allPosts,
    });
  } catch (error) {
    res.status(200).json({
      message: "error in getting posts",
    });
  }
}
//  Like a post 
async function likePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    const currentUser = await User.findById(req.id);

    const newLike = await Like.create({
      post: post,
      user: currentUser,
    });

    let updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      $push: { likes: newLike },
    }).populate("likes");

    if (post.currentUser.toString() !== req.id) {
      console.log("inside if condition");
      res.status(200).json({
        message: "successfuly liked and notified",
        likeData: newLike,
      });
    } else {
      res.status(200).json({
        message: "successfuly liked your own post",
        data: newLike,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
//like a comment
async function likeComment(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);
      const currentUser = await User.findById(req.id);
      const userValue = comment.user.toString();
      const newCommentLike = await CommentLike.create({
        comment: comment,
        user: currentUser,
      });
  
      let updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
        $push: { likes: newCommentLike },
      }).populate("likes");
      if (currentUser["_id"].toString() !== userValue) {
        res.status(200).json({
          message: "successfuly liked comment and notified",
          data: newCommentLike,
        });
      }
  
      res.status(200).json({
        message: "successfuly liked comment on you own post",
        data: newCommentLike,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }
  
//  comment on a post
async function commentOnPost(req, res) {
  try {
    const post = await Post.findById(req.params.id)

    const userValue = post.currentUser.toString();
    const currentUser = await User.findById(req.id);

    const newComment = await Comment.create({
      message: req.body.message,
      post: post,
      user: currentUser,
    });

    let updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: newComment },
    }).populate("comments");

    if (currentUser["_id"].toString() !== userValue) {
      res.status(200).json({
        message: "successfuly commentd and notified",
        data: newComment,
      });
    }

    res.status(200).json({
      message: "successfuly commented on your own post",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}

//get list of  users that liked the post
async function getUserLikedPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate({
      path: "likes",
      select: ["user"],
    });
    const usersArray = [];
    for (let likes of post.likes) {
      const user = await User.findById(likes.user);
      usersArray.push(user);
    }
    res.status(200).json({
      message: "Successfuly got people that like my posts",
      list: usersArray,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}

//get users that commented on the post
async function getUserCommentPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate({
      path: "comments",
      select: ["user"],
    });
    const usersArray = [];
    for (let comment of post.comments) {
      //   console.log(comment);
      const user = await User.findById(comment.user);
      usersArray.push(user);
    }

    res.status(200).json({
      message: "Successfuly got people that commented on my posts",
      list: usersArray,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}

//get users that like a comment
async function getUserCommentLike(req, res) {
  try {
    try {
      const comment = await Comment.findById(req.params.id).populate({
        path: "likes",
        select: ["user"],
      });
      //   console.log(comment, "helllo");
      const usersArray = [];
      for (let like of comment.likes) {
        const user = await User.findById(like.user);
        usersArray.push(user);
      }

      res.status(200).json({
        message: "Successfuly got people that liked on my comment",
        list: usersArray,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  } catch (error) {}
}

//Api to undo like
async function undolike(req, res) {
  try {
    const like = req.params.id;
    let deletedLike = await Like.findByIdAndDelete(like);
    if (deletedLike) {
      res.send(200).json({
        message: "undo like successfull",
      });
    }
  } catch (error) {
    res.send(500).json({
      error,
    });
  }
}

module.exports.createPost = createPost;
module.exports.getPostsForUser = getPostsForUser;
module.exports.likePost = likePost;
module.exports.commentOnPost = commentOnPost;
module.exports.getUserLikedPost = getUserLikedPost;
module.exports.getUserCommentPost = getUserCommentPost;
module.exports.likeComment = likeComment;
module.exports.getUserCommentLike = getUserCommentLike;
module.exports.undoLike = undolike;
