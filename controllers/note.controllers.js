const noteService = require('../services/note.services');
exports.createNote = (req, res) => {
    // try {
    //     req.checkBody('userID', 'Invaild userID').isLength({min: 3}).isAlpha();
    //     req.checkBody('title', 'Invaild title').isLength({min: 3}).isAlpha();
    //     req.checkBody('description', 'Invaild description').isLength({min: 3}).isAlpha();
    //     req.checkBody('reminder', 'Invaild reminder').isLength({min: 3}).isAlpha();
    //     var errors = req.validationErrors();
    //     var response = {};
    //     if (errors) {
    //         response.status = false;
    //         response.error = errors;
    //         return res.status(422).send(response);
    //     } else {
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
                    responseResult.message = 'Note created';
                    responseResult.data = userNote;
                    res.status(200).send(responseResult);
                }
            })
    //     }
    // } catch (err) {
    //     res.send(err);
    // }
}