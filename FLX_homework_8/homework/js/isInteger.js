function isInteger(value) {
    if (typeof value === 'number') {
        return value % 1 === 0;
    }
}
isInteger(5);
isInteger(5.1);