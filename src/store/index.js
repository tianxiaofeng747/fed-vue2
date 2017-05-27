import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getter'

Vue.use(Vuex);
const state = {
    count:1,
	User:{

    }
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})