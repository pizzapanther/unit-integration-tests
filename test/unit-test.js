var expect = require('chai').expect;

var app = require('../app');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('return -1 when value is not present', function() {
      expect(-1).to.equal([1,2,3].indexOf(4));
    });
    it('return index when value ispresent', function() {
      expect(0).to.equal([1,2,3].indexOf(1));
    });
  });
});

describe('Password', function() {
  afterEach(function (done) {
    app.server.close(done);
  });
  
  it('hash generated correctly', function(done) {
    var hash = app.create_hash('1234');
    expect(hash).to.include('pbkdf2_sha256$36000$');
    done();
  });
});
