function pipe(number,...args){
    for (var i = 0; i < args.length; i ++) {
        var argFunc = args[i](number);
        number = argFunc;
    }
    return number;
}

console.log(pipe(1, addOne));
console.log(pipe(1, addOne, addOne));

function addOne(value) {
    return value + 1;
}