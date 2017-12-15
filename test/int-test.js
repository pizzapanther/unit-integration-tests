var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var main_app = require('../app');

describe('Express App', function() {
  describe('Hompage', function() {
    afterEach(function (done) {
      main_app.pgp.end();
      main_app.server.close(done);
      console.log('closed');
    });
    
    it('contains hello world', function(done) {
      chai.request(main_app.server)
        .get('/')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.text).to.include('Hello World');
          done();
        });
    });
  });
});

