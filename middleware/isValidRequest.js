const jwt=require("jsonwebtoken");

exports.validate = (req,res,next)=>{
    try{
        const token=req.get('Authorization').split(' ')[1];
        if(token){
            jwt.verify(token,'supersecret');
            next();
        }
    }
    catch(error){
        res.status(401).json({
            "message":"user is not authorized"
        })
    }
    
}