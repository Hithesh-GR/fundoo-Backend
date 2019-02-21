/******************************************************************************************
 *  @Purpose        : Here we have to write the test scripts in Mocha for testing backend 
                    using the tool chai.
 *  @file           : test.js        
 *  @author         : HITHESH G R
 *  @version        : v0.1
 *  @since          : 19-02-2019
 *******************************************************************************************/
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var server = require('../server')
var fs = require('fs');

function readFile() {
  /**
   * read file from json
   */
  var data = fs.readFileSync('../server/test/test1.json');
  var data1 = JSON.parse(data);
  return data1;
}
/**
 * test script for registration 
 */
describe('Status and content', function () {
  describe('Registration page', function () {
    var data1 = readFile();
    it('status ', function () {
      chai.request(server)
        .post('/registration')
        .send(data1.registrationData)
        .then((res) => {
          //console.log("expect ==>", expect(res).to.have.status(200));
          expect(res).to.have.status(200);
        })
        .catch((err) => {
          throw err;
        });
    })
  })
  /**
   * test script for login
   */
  describe('Login page', function () {
    var data1 = readFile();
    it('status ', function () {
      chai.request(server)
        .post('/login')
        .send(data1.loginData)
        .then((res) => {
          //console.log("expect ==>", expect(res).to.have.status(200));
          expect(res).to.have.status(200);
        })
        .catch((err) => {
          throw err;
        });
    })
    /**
     * test script for forgot password
     */
    describe('Forgot Password page', function () {
      var data1 = readFile();
      it('status ', function () {
        chai.request(server)
          .post('/forgotPassword')
          .send(data1.forgotData)
          .then((res) => {
            //console.log("expect ==>", expect(res).to.have.status(200));
            expect(res).to.have.status(200);
          })
          .catch((err) => {
            throw err;
          });
      })
    })
    /**
     * test script for reset password
     */
    describe('Reset Password page', function () {
      var data1 = readFile();
      it('status ', function () {
        chai.request(server)
          .post('/resetPassword/:token')
          .send(data1.resetData)
          .then((res) => {
            //console.log("expect ==>", expect(res).to.have.status(200));
            expect(res).to.have.status(200);
          })
          .catch((err) => {
            throw err;
          });
      })
    })
  })
})