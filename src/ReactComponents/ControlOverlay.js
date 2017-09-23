import React, { Component } from 'react';

export default class ControlOverlay extends React.Component {
	constructor(args) {
		super(args);
		this.state = { score: args.score };
	}

	render() {
		return (
			<div>
				<span className="centerScreen controls">Arrows to move, Space to shoot!</span>
			</div>
			);
	}
}