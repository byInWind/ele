# ele

## 安装
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
第二天：登录页  
第四天：商铺列表  
第五天：解决路由问题  
第六天：继续完善商铺列表页
bug记录:   
sass 使用中绝对路径报错（改相对路径）  
路由跳转(待解决)
在vue项目中全局引入一个 .scss文件 放在app.vue里,不加scope  
配置eslint关闭config,在package.json里配置 
"rules": {"no-console": "off"}  
mint-ui在单文件里修改它的样式无效，放到总的base.scss里就可以修改了  
this改变的问题  
为div加滚动事件，需要设置高度且 overflow: scroll;
