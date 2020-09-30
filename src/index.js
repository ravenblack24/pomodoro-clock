import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PomodoroClock from './components/PomodoroClock';
import {Helmet} from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
	<Helmet>
		<meta charSet="utf-8" />
		<title>Pomodoro Clock - React.js app</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
	</Helmet>
    <PomodoroClock />
  </React.StrictMode>,
  document.getElementById('root')
);