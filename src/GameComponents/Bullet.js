import GameObject from './GameObject';

export default class Bullet extends GameObject {
	constructor(args) {
		super({ position: args.position, speed: 5, radius: 5 })
		this.direction = args.direction;
	}

	update() {
		if (this.direction === "up") {
			this.position.y -= this.speed;
		} else {
			this.position.y += this.speed;
		}
	}

	render(state) {
	    if(this.position.y > state.screen.height || this.position.y < 0) {
	    	this.die();
	    }

	    const context = state.context;
	    context.save();
	    context.translate(this.position.x, this.position.y);
	    context.fillStyle = '#FF0';
	    context.lineWidth = 0,5;
	    context.beginPath();
	    context.arc(0, 0, 2, 0, 2 * Math.PI);
	    context.closePath();
	    context.fill();
	    context.restore();
	}
}