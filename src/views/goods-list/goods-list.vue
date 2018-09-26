<template>
    <div>
        <header>
            <div>地址</div>
            <input @click="search" type="search" placeholder="搜索饿了么商家、商品名称"/>
        </header>
        <section>
            <mt-swipe class="swipe" :auto="3000">
                <mt-swipe-item>
                    <ul>
                        <li v-for="(item, index) in imgs" :key="index"><img :src=item alt="">
                            <p>美食外卖</p></li>
                    </ul>
                </mt-swipe-item>
                <mt-swipe-item>
                    <ul>
                        <li v-for="(item, index) in imgs" :key="index"><img :src=item alt="">
                            <p>美食外卖</p></li>
                    </ul>
                </mt-swipe-item>
            </mt-swipe>

            <div class="recommend">-- 推荐商家 --</div>
            <div class="item-box ">
                <ul>
                    <li @click="togleBox">美食外卖</li>
                    <li>综合排序</li>
                    <li>距离最近</li>
                    <li>筛选</li>
                </ul>
                <ul class="next-box none">
                    <li>综合排序</li>
                    <li>销量最高</li>
                    <li>配送速度最快</li>
                    <li>评分最高</li>
                    <li>距离最近</li>
                    <li>起送价最低</li>
                </ul>
            </div>
            <div class="shop-item-box">
                <div v-for="(item,index) in items" :key="index" class="shop-item">
                    <section @click="jump(item.id)">
                        <!--<router-link :to='"/views/shopDetails/shopDetails/"+item.id'>-->
                        <!--<img :src="imgBaseUrl +item.image_path" alt="xxxx">-->
                        <img src="" alt="xxxx">
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
                imgs: ['https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg',
                    'https://fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/38/7bddb07503aea4b711236348e2632jpeg.jpeg', 'https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg',
                    'https://fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/38/7bddb07503aea4b711236348e2632jpeg.jpeg',
                    'https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg',
                    'https://fuss10.elemecdn.com/d/38/7bddb07503aea4b711236348e2632jpeg.jpeg'],
                items: [],
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
                // isFixed: false
            }
        }, methods: {
            search() {
                router.push('/views/search/search')
            },
            jump: function (id) {
                router.push({path: '/views/shopDetails/shopDetails/' + id})
            },
            togleBox() {
                $('.next-box').slideToggle()

            }
        },
        mounted: function () {
            var that = this;
            axios.get('https://elm.cangdu.org/shopping/restaurants', {
                params: {
                    latitude: 31.22967,
                    longitude: 121.4762
                }
            }).then(function (response) {
                console.log(response);
                that.items = response.data
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

    /*.fix {*/
    /*width: 100%;*/
    /*position: fixed !important;*/
    /*top: 97px;*/
    /*z-index: 100;*/
    /*height: 41px;*/
    /*background: white;*/
    /*border-bottom: 1px solid #ddd;*/
    /*}*/

    .item-box {
        /*height: 0;*/
        /*position: relative;*/
        position: sticky;
        top: 97px;
        z-index: 100;
        background: white;
        border-bottom: 1px solid #E9E9E9;
        font-size: 0;
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
