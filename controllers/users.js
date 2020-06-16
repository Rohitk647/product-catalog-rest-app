const User=require('../models/user');
exports.createUser = (req,res,next)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    });
    user.save()
    .then(result=>{
        res.status(201).json({
            "message":"user is created"})
    })   
    .catch(error=>{
        console.log(error);
    })
}

exports.loginUser = (req,res,next)=>{
    User.findOne({email:req.body.email})
    .then(result=>{
        if(req.body.password == result.password){
            res.status(200).json({
                "message":"user is valid"
            })
        }
        else{
            res.status(401).json({
                "message":"user is not valid"
            })
        }
})
.catch(error=>{
    console.log(error);
})
}