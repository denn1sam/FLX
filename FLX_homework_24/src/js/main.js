import {
	game,
	round} from './game';

import '../scss/styles.scss';

let startGameBtn = document.getElementsByClassName('start-game')[0];
let gameElements = document.getElementsByClassName('game-elements')[0];
export let resetGameBtn = document.getElementsByClassName('reset-game')[0];
export let battleMoves = document.getElementsByClassName('battle-moves')[0];
export let result = document.getElementsByClassName('result')[0];

startGameBtn.addEventListener('click', () => {
  gameElements.classList.toggle('hide');
});

gameElements.addEventListener('click', (e) => {
	if (round < 3) {
		let userMove = e.target.dataset.id;
		let botMove = Math.floor(Math.random() * 3);
	
		game(userMove, botMove);
	}
});

resetGameBtn.addEventListener('click', () => {
	resetGameBtn.classList.add('hide');
	round = 0;
	wins = 0;
	losts = 0;
	battleMoves.innerHTML = '';
	result.innerHTML = '';
});