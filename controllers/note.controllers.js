/*****************************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data. 
 *  @file           : note.controllers.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 *****************************************************************************************/
const noteService = require('../services/note.services');
const labelService = require('../services/note.services');
const collaboratorService = require('../services/note.services');
const sent = require('../middleware/nodemailer');
/**
 * @description:it handles the creating note data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.createNote = (req, res) => {
    try {
        // req.checkBody('title', 'Title should not be empty');
        // req.checkBody('description', 'Description should not be empty');
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
 * @description:It handles the updating color to note
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
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
 * @description:It handles the deleting notes permanently 
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
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
 * @description:It handles the trashed notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
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
 * @description:It handles the archived notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
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
 * @description:It handles the reminder notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
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
 * @description:It handles the edit title to notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
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
 * @description:It handles the edit description to notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
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
 * @description:It handles the pinned notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
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
/**
 * @description:It handles the add image to note
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.updateImage = (req, res) => {
    try {
        console.log("req.file------>", req.file);
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
            let imageUp = req.body.image;
            // let imageUp = (req.file.location);
            noteService.updateImage(noteID, imageUp, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult)
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
 * @description:It handles the save labels to notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.saveLabelToNote = (req, res) => {
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
            noteService.saveLabelToNote(req.body, (err, result) => {
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
 * @description:It handles the delete labels from notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.deleteLabelToNote = (req, res) => {
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
            noteService.deleteLabelToNote(req.body, (err, result) => {
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
 * @description:It handles the add labels to notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.addLabel = (req, res) => {
    try {
        // req.checkBody('userID', 'userID required').not().isEmpty();
        req.checkBody('label', 'label required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                userID: req.decoded.payload.user_id,
                label: req.body.label
            }
            labelService.addLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
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
 * @description:It handles the get labels
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.getLabels = (req, res) => {
    try {
        // req.checkBody('userID', 'userID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                userID: req.decoded.payload.user_id,
            }
            labelService.getLabels(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
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
 * @description:It handles the delete labels from notes
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.deleteLabel = (req, res) => {
    try {
        req.checkBody('labelID', 'labelID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                labelID: req.body.labelID,
            }
            labelService.deleteLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
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
 * @description:It handles the update the labels
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.updateLabel = (req, res) => {
    try {
        req.checkBody('labelID', 'labelID required').not().isEmpty();
        req.checkBody('editLabel', 'editLabel required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const labelData = {
                editLabel: req.body.editLabel,
                labelID: req.body.labelID
            }
            labelService.updateLabel(labelData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
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
 * @description:It handles save the collaborators
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.saveCollaborator = (req, res) => {
    try {
        req.checkBody('userID', 'userID required').not().isEmpty();
        req.checkBody('noteID', 'noteID required').not().isEmpty();
        req.checkBody('collabUserID', 'collabUserID required').not().isEmpty();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            const collabData = {
                userID: req.decoded.payload.user_id,
                noteID: req.body.noteID,
                collabUserID: req.body.collabID
            }
            collaboratorService.saveCollaborator(collabData, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                }
                else {
                    responseResult.status = true;
                    responseResult.data = result;
                    const url = `you have been successfully collabed with one fundooNotes user`;
                    sent.sendEMailFunction(url);
                    res.status(200).send(url);
                    //res.status(200).send(responseResult);
                }
            })
        }
    }
    catch (error) {
        res.send(error)
    }
}
/**
 * @description:It handles get the collaborator details
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.getCollaboratorDetails = (req, res) => {
    try {
        var responseResult = {};
        // console.log("in collab noteController", req.body);
        collaboratorService.getCollaboratorDetails((err, result) => {
            console.log(err);
            console.log(result);
            if (err) {
                responseResult.status = false;
                responseResult.error = err;
                res.status(500).send(responseResult);
            }
            else {
                responseResult.status = true;
                responseResult.data = result;
                res.status(200).send(responseResult);
            }
        })
    }
    catch (error) {
        res.send(error)
    }
}
exports.pushNotification = (req, res) => {
    try {
      console.log(
        "Reqest from backend in pushNotification==================",
        req.body
      );
      req
        .checkBody("pushToken", "pushToken required")
        .not()
        .isEmpty();
      var errors = req.validationErrors();
      var response = {};
      if (errors) {
        response.status = false;
        response.error = errors;
        return res.status(422).send(response);
      } else {
        var responseResult = {};
        noteService.pushNotification(req, (err, result) => {
          if (err) {
            responseResult.status = false;
            responseResult.error = err;
            res.status(500).send(responseResult);
          } else {
            responseResult.status = true;
            responseResult.data = result;
            res.status(200).send(responseResult);
          }
        });
      }
    } catch (error) {
      res.send(error);
    }
  };

  exports.sendPushNotification = (req, res) => {
    try {
      console.log("USER ID GIVEN IS ", req.params.userid);
  
      var responseResult = {};
      var user_id = req.params.userid;
      noteService.sendPushNotification(user_id, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true; 
          responseResult.data = "Notification sent successfully!!"
          res.status(200).send(responseResult);
        }
      });
    } catch (error) {
      res.send(error);
    }
  };
  