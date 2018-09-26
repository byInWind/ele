<template>
    <div>
        my
        <BaseFooter id="a"></BaseFooter>

    </div>
</template>

<script>
    export default {
        name: "my"
    }
</script>

<style lang="scss" scoped>
    footer /deep/ ul.footer li:nth-child(4) {
        a {
            color: #3190e8;
        }
    }

</style>
