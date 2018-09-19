import Vue from 'vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'

Vue.use(MintUI)

Vue.config.productionTip = false

new Vue({
    components: { App },
    router,
    render: h => h(App)
}).$mount('#app')
