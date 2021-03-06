const mongoose=require("mongoose");

const CommentLikeSchema=new mongoose.Schema({  
    comment:{type:mongoose.Types.ObjectId,ref:'Comment'},
    user:{type:mongoose.Types.ObjectId,ref:'User',unique:true}
},
{timestamps:true})

module.exports=mongoose.model('CommentLike',CommentLikeSchema)