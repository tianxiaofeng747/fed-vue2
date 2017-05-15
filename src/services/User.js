import Http from '@/services/Http';
const URL = {
    login: 'login',
    currentUser: 'currentUser',
    logout: 'logout'
}
let User = {
    login (data) {
        let deferred = new Promise(function (resolve, reject) {
            Http.post(URL.login, data || {}).then(result => {
                User.msg = data.data || {};
                sessionStorage.setItem('user', JSON.stringify(User.msg));
                resolve(User.msg);
                if (User.msg.id) {
                    resolve(result);
                } else {
                    reject(result);
                }
            }, err => {
                reject(err);
            });
        });
        return deferred;

    },
    logout (data) {
        let deferred = new Promise(function (resolve, reject) {
            Http.post(URL.logout, data || {}).then(result => {
                delete User.msg;
                sessionStorage.clear();
                resolve(User.msg);
            }, err => {
                reject(err);
            });
        });
        return deferred;
    },
    currentUser (data) {
        let deferred = new Promise(function (resolve, reject) {
            User.msg && User.msg.enterpriseNo ? resolve(User.msg) :
                Http.post(URL.currentUser, {
                    token: User.msg ? User.msg.token : ''
                }).then(result => {
                    let user = result.data || {};
                    if (user && user.enterpriseNo) {
                        user.loginUrl = User.msg && User.msg.loginUrl;
                        User.msg = user || {};
                        sessionStorage.setItem('user', JSON.stringify(User.msg));
                        resolve(user);
                    } else {
                        reject(User.msg = result.data);
                    }

                }, err => {
                    reject(err);
                });
        });
        return deferred;
    }
};

export default User;