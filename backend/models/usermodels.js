const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const { kMaxLength } = require("buffer");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate:[validator.isEmail,"Enter a vlaid Email"],
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    role:{
        type:String,
        default:"User"
    }
})

//Saving Hash password

UserSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

})
//Get JwtToken for signin

UserSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//Compare password

UserSchema.methods.comparingpass = async function(entered_password){
    return await bcrypt.compare(entered_password,this.password);
}


module.exports = mongoose.model("user",UserSchema);