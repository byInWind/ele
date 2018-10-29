<template>
    <div>
        <header>
            <div>
                <base-back></base-back>
                {{title}}
            </div>
        </header>
        <section>
            <div class="item-box">
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
        </section>
        <BaseGoodslist :restaurantsItems='restaurantsItems'></BaseGoodslist>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import {Swipe, SwipeItem} from 'mint-ui'

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: "goods",
        data: function () {
            return {
                sort_normal: '综合排序',
                restaurantsItems: [],
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
                imgBaseUrl2: '//elm.cangdu.org/img/', //生产环境图片域名地址
                categoryItems: [],
                title: '',  //标题
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
            this.title = this.$route.params.title || '美食外卖';
            let that = this;
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
            top: 84px;
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
