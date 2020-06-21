const jwt=require("jsonwebtoken");

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
        res.status(401).json({
            "message":"user is not authorized"
        })
    }
    
}