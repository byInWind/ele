<template>
    <div>
        11、餐馆详情
        {{ $route.params.id }}
        {{$route.query.id}}
        <BaseFooter></BaseFooter>
    </div>
</template>

<script>
    export default {
        name: "shopDetails"
    }
</script>

<style scoped>

</style>
