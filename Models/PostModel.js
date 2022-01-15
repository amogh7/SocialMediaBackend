const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    title:String,
    content:String,
    likes:[{type:mongoose.Types.ObjectId,ref:'Like'}],
    comments:[{type:mongoose.Types.ObjectId,ref:'Comment'}],
    currentUser:{type:mongoose.Types.ObjectId,ref:'User'},
})

module.exports=mongoose.model('Post',postSchema)