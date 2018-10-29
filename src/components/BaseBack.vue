<template>
    <span @click="jump" class="back">&lt;</span>
</template>

<script>
    import router from '../router'

    export default {
        name: "BaseBack",
        methods: {
            jump() {
                router.go(-1)
            }
        }
    }
</script>

<style scoped>

    .back {
        position: absolute;
        top: 0;
        padding-top: 10px;
        left: 0;
        z-index: 999;
        width: 43px;
        text-align: center;
        height: 43px;
    }
</style>
