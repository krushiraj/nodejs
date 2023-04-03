const subtract = (a, b) => a - b;

const subtractOne = subtract.bind(null, 1);

const TEN = 10;
module.exports.TEN = TEN;

module.exports = subtract;
module.exports.subtractOne = subtractOne;
