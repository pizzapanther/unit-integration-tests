var expect = require('chai').expect;
var nock = require('nock');
var axios = require('axios');

var api = nock("http://example.com")
  .get("/api/")
  .reply(200, {status: 'OK'});
  
describe('API', function() {
  describe('Example.com test', function() {
    it('returns OK', function(done) {
      axios.get("http://example.com/api/")
        .then(function (response) {
          expect(response.data.status).to.equal("OK");
          done();
        })
        .catch(done);
    });
  });
});