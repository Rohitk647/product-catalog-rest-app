const express=require('express');
const router = express.Router();
// get the middleware functions
const validateRequest=require('../middleware/isValidRequest');
// get the controllers
const productsController=require('../controllers/products');
// identify the paths 
router.post('/',validateRequest.validate,productsController.createProduct);
router.get('/:productId',validateRequest.validate,productsController.getProduct);
router.put('/:productId',validateRequest.validate,productsController.updateProduct);
router.delete('/:productId',validateRequest.validate,productsController.deleteProduct);

module.exports = router;