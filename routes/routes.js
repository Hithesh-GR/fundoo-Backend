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
const noteController = require("../controllers/note.controllers");
const middle = require('../middleware/authentication');
const upload = require('../middleware/fileUpload');

router.post('/login', userController.login);

router.post('/registration', userController.registration);

router.post('/forgotPassword', userController.forgotPassword);

router.post('/resetPassword/:token', middle.checkTokenResetPassword, userController.resetPassword);

router.put('/setProfilePic', middle.checkTokenAuth, upload.single('image'), userController.setProfilePic);

router.put('/setProfilePic1', middle.checkTokenAuth, upload.single('image'), userController.setProfilePic1);

router.post('/createNote', middle.checkTokenAuth, upload.single('image'), noteController.createNote);

router.get('/getNotes', middle.checkTokenAuth, noteController.getNotes);

router.put('/updateColor', middle.checkTokenAuth, noteController.updateColor);

router.put('/isArchived', middle.checkTokenAuth, noteController.isArchived);

router.put('/isTrashed', middle.checkTokenAuth, noteController.isTrashed);

router.post('/deleteNote', middle.checkTokenAuth, noteController.deleteNote);

router.put('/reminder', middle.checkTokenAuth, noteController.reminder);

router.put('/editTitle', middle.checkTokenAuth, noteController.editTitle);

router.put('/editDescription', middle.checkTokenAuth, noteController.editDescription);

router.put('/isPinned', middle.checkTokenAuth, noteController.isPinned);

router.put('/uploadImage', middle.checkTokenAuth, noteController.updateImage);

router.post('/addLabel', middle.checkTokenAuth, noteController.addLabel);

router.get('/getLabels', middle.checkTokenAuth, noteController.getLabels);

router.post('/deleteLabel', middle.checkTokenAuth, noteController.deleteLabel);

router.put('/updateLabel', middle.checkTokenAuth, noteController.updateLabel);

router.post('/saveLabelToNote', middle.checkTokenAuth, noteController.saveLabelToNote);

router.post('/deleteLabelToNote', middle.checkTokenAuth, noteController.deleteLabelToNote)

module.exports = router;