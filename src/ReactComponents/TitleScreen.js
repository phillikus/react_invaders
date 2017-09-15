import React, { Component } from 'react';

export default class TitleScreen extends React.Component {
	render() {
		return (
			<div>
				<span className="centerScreen title">React Invaders</span>
				<span className="centerScreen pressSpace">Press Space to start the game!</span>
			</div>
			);
	}
}