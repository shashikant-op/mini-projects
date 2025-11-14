const Error_handler = require("../utlis/errorhandler");

module.exports=(err,req,res,next)=>{
    err.status = err.status || 500;
    err.message = err.message || "server side error";
    if(err.name === "CastError"){
        const message = `Resources not found Invalid ${err.path}`;
        err = new Error_handler(message,500);

    }
    res.status(err.status).json({
        sucess:false,
        error:err.message
    })
}