import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './main.scss';
import Weather from './js/Weather.jsx';

ReactDOM.render(
	<Weather defaultZip="06830" endpoint="https://1ljygy7hv5.execute-api.us-east-2.amazonaws.com/production/" />, 
	document.querySelector('.weather')
);