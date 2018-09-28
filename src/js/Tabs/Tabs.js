import React, {Component} from 'react';
import * as DateFunctions from './../Utility/DateFunctions';
import {TabContent} from './TabContent';
import {TabNavItem} from './TabNavItem';

export class Tabs extends Component {
	constructor(props){
		super(props);

		this.state = {
			activeTab: 0
		}

		this.handleTabs = this.handleTabs.bind(this);
	}

	handleTabs(value){
		this.setState({ activeTab: value });
	}

	render(){

		let forecastTabs = [
			{
				"type": "hourly",
				"timeFormat": "ha",
				"title": "Hourly"
			},
			{
				"type": "daily",
				"timeFormat": "M/D",
				"title": "Daily"
			}
		];

		return (
			<div className="tabs">
				<ul className="tabs__nav">
					<li className={`tab-nav-item tab-nav-item--location`}>{this.props.location} {this.props.zip}</li>
					{forecastTabs.map((obj, i) =>
						<TabNavItem key={i.toString()} id={i} activeIndex={this.state.activeTab == i ? 'active' : ''} tabTitle={obj.title} forecast={this.props.weather[obj.type]} timeFormat={obj.timeFormat} activeTab={this.handleTabs} />
					)}
				</ul>
				<div className="tabs__content">
					{forecastTabs.map((obj, i) =>
						<TabContent key={i.toString()} id={i} activeIndex={this.state.activeTab == i ? 'active' : ''} tabTitle={obj.title} forecast={this.props.weather[obj.type]} timeFormat={obj.timeFormat} activeTab={this.handleTabs} />
					)}
				</div>
			</div>	
		);
	}
}
