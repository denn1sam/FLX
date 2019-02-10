function reverseNumber(r) {
    const reversed = r
    .toString()
    .split('')
    .reverse()
    .join('')
    return parseInt(reversed) * Math.sign(r);
}
reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);