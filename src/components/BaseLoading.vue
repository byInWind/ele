<template name="loading">
    <div class="loading">
        <!-- <img class="logo" src="../assets/img/logo.png"> -->
        <div class="name">创优微课</div>
        <div class="desc">有一种稳赚不赔的投资，就是学习</div>
        <div class="loading_box">
            <div class="pulse pulse_1"></div>
            <div class="pulse pulse_2"></div>
            <div class="pulse pulse_3"></div>
            <div class="pulse pulse_4"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            "BaseLoading"
            return {
                loading: false
            };
        }
    }
</script>
<style scoped>
    .loading {
        width: 100%;
        height: 100vh;
        background-color: white;
        border: 0 solid transparent;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999999999;
    }

    .loading .logo {
        display: block;
        width: 100px;
        height: 100px;
        margin: 70px auto 0;
    }

    .loading .name {
        text-align: center;
        font-size: 19px;
        color: #575858;
        margin: 12px auto 7px;
    }

    .loading .desc {
        font-size: 15px;
        color: #a3a4a4;
        text-align: center;
        margin-top: 9px;
    }

    .loading_box {
        width: 100%;
        text-align: center;
        padding: 50px 0;
    }

    .loading_box > div {
        display: inline-block;
    }

    .pulse {
        width: 4px;
        height: 18px;
        background: #ff5358;
        margin: 2px;
        border-radius: 10px;
    }

    .pulse_1 {
        -webkit-animation: pulse 0.5s linear infinite alternate;
        animation: pulse 0.5s linear infinite alternate;
    }

    .pulse_2 {
        -webkit-animation: pulse 0.5s linear infinite alternate;
        animation: pulse 0.5s linear infinite alternate;
        animation-delay: 0.1s;
    }

    .pulse_3 {
        -webkit-animation: pulse 0.5s linear infinite alternate;
        animation: pulse 0.5s linear infinite alternate;
        animation-delay: 0.2s;
    }

    .pulse_4 {
        -webkit-animation: pulse 0.5s linear infinite alternate;
        animation: pulse 0.5s linear infinite alternate;
        animation-delay: 0.3s;
    }

    @-webkit-keyframes pulse {
        0% {
            transform: scaleY(1);
        }

        100% {
            transform: scaleY(0);
        }
    }

    @keyframes pulse {
        0% {
            transform: scaleY(1);
        }

        100% {
            transform: scaleY(0);
        }
    }
</style>
