function Bot(data) { 
  //Solve the challenge here and pass all the tests
}
Bot.prototype.generateHash = function() {
}

// Convert the number into scientific notation with 16 digits after "."
// If power of e is greater than 20, get the number between "." and "e"
// Else return the number itself
function scientificNotation(num) {
  var data = parseInt(num).toExponential(16);
  result = (data.toString().split("e+")[1] > 20) ? data : parseInt(num)
  return result
}

}

module.exports = Bot;
