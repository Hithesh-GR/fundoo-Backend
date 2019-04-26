/**********************************************************************************************************
 *  @Purpose        : To provide routes to each webpages. 
 *  @file           : note.routes.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 02-02-2019
 *********************************************************************************************************/
const express = require('express');
const router = express.Router();
const noteController = require("../controllers/note.controllers");
const labelController = require("../controllers/note.controllers");
const collaboratorController = require("../controllers/note.controllers");
const middle = require('../middleware/authentication');
const upload = require('../middleware/fileUpload');

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

router.post('/pushNotification', middle.checkTokenAuth, noteController.pushNotification);

router.get('/sendNotification/:userid', noteController.sendPushNotification),

router.post('/addLabel', middle.checkTokenAuth, labelController.addLabel);

router.get('/getLabels', middle.checkTokenAuth, labelController.getLabels);

router.post('/deleteLabel', middle.checkTokenAuth, labelController.deleteLabel);

router.put('/updateLabel', middle.checkTokenAuth, labelController.updateLabel);

router.post('/saveLabelToNote', middle.checkTokenAuth, labelController.saveLabelToNote);

router.post('/deleteLabelToNote', middle.checkTokenAuth, labelController.deleteLabelToNote);

router.post('/saveCollaborator', middle.checkTokenAuth, collaboratorController.saveCollaborator);

router.get('/getCollaboratorDetails', middle.checkTokenAuth, collaboratorController.getCollaboratorDetails);

module.exports = router;
