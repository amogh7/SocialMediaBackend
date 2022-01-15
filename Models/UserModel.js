let mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Password must be greater than 6"]
    },
    confirmPassword:{
        type:String,
        minLength:[6,"Password must be greater than 6"],
        validate:{
            validator:function(){
                return this.password==this.confirmPassword;
            },
            message:"Password did not match"
        }
    },
    pImage:{
        type:String,
        default:"/images/users/default.png"
    },
    posts:[{type:mongoose.Types.ObjectId,ref:'Post'}]
},
{timestamps:true}
)
module.exports=mongoose.model("User",UserSchema);
