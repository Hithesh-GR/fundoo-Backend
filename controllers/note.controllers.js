/*****************************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data. 
 *  @file           : note.controllers.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
const noteService = require('../services/note.services');
/**
 * @description:it handles the creating note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.createNote = (req, res) => {
    try {
        req.checkBody('title', 'Title should not be empty').not().isEmpty();
        req.checkBody('description', 'Description should not be empty').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
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
        }
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
/**
 * @description: 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateColor = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        req.checkBody('color', 'color should not be empty').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            color = req.body.color;
            noteService.updateColor(noteID, color, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
}
/**
 * @description: 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteNote = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            // noteID = req.body.noteID;
            noteService.deleteNote(req, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);;
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {

        res.send(error)
    }
}
/**
 * @description: 
 * @param {*} req 
 * @param {*} res 
 */
exports.isTrashed = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            noteService.isTrashed(noteID, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/**
 * @description: 
 * @param {*} req 
 * @param {*} res 
 */
exports.isArchived = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        req.checkBody('archive', 'archive required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            archive = req.body.archive;
            noteService.isArchived(noteID, archive, (err, result) => {
                // if (err) {
                //     responseRhived(noteID, archive, (err, result) => {
                //     }
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.reminder = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            reminder = req.body.reminder;
            noteService.reminder(noteID, reminder, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.editTitle = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            title = req.body.title;
            noteService.editTitle(noteID, title, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.editDescription = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            description = req.body.description;
            noteService.editDescription(noteID, description, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.isPinned = (req, res) => {
    try {
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            noteID = req.body.noteID;
            pinned = req.body.pinned;
            noteService.isPinned(noteID, pinned, (err, result) => {
                if (err) {

                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.data = result;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (error) {
        res.send(error)
    }
}