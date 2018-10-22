<!--suppress VueDuplicateTag -->
<template>
    <div>
        <header>
            <base-back></base-back>
            <div class="shopDetailsBox">
                <div class="box-img">
                    <img v-if="shopDetailData" :src="imgBaseUrl+shopDetailData.image_path">

                </div>
                <div class="img">
                    <span class="mini-tag">品牌</span>
                    <img class="index-3eDRn"
                         v-if="shopDetailData" :src="imgBaseUrl+shopDetailData.image_path">
                </div><!---->
                <div class="title-box" v-if="shopDetailData">
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
        <mt-navbar class="toggleItem" v-model="selected">
            <mt-tab-item id="1">点餐</mt-tab-item>
            <mt-tab-item id="2">评价</mt-tab-item>
            <mt-tab-item id="3">商家</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" class="itemBox">
            <mt-tab-container-item id="1" class="spcItemBox">
                <section class="menu_container" v-if="menuList">
                    <section class="menu_left" id="wrapper_menu">
                        <ul>
                            <li v-for="(item,index) in menuList" :key="index" class="menu_left_li"
                                :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                                <span>{{item.name}}</span>
                                <span class="category_num" v-if="categoryNum[index]>0">{{categoryNum[index]}}</span>
                            </li>
                        </ul>
                    </section>
                    <section class="menu_right">
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
                                    <router-link to=""
                                                 tag="div" class="menu_detail_link">
                                        <section class="menu_food_img">
                                            <img :src="imgBaseUrl + foods.image_path">
                                        </section>
                                        <section class="menu_food_description">
                                            <h4 class="food_description_head">
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

                                            </h4>
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
                                            <div class="food_price-div">
                                                <!--选购商品的按钮,,,用了一个可能不是num的值-->
                                                <!--需要一个小动画-->
                                                <transition name="animate1">
                                                    <section v-if="foods.__v>0">
                                                        <img @click="minusShops(foods)" class="minus"
                                                             :src="`${baseUrl}-.png`" alt="">
                                                        <i>{{foods.__v}}</i>
                                                    </section>
                                                </transition>
                                                <img @click="addShops(foods)" class="add" :src="`${baseUrl}+.png`"
                                                     alt="">
                                            </div>
                                        </section>
                                    </footer>
                                </section>
                            </li>
                        </ul>
                    </section>
                </section>
                <section class="buy_cart_container" v-if="shopDetailData">
                    <section @click="toggleFoodList" class="cart_icon_num">
                        <!--价格大于0添加class-->
                        <div class="cart_icon_container"
                             :class="{cart_icon_activity:totalPrice > 0,move_in_cart: addClick}">
                                <span v-if="totalNum>0" class="cart_list_length">
                                    {{totalNum}}
                                </span>
                            <img :src="`${baseUrl}buy1.png`" class="cart_icon"/>
                        </div>
                        <div class="cart_num">
                            <div>¥ {{totalPrice}}</div>
                            <div>配送费: {{shopDetailData.float_delivery_fee}}元</div>
                        </div>
                    </section>
                    <section class="gotopay"
                             :class="shopDetailData.float_minimum_order_amount-totalPrice<=0? 'gotopay_acitvity':''">
                        <span v-if="shopDetailData.float_minimum_order_amount-totalPrice<=0?false:true"
                              class="gotopay_button_style">还差¥{{shopDetailData.float_minimum_order_amount}}起送</span>
                        <router-link to="/views/payment"
                                     v-if="shopDetailData.float_minimum_order_amount-totalPrice<=0?true:false"
                                     class="gotopay_button_style">去结算
                        </router-link>
                    </section>
                </section>
                <transition name="toggle-cwart">
                    <div class="fill_box" v-if="showFoodsList" @click="showFoodsList = false">
                        <section class="cart_food_list">
                            <header>
                                <h4>购物车</h4>
                                <div>
                                    <img :src="`${baseUrl}del.png`" alt="">
                                    <span class="clear_cart">清空</span>
                                </div>
                            </header>
                            <section class="cart_food_details" id="cartFood">
                                <ul>
                                    <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                                        <div class="cart_list_num">
                                            <p class="ellipsis">{{item.name}}</p>
                                            <p class="ellipsis">{{item.specs}}</p>
                                        </div>
                                        <div class="cart_list_price">
                                            <span>¥</span>
                                            <span>{{item.price}}</span>
                                        </div>
                                        <section class="cart_list_control">
                                            <span>
                                               <img :src="`${baseUrl}-.png`" alt="">
                                            </span>
                                            <span class="cart_num">{{item.num}}</span>
                                            <img :src="`${baseUrl}+.png`" alt="" class="cart_add">
                                        </section>
                                    </li>
                                </ul>
                            </section>
                        </section>
                    </div>
                </transition>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="rating_header" v-if="ratingScoresData">
                    <section class="rating_header_left">
                        <b>{{ratingScoresData.overall_score.toFixed(1)}}</b>
                        <span>商家评分</span>
                    </section>
                    <section class="rating_header_right">
                        <div>
                            <p>服务</p>
                            <span>{{ratingScoresData.service_score.toFixed(1)}}</span>
                        </div>
                        <div>
                            <p>味道</p>
                            <span>{{ratingScoresData.food_score.toFixed(1)}}</span>
                        </div>
                        <div>
                            <p>高于周边</p>
                            <span>{{(ratingScoresData.compare_rating*100).toFixed(1)}}%</span>
                        </div>
                    </section>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <section class="shop_status_info" v-if="shopDetailData">
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
                baseUrl: process.env.BASE_URL,
                imgBaseUrl: '//elm.cangdu.org/img/',
                //需要是字符串类型，num类型无效
                selected: "1",
                showInfo: false,
                shopDetailData: null, //商铺详情
                showFoodsList: false, //是否显示订单列表
                menuList: [], //食品分类列表
                menuIndex: 0, //已选菜单索引值，默认为0
                menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
                shopListTop: [], //商品列表的高度集合
                TitleDetailIndex: null, //点击展示列表头部详情
                categoryNum: [], //商品类型右上角已加入购物车的数量
                totalPrice: 0, //总共价格
                totalNum: 0,    //购物车中总共商品的数量
                cartFoodList: [], //购物车商品列表
                showCartList: false,//显示购物车列表
                addClick: false, //添加按钮点击
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
                showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
                windowHeight: null, //屏幕的高度
                elLeft: 0, //当前点击加按钮在网页中的绝对top值
                elBottom: 0, //当前点击加按钮在网页中的绝对left值
                ratingScroll: null, //评论页Scroll
            }
        },
        watch: {},
        methods: {
            //计算总价和选购数以及购物车中总共商品的数量,把食物push到cartFoodList里
            calculation() {
                let price = 0;
                let arr = [];
                for (let i = 0; i < this.menuList.length; i++) {
                    let num = 0;
                    for (let j = 0; j < this.menuList[i].foods.length; j++) {
                        //foodsnum食物数量
                        let foodsnum = this.menuList[i].foods[j].__v;
                        //计算总价
                        price += foodsnum * this.menuList[i].foods[j].specfoods[0].price;
                        //把食物列表记录到cartFoodList里,,,如果foodsnum>0
                        //每次点击结果都被push进去了，,,,错误
                        if (foodsnum > 0) {
                            arr.push({
                                name: this.menuList[i].foods[j].name,
                                price: this.menuList[i].foods[j].specfoods[0].price,
                                num: foodsnum
                            })
                        }
                        //计算一级菜单的选购数
                        num += foodsnum;
                    }
                    this.categoryNum[i] = num;
                }
                this.cartFoodList = arr;
                //总价
                this.totalPrice = price;
                //计算购物车中总共商品的数量
                let num = 0;
                for (let i = 0; i < this.categoryNum.length; i++) {
                    num += this.categoryNum[i]
                }
                this.totalNum = num
                console.log(this.cartFoodList)
            },
            toggleFoodList() {
                if (this.totalNum > 0) {
                    this.showFoodsList = !this.showFoodsList;
                }
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
            //增加商品,计算价格
            addShops(foods) {
                // this.categoryNum++;
                this.addClick = true;
                setTimeout(() => {
                    this.addClick = false;
                }, 500);
                foods.__v++;
                this.calculation();
            },
            //减少商品,计算价格
            minusShops(foods) {
                // this.categoryNum--;
                foods.__v--;
                this.calculation()
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
                // console.log('menuList', response);
                that.menuList = response.data
            });
            //餐馆详情
            axios.get('https://elm.cangdu.org/shopping/restaurant/' + that.$route.params.id
            ).then(function (response) {
                // console.log(response);
                that.shopDetailData = response.data;
                document.title = that.shopDetailData.name
            });
            //评价列表
            axios.get('https://elm.cangdu.org/ugc/v2/restaurants/' + that.$route.params.id + '/ratings'
            ).then(function (response) {
                // console.log(response);
                that.ratingList = response.data

            });
            //评价分数
            axios.get('https://elm.cangdu.org/ugc/v2/restaurants/' + that.$route.params.id + '/ratings/scores'
            ).then(function (response) {
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

    .toggleItem {
        padding-bottom: 10px;
        border-bottom: 1px solid #e6e6e6;
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

    .itemBox {
        text-align: left;
        .menu_container {
            display: flex;
            flex: 1;
            height: 61.4vh;
            overflow-y: scroll;
            position: relative;
            .menu_left {
                text-align: center;
                font-size: 13px;
                .menu_left_li {
                    padding: 16px 0;
                    border-bottom: 0.025rem solid #ededed;
                    box-sizing: border-box;
                    border-left: 0.15rem solid #f8f8f8;
                    position: relative;
                    width: 80px;
                    background-color: #f5f5f5;
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
                        padding: 0 4px;
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
                position: absolute;
                top: 0;
                height: 63.5vh;
                margin-left: 80px;
                overflow: scroll;
                padding-bottom: 7px;
                .menu_detail_header {
                    width: 100%;
                    padding: .4rem;
                    position: relative;
                    align-items: center;
                    background-color: #f5f5f5;
                    .menu_detail_header_left {
                        background-color: #f5f5f5;
                        white-space: nowrap;
                        overflow: hidden;
                        .menu_item_title {
                            font-weight: bold;
                            font-size: 16px;
                        }
                        .menu_item_description {
                            width: 30%;
                            margin-left: 8px;
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
                                width: 90px;
                                height: 90px;
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
                                        height: 16px;
                                        line-height: 15px;
                                        padding: 1px;
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
                                line-height: 22px;
                                font-size: 13px;
                                color: #999;
                            }
                            .food_description_sale_rating {
                                line-height: 22px;
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
                        font-size: 10px;
                        margin-top: .3rem;
                        .food_price {
                            span {

                            }
                            span:nth-of-type(1) {
                                margin-right: .05rem;
                                font-size: 14px;
                                color: #f60;
                            }
                            span:nth-of-type(2) {
                                font-size: 17px;
                                color: #f60;
                                font-weight: 700;
                                margin-right: .3rem;
                            }
                            span:nth-of-type(3) {
                            }
                            .food_price-div {
                                float: right;
                                margin-right: 20px;
                                section {
                                    float: left;
                                    margin-top: -2px;
                                }
                                img {
                                    width: 25px;
                                    /*height: 10px;*/
                                }
                                i {
                                    font-size: 18px;
                                    padding: 0 8px;
                                    vertical-align: super;
                                }
                                .add {

                                }
                            }
                        }
                    }
                }
            }
        }

        .buy_cart_container {
            position: absolute;
            background-color: #3d3d3f;
            bottom: 0;
            left: 0;
            z-index: 13;
            display: flex;
            width: 100%;
            height: 50px;
            .cart_icon_num {
                flex: 1;
                .move_in_cart {
                    animation: mymove .5s ease-in-out;
                }
                .cart_icon_container {
                    display: flex;
                    background-color: #3d3d3f;
                    position: absolute;
                    padding: 9px;
                    border: 0.18rem solid #444;
                    border-radius: 50%;
                    left: 15px;
                    top: -12px;
                    .cart_icon {
                        width: 30px;
                        height: 30px;
                    }
                    .cart_list_length {
                        position: absolute;
                        top: -.25rem;
                        right: -.25rem;
                        background-color: #ff461d;
                        line-height: 14px;
                        text-align: center;
                        border-radius: 50%;
                        border: 0.025rem solid #ff461d;
                        min-width: 14px;
                        height: 14px;
                        font-size: 12px;
                        color: white;
                    }
                }
                .move_in_cart {
                }
                .cart_icon_activity {
                    background-color: #3190e8;
                }
                .cart_num {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 90px;

                    div {
                        color: #fff;
                    }
                    div:nth-of-type(1) {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: -7px;
                    }
                    div:nth-of-type(2) {
                        font-size: 12px;
                    }
                }
            }
            .gotopay {
                position: absolute;
                right: 0;
                background-color: #535356;
                width: 130px;
                height: 100%;
                text-align: center;
                display: -ms-flexbox;
                display: flex;
                align-items: center;
                justify-content: center;
                .gotopay_button_style {
                    font-weight: bold;
                    color: white;
                }
            }
            .gotopay_acitvity {
                background-color: #4cd964;
            }
        }
        .fill_box {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, .3);
            z-index: 11;
            .cart_food_list {
                position: fixed;
                width: 100%;
                z-index: 12;
                bottom: 50px;
                left: 0;
                background-color: #fff;
                header {
                    padding: 0 20px;
                    height: 48px;
                    line-height: 48px;
                    background-color: #eceff1;
                    position: relative;
                    div {
                        top: 0;
                        position: absolute;
                        right: 20px;
                        img {
                            vertical-align: middle;
                        }
                        h4 {
                        }
                        .clear_cart {
                        }
                    }
                }
                .cart_food_details {
                    background-color: #fff;
                    padding: 0 20px;
                    .cart_food_li {
                        height: 51px;
                        line-height: 51px;
                        .cart_list_num {
                            width: 55%;
                            display: inline-block;
                            p:nth-of-type(1) {
                                font-weight: bold;
                            }
                            p:nth-of-type(2) {
                            }
                        }
                        .cart_list_price {
                            display: inline-block;
                            color: #f60;
                            font-family: Helvetica Neue, Tahoma;
                            font-weight: 700;
                            margin-right: 20px;
                            span:nth-of-type(2) {
                                font-weight: bold;
                            }
                        }
                        .cart_list_control {
                            display: inline-block;
                            span {

                            }
                            img {
                                vertical-align: sub;
                            }
                            .specs_reduce_icon {
                                fill: #999;
                            }
                            .cart_num {
                                padding: 5px;
                                text-align: center;
                            }
                        }
                    }
                }
            }
            .shop_status_info {
                background-color: #fff;
                margin-bottom: .4rem;
                padding-left: 10px;
                header {
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 38px;
                    padding: 0 .6rem;
                    border-bottom: 0.025rem solid #f1f1f1;
                }
                p {
                    padding: .7rem .6rem .7rem 0;
                    margin-left: .6rem;
                    border-bottom: 0.025rem solid #f5f5f5;
                }
                span {
                    color: #666;
                }
                p:nth-of-type(4), p:nth-of-type(5) {
                    display: flex;
                    justify-content: space-between;
                }
            }
            .rating_header {
                text-align: center;
                padding: 20px;
                .rating_header_left {
                    width: 40%;
                    display: inline-block;
                    b {
                        font-size: 40px;
                        color: #ff6000;
                    }
                    span {
                        vertical-align: super;
                        color: #666;
                    }
                }
                .rating_header_right {
                    width: 60%;
                    display: inline-block;
                    div {
                        display: inline-block;
                        width: 30%;
                        font-size: 13px;
                        p {
                            color: #666;
                        }
                        span {
                            font-size: 20px;
                            display: inline-block;
                            margin-top: 5px;
                        }
                    }
                }
            }
        }

    }

    /*动画部分*/
    .animate1-enter-active, .animate1-leave-active {
        transition: all 0.2s linear;
    }

    .animate1-enter {
        transform: translateX(80%);
    }

    @keyframes mymove {
        0% {
            transform: scale(1)
        }
        25% {
            transform: scale(.8)
        }
        50% {
            transform: scale(1.1)
        }
        75% {
            transform: scale(.9)
        }
        100% {
            transform: scale(1)
        }
    }
</style>
