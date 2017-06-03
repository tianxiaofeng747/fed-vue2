import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getter'

Vue.use(Vuex);
export const state = {
	userInfo:null, //用户信息
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})