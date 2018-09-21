<template>
    <div>
        <header>
            <div>地址</div>
            <input @click="search" type="search" placeholder="搜索饿了么商家、商品名称"/>
        </header>
        <section>
            <mt-swipe class="swipe" :auto="300000">
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
        </section>
        <footer>
            <ul class="footer">
                <li>外卖</li>
                <li>搜索</li>
                <li>订单</li>
                <li>我的</li>
            </ul>
        </footer>
    </div>
</template>

<script>
    import Vue from 'vue'
    import router from '../../router'
    import {Swipe, SwipeItem} from 'mint-ui';

    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
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
                    'https://fuss10.elemecdn.com/d/38/7bddb07503aea4b711236348e2632jpeg.jpeg']
            }
        },
        name: "goods-list",
        methods: {
            search() {
                router.push('/views/search/search')
            }
        }
    }
</script>

<style lang="scss" scoped>
    header {
        background-image: linear-gradient(90deg, #0af, #0085ff);
        color: #fff;
        padding: 10px 15px;
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

    footer {
        ul.footer {
            position: fixed;
            font-size: 0;
            width: 100%;
            bottom: 0;
            border-top: 1px solid #e9e9e9;
            background-color: white;
            height: 46px;
            line-height: 46px;
            li {
                font-size: 16px;
                text-align: center;
                width: 25%;
                display: inline-block;
            }
        }
    }

    .swipe {
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


</style>
