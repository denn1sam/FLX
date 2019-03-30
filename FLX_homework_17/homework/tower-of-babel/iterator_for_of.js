const max = +process.argv[2];
let FizzBuzz = {
  [Symbol.iterator]() {
    let num = 1;
    return {
      next() {
        if (num > max) {
          return {done: true};
        }
        let result = num;
        if (num % 3 ===0 && num % 5 ===0) {
          result = 'FizzBuzz';
        } else if (num % 3 === 0) {
          result = 'Fizz';
        } else if (num % 5 === 0) {
          result = 'Buzz';
        }
        num++;
        return {done: false, result};
      }
    }
  }
}

for (var n of FizzBuzz) {
  console.log(n);
}