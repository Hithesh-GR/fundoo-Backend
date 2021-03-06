/******************************************************************************
 *  @Purpose        : To create a server to connect with front end for getting 
                    request and sending response to client
 *  @file           : server.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
/**
 *  @description:To give path to each file
 **/
const userRouter = require('./routes/user.routes');
const noteRouter = require('./routes/note.routes');
/**
 * @description:express module is one of the light weight framework
 */
const express = require('express');
/**
 * @description:Parse the JSON request body
 **/
var bodyParser = require('body-parser');
/**
 * @description:create express app
 */
const app = express();
/**
 * @description:use for validation
 */
var expressValidator = require('express-validator')
app.use(expressValidator());
/**
 * @description:To get the path of database
 **/
const databaseConfig = require('./configuration/db.configuration');
/**
 * @description:.env is used for 
 */
require('dotenv').config();
const mongoose = require('mongoose');
/**
 * @description:to connect server
 */
require('http').createServer(app);
app.use(bodyParser.urlencoded({
    extended: true
}))
/**
 * @description:parse requests of content-type - application/json
 **/
app.use(bodyParser.json())
app.use('/', userRouter);
app.use('/', noteRouter);
/**
 *  @description:Configuring the database
 **/
mongoose.Promise = global.Promise;
/**
 * @description:Connecting to the database
 **/
mongoose.connect(databaseConfig.url, {
    useNewUrlParser: true
}).then(() => {
    /**
     * @description:Promise is fullfilled
     **/
    console.log("Successfully connected to the database");
}).catch(err => {
    /**
     * @description:Promise is rejected
     **/
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
/**
 * @description:define a simple route
 **/
app.get('/', (req, res) => {
    res.json("Message: Welcome to fundoo Notes App");
});
/**
 * @description:listen for requests
 */
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
module.exports = app;