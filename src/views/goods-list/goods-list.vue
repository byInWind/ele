<template>
    <div class="body" :class="{over_hide: toggle_layer == false}">
        <header>
            <div>地址</div>
            <router-link to="/views/search/search">
                <input type="search" placeholder="搜索饿了么商家、商品名称"/>
            </router-link>
        </header>
        <section>
            <mt-swipe class="swipe" :auto="0">
                <mt-swipe-item>
                    <ul>
                        <li v-if="index<10" v-for="(item,index) in categoryItems" :key="index">
                            <router-link :to="{ name: 'goods', query: { id: item.id,title:item.title }}">
                                <img :src="imgBaseUrl + item.image_url">
                                <p>{{item.title}}</p>
                            </router-link>
                        </li>
                    </ul>
                </mt-swipe-item>
                <mt-swipe-item>
                    <ul>
                        <li v-if="index>=10" v-for="(item,index) in categoryItems" :key="index">
                            <router-link :to="{ name: 'goods', query: { id: item.id,title:item.title }}">
                                <img :src="imgBaseUrl + item.image_url">
                                <p>{{item.title}}</p>
                            </router-link>
                        </li>
                    </ul>
                </mt-swipe-item>
            </mt-swipe>

            <div class="recommend">-- 推荐商家 --</div>
            <div class="item-box" :class="{fix: toggle_layer == false}">
                <ul>
                    <li class="firstList" :class="{ active: isActive!=4 }" @click="toggle_layer = false">
                        {{sort_normal}}
                    </li>
                    <li @click="toSort(arr[1])">销量最高</li>
                    <li @click="toSort(arr[4])">距离最近</li>
                    <li class="active">筛选</li>
                </ul>
                <section class="layer" :class="{ none: toggle_layer }" @click="toggle_layer = true">
                    <ol class="next-box">
                        <li v-for="(item,index) in arr" :key="index" :class="{ listActive: isActive==item.index }"
                            @click="toSort(item)">{{item.name}}
                        </li>
                    </ol>
                </section>
            </div>
            <BaseGoodslist :restaurantsItems='restaurantsItems'></BaseGoodslist>
        </section>
        <BaseFooter></BaseFooter>
    </div>
</template>

<script>
    import Vue from 'vue'
    import router from '../../router'
    import axios from 'axios'
    import {Swipe, SwipeItem} from 'mint-ui'

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: "goods-list",
        data: function () {
            return {
                sort_normal: '综合排序',
                restaurantsItems: [],
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
                imgBaseUrl2: '//elm.cangdu.org/img/', //生产环境图片域名地址
                categoryItems: [],
                isActive: '4', //筛选列表选中类型
                toggle_layer: true,  //显示layer的变量
                arr: [
                    {index: 4, name: '综合排序'},
                    {index: 6, name: '销量最高'},
                    {index: 2, name: '配送最快'},
                    {index: 3, name: '评分最高'},
                    {index: 5, name: '距离最近'},
                    {index: 1, name: '起送价最低'}
                ],
            }
        },
        methods: {
            jump: function (id) {
                router.push({path: '/views/shopDetails/shopDetails/' + id})
            },
            toSort(item) {
                let that = this;
                axios.get('https://elm.cangdu.org/shopping/restaurants', {
                    params: {
                        latitude: 31.22967,
                        longitude: 121.4762,
                        order_by: item.index
                    }
                }).then(function (response) {
                    that.restaurantsItems = response.data

                });
                this.sort_normal = item.name;
                this.isActive = item.index
            }
        },
        mounted: function () {
            let that = this;
            //商铺列表
            axios.get('https://elm.cangdu.org/shopping/restaurants', {
                params: {
                    latitude: 31.22967,
                    longitude: 121.4762,
                }
            }).then(function (response) {
                that.restaurantsItems = response.data

            });
            //食物分类列表
            axios.get('https://elm.cangdu.org/v2/index_entry', {
                params: {
                    latitude: 31.22967,
                    longitude: 121.4762
                }
            }).then(function (res) {
                that.categoryItems = res.data
            });
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ .shop-item-box {
        margin-top: -1px;
    }

    .body {
        height: 100vh;
        overflow: auto;
    }

    .over_hide {
        overflow: hidden;
    }

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
        ul {
            font-size: 0;
            text-align: left;
            li {
                display: inline-block;
                width: 20%;
                padding: 10px 0;
                text-align: center;
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
            height: 100%;
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
                    position: relative;
                }
                .listActive {
                    color: #3190e8;
                    font-weight: bold;
                }
                .listActive:after {
                    content: '√';
                    position: absolute;
                    right: 33px;
                    top: 0;
                    color: #3190e8;
                }
            }
        }
    }
</style>
