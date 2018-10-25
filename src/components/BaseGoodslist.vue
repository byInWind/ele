<template>
    <div>
        <section>
            <div class="shop-item-box" v-if="restaurantsItems">
                <div v-for="(item,index) in restaurantsItems" :key="index" class="shop-item">
                    <section v-show="index!=num2" @click="jump(item.id)">
                        <!--<router-link :to='"/views/shopDetails/shopDetails/"+item.id'>-->
                        <img :src="imgBaseUrl2 +item.image_path" alt="xxxx">
                        <div class="center">
                            <h4 class="title"><span class="brand">品牌</span>{{item.name}}</h4>
                            <p class="info">评分：{{item.rating}} 月售{{item.recent_order_num}}单</p>
                            <p class="tips">¥20起送 {{item.piecewise_agent_fee.tips}}</p>
                        </div>
                        <div class="center-right">
                            <p @click.stop="num = index">...</p>
                            <p class="info" v-if="item.delivery_mode"><span>{{item.delivery_mode.text}}</span></p>
                            <p>{{item.distance}} | {{item.order_lead_time}}</p>
                        </div>
                        <!--</router-link>-->
                        <div v-show="index==num" @click.stop="num = -1" class="toast">
                            <div @click.stop="hidebox(index)">不喜欢</div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import router from '../router'
    import {Toast} from 'mint-ui';

    export default {
        name: "BaseGoodslist",
        data: function () {
            return {
                imgBaseUrl2: '//elm.cangdu.org/img/', //生产环境图片域名地址
                num: -1,
                num2: -1
            }
        },
        props: ['restaurantsItems'],
        methods: {
            hidebox(index) {
                this.num2 = index;
                Toast({
                    message: '已将此商家置于底部',
                    position: 'bottom',
                    duration: 1500
                })
            },
            jump: function (id) {
                router.push({path: '/views/shopDetails/shopDetails/' + id})
            }
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
                div {
                    position: absolute;
                    width: 50px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    height: 50px;
                    border-radius: 100%;
                    text-align: center;
                    color: #333;
                    padding-top: 15px;
                    background-color: white;
                }
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
