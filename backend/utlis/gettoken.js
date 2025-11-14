const getToken = (user,statuscode,res)=>{
    const token = user.getJWTToken();
    //option for cookie
    const option ={
        expriesIn:new Date(
            Date.now()+process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
        httoOnly:true,

    };
    res.status(statuscode).cookie("Token",token,option).json({
        sucess:true,
        user,
        token
    })
}
module.exports = getToken;