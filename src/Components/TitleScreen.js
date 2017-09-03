import React, { Component } from 'react';

export default class TitleScreen extends React.Component {
	render() {
		return (
			<div>
				<span className="titleScreen title">React Invaders</span>
				<span className="titleScreen pressSpace">Press Space to start the game!</span>
			</div>
			);
	}
}