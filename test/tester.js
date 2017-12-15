var expect = require("chai").expect;
var count = 1000;

// return first digit of random string
function getRandomInt() {
  sign = Math.random()
  if(sign > .5) return parseInt(-Math.random().toString()[2])
  return parseInt(Math.random().toString()[2])
}

function multiply(x, y) {
  return x * y
}

function multiply_(x, y) {
  if(x === 0 || y === 0) return 0
  loop = Math.abs(y);
  num = Math.abs(x);
  num_ = Math.abs(x);
  for (i=1; i < loop; i++){
    num = num + num_
  }
  if((x < 0 && y < 0) || (x > 0 && y > 0)) return num
  return -Math.abs(num)
}

function run_test_random() {
  describe("test random function", function() {
    it("random num", function() {
      expect(getRandomInt()).to.be.a("number")
    })
  })
}

class Random {
  constructor() {
    this.x = getRandomInt()
    this.y = getRandomInt()
  }
}

var number

function run_test() {
  describe("testing math", function(){
    beforeEach(function(done) {
      number = new Random()
      if(typeof(number.x) !== "number") {
        console.log(`FAIL x: ${number.x}`)
        done()
      }
      else if(typeof(number.y) !== "number") {
        console.log(`FAIL y: ${number.y}`)
        done()
      }
      done()
    })
    it("test range of nums:", function(done) {
        // console.log(number)
        expected = multiply(number.x,number.y)
        actual = multiply_(number.x, number.y)
        // console.log(`${number.x} * ${number.y} = e${expected} / a${actual}`)
        expect(expected).to.equal(actual);
        done()
    })
  })
}

for(x=0; x<count; x++) {
  run_test()
}
