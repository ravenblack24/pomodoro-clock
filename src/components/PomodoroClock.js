import React from 'react';
import LengthBlock from './LengthBlock';
import ControlBlock from './ControlBlock';
import Timer from './Timer';
import secondsToMinutes from '../helpers/secondsToMinutes';

export default class PomodoroClock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			breakLength: 300,
			sessionLength: 1500,
			paused: true,
			isSession: true,
			timer: 1500 
		};
		this.audio = React.createRef();
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
			this.audio.current.play();
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
			breakLength: 300,
			sessionLength: 1500,
			paused: true,
			isSession: true,
			timer: 1500 
		})

		clearInterval(this.timerID);
		this.audio.current.pause();
		this.audio.current.currentTime = 0;
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
				<a href="https://github.com/ravenblack24/pomodoro-clock"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_left_darkblue_121621.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" /></a>
				<div id="container">
					<h1>Pomodoro Clock</h1>
					<LengthBlock title="Break" value={breakFormatted} increaseHandler={this.increaseBreak} decreaseHandler={this.decreaseBreak} />
					<LengthBlock title="Session" value={sessionFormatted} increaseHandler={this.increaseSession} decreaseHandler={this.decreaseSession} />
					<Timer title={breakOrSession} value={timerFormatted} style={fontColor} />
					<ControlBlock stopStartHandler={this.startStop} resetHandler={this.reset} />
				</div>
				<audio ref={this.audio} id="beep" src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"} />
			</React.Fragment>
		);
	}
}