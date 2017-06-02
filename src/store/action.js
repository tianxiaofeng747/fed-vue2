import Http from '@/services/Http';
export default {
    login(context, data) {
        return new Promise(function (resolve, reject) {
            Http.post('login', data).then(result => {
                let userinfo = result.data || {};
                if (userinfo.data) {
                    context.commit('CHANGEUSER', userinfo.data);
                    resolve(userinfo);
                } else {
                    reject(userinfo);
                }
            }, err => {
                reject(err);
            });
        });
    },
    logout(context, data) {
        return new Promise(function (resolve, reject) {
            Http.post('currentUser', data).then(result => {
                context.commit('CHANGEUSER', null);
                sessionStorage.clear();
                resolve(result);
            }, err => {
                reject(err);
            });
        });

    },
    currentUser({commit, state }) {
        return new Promise(function (resolve, reject) {
            state.userInfo && state.userInfo.enterpriseNo ? resolve(state.userInfo) :
                Http.post('currentUser', {
                    token: state.userInfo ? state.userInfo.token : ''
                }).then(result => {
                    let user = result.data || {};
                    if (user && user.enterpriseNo) {
                        user.loginUrl = state.userInfo && state.userInfo.loginUrl;
                        commit('CHANGEUSER', user);
                        resolve(user);
                    } else {
                        commit('CHANGEUSER', result.data);
                        resolve();
                    }

                }, err => {
                    reject(err);
                });
        });
    }

}