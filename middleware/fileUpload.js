/********************************************************************************************
 *  @Purpose        : Uploading images through aws-s3 bucket 
 *  @file           : fileUpload.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 01-04-2019
 ********************************************************************************************/
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();
/**
 * @description: Providing AWS security credintials keys using dotenv method
 */
const s3 = new aws.S3({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: 'us-east-2'
});
/**
 * @description:Filtering image file by extensions
 * @param {*request from frontend} req 
 * @param {*request from frontend} file 
 * @param {*response to backend} callback 
 */
const fileFilter = (req, file, callback) => {
   // console.log("request --------",req);
    console.log("file---------",file);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true)
    } else {
        callback(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
}
/**
 * @description:Uploading image to AWS s3 bucket
 */
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: 'fundoonote',
        acl: 'public-read',
        metadata: function (req, file, callback) {
            callback(null, {
                fieldName: 'TESTING_META_DATA!'
            });
        },
        key: function (req, file, callback) {
            callback(null, Date.now().toString())
        }
    })
})
module.exports = upload;