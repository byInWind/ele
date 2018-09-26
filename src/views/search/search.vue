<template>
    <section>
        <header>
            <span class="left">&lt;</span>
            <input type="search" v-model="val" placeholder="搜索饿了么商家、商品名称"/>
            <span class="right" @click="search">搜索</span>
        </header>
        <BaseFooter></BaseFooter>
    </section>
</template>

<script>
    import axios from 'axios'

    export default {
        data: function () {
            return {
                val: null
            }
        }, name: "search",
        methods: {
            search() {
                axios.get('https://elm.cangdu.org/v4/restaurants', {
                    params: {
                        keyword: this.val
                    }
                }).then(function (response) {
                    console.log(response);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    header {
        height: 62px;
        line-height: 62px;
        position: relative;
        font-weight: bolder;
        .left {
            position: absolute;
            left: 0px;
            width: 50px;
            color: #999;
        }
        .right {
            position: absolute;
            right: 0px;
            color: #333;
            width: 60px;
        }
        input {
            width: 72%;
            margin: 0 auto;
            height: 44px;
            -webkit-appearance: none;
            background-color: #f8f8f8;
            font-size: .346667rem;
            color: #666;
            border: none;
            text-indent: 15px;
        }
    }


</style>
