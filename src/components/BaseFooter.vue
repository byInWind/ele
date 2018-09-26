<template>
    <footer>
        <ul class="footer">
            <li>外卖</li>
            <li>搜索</li>
            <li>订单</li>
            <li>
                <router-link to="/views/my/my">我的</router-link>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default {
        name: "BaseFooter"
    }
</script>

<style lang="scss" scoped>
    footer {
        ul.footer {
            position: fixed;
            font-size: 0;
            z-index: 9999;
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

</style>
