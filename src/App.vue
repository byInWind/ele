<template>
    <div id="app">
        <about v-if="xxx"></about>
        <!--<router-link v-if="xxx" to="/views/login/login">login</router-link>-->
    </div>
</template>
<script>
    import router from './router'
    import about from './views/About'

    export default {
        data: function () {
            return {
                xxx: true
            }
        },
        methods: {
            onLogin: function () {
            }
        },
        components: {
            about
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
        margin-top: 60px;
    }
</style>
