const Product=require('../models/product');
const User=require('../models/user');
const errorHandler=require('../middleware/errorHandler');

// This will create a product in data base
exports.createProduct=(req,res,next)=>{
    const product = new Product({
        title:req.body.title,
        category:req.body.category,
        image:req.body.image,
        price:req.body.price,
        creator:req.userId
    });
    product.save()
        .then(result=>{
            User.findOne({_id:req.userId})
                .then(user=>{
                    user.posts.push(result);
                    user.save();
                    res.status(201).json({
                    "message":"product is created",
                    "productId":result._id,
                    "creater":user.username
                })
            })
        })
        .catch(error=>{
            req.errorCode=500;
            req.errorMessage=error;
            errorHandler.errorHandling(req,res);
        })
}

// this will get the product by id
exports.getProduct=(req,res)=>{
    Product.findOne({_id:req.params.productId})
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
            req.errorCode=500;
            req.errorMessage=error;
            errorHandler.errorHandling(req,res);
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
                req.errorCode=500;
                req.errorMessage=error;
                errorHandler.errorHandling(req,res);
            })
        })
        .catch(error=>{
            req.errorCode=500;
            req.errorMessage=error;
            errorHandler.errorHandling(req,res);
        })
}

// this will delete the product by id
exports.deleteProduct=(req,res)=>{
Product.findByIdAndRemove(req.params.productId)
    .then(result=>
        User.findOne({_id:req.userId})
        .then(user=>{
            user.posts.pull(req.params.productId);
            user.save();
            res.status(200).json({
                "message":"product is deleted"
            })
        })
        )
    .catch(error=>{
        req.errorCode=500;
        req.errorMessage=error;
        errorHandler.errorHandling(req,res);
    })
}