import Http from '@/services/Http';
import {RECORD_USERINFO} from '@/store/mutation-types.js';
const URL = {
    login: 'login',
    currentUser: 'currentUser',
    logout: 'logout'
}
let User = {
    login (data) {
        return new Promise(function (resolve, reject) {
            Http.post(URL.login, data || {}).then(result => {
                User.msg = result.data || {};
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

    },
    logout (data) {
        return new Promise(function (resolve, reject) {
            Http.post(URL.logout, data || {}).then(result => {
                delete User.msg;
                sessionStorage.clear();
                resolve(result);
            }, err => {
                reject(err);
            });
        });

    },
    currentUser () {
        return new Promise(function (resolve, reject) {
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
    }
};

export default User;