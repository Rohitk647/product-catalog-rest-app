const express=require('express');
const router = express.Router();

// get the users controller
const unknownController=require('../controllers/unknown');
// identify the paths 
router.use('/',unknownController.unknownRoute);

module.exports= router;