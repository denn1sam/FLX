if (confirm(`Do you want to play a game?`)) {
	let rangeCof = 2;
	let maxAttempts = 3;
	let prizeCof = 3;
	let userNum, prizeForStroke, secretNum, attempt;
	do {
		let prizeMax = 10;
		let prizeTotal = 0;
		let maxRange = 5;
		do {
			secretNum = Math.round(Math.random() * maxRange);
			attempt = maxAttempts;
			for (attempt; attempt > 0; attempt--) {
				prizeForStroke = Math.floor(prizeMax / Math.pow(2, maxAttempts - attempt));
				userNum = parseInt(prompt(
					`Enter a number from 0 to ${maxRange}\n` +
					`Attempts left: ${attempt}\n` +
					`Total prize: ${prizeTotal}$\n` +
					`Possible prize on current attempt: ${prizeForStroke}$`
				));
				if (userNum === secretNum) {
					prizeTotal += prizeForStroke;
					prizeMax *= prizeCof;
					maxRange *= rangeCof;
					break;
				}
			}
			if (attempt === 0) {
				break;
			}
		} while (confirm(`Congratulation! Your prize is: ${prizeTotal}$ Do you want to continue?`));
		alert(`Thank you for a game. Your prize is: ${prizeTotal}$`);
	} while (confirm(`Do you want to play a game again?`));
} else {
	alert(`You did not become a millionaire, but can.`);
}