const KEY = {
	  LEFT:  37,
	  RIGHT: 39,
	  UP: 38,
	  DOWN: 40,
	  A: 65,
	  D: 68,
	  W: 87,
	  S: 83,
	  SPACE: 32
   };

export default class InputManager {
   	constructor() {
		this.pressedKeys = { left: 0, right: 0, up: 0, down: 0, space: 0 };
	}

	handleKeys(value, e){
	    let keys = this.pressedKeys;

	    switch (e.keyCode) {
	    	case KEY.LEFT:
	    	case KEY.A:
	    		keys.left  = value;
	    		break;
	    	case KEY.RIGHT:
	    	case KEY.D:
	    		keys.right  = value;
	    		break;
	    	case KEY.UP:
	    	case KEY.W:
	    		keys.up  = value;
	    		break;
    		case KEY.DOWN:
	    	case KEY.S:
	    		keys.down  = value;
	    		break;
	    	case KEY.SPACE:
	    		keys.space  = value;
	    		break;
	    }

	    this.pressedKeys = keys;
	  }

	bindKeys() {
		window.addEventListener('keyup',   this.handleKeys.bind(this, false));
		window.addEventListener('keydown', this.handleKeys.bind(this, true));
	}

	unbindKeys() {
	    window.removeEventListener('keyup', this.handleKeys);
	    window.removeEventListener('keydown', this.handleKeys);
	}
}