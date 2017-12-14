var lodash = require('lodash');

var array = ['a', 'b', 'c', 'd'];

function julie(array){
  console.log(lodash.chunk(array, [size=2]));
  console.log(lodash.shuffle(array));
  console.log(lodash.random(1,100, false));
  return lodash.last(array)
}

exports.julie = julie;
