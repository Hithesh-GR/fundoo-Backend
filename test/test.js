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
chai.should();
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
    it('status ', function (done) {
      chai.request(server)
        .post('/registration')
        .send(data1.registration)
        .end((err, res) => {
          if (err) {
            console.log("expect ==>", err);
            err.should.have.status(500);
          } else {
            console.log("expect ==>", res.body);
            res.should.have.status(200);
            /**
             * test script for login
             */
            describe('Login page', function () {
              it('status ', function (done) {
                chai.request(server)
                  .post('/login')
                  .send(data1.login)
                  .end((err, res) => {
                    if (err) {
                      console.log("expect ==>", err);
                    } else {
                      console.log("expect ==>", res.body);
                      res.should.have.status(200);
                      /**
                       * test script for forgot password
                       */
                      describe('Forgot Password page', function () {
                        it('status ', function (done) {
                          chai.request(server)
                            .post('/forgotPassword')
                            .send(data1.forgot)
                            .end((err, res) => {
                              if (err) {
                                console.log("expect ==>", err);
                              } else {
                                console.log("expect ==>", res.body);
                                res.should.have.status(200);
                                /**
                                 * test script for reset password
                                 */
                                describe('Reset Password page', function () {
                                  it('status ', function (done) {
                                    chai.request(server)
                                      .post('/resetPassword/:token')
                                      .send(data1.reset)
                                      .end((err, res) => {
                                        if (err) {
                                          console.log("expect ==>", err);
                                        } else {
                                          console.log("expect ==>", res.body);
                                          res.should.have.status(200);
                                        }
                                        done()
                                      })
                                  })
                                })
                              }
                              done()
                            })
                        })
                      })
                    }
                    done()
                  })
              })
            })
          }
          done()
        })
    })
  })
})