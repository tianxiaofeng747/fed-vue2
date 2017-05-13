import Http from '@/services/Http';
const URL = {
	login: 'auth',
	logout: ''
}
let User = {
	login (data) {
		let deferred = new Promise(function (resolve,reject) {
			Http.post(URL.login ,data || {}).then(result => {
				User.msg = result.data || {};
				resolve(User.msg);
			}, err =>{
				reject(err);
			} );
		});
		return deferred;

	},
	logout (data) {

	},
	currentUser (data) {

	}
};

export default User;