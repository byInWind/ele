<template>
    <div>
        <header>
            <base-back></base-back>
            <!--<img :src="" alt="">-->
            {{shopDetailData.name}}
            <div class="shopDetailsBox">
                <div class="box-img">
                    <img src="//fuss10.elemecdn.com/f/8c/a0243ff6b05f952b127524b5bf99ajpeg.jpeg?imageMogr/format/webp/thumbnail/150x/">

                </div>
                <div class="img">
                    <span class="mini-tag">品牌</span>
                    <img class="index-3eDRn"
                         src="//fuss10.elemecdn.com/f/8c/a0243ff6b05f952b127524b5bf99ajpeg.jpeg?imageMogr/format/webp/thumbnail/150x/">
                </div><!---->
                <div class="title-box">
                    <h2 class="top"><span>田老师红烧肉(中关村图书大厦店)</span><i @click="showBox"
                                                                    class="">⬇</i></h2>
                    <div class="bottom"><span>评价4.7</span><span>月售2336单</span><span>蜂鸟专送<span>约20分钟</span></span>
                    </div>
                </div>
                <div class="index-3Zu2B"></div>
                <div @click="showDiscount" class="discount">
                    <div class="left">
                            <span class=""
                                  style="background-color: rgb(240, 115, 115);">满减</span>
                        <span class="">满10减5，满40减15，满70减25</span>
                    </div>
                    <div class="right">17个优惠</div>
                </div>
                <p class="index-TmrYy">公告：喜迎国庆、美食特惠</p></div>
        </header>
        {{ $route.params.id }}
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">点餐</mt-tab-item>
            <mt-tab-item id="2">评价</mt-tab-item>
            <mt-tab-item id="3">商家</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" style="text-align: left">
            <mt-tab-container-item id="1">
                1
                <div v-for="(item,index) in items" :key="index">{{item.name}}</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                2
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                3
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Navbar, TabItem} from 'mint-ui';
    import axios from 'axios'
    import BaseBack from "../../components/BaseBack";

    Vue.component(Navbar.name, Navbar);
    Vue.component(TabItem.name, TabItem);
    export default {
        name: "shopDetails",
        components: {BaseBack},
        data: function () {
            return {
                items: [],
                //需要是字符串类型，num类型无效
                selected: "1",
                showInfo: false,
                shopDetailData: null, //商铺详情
                showActivities: false, //是否显示活动详情
                menuList: [], //食品列表
                menuIndex: 0, //已选菜单索引值，默认为0
                menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
                shopListTop: [], //商品列表的高度集合
                TitleDetailIndex: null, //点击展示列表头部详情
                categoryNum: [], //商品类型右上角已加入购物车的数量
                totalPrice: 0, //总共价格
                cartFoodList: [], //购物车商品列表
                showCartList: false,//显示购物车列表
                receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
                ratingList: null, //评价列表
                ratingOffset: 0, //评价获取数据offset值
                ratingScoresData: null, //评价总体分数
                ratingTagsList: null, //评价分类列表
                ratingTageIndex: 0, //评价分类索引
                preventRepeatRequest: false,// 防止多次触发数据请求
                ratingTagName: '',//评论的类型
                loadRatings: false, //加载更多评论是显示加载组件
                foodScroll: null,  //食品列表scroll
                showSpecs: false,//控制显示食品规格
                specsIndex: 0, //当前选中的规格索引值
                choosedFoods: null, //当前选中视频数据
                showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
                showMoveDot: [], //控制下落的小圆点显示隐藏
                windowHeight: null, //屏幕的高度
                elLeft: 0, //当前点击加按钮在网页中的绝对top值
                elBottom: 0, //当前点击加按钮在网页中的绝对left值
                ratingScroll: null, //评论页Scroll
            }
        },
        methods: {
            focuss() {
                console.log(1)
            },
            showBox() {
                //alert()
                this.showInfo = true
            }
        },
        mounted: function () {
            var that = this;
            //食品列表
            axios.get('https://elm.cangdu.org/shopping/v2/menu', {
                params: {
                    latitude: 31.22967,
                    longitude: 121.4762,
                    restaurant_id: that.$route.params.id
                }
            }).then(function (response) {
                console.log(response);
                that.items = response.data
                // that.showLoading = false

            });
            //餐馆详情
            axios.get('https://elm.cangdu.org/shopping/restaurant/' + that.$route.params.id
            ).then(function (response) {
                console.log(response);
                that.shopDetailData = response.data

            });
        }
    }
</script>

<style scoped lang="scss">
    header{
        font-size: 14px;
        .shopDetailsBox {
            position: relative;
            .box-img {
                position: relative;
                overflow: hidden;
                height: 97px;
                img {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 9;
                    filter: blur(10px);
                }
            }
            .img {
                width: 20vw;
                height: 20vw;
                position: absolute;
                top: 97px;
                z-index: 9999;
                left: 50%;
                margin-left: -10vw;
                margin-top: -16vw;
                .mini-tag {
                    position: absolute !important;
                    top: -2px;
                    left: -3px;
                    border-top-left-radius: .8vw;
                    border-bottom-right-radius: .8vw;
                    background-image: linear-gradient(90deg, #fff100, #ffe339);
                    width: 7.866667vw;
                    height: 4.2vw;
                    font-size: 12px;
                    transform: scale(0.8);
                    color: #6f3f15;
                    font-weight: 700;
                }
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: .8vw;
                    box-shadow: 0 0 0.4vw 0 rgba(0, 0, 0, .2);
                }
            }
            .title-box {
                margin-top: 28px;
                h2 {
                    line-height: 18px;
                    span {
                        display: inline-block;
                        margin: 0 auto;
                        max-width: 72vw;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 18px;
                    }
                }
                .bottom {
                    margin-top: 1.733333vw;
                    font-size: .293333rem;
                    color: #666;
                }
            } 
            .discount {

            }
        }
    }
</style>

