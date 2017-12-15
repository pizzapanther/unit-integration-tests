var expect = require('chai').expect;

var math_stuff = require('../math_stuff');

describe('Awesome math stuff', function () {
  it('2 + 2 = 4', function () {
    expect(4).to.equal(math_stuff.add(2, 2));
    expect(5).to.equal(math_stuff.add(2, 3));
  });
});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('return -1 when value is not present', function() {
      expect(-1).to.equal([1,2,3].indexOf(4));
    });
    
    it('return index when value is present', function() {
      expect(0).to.equal([1,2,3].indexOf(1));
    });
  });
});


