import React, {Component} from 'react';
import {Form} from './Form';
import * as DateFunctions from './Utility/DateFunctions';
// import {Feature} from './Feature/Feature';
import {Cards} from './Cards/Cards.jsx';
// import {Tabs} from './Tabs/Tabs';

const ENDPOINT = 'https://1ljygy7hv5.execute-api.us-east-2.amazonaws.com/production/';

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
		let url = ENDPOINT + 'zip/' + this.state.zip;
		
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
				
				if(json.status == "OK"){

					let data = json.results[0];
					
					//only grab the values we really want: City, STATE
					let results = data.address_components.filter((obj) => obj.types.includes('political') && ! obj.types.includes('administrative_area_level_2') && ! obj.types.includes('country'));

					let map = results.map(i => i.short_name);

					let location = map.join(', ');

					this.setState({
						geolocation: data,
						location: location,
						lat: data.geometry.location.lat,
						lng: data.geometry.location.lng
					});

					// make a 2nd request and return a promise
					let forecastUrl = ENDPOINT + 'coord/' + this.state.lat + ',' + this.state.lng;
					
					return fetch(forecastUrl);
				
				} else {	

					this.setState({
						fetching: false,
						error: json.status
					});

					try {
						if(json.status){

							let message = '';
							switch (json.status) {
							    case 'ZERO_RESULTS':
							        message = 'No results found for that zip code. Did you enter it correctly?';
							        break;
							    default: 
							        message = 'An unknown error occurred. Try again later. Error code: ' + json.status;
							        break;
							}
								
							this.setState({
								fetching: false,
								error: message
							});
							
							throw new Error(message);
						
						} else if(json.error){

							this.setState({
								fetching: false,
								error: json.code + ': ' + json.error
							});

							throw new Error(json.code + ': ' + json.error);
						}
					} catch(err) {
						throw new Error(err);
					}
				}
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
							//<Feature key={0} location={this.state.location} weather={this.state.weather}/>,
							<Cards key={1} zip={this.state.zip} location={this.state.location} forecast={this.state.weather.daily} timeFormat="ddd" />,
							//<Tabs key={2} zip={this.state.zip} location={this.state.location} weather={this.state.weather} />
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
