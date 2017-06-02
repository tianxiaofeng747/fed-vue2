import { CHANGEUSER,REFRESH } from './mutation-types.js'


export default {
    //用户登入
    [CHANGEUSER](state, data) {
        state.userInfo = data;
        sessionStorage.setItem('user', JSON.stringify(state.userInfo));
    },
    //用户刷新
    [REFRESH](state, data){
        let user=sessionStorage.setItem('user');
        state.userInfo = user||null;
    }
  
}
