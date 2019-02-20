// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var server = require('../server')
describe('Status and content', function () {
  describe('Main page', function () {
    it('status ', function () {
      chai.request(server)
        .post('/login')
        .send({
          "email": "hitdiv@gmail.com",
          "password": "123456"
        })
        .then( (res)=> {
          expect(res).to.have.status(200);
        })
        .catch( (err)=> {
          throw err;
        });
    })
  })
})
