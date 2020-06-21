exports.errorHandling=(req,res)=>{
    res.status(req.errorCode).json({
        message:req.errorMessage
    })
}