'use strict'

function assign(target) {
	
	if (target === null || target === undefined) {
		throw new Error('Cannot convert undefined or null to object');
	}
	
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


function isNum() {
	let value;
	for (let i = 0; i < arguments.length; i++) {
		value = arguments[i];
		return !isNaN(parseFloat(value) && isFinite(value));
	}
}

function drive(value) {
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
}

function inheritance(Child, Parent) {
	Child.prototype = Object.create(Parent.prototype);
	Child.prototype.constructor = Child;
}

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
	isNum(newSpeed) ? this.speed = newSpeed : console.log('wrong value!');
};
Bot.prototype.getDefaultSpeed = function() {
	return this.defaultSpeed;
};
Bot.prototype.getCoordinates = function() {
	return {x: this.x, y: this.y};
};
Bot.prototype.setCoordinates = function(coord) {
	if (isNum(coord.x, coord.y)) {
		this.x = coord.x;
		this.y = coord.y;
	} else {
		return console.log('wrong value!');
	} 
};
Bot.prototype.move = function(value) {
	drive.call(this, value);
};
Bot.prototype.showPosition = function() {
	return console.log(`I am Bot '${this.name}'. I am located at ${this.x}:${this.y}`);
};

function Racebot(obj) {
	Bot.call(this, obj);
	this.preVal = null;
}
inheritance(Racebot, Bot);

Racebot.prototype.move = function(value) {	
	this.preVal === value ? this.setSpeed(this.speed + 1) : this.setSpeed(this.defaultSpeed);
	
	this.preVal = value;
	drive.call(this, value);
};

function Speedbot(obj) {
	Bot.call(this, obj);
}
inheritance(Speedbot, Bot);

Speedbot.prototype.prepareEngine = function() {
	this.setSpeed(this.getSpeed() + 2);
};
Speedbot.prototype.move = function(value) {
	drive.call(this, value);

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