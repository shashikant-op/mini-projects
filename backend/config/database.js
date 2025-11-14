const mongoose = require("mongoose");
const database = ()=>{
    console.log("----------------------------------------------------------------------------",process.env.DB_URL);
    mongoose.connect(process.env.DB_URL).then((data)=>{
        console.log(`mongodb connected with server : ${data.connection.host}`);
    })
}
module.exports = database