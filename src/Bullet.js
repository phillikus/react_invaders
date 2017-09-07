export default class Bullet {
	constructor(args) {
		this.position = args.position;
		this.delete = false;
		this.speed = 5;
		this.radius = 5;		
	}

	update() {
		this.position.y -= this.speed;
	}

	die() {
		this.delete = true;
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