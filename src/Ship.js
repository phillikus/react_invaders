export default class Ship {
	constructor(args) {
		this.position = args.position;
		this.velocity = { x:0, y: 0}
		this.speed = 2.5;
		this.radius = 15;
	}

	update(keys) {
		if (keys.left) {
			this.position.x -= this.speed;
		} else if (keys.right) {
			this.position.x += this.speed;
		}

		if (keys.up) {
			this.position.y -= this.speed;
		} else if (keys.down) {
			this.position.y += this.speed;
		}
	}

	render(state) {
		if(this.position.x > state.screen.width) { 
		 	this.position.x = 0;
		}
	    else if(this.position.x < 0) {
	    	this.position.x = state.screen.width;
	    }
	    if(this.position.y > state.screen.height) {
	    	this.position.y = 0;
	    }
	    else if(this.position.y < 0) {
	    	this.position.y = state.screen.height;
	    }

	    const context = state.context;
	    context.save();
	    context.translate(this.position.x, this.position.y);
	    context.strokeStyle = '#ffffff';
	    context.fillStyle = '#ffffff';
	    context.lineWidth = 2;
	    context.beginPath();
	    context.moveTo(0, -25);
	    context.lineTo(15, 15);
	    context.lineTo(5, 7);
	    context.lineTo(-5, 7);
	    context.lineTo(-15, 15);
	    context.closePath();
	    context.fill();
	    context.stroke();
	    context.restore();
	}
}