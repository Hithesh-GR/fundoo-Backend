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
            // } else {
            //     const app = express();
            //     // create and connect redis client to local instance.
            //     const client = redis.createClient();
            //     // Print redis errors to the console
            //     client.on('error', (err) => {
            //         console.log("Error " + err);
            //     });
            //     app.use(responseTime());
            //     // Extract the query from url and trim trailing spaces
            //     // const query = (req.body.email+req.body._id).trim();
            //     // Build the Wikipedia API url
            //     const redisKey = req.body.email;
            //     // Try fetching the result from Redis first in case we have it cached
            //     return client.get(redisKey, (err, result) => {
            //         // If that key exist in Redis store
            //         // console.log("result==>", result);
            //         if (result) {
            //             console.log('inside if ===>' + result);
            //             const resultJSON = JSON.parse(result);
            //             return res.status(200).send(resultJSON);
        } else {
            var responseResult = {};
            userService.login(req.body, (err, result) => {
                console.log("login enter====================>",result);
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
                        profilePic: result.profilePic,
                        sucess: true
                    }
                    console.log(payload);
                    const obj = token.GenerateTokenAuth(payload);
                    responseResult.token = obj;
                    //const redisKey = result.email;
                    // console.log("rediskey", redisKey);
                    // client.setex(redisKey, 36000, JSON.stringify(responseResult.token.token));
                    res.status(200).send(responseResult.token.token);
                }
            })
        }
        //     })
        // }
    } catch (err) {
        res.send(err);
    }
}
/**
 * @description:redis cache implemented for user login
 */
// const responseTime = require('response-time')
// const redis = require('redis');
// const bcrypt = require('bcrypt');
// const express = require('express');
// const app = express();
// var jwt = require('jsonwebtoken');
// const client = redis.createClient();
// // Print redis errors to the console
// client.on('error', (err) => {
//     console.log("Error " + err);
// });
// app.use(responseTime());
// /**
//  * @description:It handles the login data
//  * @param {*request from frontend} req 
//  * @param {*response from backend} res 
//  */
// exports.login = (req, res) => {
//     console.log("request in req", req.body);
//     try {
//         req.checkBody('email', 'Email is not valid').isEmail();
//         req.checkBody('password', 'password is not valid').isLength({ min: 4 })
//         var errors = req.validationErrors();
//         var response = {};
//         if (errors) {
//             response.sucess = false;
//             response.error = errors;
//             res.status(422).send(response);
//         }
//         else {
//             // create and connect redis client to local instance.
//             // Extract the query from url and trim trailing spaces
//             // const query = (req.body.email+req.body._id).trim();
//             // Build the Wikipedia API url
//             const redisKey = req.body.email + req.body.userId;
//             console.log("rediskey from front", redisKey);
//             // Try fetching the result from Redis first in case we have it cached
//             return client.get(redisKey, (err, result) => {
//                 // If that key exist in Redis store
//                 console.log("result==>", result);

//                 console.log("redis cacheee entered first");
//                 if (result) {

//                     const resultJSON = JSON.parse(result);
//                     // console.log("resultJSON==>",resultJSON);
//                     jwt.verify(resultJSON, 'secretkey-auth', (err, decoded) => {
//                         if (err) {
//                             console.log("token invalid--->", err);
//                         }
//                         else {
//                             bcrypt.compare(req.body.password, decoded.payload.password)
//                                 .then(function (res1) {
//                                     if (res1) {
//                                         console.log("redis cacheee entered");
//                                         console.log('redis cache data ==>' + result);
//                                         const resultJSON = JSON.parse(result);
//                                         return res.status(200).send(resultJSON);
//                                     }
//                                     else {
//                                         var responseResult = {}
//                                         /**
//                                         * @description:pass the request data to sevices....
//                                         */
//                                         console.log("Incorrect password in redis");
//                                         responseResult.sucess = false;
//                                         responseResult.result = "Incorrect password";
//                                         res.status(500).send(responseResult);

//                                     }
//                                 })
//                         }
//                     })
//                 }
//                 else {
//                     var responseResult = {}
//                     /**
//                     * @description:pass the request data to sevices....
//                     */
//                     userService.login(req.body, (err, result) => {
//                         if (err) {
//                             responseResult.sucess = false;
//                             responseResult.result = err;
//                             res.status(500).send(responseResult);
//                         }
//                         else {
//                             const payload = {
//                                 user_id: result._id,
//                                 username: result.firstName,
//                                 email: result.email,
//                                 profilePic: result.profilePic,
//                                 password: result.password,
//                                 sucess: true
//                             }
//                             const obj = token.GenerateTokenAuth(payload);
//                             console.log("object in controler==>", obj);
//                             console.log("result", result);
//                             responseResult.token = obj;
//                             // const redisKey = 'email_'+responce._id;
//                             // client.set(redisKey, 86400, JSON.stringify(responce));
//                             const redisKey1 = result.email + result._id;
//                             console.log("rediskey", redisKey1);
//                             // console.log("rediskey-------------------------------------------");
//                             //client.set(redisKey, 86400, query);
//                             client.setex(redisKey1, 3600, JSON.stringify(responseResult.token.token));
//                             return res.status(200).send(responseResult.token.token);
//                         }
//                     })
//                 }
//             });
//         }
//     }
//     catch (err) {
//         console.log("error in controller :", err);
//     }
// }
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
 * @description:It handles the setting an profile pic image
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.setProfilePic = (req, res) => {
    try {
        // console.log("req-------------------->",req.decoded);
        // console.log("req-------------------->",req.file.location)
        var responseResult = {};
        userId = req.decoded.payload.user_id;
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
/**
 * @description:It handles the setting an profile pic image
 * @param {*request from frontend} req 
 * @param {*response from backend} res 
 */
exports.setProfilePic1 = (req, res) => {
    try {
        var responseResult = {};
        //  userId = req.decoded.payload.user_id;
        let image = (req.file.location)
        // userService.setProfilePic1(userId, image, (err, result) => {
        // if (err) {
        //     responseResult.success = false;
        //     responseResult.error = err;
        //     res.status(500).send(responseResult)
        // } else {
        responseResult.status = true;
        responseResult.data = image;
        res.status(200).send(responseResult);
        // }
    } catch (error) {
        res.send(error);
    }
}
// /**
//  * @description:It handles the logout
//  * @param {*request from frontend} req 
//  * @param {*response from backend} res 
//  */
// exports.logout = (req, res) => {
//     console.log("req in logout-->", req.body);
//     const redisKey = req.body.email + req.body.userId;
//     client.del(redisKey, (err, response) => {
//         if (response == 1) {
//             console.log("Deleted Successfully!")
//             res.status(200).send("Deleted Successfully!");
//         } else {
//             console.log("Cannot delete")
//             res.status(500).send("Cannot delete");
//         }
//     })
// }
