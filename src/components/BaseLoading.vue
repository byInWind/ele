<template>
    <div id="loading">loading</div>
</template>

<script>
    export default {
        name: "BaseLoading",
        data() {
            return {
                loading: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    #loading {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 999999;
        background-color: rgba(0, 0, 0, 0.3);
    }
</style>
