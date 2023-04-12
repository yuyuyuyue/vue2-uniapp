// vuex 唯一入口文件
import Vue from 'vue';
import Vuex from 'vuex'
import state from './modules/state'
import * as getters from './modules/getters'
import * as  mutations from './modules/mutations'
import * as actions from './modules/actions'
Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
