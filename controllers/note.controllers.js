const noteService = require('../services/note.services');
exports.createNote = (req, res) => {
    var responseResult = {};
    noteService.createNote( req.body, (err, result) => {
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
            responseResult.message = 'Note created';
            responseResult.data = userNote;
            res.status(200).send(responseResult);
        }
    })
}