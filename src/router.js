import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        }, {
            path: '/views/payment',
            name: 'payment',
            component: () => import('./views/payment.vue')
        }, {
            path: '/views/goods/:id',
            name: 'goods',
            component: () => import('./views/goods.vue')
        }, {
            path: '/views/login/login',
            name: 'login',
            component: () => import('./views/login/login.vue')
        },
        {
            path: '/views/search/search',
            name: 'search',
            component: () => import('./views/search/search.vue')
        },
        {
            path: '/views/goods-list/goods-list',
            name: 'goods-list',
            component: () => import('./views/goods-list/goods-list.vue')
        }, {
            path: '/views/shopDetails/shopDetails/:id',
            name: 'shopDetails',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/shopDetails/shopDetails.vue')
        }, {
            path: '/views/my/my',
            name: 'my',
            component: () => import('./views/my/my.vue')
        }
    ]
})
