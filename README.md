# 仿ele

## 安装
```
npm install
```

### 运行
```
npm run serve
```
根据https://github.com/bailicangdu/vue2-elm仿写  
### 截图:
bug记录:   
1. sass 使用中绝对路径报错（改相对路径）  
2. 路由跳转(解决)
3. 在vue项目中全局引入一个 .scss文件 放在app.vue里,不加scope  
4. 配置eslint关闭config,在package.json里配置 "rules": {"no-console": "off"}  
5. mint-ui在单文件里修改它的样式无效，放到总的base.scss里就可以修改了  
6. this改变的问题,注意在vue与window不同  
7. 为div加滚动事件，需要设置高度且 overflow: scroll;  
8. 属性position: sticky;  
9. vue里可以获取window,比如用在滚动里（饿了吗，滚动到一定距离变成固定定位,最后效果会稍微跳一下）
   10. vue改变引用的组件的样式/deep/ https://zhuanlan.zhihu.com/p/29266022  
   11. 设置弹层时引内容过长出现滑动问题，设置body,overflow:hiddent  
    12.  vue里无法使用jquery的.html()/.text()，会报错  
13. 需要监控路由变化   
14. vue实现，在循环列表里点击当前项，处理当前项的操作  
15. vue因null数据渲染报错https://stackoverflow.com/questions/46897776/vue-warn-error-in-render-function-typeerror-cannot-read-property-first-na/46898157  
16. 购物车:问题 1，添加商品，num全部改变，方法：不使用num，方法里传每项的值   
全局loading 想显示隐藏loading,首先需要获取loading的状态，设置v-show,一个变量用来存储状态，单页面共享状态比较困难，所以引入vuex,(不引入自己暂时无法实现)，状态存在vuex中，取出使用时需放在vue的computed里
17. :duration="{ enter: 5000 }进入无效？效果与-enter-active不完全相同，在是否写-enter-to里产生了差异，以实际效果为准吧  
18. $.scrollTop在浏览器console里有效，在代码里无效??

