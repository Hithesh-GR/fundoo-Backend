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
noteModel.prototype.addNotes = (objectNote, callback) => {
    console.log("data====>", objectNote);
    const noteModel = new note(objectNote);
    noteModel.save((err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
module.exports = new noteModel();



































// noteModel.prototype.getNotes = (id, callback) => {
//     note.find({
//         userId: id.decoded.payload.user_id
//     }, (err, result) => {
//         if (err) {
//             callback(err)
//         } else {
//             callback(null, result)
//         }
//     })
// }
