//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { expect, assert } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');


const app = require("../server") // load up the web server

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

/*
let email = 'aa@aa.com';
let password = 'test';

describe('GET LOGIN INFO', function () {
  it('should output the logged in user', async() => {
    const response = await chai.request(app).post('/api/login')
    .send({
      email: 'aa@aa.com',
      password: 'test'
    }).end(function(err, res) {
      if (err) {
        throw err;
      }
      assert.ok(res);
      assert.ok(res.body);
      assert.equal(res.status, 200);
      done();
    });
    //expect(response.body).to.be.an('object');
    //expect(response.body.data).to.have.property('email');
    //expect(response.body.data).to.have.property('password');
  });
});
*/

const delay = require('delay');

describe("GET LOGIN INFO", () => {
  // Test to get all students record
    it("should get user info", async () => {
      chai.request(app)
          .post('/api/login')
          .send({email: "aa@aa.com", password:'test'})
          .end((err, res) => {  
            res.body.should.be.an('object');
            done();
           });
      await delay(1000)
    });
});