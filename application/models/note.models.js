/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : note.models.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var noteSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
        ref: 'Note'
    },
    title: {
        type: String,
        required: [true, "Title required"]
    },
    description: {
        type: String,
        required: [true, "Description required"]
    },
    reminder: {
        type: String
    },
}, {
    timestamps: true
});
var note = mongoose.model('Note', noteSchema);

function noteModel() {}
noteModel.prototype.save = (objectNote, callback) => {
    console.log("data====>", objectNote);
    const noteData = new note(objectNote);
    noteData.save((err, result) => {
        if (err) {
            callback(err);
        } else {
            // console.log("notemodel======>", result._id);
            return callback(null, result);
        }
    })
}
module.exports = new noteModel();