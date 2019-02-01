let results;

enterValue();

function enterValue() {
    const moneySum = parseFloat(prompt('Please enter amount of money'));
    const discount = parseFloat(prompt('Please enter the discount'));

    if (moneySum >= 0 && moneySum <= 9999999 && discount >= 0 && discount <= 99) {
        showPrice(moneySum, discount);
    } else {
        results = 'Invalid input data';
        showResults(results);
    }
}

function showPrice(moneySum, discount) {
    let priceWithDiscount = moneySum - moneySum * discount / 100;
    let saved = moneySum - priceWithDiscount;

    results = 'Prise without discount: ' + +moneySum.toFixed(2) +
    '\nDiscount: ' + +discount.toFixed(2) +
    '% \nPrice with discount: ' + +priceWithDiscount.toFixed(2) +
    '\nSaved: ' + +saved.toFixed(2);

    showResults(results);
}

function showResults(results) {
    alert(results);
}