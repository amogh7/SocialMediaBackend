const path=require("path");
const express=require("express");
let mongoose=require("mongoose");
const app=express();
const dotenv = require('dotenv')
const authRouter=require("./Router/AuthRouter")
const cookieParser=require("cookie-parser");
const postRouter = require("./Router/PostRouter");
const userRouter = require("./Router/userRouter");
dotenv.config({path:'config.env'})

app.use(express.json());
app.use(cookieParser());   

app.use("/api/auth",authRouter);  
app.use("/api",postRouter);  
app.use("/api",userRouter);  
app.get("/",function(req,res){
    res.status(200).json({message:"home Route app running successfuly"})
})
const DB_LINK=process.env.DB_LINK;
// console.log(DB_LINK);
mongoose.connect(DB_LINK,{useNewUrlParser:true,useUnifiedTopology:true})
.then(function(db){
    console.log("db connected");
}).catch(function(err){
    console.log(err);
    });

let port =process.env.PORT || 3000;
app.listen(port,function(){
    console.log(`server started at port ${port}` );
});
