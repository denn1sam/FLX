let results;

enterValue();

function enterValue() {
    const a = parseFloat(prompt('Please, enter value a'));
    const b = parseFloat(prompt('Please, enter value b'));
    const c = parseFloat(prompt('Please, enter value c'));

    if (a && b && c !== 'NaN') {
        findDiscriminantAndRoot(a, b, c);
    } else {
        results = 'Invalid input data';
        showResults(results);
    }
}

function findDiscriminantAndRoot(a, b, c) {
    let discriminant = b*b - 4 * a * c;

    if (discriminant === 0) {
        let x = -b/(2 * a);
        results = 'x = ' + x;
    } else if (discriminant > 0) {
        let x1 = (-1 * b + Math.sqrt(discriminant))/(2 * a);
        let x2 = (-1 * b - Math.sqrt(discriminant))/(2 * a);
        results = 'x1 = ' + +x1.toFixed(2) + ' and x2 = ' + +x2.toFixed(2);
    } else {
        results = 'no solution';
    }
    showResults(results);
}

function showResults(results) {
    alert(results);
}