const User=require("../Models/UserModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config({path:'../config.env'})

async function signIn(req,res){
    try{
        const pSalt=await bcrypt.genSalt(10);
        const pHash=await bcrypt.hash(req.body.password,pSalt);
     //    const cpSalt=await bcrypt.genSalt(10);
        const cpHash=await bcrypt.hash(req.body.confirmPassword,pSalt);
        const newUser= await User.create({
         username:req.body.username,
         email:req.body.email,
         password:pHash,
         confirmPassword:cpHash
     })
        

    res.status(200).json({
     message:"Successfully Created new User" ,  
     data:newUser
 })
 }
 catch(error){
     res.status(200).json({
         error
     })

 }

}

async function login(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        if(user){
            const password=await bcrypt.compare(req.body.password,user.password)
            if(password){
                const token=jwt.sign({id:user["_id"]},process.env.SECRET_KEY);
                res.cookie('jwt',token,{httpOnly:true});
                
                res.status(200).json({
                    message:"login succesful",
                    data:user
                })
            }
            else{
                res.status(300).json({
                    message:"password is wrong"
                })
            }
            
        }
        else{
            res.status(200).json({
                message:"User does not exist."
            })
        }
        }
        catch(error){
            res.status(500).json({
                erorr
            })
        }
}
async function protectRoute(req,res,next){
    try{
        // const token=req.headers.authorization.split(" ").pop();
        // console.log(token);
        const token =req.cookies.jwt;
        console.log(token);
        console.log("Inside protect route");
        const payload=jwt.verify(token,process.env.SECRET_KEY);
        console.log(payload);
        if(payload){
            req.id=payload.id;
            next();
        }
        else{
            res.status(501).json({
                message:"Please Log in"
            });
        }
    }
    catch(error){
        res.status(501).json({
            error
            
        });
    }
}
async function isLoggedIn(req,res,next){
    try{
        let token=req.cookies.jwt;
        const payload=jwt.verify(token,process.env.SECRET_KEY);
        if(payload){
           res.status(200).json({
               message:"user is logged in"
           })
        }
        else{
            res.status(500).json({
                message:"please login"
            })
        }

    }
    catch(error){
        res.status(500).json({
          message:"please login"
        })
    }
    
}


async function logout(req,res){
    try{
           if(req.cookies.jwt)      
           res.clearCookie('jwt');
           res.status(200).json({
               message:"cleared cookie"
           })
           
    }
    catch(error){
        res.status(501).json({
            error
        });
             
    }
}


module.exports.signIn=signIn;
module.exports.login=login;
module.exports.logout=logout;
module.exports.protectRoute=protectRoute;
module.exports.isLoggedIn=isLoggedIn;