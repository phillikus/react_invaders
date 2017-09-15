import React, { Component } from 'react';

export default class GameOverScreen extends React.Component {
	constructor(args) {
		super(args);
		this.state = { score: args.score };
	}

	render() {
		return (
			<div>
				<span className="centerScreen title">GameOver!</span>
				<span className="centerScreen score">Score: { this.state.score }</span>
				<span className="centerScreen pressEnter">Press enter to continue!</span>
			</div>
			);
	}
}