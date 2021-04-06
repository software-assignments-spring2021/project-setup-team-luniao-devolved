//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { expect, assert } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');

const app = require("../server") // load up the web server

const request = require('request');

// Configure chai
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));
chai.should();

describe("GET PAST TRIPS", () => {
    // Test to get all students record
    it("should get past trips", (done) => {
         chai.request(app)
             .get('/api/pasttrips')
             .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                done();
              });
     });
});

/* unit test for /api/login */
describe("GET LOGIN INFO", () => {
  it("should send an object with status 200", (done) => {
    const obj = {email: 'aa@aa.com', password:'test'};
    chai.request(app)
    .post('/api/login')
    .send(obj)
    .end((err,res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('email');
      res.body.should.have.property('password');
      done();
    });
  });

  it("should send an email and password", (done) => {
    const obj = {email: 'aa@aa.com', password:'test'};
    chai.request(app)
    .post('/api/login')
    .send(obj)
    .end((err,res) => {
      res.body.should.have.property('email');
      res.body.should.have.property('password');
      done();
    });
  });
});
