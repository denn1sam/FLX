'use strict'
//task 1
function assign(target) {
	let toObj = Object(target);
	let nextSource = 0;

	for (let i = 0; i < arguments.length; i++) {
		nextSource = arguments[i];

		if (nextSource !== null) {
			for (let key in nextSource) {
				if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
					toObj[key] = nextSource[key];
				}
			}
		}
	}
	return toObj
}
// let defaults = { a: 123, b: 777 };
// let options = { a: 456 };
// console.log(assign({}, defaults, options));

//task2
function Bot(obj) {
	this.name = obj.name;
	this.speed = obj.speed;
	this.x = obj.x;
	this.y = obj.y;
	this.defaultSpeed = obj.speed; 
}

Bot.prototype.getSpeed = function() {
	return this.speed;
};
Bot.prototype.setSpeed = function(newSpeed) {
	this.speed = newSpeed;
};
Bot.prototype.getDefaultSpeed = function() {
	return this.defaultSpeed;
};
Bot.prototype.getCoordinates = function() {
	return {x: this.x, y: this.y};
};
Bot.prototype.setCoordinates = function(coord) {
	this.x = coord.x;
	this.y = coord.y;
};
Bot.prototype.move = function(value) {
	this.drive(value);
};
Bot.prototype.showPosition = function() {
	return console.log(`I am Bot '${this.name}'. I am located at ${this.x}:${this.y}`);
};
Bot.prototype.drive = function(value) {
	switch (value) {
		case 'up':
			this.y += this.speed;
			break;
		case 'down':
			this.y -= this.speed;
			break;
		case 'right':
			this.x += this.speed;
			break;
		case 'left':
			this.x -= this.speed;
			break;
		default:
			console.log('Wrong value! value must be only: up, down,left, right');
	}
};

function Racebot(obj) {
	Bot.call(this, obj);
	this.preVal = null;
}
Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;

Racebot.prototype.move = function(value) {	
	this.preVal === value ? this.setSpeed(this.speed + 1) : this.setSpeed(this.defaultSpeed);
	
	this.preVal = value;
	this.drive(value);
};

function Speedbot(obj) {
	Bot.call(this, obj);
}
Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;

Speedbot.prototype.prepareEngine = function() {
	this.setSpeed(this.getSpeed() + 2);
};
Speedbot.prototype.move = function(value) {
	this.drive(value);

	if (this.speed > this.defaultSpeed) {
		this.setSpeed(this.getSpeed() - 1);
	}
};

// let Botty = new Bot({name: 'Betty', speed: 2, x: 0, y: 1});
// Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:1.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:3.
// Botty.move('left');
// Botty.move('down');
// Botty.move('up');
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:5.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:7.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:9.

// let Zoom = new Racebot({name: 'Lightning', speed: 2, x: 0, y: 1});
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:1.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:3.
// Zoom.move('left');
// Zoom.move('down');
// Zoom.move('up');
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:6.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:10.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:15.

// let Broom = new Speedbot({name: 'Thunder', speed: 2, x: 0, y: 1});
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:1.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:3.
// Broom.prepareEngine();
// Broom.move('left');
// Broom.move('down');
// Broom.move('up');
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:4.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:6.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:8.