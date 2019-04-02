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
const express = require('express');
const responseTime = require('response-time')
const redis = require('redis');
/**
 * @description:It handles the registration data
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.registration = (req, res) => {
    try {
        req.checkBody('firstName', 'Invaild Firstname').isLength({
            min: 3
        }).isAlpha();
        req.checkBody('lastName', 'Invaild Lastname').isLength({
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
                    // const obj = token.GenerateTokenAuth(payload);
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
            const app = express();
            // create and connect redis client to local instance.
            const client = redis.createClient();
            // Print redis errors to the console
            client.on('error', (err) => {
                console.log("Error " + err);
            });
            app.use(responseTime());
            // Extract the query from url and trim trailing spaces
            // const query = (req.body.email+req.body._id).trim();
            // Build the Wikipedia API url
            const redisKey = req.body.email;
            // Try fetching the result from Redis first in case we have it cached
            return client.get(redisKey, (err, result) => {
                // If that key exist in Redis store
                // console.log("result==>", result);
                if (result) {
                    console.log('inside if ===>' + result);
                    const resultJSON = JSON.parse(result);
                    return res.status(200).send(resultJSON);
                } else {
                    var responseResult = {};
                    userService.login(req.body, (err, result) => {
                        console.log("loggggggggggggggg=>",result);
                        
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
                                user_id: result._id,
                                username: result.firstName,
                                email: result.email,
                                sucess: true
                            }
                            console.log(payload);
                            const obj = token.GenerateTokenAuth(payload);
                            responseResult.token = obj;
                            const redisKey = result.email;
                            console.log("rediskey", redisKey);
                            client.setex(redisKey, 36000, JSON.stringify(responseResult.token.token));
                            res.status(200).send(responseResult.token.token);
                        }
                    })
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
                    const obj = token.GenerateTokenResetPassword(payload);
                    const url = `http://localhost:3000/resetPassword/${obj.token}`;
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
                    responseResult.result = result;
                    const payload = {
                        user_id: responseResult.result._id
                    }
                    console.log(payload);
                    const obj = token.GenerateTokenAuth(payload);
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
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.setProfilePic = (req, res) => {
    try {
        var responseResult = {};
        userId = req.decoded._id;
        let image = (req.file.location)
        userService.setProfilePic(userId, image, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            } else {
                responseResult.status = true;
                responseResult.data = result;
                res.status(200).send(responseResult);
            }
        })
    } catch (error) {
        res.send(error);
    }
}