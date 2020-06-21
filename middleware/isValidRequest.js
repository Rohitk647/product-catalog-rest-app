const jwt=require("jsonwebtoken");
const errorHandler=require('./errorHandler');

exports.validate = (req,res,next)=>{
    try{
        const token=req.get('Authorization').split(' ')[1];
        if(token){
            let metadata=jwt.verify(token,'supersecret');
            req.userId=metadata.id
            next();
        }
    }
    catch(error){
        req.errorCode=401;
        req.errorMessage="user is not authorized";
        errorHandler.errorHandling(req,res);
    }
    
}