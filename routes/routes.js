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
router.post('/resetPassword/:token', middle.checkToken, userController.resetPassword);
router.post('/createNote',middle.checkToken,  noteController.createNote);
router.get("/getNotes",middle.checkToken, noteController.getNotes);
module.exports = router;