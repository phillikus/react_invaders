export default class GaneObject {
	constructor(args){
		this.position = args.position;
		this.onDie = args.onDie;
		this.speed = args.speed;
		this.radius = args.radius;
		this.delete = false;
	}

	die() {
		this.delete = true;
		if (this.onDie) {
			this.onDie();
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
	}
}