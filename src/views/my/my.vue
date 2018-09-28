<template>
    <div>
        <BaseBack></BaseBack>
        <img :src="`${baseUrl}my.jpg`">

        <!--<img src="../../../public/my.jpg" alt="">-->
        <BaseFooter></BaseFooter>

    </div>
</template>

<script>
    export default {
        name: "my",
        data() {
            return {
                baseUrl: process.env.BASE_URL
            }
        }
    }
</script>

<style lang="scss" scoped>
    footer /deep/ ul.footer li:nth-child(4) {
        a {
            color: #3190e8;
        }
    }

    img {
        width: 100% !important;
    }

</style>
