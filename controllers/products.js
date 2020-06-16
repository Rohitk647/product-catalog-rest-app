const Product=require('../models/product');

// This will create a product in data base
exports.createProduct=(req,res,next)=>{
    const product = new Product({
        title:req.body.title,
        category:req.body.category,
        image:req.body.image,
        price:req.body.price
    });
    product.save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                "message":"product is created",
                "productId":result._id
            })
        })
        .catch(error=>{
            res.status(500).json({
                "error":error
            })
        })
}

// this will get the product by id
exports.getProduct=(req,res)=>{
    Product.findById(req.params.productId)
        .then(result=>{
            if(!result)
            {
                let error={}
                error.message="product not found";
                error.errorCode=404;
                throw error;
            }
            res.status(200).json({
                result
            })
        })
        .catch(error=>{
            if(error.errorCode){
                res.status(error.errorCode).json({
                    "message":error.message
                })
            }
            else{
                res.status(500).json({
                    "message":error
                })
            }
        })
}

// this will update the product by id
exports.updateProduct=(req,res)=>{
    Product.findById(req.params.productId)
        .then(result=>{
            if(!result)
            {
                let error={}
                error.message="product not found";
                error.errorCode=404;
                throw error;
            }
            result.title=req.body.title;
            result.category=req.body.category;
            result.image=req.body.image;
            result.price=req.body.price;
            return result.save();
            })
            .then(product=>{
                res.status(200).json({
                    "message":"product is udated",
                    "productId":product._id
                })
            .catch(error=>{
            res.status(500).json({
                "error":error
            })
        })
        })
        .catch(error=>{
            if(error.errorCode){
                res.status(error.errorCode).json({
                    "message":error.message
                })
            }
            else{
                res.status(500).json({
                    "message":error
                })
            }
        })
}

// this will delete the product by id
exports.deleteProduct=(req,res)=>{
    // Product.findById(req.params.productId)
    //     .then(result=>{
    //         if(!result)
    //         {
    //             let error={}
    //             error.message="product not found";
    //             error.errorCode=404;
    //             throw error;
    //         }
            Product.findByIdAndRemove(req.params.productId)
                .then(result=>
                    res.status(200).json({
                        result
                    })
                    )
                .catch(error=>{
                    console.log(error);
                    if(error.errorCode){
                        res.status(error.errorCode).json({
                            "message":error.message
                        })
                    }
                    else{
                        res.status(500).json({
                            "message":error
                        })
                    }
                })
        // })
        // .catch(error=>{
        //     if(error.errorCode){
        //         res.status(error.errorCode).json({
        //             "message":error.message
        //         })
        //     }
        //     else{
        //         res.status(500).json({
        //             "message":error
        //         })
        //     }
        // })
}