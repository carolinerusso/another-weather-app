import React, {Component} from 'react';

export class Form extends Component {
	constructor(props){
		super(props);

		this.state = {
			value: ''
		}

		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();

		//pass the state upstream
		this.props.zipcode(this.state.value);
	}

	render(){
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				<input className="form__zip" type="text" placeholder="5-digit zip code, e.g., 06830" id="zip" value={this.state.value} onChange={this.handleChange} required />
				<input className="form__submit" type="submit" value="Submit" />
			</form>
		);
	}
}
