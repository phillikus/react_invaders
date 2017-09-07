import React, { Component } from 'react';
import InputManager from './InputManager';
import TitleScreen from './Components/TitleScreen';
import Ship from './Ship';
import Invader from './Invader';
import { checkCollisionsWith, checkCollision } from './Helper';
import './App.css';


const width = 800;
const height = window.innerHeight;

const GameState = {
   StartScreen : 0,
   Playing : 1,
   GameOver : 2
};

class App extends Component {
  constructor() {
    super();
    this.state = { 
      input: new InputManager(),
      screen: {
        width: width,
        height: height,
        ratio: window.devicePixelRatio || 1
      },
      gameState: GameState.StartScreen,
      context: null
    };

    this.ship = null;
    this.invaders = [];
  }

  handleResize(value, e){
    this.setState({
      screen : {
        width: width,
        height: height,
        ratio: window.devicePixelRatio || 1,
      }
    });
  }

  createInvaders(count) {
    const newPosition = { x: 100, y: 20 };
    let swapStartX = true;

    for (var i = 0; i < count; i++) {
      const invader = new Invader({
         position: { x: newPosition.x, y: newPosition.y }
      });

      newPosition.x += invader.radius + 20;

      if (newPosition.x + invader.radius + 50 >= this.state.screen.width) {
        newPosition.x = swapStartX ? 110 : 100;
        swapStartX = !swapStartX;
        newPosition.y += invader.radius + 20;
      }

      this.invaders.push(invader);
    }
  }

  componentDidMount() {
    window.addEventListener('resize',  this.handleResize.bind(this, false));
    this.state.input.bindKeys();
    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });

    requestAnimationFrame(() => {this.update()});    
  }

  componentWillUnmount() {
    this.state.input.unbindKeys();
    window.removeEventListener('resize', this.handleResize);
  }

  startGame() {
    let ship = new Ship({
      onDie: this.die.bind(this),
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height/2
      }});
    this.ship = ship;

    this.createInvaders(27);

    this.setState({
      gameState: GameState.Playing
    }); 
  }

  die() {
    this.setState({ gameState: GameState.StartScreen });
    this.ship = null;
    this.invaders = [];
  }

  update() {
    const keys = this.state.input.pressedKeys;
    const context = this.state.context;

    if (this.state.gameState === GameState.StartScreen && keys.space) {
      this.startGame();
    }

    if (this.state.gameState === GameState.Playing) {
      context.save();
      context.scale(this.state.screen.ratio, this.state.screen.ratio);

      context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
      context.globalAlpha = 1;
      checkCollisionsWith(this.ship.bullets, this.invaders);
      checkCollisionsWith([this.ship], this.invaders);

      if (this.ship !== null) {
        this.ship.update(keys);
        this.ship.render(this.state);        
      }

      this.renderInvaders(this.state);
      
      context.restore();      
    }

    requestAnimationFrame(() => {this.update()});
  }  

  renderInvaders(state) {
    let index = 0;
    let reverse = false;

    for (let invader of this.invaders) {
      if (invader.delete) {
        this.invaders.splice(index, 1);
      }
      else if (invader.position.x + invader.radius >= this.state.screen.width || 
               invader.position.x - invader.radius <= 0) {
        reverse = true;
      }
      else {
        this.invaders[index].update();
        this.invaders[index].render(state);
      }
      index++;
    }

    if (reverse) {
      this.reverseInvaders();
    }
  }

  reverseInvaders() {
    let index = 0;
    for (let invader of this.invaders) {
      this.invaders[index].reverse();
      this.invaders[index].position.y += 50;
      index++;
    }
  }

  render() {
    return (
      <div>
        { this.state.gameState === GameState.StartScreen && <TitleScreen /> }        
        <canvas ref="canvas"
           width={ this.state.screen.width * this.state.screen.ratio }
           height={ this.state.screen.height * this.state.screen.ratio }
        />
      </div>
    );
  }
}

export default App;