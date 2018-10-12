import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        fetchLoading: false
    },
    mutations: {
        showLoading(state,show) {
            state.fetchLoading = show
        }
    }
})
