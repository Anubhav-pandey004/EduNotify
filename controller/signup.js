const UserModel = require('../model/user')
const bcrypt=require("bcrypt")

const signup =async(req,res)=>{
    console.log("SignUp start");
    
try {
    const {username,email,password}=req.body
    if(!email){
        throw new Error("Email is required")
    }
    if(!username){
        throw new Error("Name is required")
    }
    if(!password){
        throw new Error("Password is required")
    }
    if(await UserModel.findOne({email})){
        
        res.json({
            message : {message:"Email alredy register"},
            error : true,
            success : false,
        })
    }else{
        let salt =bcrypt.genSaltSync(10);
        let hashPassword =await bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Password not hashed")
        }
        const payload={
            ...req.body,
            password:hashPassword,
        }
        let newuser = await new UserModel(payload);
        
        let userindb=await newuser.save();
        res.status(201).json({
            message : "User registered successfully",
            error : false,
            success : true,
            data :userindb,
        })
    }

    
} catch (err) {
    res.json({
        message : err,
        error : true,
        success : false,
    })
}
}
module.exports=signup