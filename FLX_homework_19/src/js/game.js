function game(userMove, botMove) {
	whoWin(userMove, botMove);
}

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