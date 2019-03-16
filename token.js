/******************************************************************************
 *  @Purpose        : Method is used to generate tokens
 *  @file           : token.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 ******************************************************************************/
const jwt = require('jsonwebtoken');
module.exports = {
    /**
     * @description:exporting token 
     * @param {*it contains unique ID} payload 
     */
    GenerateTokenResetPassword(payload) {
        const token = jwt.sign({
            payload
        }, 'secretkey', {
            expiresIn: '1D'
        })
        const obj = {
            status: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    },
     /**
     * @description:exporting token 
     * @param {*it contains unique ID} payload 
     */
    GenerateTokenAuth(payload) {
        const token = jwt.sign({   payload  }, 'secretkey-auth', {
            expiresIn: '1D'
        })
        const obj = {
            status: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    }
}
