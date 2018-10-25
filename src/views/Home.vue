<template>
    <div>
        <BaseInput ref="xx"></BaseInput>
        <router-link to="/views/goods-list/goods-list">点击进入</router-link>
        <h2>{{$refs.xx}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data: function () {
            return {

            }
        },
        created:function () {
            console.log(this.$refs.xx)
        }
    }
</script>
<style scoped>
    div {
        margin-top: 100px;
    }
</style>
