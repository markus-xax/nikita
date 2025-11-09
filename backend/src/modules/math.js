function sum(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function average(numbers = []) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }
  const total = numbers.reduce((acc, value) => acc + Number(value), 0);
  return total / numbers.length;
}

module.exports = {
  sum,
  subtract,
  multiply,
  average,
};

