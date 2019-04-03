/****************************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : routes.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 *****************************************************************************************/
const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controllers");
const noteController = require("../controllers/note.controllers");
const middle = require('../middleware/authentication');
const upload = require('../services/fileUpload');

router.post('/login', userController.login);

router.post('/registration', userController.registration);

router.post('/forgotPassword', userController.forgotPassword);

router.post('/resetPassword/:token', middle.checkTokenResetPassword, userController.resetPassword);

router.post('/createNote', middle.checkTokenAuth, noteController.createNote);

router.get('/getNotes', middle.checkTokenAuth, noteController.getNotes);

router.put('/updateColor', middle.checkTokenAuth, noteController.updateColor);

router.put('/isArchived', middle.checkTokenAuth, noteController.isArchived);

router.put('/isTrashed', middle.checkTokenAuth, noteController.isTrashed);

router.post('/deleteNote', middle.checkTokenAuth, noteController.deleteNote);

router.put('/reminder', middle.checkTokenAuth, noteController.reminder);

router.put('/editTitle', middle.checkTokenAuth, noteController.editTitle);

router.put('/editDescription', middle.checkTokenAuth, noteController.editDescription);

router.put('/isPinned', middle.checkTokenAuth, noteController.isPinned);

router.put('/uploadImage', middle.checkTokenAuth, upload.single('image'), noteController.updateImage);

router.put('/setProfilePic', middle.checkTokenAuth, upload.single('image'), userController.setProfilePic);

module.exports = router;