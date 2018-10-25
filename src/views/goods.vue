<template>
    <div>
        <header>
            <div>
                <BaseBack></BaseBack>
                {{title}}
            </div>
        </header>
        <section>
            <div class="item-box">
                <BaseFilterList></BaseFilterList>
            </div>
            <BaseGoodslist></BaseGoodslist>
        </section>
        <BaseGoodslist :restaurantsItems='restaurantsItems'></BaseGoodslist>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import {Swipe, SwipeItem} from 'mint-ui'
    import BaseFooter from "../components/BaseFooter";

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: "goods",
        components: {BaseFooter},
        data: function () {
            return {
                restaurantsItems: [],
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
                imgBaseUrl2: '//elm.cangdu.org/img/', //生产环境图片域名地址
                categoryItems: [],
                title: ''  //标题
            }
        },
        mounted: function () {
            this.title = this.$route.params.title || '美食外卖';
            var that = this;
            // console.log(that.$route.params.id, this.$route.params)
            //商铺列表
            axios.get('https://elm.cangdu.org/shopping/restaurants', {
                params: {
                    latitude: 31.22967,
                    longitude: 121.4762,
                    restaurant_category_id: that.$route.params.id  //餐馆分类id
                }
            }).then(function (response) {
                // console.log(response);
                that.restaurantsItems = response.data
            });
            //食物分类列表
            axios.get('https://elm.cangdu.org/v2/index_entry', {
                params: {
                    latitude: 31.22967,
                    longitude: 121.4762
                }
            }).then(function (res) {
                // console.log(res);
                that.categoryItems = res.data
            });

            // window.onscroll = function () {
            //     console.log(that)
            //     var top = document.body.scrollTop || document.documentElement.scrollTop;
            //     if (top > 220) {
            //         console.log(1, that.isFixed)
            //         that.isFixed = true
            //     } else {
            //         that.isFixed = false
            //         console.log(2, that.isFixed)
            //     }
            // }
        }
    }
</script>

<style lang="scss" scoped>
    footer /deep/ ul.footer li:nth-child(1) {
        a {
            color: #3190e8;
        }
    }

    header {
        background-image: linear-gradient(90deg, #0af, #0085ff);
        color: #fff;
        padding: 10px 15px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
        div {
        }
    }

    .swipe {
        margin-top: 97px;
        height: 177px;
        /*background-color: #7457ff;*/
        ul {
            font-size: 0;
            li {
                display: inline-block;
                width: 20%;
                padding: 10px 0;
                img {
                    width: 45px;
                    height: 45px;
                }
                p {
                    font-size: 12px;
                    color: #666;
                }
            }
        }
    }

    .recommend {
        margin: 10px 0;
    }

    .item-box {
        width: 100%;
        position: fixed !important;
        top: 43px;
        z-index: 1;
        background: white;
        border-bottom: 1px solid #E9E9E9;
        font-size: 0;
    }

</style>
