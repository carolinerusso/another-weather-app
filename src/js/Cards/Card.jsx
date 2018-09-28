import React, {Component} from 'react';
import * as DateFunctions from './../Utility/DateFunctions';

export class Card extends Component {
	constructor(props){
		super(props);

		this.state = {
			
		}
		
		this.handleClick = this.handleClick.bind(this);

	}

	handleClick(e) {
		e.preventDefault();

		//pass the state upstream
		this.props.activeCard(this.props.id);
	}

	render(){
		let obj = this.props.data;
		let block = 'card';

		return (
			<li tabIndex="0" onFocus={this.handleClick} className={`${block} ${block}--${obj.icon} ${this.props.activeIndex}`}>
				<p className={`${block}__time`}>{DateFunctions.CONVERT_TIME(obj.time, this.props.timeFormat)}</p>
				<p className={`${block}__icon icon--${obj.icon} icon-${obj.icon}`}></p>
				<p className={`${block}__temp`}>
					{ obj.apparentTemperatureHigh ? (
						<span className="temps">
							<span className="temp-high">
								{Math.round(obj.apparentTemperatureHigh)}&deg;
							</span>
							<span className="temp-low">
								{Math.round(obj.apparentTemperatureLow)}&deg;
							</span>
						</span>
					):(
						<span className="deg">{Math.round(obj.apparentTemperature)}&deg;</span>							
					)}
				</p>
				{/*<p className={`${block}__summary`}>{obj.summary}</p>*/}
			</li>
		);
	}
}
