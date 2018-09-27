<template>
    <div>
        <header>
            <div>地址</div>
            <input @click="search" type="search" placeholder="搜索饿了么商家、商品名称"/>
        </header>
        <section>
            <mt-swipe class="swipe" :auto="0">
                <mt-swipe-item>
                    <ul>
                        <li v-for="(item,index) in categoryItems" :key="index">
                            <img :src="imgBaseUrl + item.image_url">
                            <p>{{item.title}}</p></li>
                    </ul>
                </mt-swipe-item>
                <mt-swipe-item>
                    <ul>
                        <li v-if="index>10" v-for="(item,index) in categoryItems" :key="index">
                            <img :src="imgBaseUrl + item.image_url">
                            <p>{{item.title}}</p></li>
                    </ul>
                </mt-swipe-item>
            </mt-swipe>

            <div class="recommend">-- 推荐商家 --</div>
            <div class="item-box">
                <ul>
                    <li class="sendFood" @click="toggleBox">{{sortnormal}}</li>
                    <li @click="toSort(6,'销量最高')">销量最高</li>
                    <li @click="toSort(5,'距离最近')">距离最近</li>
                    <li class="active">筛选</li>
                </ul>
                <section class="layer none" @click="hideenBox">
                    <ol class="next-box">
                        <li @click="toSort(4,'综合排序')">综合排序</li>
                        <li @click="toSort(6,'销量最高')">销量最高</li>
                        <li @click="toSort(2,'配送速度最快')">配送速度最快</li>
                        <li @click="toSort(3,'评分最高')">评分最高</li>
                        <li @click="toSort(5,'距离最近')">距离最近</li>
                        <li @click="toSort(1,'起送价最低')">起送价最低</li>
                    </ol>
                </section>
            </div>
            <div class="shop-item-box">
                <div v-for="(item,index) in restaurantsItems" :key="index" class="shop-item">
                    <section @click="jump(item.id)">
                        <!--<router-link :to='"/views/shopDetails/shopDetails/"+item.id'>-->
                        <img :src="imgBaseUrl2 +item.image_path" alt="xxxx">
                        <!--<img src="" alt="xxxx">-->
                        <div class="center">
                            <h4 class="title"><span class="brand">品牌</span>{{item.name}}</h4>
                            <p class="info">评分：45 月售4518单</p>
                            <p class="tips">¥20起送 {{item.piecewise_agent_fee.tips}}</p>
                        </div>
                        <div class="center-right">
                            <p>...</p>
                            <p class="info" v-if="item.delivery_mode"><span>{{item.delivery_mode.text}}</span></p>
                            <p>{{item.distance}} | {{item.order_lead_time}}</p>
                        </div>
                        <!--</router-link>-->
                    </section>
                </div>
            </div>
        </section>
        <BaseFooter></BaseFooter>
        <BaseLoading v-if="loading"></BaseLoading>
    </div>
</template>

<script>
    import Vue from 'vue'
    import router from '../../router'
    import axios from 'axios'
    import {Swipe, SwipeItem} from 'mint-ui'
    import $ from 'jquery'
    import BaseFooter from "../../components/BaseFooter";

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: "goods-list",
        components: {BaseFooter},
        data: function () {
            return {
                sortnormal: '美食外卖',
                restaurantsItems: [],
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
                imgBaseUrl2: '//elm.cangdu.org/img/', //生产环境图片域名地址
                // isFixed: false
                categoryItems: [],
                loading: false
            }
        }, methods: {
            search() {
                router.push('/views/search/search')
            },
            jump: function (id) {
                router.push({path: '/views/shopDetails/shopDetails/' + id})
            },
            toggleBox() {
                if ($('.layer').css('display') == "block") {
                    $('.item-box').removeClass('fix');
                    $('body').css('overflow', 'auto');

                } else {
                    $('.item-box').addClass('fix');
                    //禁止滚动
                    $('body').css('overflow', 'hidden')
                }
                $('.layer').slideToggle();
            },
            hideenBox() {
                $('.layer').slideUp(50)
                $('body').css('overflow', 'auto');
                $('.item-box').removeClass('fix');
            },
            toSort(num, mesg) {
                var that = this;
                axios.get('https://elm.cangdu.org/shopping/restaurants', {
                    params: {
                        latitude: 31.22967,
                        longitude: 121.4762,
                        order_by: num
                    }
                }).then(function (response) {
                    // console.log(response);
                    that.restaurantsItems = response.data
                });
                this.sortnormal = mesg;
            }
        },
        mounted: function () {
            var that = this;
            //商铺列表
            axios.get('https://elm.cangdu.org/shopping/restaurants', {
                params: {
                    latitude: 31.22967,
                    longitude: 121.4762
                }
            }).then(function (response) {
                console.log(response);
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
            padding-bottom: 10px;
            text-align: left;
        }
        input {
            width: 100%;
            height: 44px;
            -webkit-appearance: none;
            background-color: #f8f8f8;
            font-size: 15px;
            color: #666;
            border: none;
            text-indent: 15px;
            text-align: center;
            border-radius: 2px;
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

    .fix {
        width: 100%;
        position: fixed !important;
        top: 97px;
        z-index: 1;
        /*height: 41px;*/
        background: white;
        /*border-bottom: 1px solid #ddd;*/
    }

    .item-box {
        /*height: 0;*/
        /*position: relative;*/
        position: sticky;
        top: 97px;
        z-index: 1;
        background: white;
        border-bottom: 1px solid #E9E9E9;
        font-size: 0;
        .active {
            color: black;
            font-weight: bold;
        }
        li {
            display: inline-block;
            width: 25%;
            margin: 10px 0;
            font-size: 14px;
            color: #3a3838;
            border-right: 1px solid #c3c1c1;
        }
        li:nth-child(4) {
            border: none;
        }
        .layer {
            position: fixed;
            width: 100%;
            top: 138px;
            left: 0;
            background-color: rgba(0, 0, 0, 0.3);
            height: 73vh;
            .next-box {
                width: 100%;
                position: absolute;
                background: white;
                border-bottom: 1px solid #E9E9E9;
                li {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    text-align: left;
                    padding-left: 30px;
                    border-right: none;
                }
            }
        }

    }

    .shop-item-box {
        /*margin-top: 41px;*/
        color: #666;
        text-align: left;
        font-size: 12px;
        margin-bottom: 50px;
        .shop-item {
            border-top: 1px solid #e9e9e9;
            section {
                padding: 20px 10px;
                display: block;
                color: #666;
                position: relative;
                img {
                    width: 64px;
                    height: 64px;
                    margin-right: 10px;
                    display: inline-block;
                }
                .center {
                    display: inline-block;
                    position: absolute;
                    .title {
                        color: black;
                        font-size: 14px;
                    }
                    .info {
                        margin: 5px 0;
                    }
                }
                .center-right {
                    text-align: right;
                    float: right;
                    .info {
                        margin: 5px 0;
                        span {
                            color: #fff;
                            border: .133333vw solid #0097ff;
                            background-image: -webkit-linear-gradient(45deg, #0085ff, #0af);
                            background-image: linear-gradient(45deg, #0085ff, #0af);
                        }
                    }
                }
            }
        }
    }
</style>
