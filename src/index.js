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
			<div id="timer-container" > 
				<div id="timer-label" style={this.props.style}>{this.props.title}</div>
				<div id="time-left" style={this.props.style}>{this.props.value}</div>
			</div>
		);
	}
}

class PomodoroClock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			breakLength: 5,
			sessionLength: 5,
			paused: true,
			isSession: true,
			timer: 5 
		};

		this.increaseBreak = this.increaseBreak.bind(this);
		this.increaseSession = this.increaseSession.bind(this);
		this.decreaseBreak = this.decreaseBreak.bind(this);
		this.decreaseSession = this.decreaseSession.bind(this);
		this.startStop = this.startStop.bind(this);
		this.reset = this.reset.bind(this);
		this.countDown = this.countDown.bind(this);
		this.switchCounter = this.switchCounter.bind(this);
	}

	increaseBreak() {
		const breakLen = this.state.breakLength+60;

		if(breakLen <=3600 && this.state.paused === true) {
			this.setState({breakLength: breakLen});

			let sessionActive = this.state.isSession;

			if(!sessionActive) {
				this.setState({timer: breakLen});
			}
		}
	}

	increaseSession() {
		const sessionUpdate = this.state.sessionLength+60;

		if(sessionUpdate <=3600 && this.state.paused === true) {
			this.setState({
				sessionLength: sessionUpdate
			});

			let sessionActive = this.state.isSession;

			if(sessionActive) {
				this.setState({timer: sessionUpdate});
			}
		}
	}

	decreaseBreak() {
		const breakUpdate = this.state.breakLength-60;

		if(breakUpdate >=60 && this.state.paused === true) {
			this.setState({
				breakLength: breakUpdate
			});

			let sessionActive = this.state.isSession;

			if(!sessionActive) {
				this.setState({timer: breakUpdate});
			}
		}
	}

	decreaseSession() {
		const sessionUpdate = this.state.sessionLength-60;

		if(sessionUpdate >=60 && this.state.paused === true) {
			this.setState({
			sessionLength: sessionUpdate
			});


			let sessionActive = this.state.isSession;

			if(sessionActive) {
				this.setState({timer: sessionUpdate});
			}
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

		if(timer >= 0) {
			this.setState({
				timer
			})
		}
		else {
			this.switchCounter();
		}
  	}

  	switchCounter() {
  		let upNext;
		let currentCounter = this.state.isSession;

		if(currentCounter) {
			upNext = this.state.breakLength
		} else {
			upNext = this.state.sessionLength
		}

		this.setState({
			timer: upNext,
			isSession: !currentCounter
		})
  	}

	reset() {
		this.setState({
			breakLength: 60,
			sessionLength: 60,
			paused: true,
			isSession: true,
			timer: 60 
		})

		clearInterval(this.timerID);
	}

	render() {
		let breakOrSession = this.state.isSession;
		if(breakOrSession) {
			breakOrSession = "Session"
		} else {
			breakOrSession = "Break"
		}

		const breakFormatted = secondsToMinutes(this.state.breakLength, false);
		const sessionFormatted = secondsToMinutes(this.state.sessionLength, false);
		const timerFormatted = secondsToMinutes(this.state.timer, true);

		var fontColor;

		if(this.state.timer <= 59) {
			fontColor = { color: "red"};
		} else {
			fontColor = { color: "white"};
		}

		return (
			<React.Fragment>
				<div id="container">
					<h1>Pomodoro Clock</h1>
					<LengthBlock title="Break" value={breakFormatted} increaseHandler={this.increaseBreak} decreaseHandler={this.decreaseBreak} />
					<LengthBlock title="Session" value={sessionFormatted} increaseHandler={this.increaseSession} decreaseHandler={this.decreaseSession} />
					<Timer title={breakOrSession} value={timerFormatted} style={fontColor} />
					<ControlBlock stopStartHandler={this.startStop} resetHandler={this.reset} />
				</div>
				{ (this.state.timer === 0) && 
				<audio ref='audio_tag' src='https://s3.amazonaws.com/freecodecamp/simonSound4.mp3' autoPlay />}
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


function secondsToMinutes(seconds, includeSeconds) {
	return (includeSeconds)? ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2) : Math.floor(seconds / 60);
} 
