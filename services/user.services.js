/******************************************************************************
 *  @Purpose        : To create user services that will send the incoming data 
                    to user_model and save that data to database and at login 
                    time fetching correct information from database.
 *  @file           : user.services.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
const userModel = require('../application/models/user.models')
/**
 * @description:it will send login data to model
 * @param {*request from frontend} data 
 * @param {*response to backend} callback 
 */
exports.login = (data, callback) => {
    try {
        //  console.log("services use data:", data);
        userModel.login(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                // console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
/**
 * @description:it will send registration data to model
 * @param {*request from frontend} data 
 * @param {*response to backend} callback 
 */
exports.registration = (data, callback) => {
    try {
        userModel.registration(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                // console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
/**
 * @description:it will send forgotPassword data to model
 * @param {*request from frontend} data 
 * @param {*response to backend} callback  
 */
exports.getUserEmail = (data, callback) => {
    try {
        userModel.findUserEmail(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                // console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
/**
 * @description:it will send resetPassword data to model
 * @param {*request from frontend} data 
 * @param {*response to backend} callback 
 */
exports.resetpassword = (data, callback) => {
    try {
        userModel.updateUserPassword(data, (err, result) => {
            if (err) {
                console.log("service error");
                callback(err);
            } else {
                // console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (error) {
        callback.send(error);
    }
}
/**
 * 
 * @param {*} paramID 
 * @param {*} image 
 * @param {*} callback 
 */
exports.setProfilePic = (paramID, image, callback) => {
    console.log("in services");
    try {
        userModel.setProfilePic(paramID, image, (err, result) => {
            if (err) {
                callback(err);
            } else {
                return callback(null, result)
            }
        })
    } catch (error) {
        callback.send(error);
    }
}