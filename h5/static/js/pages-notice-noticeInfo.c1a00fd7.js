(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-notice-noticeInfo"],{"1dd2":function(t,n,i){"use strict";var o=i("ddf3"),e=i.n(o);e.a},2121:function(t,n,i){"use strict";var o=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",[i("v-uni-view",{staticClass:"header-box"},[i("v-uni-view",{staticClass:"title-box"},[i("span",{staticClass:"poll-icon-color1 iconfont icon-gonggao1"}),t._v(t._s(t.info.title))])],1),i("v-uni-view",{staticClass:"content-timer"},[t._v(t._s(t.timer))]),i("v-uni-view",{staticClass:"content-box"},[t._v(t._s(t.info.content))]),i("v-uni-view",{staticClass:"footer-box"},[i("v-uni-button",{attrs:{type:"default"},on:{click:function(n){n=t.$handleEvent(n),t.toBack()}}},[t._v("返回上一页")])],1)],1)},e=[];i.d(n,"a",function(){return o}),i.d(n,"b",function(){return e})},4424:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"noticeInfo",data:function(){return{info:"",timer:""}},methods:{toBack:function(){uni.navigateBack()}},onLoad:function(t){var n=JSON.parse(decodeURIComponent(t.info));this.info=n;var i=new Date(n.createTime);this.timer=i.toLocaleDateString(),console.log(n)}};n.default=o},"77f8":function(t,n,i){"use strict";i.r(n);var o=i("4424"),e=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(n,t,function(){return o[t]})}(a);n["default"]=e.a},a983:function(t,n,i){"use strict";i.r(n);var o=i("2121"),e=i("77f8");for(var a in e)"default"!==a&&function(t){i.d(n,t,function(){return e[t]})}(a);i("1dd2");var r=i("2877"),s=Object(r["a"])(e["default"],o["a"],o["b"],!1,null,"f0558582",null);n["default"]=s.exports},b459:function(t,n,i){n=t.exports=i("2350")(!1),n.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 集体经济uniapp 配色方案*/.header-box[data-v-f0558582]{width:auto;padding:%?20?%}.title-box[data-v-f0558582]{width:auto;line-height:%?50?%;color:#666;font-size:%?32?%}.title-box span[data-v-f0558582]{margin-right:%?15?%}.content-timer[data-v-f0558582]{width:auto;padding:%?10?%;margin-top:%?10?%;padding-right:%?60?%;line-height:%?40?%;font-size:%?24?%;color:#6cbaf8;text-align:right;border-bottom:1px solid #eee}.content-box[data-v-f0558582]{padding:%?40?%;color:#666;line-height:%?20?%;font-size:%?28?%}.footer-box[data-v-f0558582]{margin-top:%?30?%;width:auto;padding:%?40?%}',""])},ddf3:function(t,n,i){var o=i("b459");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var e=i("4f06").default;e("6c320150",o,!0,{sourceMap:!1,shadowMode:!1})}}]);