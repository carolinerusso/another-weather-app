import React, {Component} from 'react';
import * as DateFunctions from './../Utility/DateFunctions';

export class Feature extends Component {

	render(){
		let block = 'feature';

		return (
			<div className={`${block} ${block}--${this.props.weather.currently.icon}`}>
				<h1 className={`${block}__location`}>{this.props.location}</h1>
				<p className={`${block}__summary ${this.props.weather.currently.icon}`}>{this.props.weather.currently.summary}</p>
				<p className={`${block}__temperature`}><span className={`${block}__icon icon-${this.props.weather.currently.icon}`}></span>{Math.round(this.props.weather.currently.apparentTemperature)}&deg;</p>
				<p className={`${block}__time`}>{DateFunctions.CONVERT_TIME(this.props.weather.currently.time, 'dddd, MMMM Do')}</p>
			</div>
		);
	}
}
