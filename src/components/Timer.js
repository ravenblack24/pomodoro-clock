import React from 'react';

export default class Timer extends React.Component {
	render() {
		return (
			<div id="timer-container" > 
				<div id="timer-label" style={this.props.style}>{this.props.title}</div>
				<div id="time-left" style={this.props.style}>{this.props.value}</div>
			</div>
		);
	}
}