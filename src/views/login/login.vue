<template>
    <section>

        <header>ele</header>
        <div class="center">
            <div class="title">短信登录</div>
            <section class="box">
                <input type="text" placeholder="手机号">
            </section>
            <section class="box">
                <input type="text" placeholder="验证码">
            </section>
            <section class="text">
                温馨提示：未注册饿了么账号的手机号，登录时将自动注册，且代表您已同意
                <a class="link" href="">《用户服务协议》</a></section>
        </div>
        <button class="SubmitButton">登录</button>
        <a href="javascript:;" class="about">关于我们</a>
    </section>
</template>

<script>
    export default {
        data: function () {
            return {
                captcha: ''
            }
        },
        name: "login",
        components: {
            // Field.name:Field
        }
    }

</script>

<style lang="scss" scoped>
    @import "/src/assets/css/base.css";

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
    }
</style>
