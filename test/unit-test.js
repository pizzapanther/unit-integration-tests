var expect = require('chai').expect;
var lodash = require('../lodash')

describe('Array', function() {
  it('returns d', function(){
    expect('d').to.equal(lodash.julie(['a', 'b', 'c', 'd']));
  })
});
