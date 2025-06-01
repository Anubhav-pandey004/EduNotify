const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:String,
    role:{
        type:String,
        default:"Faculty"
    }
})
module.exports = mongoose.model("User",userSchema)