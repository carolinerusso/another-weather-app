import moment from 'moment';

export const CONVERT_TIME = (value, format) => {
	let formattedValue = moment(value * 1000).format(format);
	return formattedValue;
}