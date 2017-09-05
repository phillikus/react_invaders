import React, { Component } from 'react';
import InputManager from './InputManager';
import TitleScreen from './Components/TitleScreen';
import Ship from './Ship';
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
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height/2
      }});
    this.ship = ship; 

    this.setState({
      gameState: GameState.Playing
    }); 
  }

  update() {
    const keys = this.state.input.pressedKeys;
    const context = this.state.context;

    if (this.state.gameState === GameState.StartScreen && keys.space) {
      this.startGame();
    }

    if (this.state.gameState === GameState.Playing) {
      const ship = this.ship;
      context.save();
      context.scale(this.state.screen.ratio, this.state.screen.ratio);

      context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
      context.globalAlpha = 1;
      ship.update(keys);
      ship.render(this.state);
      context.restore();    
    }

    requestAnimationFrame(() => {this.update()});
  }

  render() {
    if (this.state.gameState === GameState.Playing) {      
    }

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
