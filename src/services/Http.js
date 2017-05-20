import axios from 'axios';
import Interceptor from  './interceptor';

let interceptor = new Interceptor();
	interceptor.init();

let Http = {
	post :  async (url, data = {}, type = 'post') => {
		let headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json',
			'apiName': url
		},token = window.sessionStorage.getItem('token');

		if (token) {
			headers.jtoken = token;
		}
		let config = {
			url: url,
			method: type,
			data: data,
			timeout: 5000,
			headers: headers,
			responseType: 'json',
			validateStatus: function (status) {
				return status >= 200 && status < 300; // 默认的
			},
			maxRedirects: 5,
		};
		try {
			var response = await axios(config);
		} catch (error) {
			throw new Error(error)
		}
		return response
	}
};
export default Http;
