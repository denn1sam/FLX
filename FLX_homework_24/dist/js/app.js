/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/js/game.js

let resetGameBtn = document.getElementsByClassName('reset-game')[0];
let wins = 0;
let losts = 0;
let round = 0;
let rock = 0,
    scissors = 1,
    paper = 2;

function whoWin(userMove, botMove) {
  let move = document.createElement('p');
  battleMoves.appendChild(move);
  round++;

  if (userMove != botMove) {
    if (userMove == rock && botMove == scissors) {
      wins++;
      move.innerHTML = `Round ${round},  Rock vs. Scissors, You’ve WON!`;
    } else if (userMove == rock && botMove == paper) {
      losts++;
      move.innerHTML = `Round ${round},  Rock vs. Paper, You’ve LOST!`;
    }

    if (userMove == scissors && botMove == paper) {
      wins++;
      move.innerHTML = `Round ${round},  Scissors vs. Paper, You’ve WON!`;
    } else if (userMove == scissors && botMove == rock) {
      losts++;
      move.innerHTML = `Round ${round},  Scissors vs. Rock, You’ve LOST!`;
    }

    if (userMove == paper && botMove == rock) {
      wins++;
      move.innerHTML = `Round ${round},  Paper vs. Rock, You’ve WON!`;
    } else if (userMove == paper && botMove == scissors) {
      losts++;
      move.innerHTML = `Round ${round},  Paper vs. Scissors, You’ve LOST!`;
    }
  } else {
    move.innerHTML = `Round ${round},  DROW!`;
  }

  if (round === 3) {
    resetGameBtn.classList.remove('hide');

    if (wins === losts) {
      result.innerHTML = "Game is finished. DROW!";
    }

    wins > losts ? result.innerHTML = `Game is finished. You've WON!` : result.innerHTML = `Game is finished. You've LOST!`;
  }
}

resetGameBtn.addEventListener('click', () => {
  resetGameBtn.classList.add('hide');
  round = 0;
  wins = 0;
  losts = 0;
  battleMoves.innerHTML = '';
  result.innerHTML = '';
});
function game(userMove, botMove) {
  whoWin(userMove, botMove);
}
// EXTERNAL MODULE: ./src/scss/styles.scss
var styles = __webpack_require__(0);

// CONCATENATED MODULE: ./src/js/main.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "battleMoves", function() { return battleMoves; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "result", function() { return result; });


let startGameBtn = document.getElementsByClassName('start-game')[0];
let gameElements = document.getElementsByClassName('game-elements')[0];
let battleMoves = document.getElementsByClassName('battle-moves')[0];
let result = document.getElementsByClassName('result')[0];
startGameBtn.addEventListener('click', () => {
  gameElements.classList.toggle('hide');
});
gameElements.addEventListener('click', e => {
  if (/* Cannot get final name for export "round" in "./src/js/game.js" (known exports: game, known reexports: ) */ undefined < 3) {
    let userMove = e.target.dataset.id;
    let botMove = Math.floor(Math.random() * 3);
    game(userMove, botMove);
  }
});

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map