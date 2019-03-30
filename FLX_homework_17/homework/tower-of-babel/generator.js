const max = process.argv[2];
let FizzBuzz = function* () {
  let number = 1;

  while (number <= max) {
    let result = i;
    if (result % 3 === 0 && result % 5 === 0) {
      result = 'FizzBuzz';
    } else if (result % 3 === 0) {
      result = 'Fizz';
    } else if (result % 5 === 0) {
      result = 'Buzz';
    }

    number++;
    yield result;
  }
}();

for (let n of FizzBuzz) {
  console.log(n);
}