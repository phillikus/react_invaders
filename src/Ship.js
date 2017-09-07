import Bullet from './Bullet';

export default class Ship {
	constructor(args) {
		this.position = args.position;
		this.onDie = args.onDie;
		this.speed = 2.5;
		this.radius = 15;
		this.bullets = [];
		this.lastShot = 0;
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

		if (keys.space && Date.now() - this.lastShot > 250) {
			const bullet = new Bullet({
				position: { x: this.position.x, y : this.position.y - 5 }
			});

			this.bullets.push(bullet);
			this.lastShot = Date.now();
		}
	}

	die() {
		this.onDie();
	}

	renderBullets(state) {
		let index = 0;
	    for (let bullet of this.bullets) {
	      if (bullet.delete) {
	        this.bullets.splice(index, 1);
	      } else {
	      	this.bullets[index].update();
	        this.bullets[index].render(state);
	      }
	      index++;
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

	    this.renderBullets(state);

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