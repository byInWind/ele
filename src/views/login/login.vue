<template>
    <section>

        <header>ele</header>
        <div class="center">
            <div class="title">短信登录</div>
            <section class="box">
                <input type="text" maxlength="11" v-model="account" placeholder="手机号">
            </section>
            <section class="box">
                <input type="text" maxlength="4" v-model="captcha" placeholder="验证码">
            </section>
            <section class="text">
                温馨提示：未注册饿了么账号的手机号，登录时将自动注册，且代表您已同意
                <a class="link" href="">《用户服务协议》</a></section>

            <div class="SubmitButton" @click="sign">登录</div>
            <a href="javascript:;" class="about">关于我们</a>
        </div>

    </section>
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'mint-ui';
    import router from '../../router'
    export default {
        data: function () {
            return {
                account: null,
                captcha: null
            }
        },
        name: "login",
        components: {},
        methods: {
            sign() {
                if (this.account && this.captcha) {
                    console.log(1)
                    axios.post('https://elm.cangdu.org/v2/login', {
                        account: this.account,
                        captcha: this.captcha
                    }).then(function (response) {
                        let xxx = JSON.parse(response.config.data)
                        console.log(xxx.account)
                        //跳转
                        router.push('/views/goods-list/goods-list');
                    }).catch(function (response) {
                        Toast({
                            message: response,
                            position: 'bottom',
                            duration: 1500
                        });
                    })
                } else {
                    Toast({
                        message: '账号密码不能为空',
                        position: 'bottom',
                        duration: 1500
                    });
                }
            }
        }
    }

</script>

<style lang="scss" scoped>

    .center {
        width: 80%;
        margin: 0 auto;
        .title {
            width: 69px;
            margin: 0 auto;
            color: #2395ff;
            font-weight: 700;
            border-bottom: 2px solid #2395ff;
        }
        .box {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff
        }

        input {
            width: 100%;
            height: 100%;
            left: 0;
            outline: none;
            padding-left: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #333;
        }
        input:focus {
            border: 1px solid #2395ff;
        }
        .text {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;
            .link {
                color: #2395ff;
                /*text-decoration: none;*/
            }
        }
        .SubmitButton {
            display: block;
            width: 100%;
            height: 42px;
            margin-top: 30px;
            border-radius: 4px;
            background: #4cd96f;
            color: #fff;
            cursor: pointer;
            text-align: center;
            font-size: 16px;
            line-height: 42px;
        }

        .about {
            margin-top: 20px;
            text-align: center;
            color: #999;
            display: block;
            font-size: 12px;
        }
    }


</style>
