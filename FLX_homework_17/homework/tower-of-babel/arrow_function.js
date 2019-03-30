let inputs = process.argv.slice(2);
let result = inputs.map(input => input[0])
  .reduce((pre, cur) => pre + cur);
  
console.log(result);