(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-bonus-bonus"],{"039f":function(n,t,e){"use strict";var a=e("c1a6"),o=e.n(a);o.a},"08a7":function(n,t,e){"use strict";e.r(t);var a=e("6f39"),o=e.n(a);for(var i in a)"default"!==i&&function(n){e.d(t,n,function(){return a[n]})}(i);t["default"]=o.a},6013:function(n,t,e){"use strict";e.r(t);var a=e("c3b8"),o=e("08a7");for(var i in o)"default"!==i&&function(n){e.d(t,n,function(){return o[n]})}(i);e("039f");var r=e("2877"),s=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"a052da7c",null);t["default"]=s.exports},"6f39":function(n,t,e){"use strict";var a=e("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(e("59ad")),i={data:function(){return{userName:"",money:0}},methods:{getUserMoney:function(n,t){var e=this;this.$api.getORGById(n,function(n){if(n.data.rc==e.$util.RC.SUCCESS){var a=JSON.parse(n.data.c);e.money=(0,o.default)(a.bonus)*(0,o.default)(t)}})},toHomePage:function(){uni.switchTab({url:"/pages/index/index"})}},onLoad:function(){var n=JSON.parse(uni.getStorageSync("orgUserInfo"));this.userName=n.realName;var t=n.shareAmount;console.log(n),console.log("----------------"),console.log(JSON.parse(uni.getStorageSync("orgInfo")));var e={orgId:n.orgId};this.getUserMoney(e,t)}};t.default=i},"80b0":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 集体经济uniapp 配色方案*/.image-box[data-v-a052da7c]{width:auto;height:%?400?%;text-align:center}.image-box uni-image[data-v-a052da7c]{width:%?250?%;height:%?250?%;margin-top:%?75?%}.money-box[data-v-a052da7c]{width:auto;text-align:center}.money-box .money-title[data-v-a052da7c]{font-size:%?30?%;line-height:%?60?%;color:#666}.money-box .money-number[data-v-a052da7c]{margin-top:%?40?%;font-size:%?60?%;line-height:%?60?%;color:#333}.footer-box[data-v-a052da7c]{width:auto;padding:%?40?%}',""])},c1a6:function(n,t,e){var a=e("80b0");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var o=e("4f06").default;o("261ed7d9",a,!0,{sourceMap:!1,shadowMode:!1})},c3b8:function(n,t,e){"use strict";var a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",[e("v-uni-view",{staticClass:"image-box"},[e("v-uni-image",{attrs:{src:"../../static/image/1.png"}})],1),e("v-uni-view",{staticClass:"money-box"},[e("v-uni-view",{staticClass:"money-title"},[n._v(n._s(n.userName)+" 分红金额")]),e("v-uni-view",{staticClass:"money-number"},[n._v("￥ "+n._s(n.money))])],1),e("v-uni-view",{staticClass:"footer-box"},[e("v-uni-button",{attrs:{type:"default"},on:{click:function(t){t=n.$handleEvent(t),n.toHomePage()}}},[n._v("返回首页")])],1)],1)},o=[];e.d(t,"a",function(){return a}),e.d(t,"b",function(){return o})}}]);