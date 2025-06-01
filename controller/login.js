const UserModel= require('../model/user')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log("hey");
        if(!email){
            throw new Error("Email is required")
        }

        if(!password){
            throw new Error("Password is required")
        }

        const user = await UserModel.findOne({email})
        console.log("Useer is ",user);

        if(!user){
            res.json({
                message : {message:"User not Found"},
                error : true,
                success : false,
            })
        }
       
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const tokendata = {
                _id : user._id,
                email : user.email
            }
            // console.log("Checkpoint4...............",user._id);
            
         
            //token
            const token = await jwt.sign(tokendata, process.env.JWT_SECRET, {expiresIn : "8h"})

            const tokenOption = {
               sameSite: "None", 
                httpOnly : true,
                secure:true
            }
            console.log(token,tokenOption);
            //cookie, passing token in cookie
            res.cookie("token",token,tokenOption).json({
                message : "User signin successfully",
                error : false,
                success : true,
                data : token
            })
    }else{
        res.json({
            message : {message:"Incorrect password"},
            error : true,
            success : false,
        })
    }
}catch (err) {
        res.json({
            message : err,
            error : true,
            success : false,
        })
    }
}

module.exports=login
