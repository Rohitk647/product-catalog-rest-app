const express=require('express');
const router = express.Router();
// get the users controller
const usersController=require('../controllers/users')

router.post('/signup',usersController.createUser);
router.post('/login',usersController.loginUser);

module.exports= router;