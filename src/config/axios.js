
import axios from 'axios'
export default async(url,data={},type='post')=>{
        let headers={
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type':'application/json',
            'apiName':url
        }
        if(window.sessionStorage.getItem('token')){
            headers={
                ...headers,
                'jtoken':window.sessionStorage.getItem('token')
            }
        }
        let config={
            url: '/api',
            method: type,
            data:data,
            timeout: 5000,
            headers: headers,
            responseType: 'json', 
            validateStatus: function (status) {
                return status >= 200 && status < 300; // 默认的
            },
            maxRedirects: 5,
        }
        try {
			var response = await axios(config);
		} catch (error) {
			throw new Error(error)
		}
		return response
}
