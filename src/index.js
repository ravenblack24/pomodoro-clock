import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PomodoroClock extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
				<React.Fragment>
					<div id="container">
							<h1>Pomodoro Clock</h1>

							<div id="break-container"> 
									<div id="break-label">Break Length></div>
									<span id="break-decrement">-</span><span id="break-length">5</span><span id="break-increment">+</span>
							</div>
							<div id="session-container">
									<div id="session-label">Session Length></div>
									<span id="session-decrement">-</span><span id="break-length">25</span><span id="session-increment">+</span>
							</div>

							<div id="timer-container">
									<div id="timer-label">Session/Break</div>
									<span id="time-left">25:00</span>
							</div>

							<div id="control-container">
								<span id="start-stop"> > || </span> <span id="reset"> reset</span>
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