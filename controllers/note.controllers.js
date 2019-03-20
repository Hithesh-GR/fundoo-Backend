/******************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data. 
 *  @file           : note.controllers.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ******************************************************************************/
const noteService = require('../services/note.services');
/**
 * @description:it handles the creating note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.createNote = (req, res) => {
    try {
        // req.checkBody('title', 'Title required').not({
        //     min: 3
        // }).isAlpha();
        // req.checkBody('description', 'Description required').not({
        //     min: 3
        // }).isAlpha();
        // var errors = req.validationErrors();
        // var response = {};
        // if (errors) {
        //     response.status = false;
        //     response.error = errors;
        //     return res.status(422).send(response);
        // } else {
            var responseResult = {};
            noteService.createNote(req, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Failed to create note';
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    var userNote = {
                        note: result,
                    }
                    responseResult.status = true;
                    responseResult.message = result;
                    responseResult.data = userNote;
                    res.status(200).send(responseResult);
                }
            })
        // }
    } catch (err) {
        res.send(err);
    }
}
/**
 * @description:it handles get the created note with data 
 * @param {*request from frontend} req 
 * @param {*response from backend} res
 */
exports.getNotes = (req, res) => {
    try {
        // console.log("note Controller", req);
        var responseResult = {};
        noteService.getNotes(req, (err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.message = 'Failed to generate note';
                responseResult.error = err;
                res.status(500).send(responseResult);
            } else {
                responseResult.status = true;
                responseResult.message = 'List of notes:';
                responseResult.data = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.send(err)
    }
}