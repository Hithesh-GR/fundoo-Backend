/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : note.models.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 23-02-2019
 ******************************************************************************/
const mongoose = require('mongoose');
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
        required: [true, "Title required"]
    },
    description: {
        type: String,
        required: [true, "Description required"]
    },
    reminder: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    },
    archive: {
        type: Boolean
    },
    pinned: {
        type: Boolean
    },
    trash: {
        type: Boolean
    },
}, {
    timestamps: true
});
var note = mongoose.model('Note', noteSchema);

function noteModel() {}
/**
 * @description:it will add the notes data using note schema and save the data into the database
 * @param {*request from frontend} objectNote 
 * @param {*response to backend} callback 
 */
noteModel.prototype.addNotes = (objectNote, callback) => {
    console.log("data====>", objectNote);
    const noteModel = new note(objectNote.body);
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
module.exports = new noteModel();