<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    // import router from './router'

    export default {
        data: function () {
            return {
                xxx: true
            }
        },
        methods: {
            onLogin: function () {
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
    }
</style>
