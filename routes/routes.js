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
const noteController = require("../controllers/note.controllers")
const middle = require('../middleware/authentication')
router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword/:token', middle.checkTokenResetPassword, userController.resetPassword);
router.post('/createNote', middle.checkTokenAuth, noteController.createNote);
router.get('/getNotes', middle.checkTokenAuth, noteController.getNotes);
router.put('/updateColor', middle.checkTokenAuth, noteController.updateColor);
router.delete('/deleteNote', middle.checkTokenAuth, noteController.deleteNote);
module.exports = router;





















































// router.put(
//     '/isTrashed',
//     noteToken.noteTokenMiddleware,
//     noteController.isTrashed
// )
// router.put(
//     '/isArchived',
//     noteToken.noteTokenMiddleware,
//     noteController.isArchived
// )
// router.put(
//     '/remindMe',
//     noteToken.noteTokenMiddleware,
//     noteController.remindMe
// )
// router.put(
//     '/editTitle',
//     noteToken.noteTokenMiddleware,
//     noteController.editTitle
// )
// router.put(
//     '/editDescription',
//     noteToken.noteTokenMiddleware,
//     noteController.editDescription
// )

// router.put(
//     '/isPinned',
//     noteToken.noteTokenMiddleware,
//     noteController.isPinned
// )


// router.post(
//     '/saveLabelToNote',
//     noteToken.noteTokenMiddleware,
//     noteController.saveLabelToNote
// )

// router.post(
//     '/deleteLabelToNote',
//     noteToken.noteTokenMiddleware,
//     noteController.deleteLabelToNote
// )

// router.post(
//     '/addLabel',
//     noteToken.noteTokenMiddleware,
//     labelController.addLabel
// )

// router.get(
//     '/getLabels',
//     noteToken.noteTokenMiddleware,
//     labelController.getLabels
// )

// router.post(
//     '/deleteLabel',
//     noteToken.noteTokenMiddleware,
//     labelController.deleteLabel
// )
// router.put(
//     '/updateLabel',
//     noteToken.noteTokenMiddleware,
//     labelController.updateLabel
// )

// router.put('/uploadImage',
//     noteToken.noteTokenMiddleware, upload.single('image'),
//     noteController.updateImage)


// router.post(
//     '/saveCollab',
//     noteToken.noteTokenMiddleware,
//     collabeController.saveCollab
// )
// router.get(
//     '/getCollabDetails',
//     noteToken.noteTokenMiddleware,
//     collabeController.getCollabDetails

// )
// module.exports = router;