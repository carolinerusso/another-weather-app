import React, {Component} from 'react';
import * as DateFunctions from './../Utility/DateFunctions';

export class TabContent extends Component {
	render(){
		let block = 'tab-content';
		return (
			<ul className={`${block} ${this.props.activeIndex}`}>
			{this.props.forecast.data.map((obj, i) => 
				<li className={`${block}-item forecast-item--${obj.icon}`} key={i.toString()}>
					<p className={`${block}-item__time`}>{DateFunctions.CONVERT_TIME(obj.time, this.props.timeFormat)}</p>
					<div className={`${block}-item__details`}>
						<p className={`${block}-item__temp`}>
							{ obj.apparentTemperatureHigh ? (
								<span className="deg">{Math.round(obj.apparentTemperatureHigh)}/{Math.round(obj.apparentTemperatureLow)}&deg;</span>
							):(
								<span className="deg">{Math.round(obj.apparentTemperature)}&deg;</span>							
							)}
							<span className={`${block}-item__icon icon-${obj.icon}`}></span>
						</p>
						<p className={`${block}-item__summary`}>{obj.summary}</p>
					</div>
				</li>
			)}
			</ul>
		);
	}
}
