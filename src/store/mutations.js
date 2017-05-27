import {CHANGE_NUM} from './mutation-types.js'


export default {

    [CHANGE_NUM](state,num){
        state.count += num;
    }
}
