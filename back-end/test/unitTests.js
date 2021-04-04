//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');


const app = require("../server") // load up the web server

// Configure chai
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));
chai.should();

