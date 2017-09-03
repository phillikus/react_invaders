import React, { Component } from 'react';
import InputManager from './InputManager';
import TitleScreen from './Components/TitleScreen';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      input: new InputManager(), keyState: '',
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      } 
    };
  }

  componentDidMount() {
    this.state.input.bindKeys();
    requestAnimationFrame(() => {this.update()});
  }

  componentWillUnmount() {
    this.state.input.unbindKeys();
  }

  update() {
    let keys = this.state.input.pressedKeys;
    let keyState = '';

    if (keys.left) {
      keyState += 'left, ';
    }

    if (keys.right) {
      keyState += 'right, ';
    }

    if (keys.up) {
      keyState += 'up, ';
    }

    if (keys.down) {
      keyState += 'down, ';
    }

    if (keys.space) {
      keyState += 'space';
    }

    this.setState( { keyState: keyState });

    requestAnimationFrame(() => {this.update()});
  }

  render() {
    return (
      <div>
        <h1>Pressed keys: { this.state.keyState } </h1>
        <TitleScreen />
        <canvas ref="canvas"
           width={ this.state.screen.width * this.state.screen.ratio }
           height={ this.state.screen.height * this.state.screen.ratio }
        />
      </div>
    );
  }
}

export default App;
