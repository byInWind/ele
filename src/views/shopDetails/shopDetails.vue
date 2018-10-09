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
                <!--<div v-for="(item,index) in items" :key="index">{{item.name}}</div>-->
                <section class="menu_container">
                    <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
                        <ul>
                            <li v-for="(item,index) in menuList" :key="index" class="menu_left_li"
                                :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                                <span>{{item.name}}</span>
                                <span class="category_num">11</span>
                            </li>
                        </ul>
                    </section>
                    <section class="menu_right" ref="menuFoodList">
                        <ul>
                            <li v-for="(item,index) in menuList" :key="index">
                                <header class="menu_detail_header">
                                    <section class="menu_detail_header_left">
                                        <strong class="menu_item_title">{{item.name}}</strong>
                                        <span class="menu_item_description">{{item.description}}</span>
                                    </section>
                                    <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                                    <p class="description_tip" v-if="index == TitleDetailIndex">
                                        <span>{{item.name}}</span>
                                        {{item.description}}
                                    </p>
                                </header>
                                <section v-for="(foods,foodindex) in item.foods" :key="foodindex"
                                         class="menu_detail_list">
                                    <router-link
                                            :to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}"
                                            tag="div" class="menu_detail_link">
                                        <section class="menu_food_img">
                                            <img :src="imgBaseUrl + foods.image_path">
                                        </section>
                                        <section class="menu_food_description">
                                            <h3 class="food_description_head">
                                                <strong class="description_foodname">{{foods.name}}</strong>
                                                <ul v-if="foods.attributes.length" class="attributes_ul">
                                                    <li v-for="(attribute, foodindex) in foods.attributes"
                                                        :key="foodindex"
                                                        :style="{color: '#' + attribute.icon_color,borderColor:'#' +attribute.icon_color}"
                                                        :class="{attribute_new: attribute.icon_name == '新'}">
                                                        <p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">
                                                            {{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>
                                                    </li>
                                                </ul>

                                            </h3>
                                            <p class="food_description_content">{{foods.description}}</p>
                                            <p class="food_description_sale_rating">
                                                <span>月售{{foods.month_sales}}份</span>
                                                <span>好评率{{foods.satisfy_rate}}%</span>
                                            </p>
                                            <p v-if="foods.activity" class="food_activity">
                                                <span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                                            </p>
                                        </section>
                                    </router-link>
                                    <footer class="menu_detail_footer">
                                        <section class="food_price">
                                            <span>¥</span>
                                            <span>{{foods.specfoods[0].price}}</span>
                                            <span v-if="foods.specifications.length">起</span>
                                        </section>
                                        <buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart"
                                                  @showChooseList="showChooseList" @showReduceTip="showReduceTip"
                                                  @showMoveDot="showMoveDotFun"></buy-cart>
                                    </footer>
                                </section>
                            </li>
                        </ul>
                    </section>
                </section>

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
                imgBaseUrl: '//elm.cangdu.org/img/',
                //需要是字符串类型，num类型无效
                selected: "1",
                showInfo: false,
                shopDetailData: null, //商铺详情
                showActivities: false, //是否显示活动详情
                menuList: [], //食品分类列表
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

            },
            //点击左侧食品列表标题，相应列表移动到最顶层
            chooseMenu(index) {
                this.menuIndex = index;
            },
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
                console.log('menuList', response);
                that.menuList = response.data
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

    .menu_container {
        display: flex;
        flex: 1;
        overflow-y: hidden;
        position: relative;
        .menu_left {
            background-color: #f5f5f5;
            width: 3.8rem;
            .menu_left_li {
                padding: .7rem .3rem;
                border-bottom: 0.025rem solid #ededed;
                box-sizing: border-box;
                border-left: 0.15rem solid #f8f8f8;
                position: relative;
                span {
                }
                .category_num {
                    position: absolute;
                    top: .1rem;
                    right: .1rem;
                    background-color: #ff461d;
                    line-height: 15px;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.025rem solid #ff461d;
                    min-width: .6rem;
                    height: 15px;
                    font-family: Helvetica Neue, Tahoma, Arial;
                    padding: 0px 4px;
                    color: white;
                    font-size: 12px;
                }
            }
            .activity_menu {
                border-left: 0.15rem solid #3190e8;
                background-color: #fff;
                span:nth-of-type(1) {
                    font-weight: bold;
                }
            }
        }
        .menu_right {
            flex: 4;
            overflow-y: auto;
            .menu_detail_header {
                width: 100%;
                padding: .4rem;
                position: relative;
                align-items: center;
                .menu_detail_header_left {
                    background-color: #f5f5f5;
                    width: 11rem;
                    white-space: nowrap;
                    overflow: hidden;
                    .menu_item_title {
                        font-weight: bold;
                    }
                    .menu_item_description {
                        width: 30%;
                        overflow: hidden;
                    }
                }
                .menu_detail_header_right {
                    display: block;
                    background-size: 100% .4rem;
                    background-position: left center;
                }
                .description_tip {
                    background-color: #39373a;
                    opacity: 0.95;
                    position: absolute;
                    top: 1.5rem;
                    z-index: 14;
                    width: 8rem;
                    right: .2rem;
                    padding: .5rem .4rem;
                    border: 1px;
                    border-radius: .2rem;
                    span {
                        color: #fff;
                        line-height: .6rem;
                        font-size: .55rem;
                    }
                }
                .description_tip::after {
                    content: '';
                    position: absolute;
                    background-color: #39373a;
                    top: -.5rem;
                    right: .7rem;
                    transform: rotate(-45deg) translateY(.41rem);
                }
            }
            .menu_detail_list {
                background-color: #fff;
                padding: .6rem .4rem;
                border-bottom: 1px solid #f8f8f8;
                position: relative;
                overflow: hidden;
                .menu_detail_link {
                    display: flex;
                    .menu_food_img {
                        margin: 0 10px;
                        img {
                            width: 52px;
                            height: 100%;
                            display: block;
                        }
                    }
                    .menu_food_description {
                        width: 100%;
                        .food_description_head {
                            display: flex;
                            -ms-flex-pack: justify;
                            justify-content: space-between;
                            margin-bottom: .2rem;
                            .description_foodname {
                            }
                            .attributes_ul {
                                display: flex;
                                li {
                                    font-size: .3rem;
                                    height: .6rem;
                                    line-height: .35rem;
                                    padding: .1rem;
                                    border: 1px solid #666;
                                    border-radius: 0.3rem;
                                    margin-right: .1rem;
                                    transform: scale(.8);
                                    p {
                                        white-space: nowrap;
                                    }
                                }
                                .attribute_new {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    background-color: #4cd964;
                                    display: flex;
                                    align-items: flex-end;
                                    transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                                    border: none;
                                    border-radius: 0;
                                    p {
                                        text-align: center;
                                        flex: 1;
                                    }
                                }
                            }
                        }
                        .food_description_content {
                            line-height: 15px;
                            font-size: 13px;
                            color: #999;
                        }
                        .food_description_sale_rating {
                            line-height: 15px;
                            font-size: 13px;
                            span {
                            }
                        }
                        .food_activity {
                            line-height: 13px;
                            span {
                                font-size: .3rem;
                                border: 1px solid currentColor;
                                border-radius: 0.3rem;
                                padding: .08rem;
                                display: inline-block;
                                transform: scale(.8);
                                margin-left: -0.35rem;

                            }
                        }
                    }
                }
                .menu_detail_footer {
                    margin-left: 2.4rem;
                    font-size: 0;
                    margin-top: .3rem;
                    .food_price {
                        span {
                            font-family: 'Helvetica Neue', Tahoma, Arial;
                        }
                        span:nth-of-type(1) {
                            margin-right: .05rem;
                        }
                        span:nth-of-type(2) {
                            font-weight: bold;
                            margin-right: .3rem;
                        }
                        span:nth-of-type(3) {
                        }
                    }
                }
            }
        }
    }
</style>
