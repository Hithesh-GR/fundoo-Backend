/******************************************************************************
 *  @Purpose        : To create a user schema and store data into database.
 *  @file           : user.models.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
/**
 * @description:Requiring Bcrypt to create hash of the user password stored in database
 **/
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
let saltRounds = 10;
/**
 * @description:Creating user schema using mongoose
 **/
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname required"]
    },
    lastName: {
        type: String,
        required: [true, "Lastname required"]
    },
    email: {
        type: String,
        required: [true, "Email required"]
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    profilePic: {
        type: String,
    }
}, {
        timestamps: true
    });
var user = mongoose.model('User', UserSchema);

function userModel() { }

function hash(password) {
    var pass = bcrypt.hashSync(password, saltRounds);
    return pass;
}
/**
 * @description:Saving data into database using the user schema
 * @param {*request from frontend} body 
 * @param {*response to backend} callback 
 */
userModel.prototype.registration = (body, callback) => {
    /**
     * @description:Find the user by email in database if user with same email exists
     **/
    user.find({
        "email": body.email
    }, (err, data) => {
        if (err) {
            console.log("Error in registration");
            callback(err);
        } else {
            if (data.length > 0) {
                console.log("email already exists");
                callback("User already present");
            } else {
                /**
                 * @description:Create hash value of user password
                 **/
                var newUser = new user({
                    "firstName": body.firstName,
                    "lastName": body.lastName,
                    "email": body.email,
                    "password": hash(body.password),
                    "profilePic": body.profilePic
                })
                newUser.save((err, result) => {
                    if (err) {
                        console.log("User not found");
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
 * @description:Finding user into database using the findOne()
 * @param {*request from frontend} body 
 * @param {*response to backend} callback 
 */
userModel.prototype.login = (body, callback) => {
    user.findOne({
        "email": body.email
    }, (err, result) => {
        if (err) {
            callback(err);
        } else if (result != null) {
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
 * @description:Finding user email into database using the findOne()
 * @param {*request from frontend} body 
 * @param {*response to backend} callback 
 */
userModel.prototype.findUserEmail = (data, callback) => {
    user.findOne({
        "email": data.email
    }, (err, result) => {
        if (err) {
            callback(err);
        } else {
            if (result !== null && data.email == result.email) {
                callback(null, result);
            } else {
                callback("Incorrect mail")
            }
        }
    });
}
/**
 * @description:update the user password and store it in database
 * @param {*request from frontend} body 
 * @param {*response to backend} callback 
 */
userModel.prototype.updateUserPassword = (req, callback) => {
    let newpassword = bcrypt.hashSync(req.body.password, saltRounds);
    user.updateOne({
        _id: req.decoded.payload.user_id
    }, {
            password: newpassword
        }, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
}
/**
 * @description:update the profille pic image and store it in database 
 * @param {*request from frontend} userID 
 * @param {*request from frontend} image 
 * @param {*response to backend} callback 
 */
userModel.prototype.setProfilePic = (userID, image, callback) => {
    console.log("dtaaaaaaaaa=>", userID, image);

    user.findOneAndUpdate({
        _id: userID
    }, {
            $set: {
                profilePic: image
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                console.log("updated image successfully")
                return callback(null, image)
            }
        });
};
userModel.prototype.getUserDetails = (callback) => {
    console.log("ultimate save");
    user.find({},
        {
            notes: 0, password: 0
        },
        function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
};
userModel.prototype.findByUserId = (data, callback) => {
    user.findOne({ "_id": data.decoded.payload.user_id }, { password: 0 }, (err, result) => {
        if (err) {
            callback(err);
        }
        else
            return callback(null, result);
    })
}
module.exports = new userModel();
