const _PI = 3.141592;

let _sqrt = (s, x, last) => {
  return x != last ? _sqrt(s, (x + s / x) / 2.0, x) : x;
};

const __sqrt = s => {
  return _sqrt(s, s / 2.0, 0.0);
};

const _square = x => {
  return x * x;
};

export {
  _PI as PI,
  __sqrt as sqrt,
  _square as square
};