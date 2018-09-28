import React, {Component} from 'react';
import * as DateFunctions from './../Utility/DateFunctions';

export class TabNavItem extends Component {
	constructor(props){
		super(props);

		this.state = {
			
		}
		
		this.handleClick = this.handleClick.bind(this);

	}

	handleClick(e) {
		e.preventDefault();

		//pass the state upstream
		this.props.activeTab(this.props.id);
	}

	render(){
		return (
			<li className={`tab-nav-item ${this.props.activeIndex}`} onClick={this.handleClick}>{this.props.tabTitle}</li>
		);
	}
}
