<template>
    <div id="app">
        <base-loading v-show="fetchLoading"></base-loading>
        <router-view></router-view>
    </div>
</template>
<script>
    import store from './assets/vuex/store'
    import ss from 'amfe-flexible'

    export default {
        data: function () {
            return {}
        },
        computed: {
            fetchLoading() {
                return store.state.fetchLoading
            }
        }
    }
</script>
<style lang="scss">
    @import "/assets/css/base";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        font-size: 16px;
    }
</style>
