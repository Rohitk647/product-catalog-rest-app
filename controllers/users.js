const User=require('../models/user');
const errorHandler=require('../middleware/errorHandler');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const secret = 'simplehash';
exports.createUser = (req,res,next)=>{
    const user = new User({
        username:req.body.username,
        password:crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('hex'),
        email:req.body.email
    });
    user.save()
    .then(result=>{
        res.status(201).json({
            "message":"user is created"})
    })   
    .catch(error=>{
        req.errorCode=500;
        req.errorMessage=error;
        errorHandler.errorHandling(req,res);
    })
}

exports.loginUser = (req,res,next)=>{
    User.findOne({email:req.body.email})
    .then(result=>{
        if(crypto.createHmac('sha256', secret).update(req.body.password).digest('hex') == result.password){
           const token=jwt.sign({
               email:result.email,
               id:result._id.toString()
           },'supersecret',{expiresIn:'1h'}); 
           res.status(200).json({
            "message":"user is valid",
            "token":token
         })
        }
        else{
            res.status(401).json({
                "message":"user is not valid"
            })
        }
})
.catch(error=>{
    req.errorCode=500;
    req.errorMessage=error;
    errorHandler.errorHandling(req,res);
})
}