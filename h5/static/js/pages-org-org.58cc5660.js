(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-org-org"],{"2b5d":function(n,t,o){t=n.exports=o("2350")(!1),t.push([n.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 集体经济uniapp 配色方案*/.org-box[data-v-71b09b8c]{width:90%;margin:%?50?% auto %?100?%}.org-base[data-v-71b09b8c]{width:100%;height:%?200?%;text-align:center;line-height:%?200?%;color:#fff;font-size:%?36?%;background-color:#6cbaf8;border-radius:%?20?%}.org-assets[data-v-71b09b8c]{background-color:#9788ff;margin-top:%?40?%}.footer-box[data-v-71b09b8c]{width:auto;padding:%?40?%}',""])},3949:function(n,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{}},methods:{toOrgInfo:function(){uni.navigateTo({url:"./orgInfo"})},toOrgMoney:function(){uni.navigateTo({url:"./orgMoney"})},toHomePage:function(){uni.switchTab({url:"/pages/index/index"})}}};t.default=e},"4e4e":function(n,t,o){var e=o("2b5d");"string"===typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);var a=o("4f06").default;a("42100ff6",e,!0,{sourceMap:!1,shadowMode:!1})},"6a54":function(n,t,o){"use strict";o.r(t);var e=o("3949"),a=o.n(e);for(var r in e)"default"!==r&&function(n){o.d(t,n,function(){return e[n]})}(r);t["default"]=a.a},a03c:function(n,t,o){"use strict";var e=function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("v-uni-view",[o("v-uni-view",{staticClass:"org-box"},[o("v-uni-view",{staticClass:"org-base",on:{click:function(t){t=n.$handleEvent(t),n.toOrgInfo(t)}}},[n._v("组织基础信息")]),o("v-uni-view",{staticClass:"org-base org-assets",on:{click:function(t){t=n.$handleEvent(t),n.toOrgMoney(t)}}},[n._v("组织资产信息")])],1),o("v-uni-view",{staticClass:"footer-box"},[o("v-uni-button",{attrs:{type:"default"},on:{click:function(t){t=n.$handleEvent(t),n.toHomePage()}}},[n._v("返回首页")])],1)],1)},a=[];o.d(t,"a",function(){return e}),o.d(t,"b",function(){return a})},afc2:function(n,t,o){"use strict";o.r(t);var e=o("a03c"),a=o("6a54");for(var r in a)"default"!==r&&function(n){o.d(t,n,function(){return a[n]})}(r);o("e6bf");var i=o("2877"),u=Object(i["a"])(a["default"],e["a"],e["b"],!1,null,"71b09b8c",null);t["default"]=u.exports},e6bf:function(n,t,o){"use strict";var e=o("4e4e"),a=o.n(e);a.a}}]);