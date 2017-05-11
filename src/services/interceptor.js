import axios from 'axios'

//import loading from '@components/loading'

export default class Interceptor {
    // 对请求数据做些什么
    request(iView){
        if (!String.prototype.trim) {
            String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/g, '');
            };
        }
        let clearNoneValueObj = (obj) => {
            for (var i in obj) {
                if (angular.isObject(obj[i])) {
                    clearNoneValueObj(obj[i]);
                } else {
                    typeof obj[i] == String && (obj[i] = obj[i].trim() );
                    if (!obj.notClearValue && (obj[i] == undefined || obj[i] === null || obj[i] === '')) {
                        delete obj[i];
                    }

                }
            }
        };
        let getParams =  (obj) => {
            var result = [];
            obj && angular.forEach(obj, function (val, key) {
                var str = key + '=' + (typeof val == 'string' ? val.toString() : JSON.stringify(val));
                result.push(str);
            });
            return result.join('&');
        }
        axios.interceptors.request.use(function (request) {
            iView.LoadingBar.start();
            /*if (APP.DEV_CONFIG.DEV_MODE == 0 && request.method == 'POST') {
                request.method = 'GET';
                request.url = 'data/' + request.data.url + '.json?' + getParams(request.data || {});
            } else if (APP.DEV_CONFIG.DEV_MODE == 1 && request.method == 'POST') {
                request.data.url && (request.headers.apiName = request.data.url);
                request.headers.jtoken = APP.User ? APP.User.token : APP.token;
                delete request.data.url;
            }*/
            //clearNoneValueObj(request);
            return request;
        }, function (error) {
            return Promise.reject(error);
        })
    }
    // 对响应数据做点什么
    response(iView){
        axios.interceptors.response.use(function (response) {
            iView.LoadingBar.finish();

            if(response.data){
                if(response.data.code=='SUCCESS'||response.data.code=='0'){
                    return response.data;
                }else if (response.data.code == 'SESSION_EXPIRED' || response.data.code == '5000') {
                    return Promise.reject(response);
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
