import GameObject from './GameObject';
import Bullet from './Bullet';

export const Direction = {
	  Left:  0,
	  Right: 1,
   };

export default class Invader extends GameObject { 
	constructor (args) {
		super({ position: args.position, onDie: args.onDie, speed: 1, radius: 50 });
		this.direction = Direction.Right;
		this.bullets = [];
		this.lastShot = 0;
		this.shootDelay = Date.now();
	}

	reverse() {
		if (this.direction === Direction.Right) {
			this.position.x -= 10;
			this.direction = Direction.Left;
		} else {
			this.direction = Direction.Right;
			this.position.x += 10;
		}
	}

	update() {
		if (this.direction === Direction.Right) {
			this.position.x += this.speed;	
		} else {
			this.position.x -= this.speed;
		}

		let nextShoot = Math.random() * 6 * 1000000


		let now = Date.now();
		if (now - this.shootDelay > nextShoot && this.bullets.length <= 2 && now - this.lastShot > nextShoot) {
			const bullet = new Bullet({
				position: { x: this.position.x, y : this.position.y - 5 },
				direction : "down"
			});

			this.bullets.push(bullet);
			this.lastShot = Date.now();
		}
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
	    if(this.position.y > state.screen.height || this.position.y < 0) {
	    	this.die();
	    }

	    this.renderBullets(state);

	    const context = state.context;
	    context.save();
	    context.translate(this.position.x, this.position.y);
	    context.strokeStyle = '#F00';
	    context.fillStyle = '#F00';
	    context.lineWidth = 2;
	    context.beginPath();
	    context.moveTo(-5, 25);
		context.arc(0, 25, 5, 0, Math.PI);
	    context.lineTo(5, 25);
	    context.lineTo(5, 0);
	    context.lineTo(15, 0);
	    context.lineTo(15, -15);
	    context.lineTo(-15, -15);
	    context.lineTo(-15, 0);
	    context.lineTo(-5, 0);
	    context.closePath();
	    context.fill();
	    context.stroke();
	    context.restore();
	}
}