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
const collaboratorModel = require('../application/models/note.models');
const userModel = require('../application/models/user.models');
const NotificationModel = require('../application/models/notification')
const sendPush = require('../sendpush')
const async = require('async');
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
exports.updateColor = (paramID, paramData) => {
    try {
        return new Promise((resolve, reject) => {
            noteModel.updateColor(paramID, paramData)
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    } catch (err) {
        console.log('errors in serivces', err)
    }
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
/**
 * 
 * @param {*} collabData 
 * @param {*} callback 
 */
exports.saveCollaborator = (collabData, callback) => {
    collaboratorModel.saveCollaborator(collabData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
/**
 * 
 * @param {*} userId 
 * @param {*} callback 
 */
exports.getCollabNotesUserId = (userId, callback) => {
    collaboratorModel.getCollabNotesUserId(userId, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
/**
 * 
 * @param {*} callback 
 */
exports.getCollaboratorDetails = (callback) => {
    console.log("get collab details::");
    userModel.getUserDetails((err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.pushNotification = (req, callback) => {
    NotificationModel.updatePushNotification(req, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result);
        }
    });
};
exports.sendPushNotification = (user_id, callback) => {
    NotificationModel.sendPushNotification(user_id, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            console.log("IN SERVICE RESUT IS ", result);
            sendPush.SendPushNotify(result)
            return callback(null, result);
        }
    });
}
/*******************************************************************************************/

// exports.getNotes = (data, callback) => {
//     var finalResult = [];
//     noteModel.getNotes(data, (err, result) => {
//         if (err) {
//             callback(err);
//         } else {
//             userModel.findByUserId(data, (errorUser, resultUser) => {
//                 console.log(resultUser);
                
//                 if (errorUser) {
//                     callback(errorUser);
//                 } else {
//                     const noteOwner = {
//                         firstName: resultUser.firstName,
//                         lastName: resultUser.lastName,
//                         username: resultUser.username,
//                         user_id: resultUser.user_id
//                     }
//                     for (var i = 0; i < result.length; i++) {
//                         var userNote = {
//                             note: result[i],
//                             owner: noteOwner,
//                             collab: []
//                         }
//                         finalResult.push(userNote);
//                     }
//                     collaboratorModel.getCollabOwnerUserId(data, (errorCollab, resultOwnerCollab) => {
//                         // console.log("lllllllllllllllllllllllllllllll",resultOwnerCollab);
//                         if (errorCollab) {
//                             callback(errorCollab);
//                         } else {
//                             console.log("resulcollabowner  ", resultOwnerCollab);
//                             for (var i = 0; i < finalResult.length; i++) {
//                                 for (var j = 0; j < resultOwnerCollab.length; j++) {
//                                     if (finalResult[i].note._id.equals(resultOwnerCollab[j].noteID)) {
//                                         finalResult[i].collab.push(resultOwnerCollab[j].collabUserID)
//                                     }
//                                 }
//                             }
//                         }
//                     })
//                     collaboratorModel.getCollabNotesUserId(data, (errorCollab, resultCollab) => {
//                         if (errorCollab) {
//                             callback(errorCollab);
//                         } else {
//                             var operations = [];
//                             for (var i = 0; i < resultCollab.length; i++) {
//                                 operations.push((function (collabData) {
//                                     return function (callback) {
//                                         collaboratorModel.getDataByNoteId(collabData.noteID, (errorNote, resultNote) => {
//                                             console.log("123 : ", resultNote);
//                                             if (errorNote) {
//                                                 callback(errorNote)
//                                             } else {
//                                                 var collabUserArray = [];
//                                                 for (var i = 0; i < resultNote.length; i++) {
//                                                     collabUserArray.push(resultNote[i].collabUserID)
//                                                 }
//                                                 var collabNote = {
//                                                     note: resultNote[0].noteID,
//                                                     owner: resultNote[0].userID,
//                                                     collab: collabUserArray
//                                                 }
//                                                 finalResult.push(collabNote);
//                                                 callback(null, collabNote)
//                                             }
//                                         })
//                                     }
//                                 })(resultCollab[i]))
//                             }
//                             async.series(operations, (errorAsync, resultAsync) => {
//                                 console.log(resultAsync);
//                                 if (errorAsync) {
//                                     callback(errorAsync);
//                                 } else {
//                                     console.log("final result ", finalResult);
//                                     callback(null, finalResult)
//                                 }
//                             })
//                         }
//                     })
//                 }
//             })
//         }
//     })

// }