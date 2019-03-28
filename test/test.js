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
   * @description:read file from json
   */
  var data = fs.readFileSync('../server/test/test1.json');
  var data1 = JSON.parse(data);
  return data1;
}
/**
 * @description:test script for registration 
 */
describe('Status and content', function () {
  describe('Registration page', function () {
    var data1 = readFile();
    it('status ', function (done) {
      chai.request(server).post('/registration').send(data1.registration).end((err, res) => {
        if (err) {
          console.log("expect ==>", err);
          err.should.have.status(500);
        } else {
          console.log("expect ==>", res.body);
          res.should.have.status(200);
          /**
           * @description:test script for login
           */
          describe('Login page', function () {
            it('status ', function (done) {
              chai.request(server).post('/login').send(data1.login).end((err, res) => {
                if (err) {
                  console.log("expect ==>", err);
                } else {
                  console.log("expect ==>", res.body);
                  res.should.have.status(200);
                  /**
                   * @description:test script for forgot password
                   */
                  describe('Forgot Password page', function () {
                    it('status ', function (done) {
                      chai.request(server).post('/forgotPassword').send(data1.forgot).end((err, res) => {
                        if (err) {
                          console.log("expect ==>", err);
                        } else {
                          console.log("expect ==>", res.body);
                          res.should.have.status(200);
                          /**
                           * @description:test script for reset password
                           */
                          describe('Reset Password page', function () {
                            it('status ', function (done) {
                              chai.request(server).post('/resetPassword/:token').send(data1.reset).end((err, res) => {
                                if (err) {
                                  console.log("expect ==>", err);
                                } else {
                                  console.log("expect ==>", res.body);
                                  res.should.have.status(200);
                                  /**
                                   * @description:test script for create a new note
                                   */
                                  describe('Create new note', function () {
                                    it('status ', function (done) {
                                      chai.request(server).post('/createNote').send(data1.createNote).end((err, res) => {
                                        if (err) {
                                          console.log("expect ==>", err);
                                        } else {
                                          console.log("expect ==>", res.body);
                                          res.should.have.status(200);
                                          /**
                                           * @description:test script for get a newly created note
                                           */
                                          describe('get all created notes', function () {
                                            it('status ', function (done) {
                                              chai.request(server).get('/getNotes').send(data1.getNotes).end((err, res) => {
                                                if (err) {
                                                  console.log("expect ==>", err);
                                                } else {
                                                  console.log("expect ==>", res.body);
                                                  res.should.have.status(200);
                                                  /**
                                                   * @description:test script for updating the color to note
                                                   */
                                                  describe('update the color to note', function () {
                                                    it('status ', function (done) {
                                                      chai.request(server).put('/updateColor').send(data1.updateColor).end((err, res) => {
                                                        if (err) {
                                                          console.log("expect ==>", err);
                                                        } else {
                                                          console.log("expect ==>", res.body);
                                                          res.should.have.status(200);
                                                          /**
                                                           * @description:test script for delete the note 
                                                           */
                                                          describe('delete the note', function () {
                                                            it('status ', function (done) {
                                                              chai.request(server).post('/deleteNote').send(data1.deleteNote).end((err, res) => {
                                                                if (err) {
                                                                  console.log("expect ==>", err);
                                                                } else {
                                                                  console.log("expect ==>", res.body);
                                                                  res.should.have.status(200);
                                                                  /**
                                                                   * @description:test script for archive the note 
                                                                   */
                                                                  describe('archive the note', function () {
                                                                    it('status ', function (done) {
                                                                      chai.request(server).put('/isArchived').send(data1.isArchived).end((err, res) => {
                                                                        if (err) {
                                                                          console.log("expect ==>", err);
                                                                        } else {
                                                                          console.log("expect ==>", res.body);
                                                                          res.should.have.status(200);
                                                                          /**
                                                                           * @description:test script for trash the note 
                                                                           */
                                                                          describe('trash the note', function () {
                                                                            it('status ', function (done) {
                                                                              chai.request(server).put('/isTrashed').send(data1.isTrashed).end((err, res) => {
                                                                                if (err) {
                                                                                  console.log("expect ==>", err);
                                                                                } else {
                                                                                  console.log("expect ==>", res.body);
                                                                                  res.should.have.status(200);
                                                                                  /**
                                                                                   * @description:test script for reminder the note 
                                                                                   */
                                                                                  describe('add reminder to note', function () {
                                                                                    it('status ', function (done) {
                                                                                      chai.request(server).put('/reminder').send(data1.reminder).end((err, res) => {
                                                                                        if (err) {
                                                                                          console.log("expect ==>", err);
                                                                                        } else {
                                                                                          console.log("expect ==>", res.body);
                                                                                          res.should.have.status(200);
                                                                                          /**
                                                                                           * @description:test script for edit title to  note 
                                                                                           */
                                                                                          describe('edit title to note', function () {
                                                                                            it('status ', function (done) {
                                                                                              chai.request(server).put('/editTitle').send(data1.editTitle).end((err, res) => {
                                                                                                if (err) {
                                                                                                  console.log("expect ==>", err);
                                                                                                } else {
                                                                                                  console.log("expect ==>", res.body);
                                                                                                  res.should.have.status(200);
                                                                                                  /**
                                                                                                   * @description:test script for edit description to note 
                                                                                                   */
                                                                                                  describe('edit description to note', function () {
                                                                                                    it('status ', function (done) {
                                                                                                      chai.request(server).put('/editDescription').send(data1.editDescription).end((err, res) => {
                                                                                                        if (err) {
                                                                                                          console.log("expect ==>", err);
                                                                                                        } else {
                                                                                                          console.log("expect ==>", res.body);
                                                                                                          res.should.have.status(200);
                                                                                                          /**
                                                                                                           * @description:test script for pinned and unpinned to note 
                                                                                                           */
                                                                                                          describe('pinned and unpinned to note', function () {
                                                                                                            it('status ', function (done) {
                                                                                                              chai.request(server).put('/isPinned').send(data1.isPinned).end((err, res) => {
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

// import chaiJsonSchema from 'chai-json-schema';
// chai.use(chaiJsonSchema);
// var chai = require('chai');
// chai.use(require('chai-json-schema'));
// var registration = {
//     firstname: "lol",
//     lastname: "ror",
//     email: "777@gmail.com",
//     password: 2345678
// };
// var login = {
//     email: "777@gmail.com",
//     password: 2345678
// };
// var forgot = {
//     email: "777@gmail.com"
// };
//     var reset = {
//     password: 777698547,
//     headers: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOiI1YzZmZDRjY2YxZmNjMjQyNDY1Y2MxMTQifSwiaWF0IjoxNTUwODMyODU0LCJleHAiOjE1NTA5MTkyNTR9.vvlTpFNaIK60UVxpFRmRNqJviX4A9F0ZsDf2EaPqpno"
// }