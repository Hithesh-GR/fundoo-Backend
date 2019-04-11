/****************************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : user.routes.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 *****************************************************************************************/
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controllers");
const middle = require('../middleware/authentication');
const upload = require('../middleware/fileUpload');

router.post('/login', userController.login);

router.post('/registration', userController.registration);

router.post('/forgotPassword', userController.forgotPassword);

router.post('/resetPassword/:token', middle.checkTokenResetPassword, userController.resetPassword);

router.put('/setProfilePic', middle.checkTokenAuth, upload.single('image'), userController.setProfilePic);

router.put('/setProfilePic1', middle.checkTokenAuth, upload.single('image'), userController.setProfilePic1);

module.exports = router;