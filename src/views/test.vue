<template>
    <div>
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p></div>
</template>
<script>
    export default {
        name: 'test',
        data: function () {
            return {
                message:'asdfg'
            }
        },
        computed: {
            // 计算属性的 getter
            reversedMessage: function () {
                // `this` 指向 vm 实例
                return this.message.split('').reverse().join('')
            }
        }
    }
</script>
<style lang="scss" scoped>
    // 作用是取消数据绑定时出现的代码闪烁
    [v-cloak] {
        display: none;
    }

    table {
        border: 1px solid #e9e9e9;
        border-collapse: collapse;
        border-spacing: 0;
        // 隐藏表格中空单元格上的边框和背景：
        empty-cells: show;
    }

    th,
    td {
        padding: 8px 16px;
        border: 1px solid #e9e9e9;
        text-align: left;
    }

    th {
        background: #f7f7f7;
        color: #5c6b77;
        font-weight: 600;
        white-space: nowrap;
    }

    .menu {
        border: 1px solid #ccc;
    }
</style>
