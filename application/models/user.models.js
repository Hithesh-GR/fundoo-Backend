/******************************************************************************
 *  @Purpose        : To create a user schema and store data into database.
 *  @file           : user.models.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
/**
 * Requiring Bcrypt to create hash of the user password stored in database
 **/
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let saltRounds = 10;
/**
 * Creating user schema using mongoose
 **/
const UserSchema = mongoose.Schema({
    firstname: {
        type: String, require: [true, "firstname require"]
    },
    lastname: {
        type: String, require: [true, "lastname require"]
    },
    email: {
        type: String, require: [true, "email require"]
    },
    password: {
        type: String, require: [true, "password require"]
    },
    });
var user = mongoose.model('User', UserSchema);
function userModel() { }
/**
 * Saving data into database using the user schema
 **/
userModel.prototype.registration = (body, callback) => {
    /**
     * Find the user by email in database if user with same email exists
     **/
    user.find({ "email": body.email }, (err, data) => {
        if (err) {
            console.log("Error in registration");
            callback(err);
        }
        else {
            if (data > 0) {
                console.log("email already exists");
                callback("User already present");
            }
            else {
                /**
                 * Create hash value of user password
                 **/
                body.password = bcrypt.hashSync(body.password, saltRounds);
                var newUser = new user({
                    "firstname": body.firstname,
                    "lastname": body.lastname,
                    "email": body.email,
                    "password": body.password,
                })
                newUser.save((err, result) => {
                    if (err) {
                        console.log("Model not found");
                        callback(err);
                    } else {
                        console.log("Registered Successfully");
                        callback(null, result);
                    }
                })
            }
        }
    });
}
/**
 * Finding user into database using the findOne()
 **/
userModel.prototype.login = (body, callback) => {
    console.log("model ", body.password);
    user.findOne({ "email": body.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else if (result != null) {
            bcrypt.compare(body.password, result.password).then(function (res) {
                if (res) {
                    console.log("Login Succesfully");
                    callback(null, result);
                } else {
                    console.log("Login Failed");
                    callback("Incorrect password");
                }
            });
        } else {
            console.log("Login Failed");
            callback("Invalid user");
        }
    });
}
/**
 * update the user password and store it in database
 */
userModel.prototype.updateUserPassword = (req, callback) => {
    console.log("request===>", req.decoded);
    let newpassword = bcrypt.hashSync(req.body.password, saltRounds);
    console.log('new pass bcrypt--', newpassword);
    user.updateOne({ _id: req.decoded.payload.user_id }, { password: newpassword }, (err, result) => {
        console.log("result ==>", result.newpassword)
        if (err) {
            callback(err);
        }
        else {
            console.log("result ==>", result);
            callback(null, result);
        }
    });
}
/**
 * Finding user email into database using the findOne()
 */
userModel.prototype.findUserEmail = (data, callback) => {
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null && data.email == result.email) {
                callback(null, result);
            }
            else {
                callback("Incorrect mail")
            }
        }
    });
}
/**
 * get all users into the database using find()
 */
userModel.prototype.getAllUsers = (callback) => {
    user.find({}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}
module.exports = new userModel();
