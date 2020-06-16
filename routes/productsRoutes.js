const express=require('express');
const router = express.Router();
// get the controllers
const productsController=require('../controllers/products');
// identify the paths 
router.post('/',productsController.createProduct);
router.get('/:productId',productsController.getProduct);
router.put('/:productId',productsController.updateProduct);
router.delete('/:productId',productsController.deleteProduct);

module.exports = router;