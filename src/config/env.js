/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl; 
let apiCall; 
let apiurl; 
let routerMode;
let imgup;
let imgdown;

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://172.30.43.243/gateway';
	apiCall = 'call';
	routerMode = 'hash';
	imgup= 'http://172.30.43.243/gateway/upload';
	imgdown = 'http://172.30.43.243/dfs/'
}else{
	baseUrl = 'https://mainsite-restapi.ele.me';
	routerMode = 'hash'
}

export {
	baseUrl,
	apiCall,
	apiurl,
	routerMode,
	imgup,
	imgdown
}