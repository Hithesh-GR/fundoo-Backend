/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : note.models.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ******************************************************************************/
const mongoose = require('mongoose');
/**
 * @Purpose :Used for avoiding deprecation warnings
 */
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
/**
 * @description:Creating note schema using mongoose
 **/
var noteSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
        ref: 'Note'
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    reminder: {
        type: String,
    },
    color: {
        type: String,
    },
    image: {
        type: String,
    },
    archive: {
        type: Boolean,
    },
    pinned: {
        type: Boolean,
    },
    trash: {
        type: Boolean,
    },
    // collab:[
    //     {
    //         type: String,
    //         ref: "collabSchema"
    //     }
    // ],
    label: [
        {
            type: String,
            ref: "labelSchema"
        }
    ]
}, {
        timestamps: true
    });
var note = mongoose.model('Note', noteSchema);
function noteModel() { }
/**
 * @description:it will add the notes data using note schema and save the data into the database
 * @param {*request from frontend} objectNote 
 * @param {*response to backend} callback 
 */
noteModel.prototype.addNotes = (req, callback) => {
    //console.log("data====>", objectNote);
    // const noteModel = new note(objectNote.body);
    const noteModel = new note({
        "userId": req.body.userId,
        "title": req.body.title,
        "description": req.body.description,
        "reminder": req.body.reminder,
        "color": req.body.color,
        "image": req.body.image,
        "archive": req.body.archive,
        "pinned": req.body.pinned,
        "trash": req.body.trash,
        "label": req.body.label
    });
    noteModel.save((err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
/**
 * @description:it will get the notes using userId and find the notes with data
 * @param {*request from frontend} id 
 * @param {*response to backend} callback 
 */
noteModel.prototype.getNotes = (id, callback) => {
    note.find({
        userId: id.decoded.payload.user_id
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}
/**
 * @description:it will update the color to individual note
 * @param {*request from frontend} noteID 
 * @param {*request from frontend} updateParams 
 * @param {*response to backend} callback 
 */
noteModel.prototype.updateColor =  (noteID, updateParams, res) => {
    return new Promise((resolve, reject) => {
         note.findOneAndUpdate({
            _id: noteID
        }, {
                $set: {
                    color: updateParams
                }
            },
            (err, result) => {
                if (err) {
                    console.log("color not updated");
                    reject(err);
                } else {
                    console.log("color updated sucessfully");
                    resolve(updateParams);
                }
            });
    })
};
/**
 * @description:it will permanently delete the note
 * @param {*request from frontend} data 
 * @param {*response to backend} callback 
 */
noteModel.prototype.deleteNote = (data, callback) => {
    note.deleteOne({
        _id: data.body.noteID
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            const obj = {
                status: 200,
                msg: "note is deleted successfully"
            }
            return callback(null, obj)
        }
    })
}
/**
 * @description:it will archived the note
 * @param {*request from frontend} noteID 
 * @param {*request from frontend} archiveParams 
 * @param {*response to backend} callback 
 */
noteModel.prototype.isArchived = (noteID, archiveNote, callback) => {
    note.findOneAndUpdate({
        _id: noteID
    }, {
            $set: {
                archive: archiveNote,
                trash: false,
                pinned: false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, archiveNote)
            }
        });
};
/**
 * @description:it will check the trash status
 * @param {*request from frontend} id 
 * @param {*response to backend} callback 
 */
noteModel.prototype.getTrashStatus = (id, callback) => {
    note.findOne({
        _id: id
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            console.log("trash status ", result);

            return callback(null, result.trash)
        }
    })
}
/**
 * @description:it will trashed the note
 * @param {*request from frontend} noteID 
 * @param {*request from frontend} trashStatus 
 * @param {*response to backend} callback 
 */
noteModel.prototype.isTrashed = (noteID, trashNote, callback) => {
    note.findOneAndUpdate({
        _id: noteID
    }, {
            $set: {
                trash: trashNote.status,
                pinned: false,
                archive: false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, trashNote.status)
            }
        });
}
/**
 * @description:it will set reminder to note and shows it in reminders
 * @param {*request from frontend} noteID 
 * @param {*request from frontend} reminderParams 
 * @param {*response to backend} callback 
 */
noteModel.prototype.reminder = (noteID, reminderParams, callback) => {
    note.findOneAndUpdate({
        _id: noteID
    }, {
            $set: {
                reminder: reminderParams
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, reminderParams)
            }
        });
};
/**
 * @description:it will edit the note title
 * @param {*request from frontend} noteID 
 * @param {*request from frontend} titleParams 
 * @param {*response to backend} callback 
 */
noteModel.prototype.editTitle = (noteID, titleParams, callback) => {
    note.findOneAndUpdate({
        _id: noteID
    }, {
            $set: {
                title: titleParams,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, titleParams)
            }

        });
};
/**
 * @description:it will edit the note description
 * @param {*request from frontend} noteID 
 * @param {*request from frontend} descParams 
 * @param {*response to backend} callback 
 */
noteModel.prototype.editDescription = (noteID, descParams, callback) => {
    note.findOneAndUpdate({
        _id: noteID
    }, {
            $set: {
                description: descParams,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, descParams)
            }
        });
};
/**
 * @description:it will pinned the note
 * @param {*request from frontend} noteID 
 * @param {*request from frontend} pinParams 
 * @param {*response to backend} callback 
 */
noteModel.prototype.isPinned = (noteID, pinParams, callback) => {
    note.findOneAndUpdate({
        _id: noteID
    }, {
            $set: {
                pinned: pinParams,
                trash: false,
                archive: false
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, pinParams)
            }
        });
};
/**
 * @description:it will add the image to note
 * @param {*request from frontend} noteID 
 * @param {*request from frontend} updateNote 
 * @param {*response to backend} callback 
 */
noteModel.prototype.updateImage = (noteID, updateNote, callback) => {
    note.findOneAndUpdate({
        _id: noteID
    }, {
            $set: {
                image: updateNote
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log("updated image to note successfully")
                return callback(null, updateNote)
            }
        });
};
/**
 * @description:it will save the label to note
 * @param {*request from frontend} labelParams 
 * @param {*response to backend} callback 
 */
noteModel.prototype.saveLabelToNote = (labelParams, callback) => {
    console.log("in model", labelParams.noteID);
    var labelledNote = null;
    var noteID = null;
    if (labelParams != null) {
        labelledNote = labelParams.label;
        noteID = labelParams.noteID;
    } else {
        callback("Pinned note not found")
    }
    note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $push: {
                label: labelledNote,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log("in model success");
                let res = result.label;
                res.push(labelledNote);
                return callback(null, res)
            }
        });
};
/**
 * @description:it will delete the label from note
 * @param {*request from frontend} labelParams 
 * @param {*response to backend} callback 
 */
noteModel.prototype.deleteLabelToNote = (labelParams, callback) => {
    console.log("in model", labelParams.noteID);
    var labelledNote = null;
    var noteID = null;
    if (labelParams != null) {
        labelledNote = labelParams.value;
        noteID = labelParams.noteID;
    } else {
        callback("Pinned note not found")
    }
    note.findOneAndUpdate(
        {
            _id: noteID
        },
        {
            $pull: {
                label: labelledNote,
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                let newArray = result.label;
                console.log("in model success result", result);

                for (let i = 0; i < newArray.length; i++) {
                    if (newArray[i] === labelledNote) {
                        newArray.splice(i, 1);
                        return callback(null, newArray)
                    }
                }
            }
        });
};

/**
 * @description:Creating label schema using mongoose
 **/
var labelSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    label: {
        type: String,
        require: [true, "Label require"],
        unique: true
    }
}, {
        timestamps: true
    }
)
var label = mongoose.model('Label', labelSchema);
/**
 * @description:it will add the label
 * @param {*request from frontend} labelData 
 * @param {*response to backend} callback 
 */
noteModel.prototype.addLabel = (labelData, callback) => {
    console.log("ultimate save", labelData);
    const Data = new label(labelData);
    Data.save((err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("label result", result);
            return callback(null, result);
        }
    })
};
/**
 * @description:it will get the labels
 * @param {*request from frontend} id 
 * @param {*response to backend} callback 
 */
noteModel.prototype.getLabels = (id, callback) => {
    console.log("in model", id);
    label.find({ userID: id.userID }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            console.log("labels", result)
            return callback(null, result)
        }
    })
};
/**
 * @description:it will delete the label
 * @param {*request from frontend} id 
 * @param {*response to backend} callback 
 */
noteModel.prototype.deleteLabel = (id, callback) => {
    console.log("in model", id);
    label.deleteOne({ _id: id.labelID }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            console.log("labels", result)
            return callback(null, result)
        }
    })
};
/**
 * @description:it will update the exixting label
 * @param {*request from frontend} changedLabel 
 * @param {*response to backend} callback 
 */
noteModel.prototype.updateLabel = (changedLabel, callback) => {
    var editLabel = null;
    var labelId = null;
    console.log("in model", changedLabel);
    if (changedLabel != null) {
        editLabel = changedLabel.editLabel;
        labelId = changedLabel.labelID
    } else {
        callback("Pinned note not found")
    }
    label.findOneAndUpdate(
        {
            _id: labelId
        },
        {
            $set: {
                label: editLabel
            }
        },
        (err, result) => {
            if (err) {
                console.log("in modelerr");
                callback(err)
            } else {
                console.log("in modelsuccess");
                return callback(null, changedLabel)
            }
        });
};

/**
 * @description:Creating collaborator schema using mongoose
 */
const collabSchema = mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema"
    },
    noteID: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    collabUserID: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema"
    },
},
    {
        timestamps: true
    })
const Collab = mongoose.model('Collaborator', collabSchema);
/**
 * 
 * @param {*} collabData 
 * @param {*} callback 
 */
noteModel.prototype.saveCollaborator = (collabData, callback) => {
    console.log("ultimate save", collabData);
    const Data = new Collab(collabData);
    Data.save((err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}

noteModel.prototype.getDataByNoteId = (noteID, callback) => {
    Collab.find({ noteID: noteID })
        .populate('userID', { notes: 0, password: 0, __v: 0, resetPasswordExpires: 0, resetPasswordToken: 0 })
        .populate('collabUserID', { notes: 0, password: 0, __v: 0, resetPasswordExpires: 0, resetPasswordToken: 0 })
        .populate('noteID')
        .exec(function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
}

noteModel.prototype.getCollabNotesUserId = (userID, callback) => {
    console.log("--------------------------",userID);
    Collab.find({ collabUserID: userID }, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

noteModel.prototype.getCollabOwnerUserId = (ownerUserId, callback) => {
    Collab.find({ userID: ownerUserId })
        .populate('collabUserID', { notes: 0, password: 0, __v: 0, resetPasswordExpires: 0, resetPasswordToken: 0 })
        .exec(function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
}

module.exports = new noteModel();