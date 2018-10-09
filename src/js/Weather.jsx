import React, {Component} from 'react';
import {Form} from './Form';
import * as DateFunctions from './Utility/DateFunctions';
import {Cards} from './Cards/Cards.jsx';

class Weather extends Component {
	
	constructor(props){
		super(props);

		this.state = {

		}

		this._fetch = this._fetch.bind(this);
	}

	_fetch(value){

		this.setState({
			zip: value,
			fetching: true,
			error: undefined
		}, () => {

		//build the correct endpoint for AWS
		let url = this.props.endpoint + 'zip/' + this.state.zip;
		
		//perform the fetch and store the results
		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {

					this.setState({
						fetching: false,
						error: response.error
					});

					throw new Error('Something went wrong');
				}
			})
			.then(json => {
				//pull the data from the AWS call
				this.setState({
					geolocation: json,
					location: json.postalCodes[0].placeName + ', ' + json.postalCodes[0].adminCode1,
					lat: json.postalCodes[0].lat,
					lng: json.postalCodes[0].lng
				});

				// make a 2nd request and return a promise
				let forecastUrl = this.props.endpoint + 'coord/' + this.state.lat + ',' + this.state.lng;
				
				return fetch(forecastUrl);
				
			})
			.then(response => response.json())
			.then(json => {
				//store the weather details from Dark Sky in state
				let data = json;

				this.setState({
					weather: data,
					fetching: false
				});
				
			})
			.catch(err => {				
				console.error(err);
			})
		});
	}

	componentDidMount(){
		{this._fetch(this.props.defaultZip)} 
	}

	render(){
		return (
			<div className={`${this.state.fetching ? 'fetching' : 'fetched'}`}>
				<Form zipcode={this._fetch} />
				{this.state.fetching == false ? (
					
					<div className="weather">
						{ this.state.error ? (
							<div className="msg msg--error">
								<h1>Woops.</h1>
								<span className="msg__icon icon-error"></span>
								<p>{this.state.error}</p>
							</div>
						) : ([
							<Cards key={1} zip={this.state.zip} location={this.state.location} forecast={this.state.weather.daily} timeFormat="ddd" />,
						])}
					</div>

				) : (
					<p className="msg msg--loading">Loading<span>.</span><span>.</span><span>.</span></p>
				)}				
			</div>
		);
	}
}

export default Weather;
