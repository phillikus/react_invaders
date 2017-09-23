import React, { Component } from 'react';
import InputManager from './InputManager';
import TitleScreen from './ReactComponents/TitleScreen';
import GameOverScreen from './ReactComponents/GameOverScreen';
import ControlOverlay from './ReactComponents/ControlOverlay';
import Ship from './GameComponents/Ship';
import Invader from './GameComponents/Invader';
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
      score: 0,
      gameState: GameState.StartScreen,
      previousState: GameState.StartScreen,
      context: null
    };

    this.ship = null;
    this.invaders = [];
    this.lastStateChange = 0;
    this.previousDelta = 0;
    this.fpsLimit = 30;
    this.showControls = false;
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

  startGame() {
    let ship = new Ship({
      onDie: this.die.bind(this),
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height - 50
      }});
    this.ship = ship;

    this.createInvaders(27);

    this.setState({
      gameState: GameState.Playing,
      score: 0
    }); 
    this.showControls = true;
  }

  die() {
    this.setState({ gameState: GameState.GameOver });
    this.ship = null;
    this.invaders = [];
    this.lastStateChange = Date.now();
  }

  increaseScore(val) {
    this.setState({ score: this.state.score + 500 });
  }

  update(currentDelta) {
    var delta = currentDelta - this.previousDelta;

    if (this.fpsLimit && delta < 1000 / this.fpsLimit) {
      return;
    }

    const keys = this.state.input.pressedKeys;
    const context = this.state.context;

    if (this.state.gameState === GameState.StartScreen && keys.enter && Date.now() - this.lastStateChange > 2000) {
      this.startGame();
    }

    if (this.state.gameState === GameState.GameOver && keys.enter) {
      this.setState({ gameState: GameState.StartScreen});      
    }

    if (this.state.gameState === GameState.Playing && Date.now() - this.lastStateChange > 500) {
      if (this.state.previousState !== GameState.Playing) {
        this.lastStateChange = Date.now();
      }

      if (this.invaders.length === 0) {
        this.setState({ gameState: GameState.GameOver });
      }

      context.save();
      context.scale(this.state.screen.ratio, this.state.screen.ratio);

      context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
      context.globalAlpha = 1;
      checkCollisionsWith(this.ship.bullets, this.invaders);
      checkCollisionsWith([this.ship], this.invaders);

      if (keys.space || keys.left || keys.right) {
        this.showControls = false;
      }

      for (var i = 0; i < this.invaders.length; i++) {
        checkCollisionsWith(this.invaders[i].bullets, [this.ship]);
      }

      if (this.ship !== null) {
        this.ship.update(keys);
        this.ship.render(this.state);        
      }

      this.renderInvaders(this.state);
      this.setState({previousState: this.state.gameState});
      context.restore();     
    }

    requestAnimationFrame(() => {this.update()});
  }  

  createInvaders(count) {
    const newPosition = { x: 100, y: 20 };
    let swapStartX = true;

    for (var i = 0; i < count; i++) {
      const invader = new Invader({
         position: { x: newPosition.x, y: newPosition.y },
         onDie: this.increaseScore.bind(this, false)
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

  render() {
    return (
      <div>
        { this.showControls && <ControlOverlay /> }
        { this.state.gameState === GameState.StartScreen && <TitleScreen /> }        
        { this.state.gameState === GameState.GameOver && <GameOverScreen score= { this.state.score } /> }        
        <canvas ref="canvas"
           width={ this.state.screen.width * this.state.screen.ratio }
           height={ this.state.screen.height * this.state.screen.ratio }
        />
      </div>
    );
  }
}

export default App;