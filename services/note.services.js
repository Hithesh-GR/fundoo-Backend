/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
                      to noteModel and save that data to database and at login 
                      time fetching correct information from database.
 *  @file           : note.services.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ******************************************************************************/
const noteModel = require('../application/models/note.models');
/**
 * @description:it will send createNote data to model
 * @param {*request from frontend} data 
 * @param {*response to backend} callback
 */
exports.createNote = (data, callback) => {
    noteModel.addNotes(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            // console.log("In service", result);
            callback(null, result);
        }
    });
}
/**
 * @description:it will send getNotes data to model
 * @param {*request from frontend} data 
 * @param {*response to backend} callback
 */
exports.getNotes = (data, callback) => {
    noteModel.getNotes(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            // console.log("In service", result);
            callback(null, result);
        }
    });
}
/**
 * @description:it will send updateColor data to model 
 * @param {*request from frontend} paramID 
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.updateColor = (paramID, paramData, callback) => {
    noteModel.updateColor(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}
/**
 * @description:it will send deleteNote data to model
 * @param {*request from frontend} noteID 
 * @param {*response to backend} callback 
 */
exports.deleteNote = (noteID, callback) => {
    noteModel.deleteNote(noteID, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err)
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send trashed data to model
 * @param {*request from frontend} paramID 
 * @param {*response to backend} callback 
 */
exports.isTrashed = (paramID, callback) => {
    noteModel.getTrashStatus(paramID, (err, status) => {
        if (err) {
            callback(err);
        } else {
            if (status === true) {
                let data = {
                    status: false
                }
                noteModel.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        console.log("service error");
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            } else if (status === false) {
                let data = {
                    status: true
                }
                noteModel.isTrashed(paramID, data, (err, result) => {
                    if (err) {
                        console.log("service error");
                        callback(err);
                    } else {
                        return callback(null, result)
                    }
                })
            }

        }
    })
}
/**
 * @description:it will send archived data to model
 * @param {*request from frontend} paramID 
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.isArchived = (paramID, paramData, callback) => {
    noteModel.isArchived(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send reminder data to model
 * @param {*request from frontend} paramID 
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.reminder = (paramID, paramData, callback) => {
    noteModel.reminder(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send editTitle data to model
 * @param {*request from frontend} paramID 
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.editTitle = (paramID, paramData, callback) => {
    noteModel.editTitle(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send editDescription data to model
 * @param {*request from frontend} paramID 
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.editDescription = (paramID, paramData, callback) => {
    noteModel.editDescription(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send pinned data to model
 * @param {*request from frontend} paramID 
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.isPinned = (paramID, paramData, callback) => {
    noteModel.isPinned(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send updateImage data to model
 * @param {*request from frontend} paramID 
 * @param {*request from frontend} image 
 * @param {*response to backend} callback 
 */
exports.updateImage = (paramID, image, callback) => {
    noteModel.updateImage(paramID, image, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            console.log("in image service...");
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send add label data to model
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
exports.addLabel = (labelData, callback) => {
    noteModel.addLabel(labelData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send get label data to model
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
exports.getLabels = (labelData, callback) => {
    noteModel.getLabels(labelData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send delete label data to model
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
exports.deleteLabel = (labelData, callback) => {
    noteModel.deleteLabel(labelData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send update label data to model
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
exports.updateLabel = (labelData, callback) => {
    noteModel.updateLabel(labelData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * @description:it will send save label data to model
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.saveLabelToNote = (paramData, callback) => {
    if (paramData.pull) {
        noteModel.deleteLabelToNote(paramData, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
    else {
        noteModel.saveLabelToNote(paramData, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    }
}
/**
 * @description:it will send delete label data to model
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.deleteLabelToNote = (paramData, callback) => {
    noteModel.deleteLabelToNote(paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}