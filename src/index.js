import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './main.scss';
import Weather from './js/Weather.jsx';

ReactDOM.render(
	<Weather defaultZip="06830" />, 
	document.querySelector('.weather')
);