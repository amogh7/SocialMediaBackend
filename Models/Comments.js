const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
    message:{type:String},
    likes:[{type:mongoose.Types.ObjectId,ref:'CommentLike'}],
    post:[{type:mongoose.Types.ObjectId,ref:'Post'}],
    user:{type:mongoose.Types.ObjectId,ref:'User'}
},
{timestamps:true})

module.exports=mongoose.model('Comment',commentSchema)