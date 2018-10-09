<template>
    <div>
        <header>
            <base-back></base-back>
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
                    <h2 class="top"><span>{{shopDetailData.name}}</span><i @click="showBox"
                                                                           class="">⬇</i></h2>
                    <div class="bottom">
                        <span>评价{{shopDetailData.rating}}</span><span>月售{{shopDetailData.recent_order_num}}单</span><span>蜂鸟快送<span>约20分钟</span></span>
                    </div>
                </div>
                <div class="index-3Zu2B"></div>
                <div @click="showDiscount" class="discount">
                    <div class="left">
                        <span class="jian">满减</span>
                        <span class="">满10减5，满40减15，满70减25</span>
                    </div>
                    <div class="right">17个优惠</div>
                </div>
            </div>
        </header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">点餐</mt-tab-item>
            <mt-tab-item id="2">评价</mt-tab-item>
            <mt-tab-item id="3">商家</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" style="text-align: left">
            <mt-tab-container-item id="1">
                <div v-for="(item,index) in items" :key="index">{{item.name}}</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="rating_header">
                    <section class="rating_header_left">
                        <p>{{shopDetailData.rating}}</p>
                        <p>综合评价</p>
                        <p>高于周边商家{{(ratingScoresData.compare_rating*100).toFixed(1)}}%</p>
                    </section>
                    <section class="rating_header_right">
                        <p>
                            <span>服务态度</span>
                            <rating-star :rating='ratingScoresData.service_score'></rating-star>
                            <span class="rating_num">{{ratingScoresData.service_score.toFixed(1)}}</span>
                        </p>
                        <p>
                            <span>菜品评价</span>
                            <rating-star :rating='ratingScoresData.food_score'></rating-star>
                            <span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>
                        </p>
                        <p>
                            <span>送达时间</span>
                            <span class="delivery_time">{{shopDetailData.order_lead_time}}分钟</span>
                        </p>
                    </section>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <section class="shop_status_info">
                    <header>商家信息</header>
                    <p>{{shopDetailData.name}}</p>
                    <p>地址：{{shopDetailData.address}}</p>
                    <p>营业时间：[{{shopDetailData.opening_hours[0]}}]</p>
                    <p @click="showLicenseImg(shopDetailData.license.business_license_image)">
                        <span>营业执照</span>
                        <img src="" alt="">
                    </p>
                    <p @click="showLicenseImg(shopDetailData.license.catering_service_license_image)">
                        <span>餐饮服务许可证</span>
                        <img src="" alt="">
                    </p>
                </section>
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
            },
            showDiscount() {

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
                console.log('items', response);
                that.items = response.data
                // that.showLoading = false

            });
            //餐馆详情
            axios.get('https://elm.cangdu.org/shopping/restaurant/' + that.$route.params.id
            ).then(function (response) {
                console.log(response);
                that.shopDetailData = response.data

            });
            //评价列表
            axios.get('https://elm.cangdu.org/ugc/v2/restaurants/' + that.$route.params.id + '/ratings'
            ).then(function (response) {
                console.log(response);
                that.ratingList = response.data

            });
            //评价分数
            axios.get('https://elm.cangdu.org/ugc/v2/restaurants/' + that.$route.params.id + '/ratings/scores'
            ).then(function (response) {
                console.log('aaaa', response);
                that.ratingScoresData = response.data

            });
        }
    }
</script>

<style scoped lang="scss">
    header {
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
                    span + span {
                        margin-left: 7px;
                    }
                }
            }
            .discount {
                display: flex;
                justify-content: space-between;
                margin-top: .5rem;
                padding-right: 1rem;
                font-size: 13px;
                .left {
                    width: 84%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .jian {
                        padding: 0 3px;
                        margin-right: 3px;
                        border-radius: .1rem;
                        font-size: .4rem;
                        display: inline-block;
                        color: #fff;
                        background-color: rgb(240, 115, 115);
                        border-color: rgb(240, 115, 115)
                    }
                }
            }
        }
    }

    .rating_header {
        display: flex;
        background-color: #fff;
        padding: .8rem .5rem;
        margin-bottom: 0.5rem;
        .rating_header_left {

        }
        .rating_header_right {
            flex: 4;
            p {
                font-size: .65rem;
                line-height: 1rem;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                span:nth-of-type(1) {
                    color: #666;
                    margin-right: .5rem;
                }
                .rating_num {
                    width: 3rem;
                }
                .delivery_time {
                }
            }
        }
    }

    .activities_container {
        background-color: #fff;
        margin: .4rem 0;
        padding-bottom: .6rem;
        header {
            line-height: 1.8rem;
            padding-left: .6rem;
            border-bottom: 1px solid #f1f1f1;
            margin-bottom: .3rem;
        }
        .actibities_ul {
            padding: 0 .6rem;
            li {
                margin-bottom: .2rem;
                span:nth-of-type(1) {
                    padding: .1rem;
                    border: 1px;
                    border-radius: 0.1rem;
                    margin-right: .2rem;
                }
                span:nth-of-type(2) {
                }
            }
        } 
    } 
</style>
