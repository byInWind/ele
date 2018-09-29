<template>
    <div>
        <section>
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
                            <p @click.stop="toast(index)">...</p>
                            <p class="info" v-if="item.delivery_mode"><span>{{item.delivery_mode.text}}</span></p>
                            <p>{{item.distance}} | {{item.order_lead_time}}</p>
                        </div>
                        <!--</router-link>-->
                        <div v-show="index==num" @click.stop="hide()" class="toast">
                            <button>sssss</button>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import router from '../router'
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "BaseGoodslist",
        data: function () {
            return {
                sortnormal: '综合排序',
                restaurantsItems: [],
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
                imgBaseUrl2: '//elm.cangdu.org/img/', //生产环境图片域名地址
                // isFixed: false
                categoryItems: [],
                loading: false,
                isActive: 4, //筛选列表选中类型,
                title: '',  //标题
                num: -1
            }
        },
        methods: {
            toast(index) {
                this.num = index
            },
            hide() {
                this.num = -1
            },
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
                console.log(to, from)

            }
        },
        mounted: function () {
            this.title = this.$route.params.title || '美食外卖';
            var that = this;
            console.log(that.$route.params.id, this.$route.params)
            //商铺列表
            axios.get('https://elm.cangdu.org/shopping/restaurants', {
                params: {
                    latitude: 31.22967,
                    longitude: 121.4762,
                    restaurant_category_id: that.$route.params.id  //餐馆分类id
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
    .shop-item-box {
        color: #666;
        text-align: left;
        font-size: 12px;
        margin: 83px 0 50px;
        .shop-item {
            border-top: 1px solid #e9e9e9;
            position: relative;
            .toast {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.4);
            }
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
