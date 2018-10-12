<template>
    <div>
        <header>
            <div><BaseBack></BaseBack>{{title}}</div>
        </header>
        <section>
            <div class="item-box">
                <ul>
                    <li class="firstList" @click="toggleBox">{{sortnormal}}</li>
                    <li @click="toSort(6,'销量最高')">销量最高</li>
                    <li @click="toSort(5,'距离最近')">距离最近</li>
                    <li class="active">筛选</li>
                </ul>
                <section class="layer none" @click="hideenBox">
                    <ol class="next-box">
                        <li :class="{ listActive: isActive==4 }" @click="toSort(4,'综合排序')">综合排序</li>
                        <li :class="{ listActive: isActive==6 }" @click="toSort(6,'销量最高')">销量最高</li>
                        <li :class="{ listActive: isActive==2 }" @click="toSort(2,'配送最快')">配送最快</li>
                        <li :class="{ listActive: isActive==3 }" @click="toSort(3,'评分最高')">评分最高</li>
                        <li :class="{ listActive: isActive==5 }" @click="toSort(5,'距离最近')">距离最近</li>
                        <li :class="{ listActive: isActive==1 }" @click="toSort(1,'起送价最低')">起送价最低</li>
                    </ol>
                </section>
            </div>
            <BaseGoodslist></BaseGoodslist>
        </section>
        <BaseGoodslist :restaurantsItems='restaurantsItems'></BaseGoodslist>
    </div>
</template>

<script>
    import Vue from 'vue'
    import router from '../router'
    import axios from 'axios'
    import {Swipe, SwipeItem} from 'mint-ui'
    import $ from 'jquery'
    import BaseFooter from "../components/BaseFooter";

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: "goods",
        components: {BaseFooter},
        data: function () {
            return {
                sortnormal: '综合排序',
                restaurantsItems: [],
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
                imgBaseUrl2: '//elm.cangdu.org/img/', //生产环境图片域名地址
                // isFixed: false
                categoryItems: [],
                isActive: 4, //筛选列表选中类型,
                title: ''  //标题
            }
        },
        methods: {
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
                this.isActive = num;
                $('.firstList').addClass('active')
            }
        },
        watch: {
            '$route'(to, from) {
                // 对路由变化作出响应...在调用一遍mounted的事件
                // console.log(to, from)

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
                    top: 0px;
                    color: #3190e8;
                }
            }
        }

    }

</style>
