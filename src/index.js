import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PomodoroClock from './components/PomodoroClock';
import ReactFCCtest from 'react-fcctest';
import {Helmet} from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
	<Helmet>
		<meta charSet="utf-8" />
		<title>ReactJS - Pomodoro Clock</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
	</Helmet>
    <PomodoroClock />
	<ReactFCCtest />
  </React.StrictMode>,
  document.getElementById('root')
);