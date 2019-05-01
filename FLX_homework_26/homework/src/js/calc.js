const $result = $('#calc-input')[0];
const $log = $('.header-log')[0];
const $buttons = $('.buttons-wrap');
const $enter = $('.enter')[0];

const funcOperators = ['MC', 'M+', 'C', '='];
const operators = ['+', '-', '*', '/', '%', '.'];
let funcOper, lastOperator;

$buttons.click((e) => {
  let btn = e.target.innerText;

  if (btn >= '0' && btn <= '9') {
    addNumber(btn);
  } else {
    addOperator(btn);
  }
});

function addNumber(num) {
  $log.innerText += num;
}
function addOperator(oper) {
  funcOper = funcOperators.indexOf(oper);
  let decrement = operators.indexOf(oper);
  if (funcOper === -1 ) {
    lastOperator = $log.innerText.slice(-1);
    if (operators.indexOf(lastOperator) !== -1) {
      $log.innerText = $log.innerText.slice(0, -1);
      $log.innerText += oper;
    } else {
      $log.innerText += oper;
    }
  } else {
    switch(oper) {
      case '=':
        calc();
        break;
      case 'C':
        reset();
        break;
      case 'MC':
        MC();
        break;
      case 'M+':
        mPlus();
        break;
    }
  }
}

function calc() {
  if ($log.innerText.length > 0) {
    $result.innerText = eval($log.innerText);
  }
}

function reset() {
  $result.innerText = '';
  $log.innerText = '';
}

function mPlus() {
  if ($result.innerText > 0) {
    localStorage.setItem('calculator', $result.innerText);
  }
}

function MC() {
  let oldResult = parseFloat(localStorage.getItem('calculator'));
  if (oldResult) {
    $log.innerText += '+' + oldResult;
    $result.innerText =  eval(+$result.innerText + +oldResult);
    localStorage.removeItem('calculator');
  }
}