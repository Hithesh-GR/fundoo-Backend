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
 * importing token 
 * @param {*} payload 
 */
    GenerateToken(payload) {
        const token = jwt.sign({ payload }, 'secretkey', { expiresIn: 1000}) 
        const obj = {
            success: true,
            message: 'Token Generated Successfully!!',
            token: token
        }
        return obj;
    }
}