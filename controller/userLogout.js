async function userLogout(req,res){
    try{
        res.clearCookie("token");
        res.json({
            message : "User logout successfully",
            error : false,
            success : true,
            data:[]
        })
    }catch(err){
        res.json({
            message : err,
            error : true,
            success : false,
        })
    }
}

module.exports = userLogout
