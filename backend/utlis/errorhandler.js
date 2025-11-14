class Errorhandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.status =statuscode;
        Error.captureStackTrace(this,this.stackconstructor);
    }
}
module.exports = Errorhandler;