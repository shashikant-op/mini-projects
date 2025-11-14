const app = require("./app")
const dotenv = require("dotenv");
const databaseconnection = require("./config/database");
dotenv.config({path:"./config/config.env"});

const cors =require("cors");

//Databse connection
databaseconnection();

//UNCAUGHT ERROR
process.on("uncaughtException",(err)=>{
console.log(`Error ${err.message}`);
console.log(`server is shutting down due to uncaught error`);
process.exit(1);
})



const PORT = process.env.PORT || 4500;
const server = app.listen(PORT,()=>{
    console.log(`app is listning on port: ${PORT}`);
})



//Unhandled rejection

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`server shutting down due to unhandled error rejection ${err.stack}`);
    server.close(()=>{
        process.exit(1);
    })
})

