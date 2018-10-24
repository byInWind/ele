import Vue from 'vue'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import axios from 'axios'

import store from './assets/vuex/store';

Vue.use(MintUI);
//封装axios的      全局loading
axios.interceptors.request.use(function (config) {
    // Do something before request is sent,
    // 这里用store是因为不用的话在这里无法获取和改变页面值的状态
    store.commit('showLoading', true)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Do something with response data
    setTimeout(function () {
        store.commit('showLoading', false)
    }, 500);
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

//全局注册组件(不用import导入就能直接用)-------开始
const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 剥去文件名开头的 `./` 和结尾的扩展名
            fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
    )

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
});
//全局注册组件结束

Vue.config.productionTip = false;

new Vue({
    components: {App},
    router,
    render: h => h(App)
}).$mount('#app')
