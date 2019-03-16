/******************************************************************************
 *  @Purpose        : Create authentication to change the settings or password. 
 *  @file           : authentication.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
var jwt = require('jsonwebtoken');
exports.checkTokenResetPassword = (req, res, next) => {
    //console.log("reuest===>", req.body);
    // console.log("reuest===>", req.headers);
    var token1 = req.headers['token'];
    /**
     * 
     **/
    if (token1) {
        /**
         * @description:verifies secret and checks expression
         **/
        jwt.verify(token1, 'secretkey', (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    status: false,
                    message: 'Unauthorised access, please provide valid token!'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        /**
         * @description:if there is no token return an error
         **/
        return res.send({
            status: false,
            message: 'No token provided!!'
        });
    }
}
exports.checkTokenAuth = (req, res, next) => {
   // console.log("reuest===>", req.body);
    // console.log("reuest===>", req.headers);
    var token1 = req.headers['token'];
    /**
     * 
     **/
    if (token1) {
        /**
         * @description:verifies secret and checks expression
         **/
        jwt.verify(token1, 'secretkey-auth', (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    status: false,
                    message: 'Unauthorised access, please provide valid token!'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        /**
         * @description:if there is no token return an error
         **/
        return res.send({
            status: false,
            message: 'No token provided!!'
        });
    }
}