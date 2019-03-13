/******************************************************************************
 *  @Purpose        : Create authentication to change the settings or password. 
 *  @file           : authentication.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
var jwt = require('jsonwebtoken');
exports.checkToken = (req, res, next) => {
    console.log("reuest===>", req.body);
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
                return res.send({
                    status: false,
                    message: 'Token is not valid..!'
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