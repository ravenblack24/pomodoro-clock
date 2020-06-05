import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import ReactFCCtest from 'react-fcctest';

class LengthBlock extends React.Component {
	render() {
		return (
			<div id={this.props.title.toLowerCase().concat("-container")}> 
				<div id={this.props.title.toLowerCase().concat("-label")}>{this.props.title} Length</div>
				<button id={this.props.title.toLowerCase().concat("-decrement")} onClick={this.props.decreaseHandler}>
					<FontAwesomeIcon icon={faArrowDown} className="icon-Size"/>
				</button> 
				<div id={this.props.title.toLowerCase().concat("-length")}>{this.props.value}</div>
				<button id={this.props.title.toLowerCase().concat("-increment")} onClick={this.props.increaseHandler}>
					<FontAwesomeIcon icon={faArrowUp} className="icon-Size"/>
				</button> 
			</div>
		);
	}
}

class ControlBlock extends React.Component {
	render() {
		return (
			<div id="control-container">
				<button id="start_stop" onClick={this.props.stopStartHandler}>
					<FontAwesomeIcon icon={faPlay} className="icon-Size" />
					<FontAwesomeIcon icon={faPause} className="icon-Size" />
				</button>
				<button id="reset" onClick={this.props.resetHandler}>
					<FontAwesomeIcon icon={faSyncAlt} className="icon-Size" />
				</button>
			</div>
		);
	}
}

class Timer extends React.Component {
	render() {
		return (
			<div id="timer-container"> 
				<div id="timer-label">{this.props.title}</div>
				<span id="time-left">{this.props.value}</span>
			</div>
		);
	}
}

class PomodoroClock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			breakLength: 5,
			sessionLength: 25,
			paused: true,
			isSessionNext: true,
			timer: 300 
		};

		this.increaseBreak = this.increaseBreak.bind(this);
		this.increaseSession = this.increaseSession.bind(this);
		this.decreaseBreak = this.decreaseBreak.bind(this);
		this.decreaseSession = this.decreaseSession.bind(this);
		this.startStop = this.startStop.bind(this);
		this.reset = this.reset.bind(this);
		this.countDown = this.countDown.bind(this);
	}

	increaseBreak() {
		const breakUpdate = this.state.breakLength+1;

		if(breakUpdate <=60) {
			this.setState({
				breakLength: breakUpdate
			})
		}
	}

	increaseSession() {
		const sessionUpdate = this.state.sessionLength+1;

		if(sessionUpdate <=60) {
			this.setState({
				sessionLength: sessionUpdate
			})
		}
	}

	decreaseBreak() {
		const breakUpdate = this.state.breakLength-1;

		if(breakUpdate >=1) {
			this.setState({
				breakLength: breakUpdate
			})
		}
	}

	decreaseSession() {
		const sessionUpdate = this.state.sessionLength-1;

		if(sessionUpdate >=1) {
			this.setState({
			sessionLength: sessionUpdate
			})
		}
	}					

	startStop() {
		const paused = !this.state.paused;

		if(!paused) {
			this.timerID = setInterval(
      			() => this.countDown(),
      			1000
    		);
		} else {
			clearInterval(this.timerID);
		}

		this.setState({
			paused
		})
	}

	countDown() {
		var timer = this.state.timer-1
		this.setState({
			timer
		})
  	}

	reset() {
		this.setState({
			breakLength: 5,
			sessionLength: 25,
			isSessionNext: true
		})
	}

	render() {
		let activeTitle;
		if(this.state.isSessionNext) {
			activeTitle = "Break"
		} else {
			activeTitle = "Session"
		}

		const timerFormatted = secondsToMinutes(this.state.timer);

		return (
			<React.Fragment>
				<div id="container">
					<h1>Pomodoro Clock</h1>
					<LengthBlock title="Break" value={this.state.breakLength} increaseHandler={this.increaseBreak} decreaseHandler={this.decreaseBreak} />
					<LengthBlock title="Session" value={this.state.sessionLength} increaseHandler={this.increaseSession} decreaseHandler={this.decreaseSession} />
					<Timer status={this.state.goCountdown} title={activeTitle} value={timerFormatted}/>
					<ControlBlock stopStartHandler={this.startStop} resetHandler={this.reset} />
				</div>
				<ReactFCCtest />
			</React.Fragment>
		);
	}
}

ReactDOM.render(
  <React.StrictMode>
    <PomodoroClock />
  </React.StrictMode>,
  document.getElementById('root')
);


function secondsToMinutes(seconds) {
	return Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);
} 
