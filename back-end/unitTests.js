process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');


const app = require("./app") // load up the web server

// Configure chai
chai.use(chaiHttp);
chai.use(require('chai-json-schema'));
chai.should();

describe("GET PASTTRIPS", () => {
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

describe("GET ITINERARY", () => {
    it("should get itinerary items", (done) => {
        chai.request(app)
            .get('/itinerary')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array');
                done();
            });
    });
});

describe("POST poll", () => {
    it("should post a poll", (done) => {
        let poll = {
            poll_name: { name: 'Flight' },
            poll_date: { date: '2021-04-16' },
            poll_message: { message: 'Which flight to pick?' },
            poll_opa: { opa: 'Delta' },
            poll_opb: { opb: 'United' },
            poll_opc: { opc: 'American' }
        }
        chai.request(app)
            .post('/createpoll')
            .send(poll)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                done();
            });
    });
});

describe("POST preferences", () => {
    it("should post preferences", (done) => {
        let pref = {
            pref_budget: { budget: '500' },
            pref_time: { time: 'Afternoon' },
            pref_length: { length: '2' },
            pref_type: { type: 'Home Stay' },
            pref_rating: { rating: '5' },
            pref_transport: { transport: 'Bus' }
        }
        chai.request(app)
            .post('/preferences')
            .send(pref)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                done();
            });
    });
});

describe("POST itinerary item", () => {
    it("should post an itinerary item", (done) => {
        let item = {
            item_name: { name: 'Leela' },
            item_time: { time: '12:30 PM' },
            item_type: { type: 'Hotel' },
            item_location: { location: 'Goa' }
        }
        chai.request(app)
            .post('/itinerary')
            .send(item)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                done();
            });
    });
});