<template>
    <div>
        <span @click="jump" class="back"></span>
        <img :src="`${baseUrl}my.jpg`">

        <!--<img src="../../../public/my.jpg" alt="">-->
        <BaseFooter></BaseFooter>

    </div>
</template>

<script>
    import router from '../../router'
    export default {
        name: "my",
        data () {
            return {
                baseUrl: process.env.BASE_URL
            }
        },
        methods:{
            jump(){
                router.go(-1)
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
    img{
        width: 100% !important;
    }
    .back{
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
    } 
</style>
