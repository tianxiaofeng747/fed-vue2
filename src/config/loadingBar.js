import axios from 'axios'
import swal from 'sweetalert2'
//import loading from '@components/loading'

export default class laodbar {
    // 对请求数据做些什么
    request(iView){
        axios.interceptors.request.use(function (config) {
            iView.LoadingBar.start();
            return config;
        }, function (error) {
            return Promise.reject(error);
        })
    }
    // 对响应数据做点什么
    response(iView){
        axios.interceptors.response.use(function (response) {
            iView.LoadingBar.finish();
            console.log(response)
            if(response.data){
                if(response.data.code=='SUCCESS'||response.data.code=='0'){
                    return response.data;
                }else if (response.data.code == 'SESSION_EXPIRED' || response.data.code == '5000') {
                    return
                    
				}else{
                    swal({
                    title: response.data.code,
                    text: response.data.message,
                    type: 'error'
                    })
                    return
                }
            }
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        })
    }
    config(iView){
        iView.LoadingBar.config({
            color: '#ff0',
            failedColor: '#f0ad4e',
            height: 5
        });
    }
}
