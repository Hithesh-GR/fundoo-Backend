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
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.registration = (req, res) => {
    try {
        var responseResult = {}
        userService.registration(req.body, (err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.message = 'Registration Failed';
                responseResult.error = err;
                res.status(500).send(responseResult);
            }
            else {
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
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
    try {
        var responseResult = {};
        userService.login(req.body, (err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.message = 'Login Failed';
                responseResult.error = err;
                res.status(500).send(responseResult);
            }
            else {
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
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.forgotPassword = (req, res) => {
    try {
        var responseResult = {};
        userService.getUserEmail(req.body, (err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.message = 'Failed to sent link';
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.status = true;
                responseResult.message = 'resetPassword link is sent to your registered email_Id';
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
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.resetPassword = (req, res) => {
    try {
        var responseResult = {};
        userService.resetpassword(req, (err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.message = 'Password Reset failed';
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.status = true;
                responseResult.message = 'Password Reset Successfully';
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
    } catch (err) {
        res.send(err);
    }
}/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = (req, res) => {
    try {
        var responseResult = {}
        userService.getAllUsers((err, result) => {
            if (err) {
                responseResult.status = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.status = true;
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (err) {
        res.send(err);
    }
}