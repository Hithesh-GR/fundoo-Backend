/******************************************************************************
 *  @Purpose        : To create user controller to handle the incoming data. 
 *  @file           : user.controllers.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
const userService = require('../services/user.services');
const token = require('../token');
const sent = require('../middleware/nodemailer');
/**
 * @description:It handles the registration data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.registration = (req, res) => {
    try {
        req.checkBody('firstname', 'Invaild Firstname').isLength({
            min: 3
        }).isAlpha();
        req.checkBody('lastname', 'Invaild Lastname').isLength({
            min: 3
        }).isAlpha();
        req.checkBody('email', 'Invaild Email').isEmail();
        req.checkBody('password', 'Invaild Password').isLength({
            min: 4
        });
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {}
            userService.registration(req.body, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Registration Failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = 'Registered Successfull';
                    // responseResult.result = result;
                    // const payload = {
                    //     user_id: responseResult.result._id
                    // }
                    // console.log(payload);
                    // const obj = token.GenerateToken(payload);
                    // responseResult.token = obj;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}
/**
 * @description:It handles the login data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.login = (req, res) => {
    try {
        req.checkBody('email', 'Invaild Email').isEmail();
        req.checkBody('password', 'Invaild Password').isLength({
            min: 4
        });
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            userService.login(req.body, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Login Failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult);
                } else {
                    responseResult.status = true;
                    responseResult.message = 'Login Successfully';
                    responseResult.result = result;
                    const payload = {
                        user_id: responseResult.result._id
                    }
                    console.log(payload);
                    const obj = token.GenerateToken(payload);
                    responseResult.token = obj;
                    res.status(200).send(responseResult);
                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}
/**
 * @description:It handles the forgotPassword page
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.forgotPassword = (req, res) => {
    try {
        req.checkBody('email', 'Invaild Email').isEmail();
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            return res.status(422).send(response);
        } else {
            var responseResult = {};
            userService.getUserEmail(req.body, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Failed to sent link';
                    responseResult.error = err;
                    res.status(500).send(responseResult)
                } else {
                    responseResult.status = true;
                    //responseResult.message = 'resetPassword link is sent to your registered email_Id';
                    responseResult.result = result;
                    const payload = {
                        user_id: responseResult.result._id
                    }
                    console.log("payload in cntrl=>", payload);
                    const obj = token.GenerateToken(payload);
                    const url = `http://localhost:4000/resetPassword/${obj.token}`;
                    sent.sendEMailFunction(url);
                    res.status(200).send(url);
                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}
/**
 * @description:It handles the resetPassword Page
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.resetPassword = (req, res) => {
    try {
        req.checkBody('password', 'Invaild Password').isLength({
            min: 4
        });
        var errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.status = false;
            response.error = errors;
            res.status(422).send(response);
        } else {
            var responseResult = {};
            userService.resetpassword(req, (err, result) => {
                if (err) {
                    responseResult.status = false;
                    responseResult.message = 'Password Reset failed';
                    responseResult.error = err;
                    res.status(500).send(responseResult)
                } else {
                    responseResult.status = true;
                    responseResult.message = 'Password Reset Successfully';
                    // responseResult.result = result;
                    // const payload = {
                    //     user_id: responseResult.result._id
                    // }
                    // console.log(payload);
                    // const obj = token.GenerateToken(payload);
                    // responseResult.token = obj;
                    res.status(200).send(responseResult);

                }
            })
        }
    } catch (err) {
        res.send(err);
    }
}