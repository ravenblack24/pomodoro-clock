import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

class LengthBlock extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
				<div id={this.props.title.toLowerCase().concat("-container")}> 
					<div id={this.props.title.toLowerCase().concat("-label")}>{this.props.title} Length</div>
					<span id={this.props.title.toLowerCase().concat("-decrement")} onClick={this.props.decreaseHandler}><FontAwesomeIcon icon={faArrowDown} className="icon-Size"/></span> 
					<span id={this.props.title.toLowerCase().concat("-length")}>{this.props.value}</span> 
					<span id={this.props.title.toLowerCase().concat("-increment")} onClick={this.props.increaseHandler}><FontAwesomeIcon icon={faArrowUp} className="icon-Size"/></span>
				</div>
			);
	}
}

class PomodoroClock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			break: 5,
			session: 25
		}
	}

	increaseBreak() {

	}

	increaseSession() {

	}


	decreaseBreak() {

	}

	decreaseSession() {

	}

	render() {
		return (
				<React.Fragment>
					<div id="container">
							<h1>Pomodoro Clock</h1>
									<LengthBlock title="Break" value={this.state.break} increaseHandler={this.increaseBreak} decreaseHandler={this.decreaseBreak} />
									<LengthBlock title="Session" value={this.state.session} increaseHandler={this.increaseSession} decreaseHandler={this.decreaseSession} />
							<div id="timer-container">
									<div id="timer-label">Session/Break</div>
									<span id="time-left">25:00</span>
							</div>

							<div id="control-container">
									<span id="start-stop"> <FontAwesomeIcon icon={faPlay} className="icon-Size" /><FontAwesomeIcon icon={faPause} className="icon-Size" /> </span> <span id="reset"> <FontAwesomeIcon icon={faSyncAlt} className="icon-Size" /></span>
							</div>
					</div>
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