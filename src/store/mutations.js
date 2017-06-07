import {CHANGEUSER, REFRESH} from './mutation-types.js'

export default {
    //用户登入
    [CHANGEUSER](state, data) {
        state.userInfo = data;
        sessionStorage.setItem('user', JSON.stringify(state.userInfo));
    },
    //用户刷新,重新赋值
    [REFRESH](state, data){
        let user = JSON.parse(sessionStorage.getItem('user'));
        state.userInfo = user || null;
    }

}
