<template>
    <div class="loading_container">
        <div class="load_img" :style="{backgroundPositionY: -(positionY%7)*75 + 'px'}">
        </div>
        <img class="load_ellipse" src="../assets/img/a.png" alt="">
    </div>
</template>

<script>
    export default {
        name: 'BaseLoading',
        data() {
            return {
                positionY: 0,
                timer: null,
            }
        },
        mounted() {
            this.timer = setInterval(() => {
                this.positionY++;
            }, 600)
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes load {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-75px);
        }
        100% {
            transform: translateY(0px);
        }
    }

    @keyframes ellipse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.3);
        }
        100% {
            transform: scale(1);
        }
    }

    .loading_container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 75px;
        height: 75px;
        z-index: 9;
        transform: translate(-50%, -50%);
    }

    .load_img {
        background: url("../assets/img/icon_loading.png") no-repeat 0 0;
        background-size: 75px auto;
        transform: translateY(0px);
        animation: load .6s infinite ease-in-out;
        position: relative;
        width: 75px;
        height: 75px;
    }

    .load_ellipse {
        position: absolute;
        top: 81px;
        left: 28px;
        animation: ellipse .6s infinite ease-in-out;
    }
</style>
