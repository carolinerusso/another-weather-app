import React, {Component} from 'react';
import * as DateFunctions from './../Utility/DateFunctions';

export class CardDetail extends Component {
	constructor(props){
		super(props);

		this.state = {
			
		}
	}

	render(){
		let obj = this.props.data;
		let block = 'card-detail';

		return (
			<div className={`${block} ${block}--${obj.icon} ${this.props.activeIndex}`}>
				<h1 className={`${block}__location`}>{this.props.location} {this.props.zip}</h1>
				<p className={`${block}__time`}>{DateFunctions.CONVERT_TIME(obj.time, this.props.timeFormat)}</p>
				<p className={`${block}__summary`}>{obj.summary}</p>
				<div className={`${block}__detail`}>
					<p className={`${block}__temp`}>
						<span className={`${block}__icon icon--${obj.icon} icon-${obj.icon}`}></span>
						{Math.round(obj.apparentTemperatureHigh)}&deg;</p>
					<div className={`${block}__metrics`}>
						<p>Precipitation: {Math.round(obj.precipProbability * 100)}%</p>
						<p>Humidity {Math.round(obj.humidity * 100)}%</p>
						<p>UV index: {obj.uvIndex}</p>
					</div>
				</div>
			</div>
		);
	}
}
