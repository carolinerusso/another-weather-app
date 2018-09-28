import React, {Component} from 'react';
import * as DateFunctions from './../Utility/DateFunctions';
import {Card} from './Card.jsx';
import {CardDetail} from './CardDetail.jsx';

export class Cards extends Component {
	constructor(props){
		super(props);

		this.state = {
			activeCard: 0
		}

		this.activateCard = this.activateCard.bind(this);
	}

	activateCard(value){
		this.setState({ activeCard: value });
	}

	render(){
		let block = 'cards';
		return (
			<div className={`${block}`}>
				<ul className={`${block}__detail`}>
					{this.props.forecast.data.map((obj, i) => 
						<CardDetail zip={this.props.zip} location={this.props.location} key={i.toString()} id={i} data={obj} activeIndex={this.state.activeCard == i ? 'active' : ''} timeFormat="dddd" />
					)}
				</ul>
				<ul className={`${block}__nav`}>
					{this.props.forecast.data.map((obj, i) => 
						<Card key={i.toString()} id={i} data={obj} activeCard={this.activateCard} activeIndex={this.state.activeCard == i ? 'active' : ''} timeFormat="ddd" />
					)}
				</ul>
			</div>
		);
	}
}
