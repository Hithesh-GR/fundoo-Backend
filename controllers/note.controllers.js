const noteService = require('../services/note.services');
exports.createNote = (req, res) => {
    try {
        var responseResult = {};
        noteService.createNote(req.body, (err, result) => {
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
    } catch (err) {
        res.send(err);
    }
}











































// exports.getNotes = (req, res) => {
//     // try {
//        // console.log("note Controller", req);
//         var responseResult = {};
//         noteService.getNotes(req, (err, result) => {
//             if (err) {
//                 responseResult.status = false;
//                 responseResult.message = 'Failed to generate note';
//                 responseResult.error = err;
//                 res.status(200).send(responseResult);
//             } else {
//                 responseResult.status = true;
//                 responseResult.message = 'Note generated';
//                 responseResult.data = result;
//                 res.status(200).send(responseResult);
//             }
//         })
//     // } catch (error) {
//     //     res.send(err)
//     // }
// }