const Post=require("../Models/PostModel");
const User=require("../Models/UserModel");
const jwt=require("jsonwebtoken");

async function getAllusers(req,res){
try{
   const allUsers= await User.find()
   res.status(200).json({
      data:allUsers
   })
}
catch(error){

        res.status(200).json({
            message:"error in getting posts" ,  
            
        })    
}
    
}
module.exports.getAllusers=getAllusers;