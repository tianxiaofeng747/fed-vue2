import {CHANGEUSER} from './mutation-types.js'


export default {
    //用户登入
    [CHANGEUSER](state,data){
        state.userInfo=data;
        sessionStorage.setItem('user', JSON.stringify(state.userInfo));
    },
  
}
