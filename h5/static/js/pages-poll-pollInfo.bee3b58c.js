(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-poll-pollInfo"],{1702:function(t,o,i){"use strict";i.r(o);var e=i("7eec"),n=i.n(e);for(var a in e)"default"!==a&&function(t){i.d(o,t,function(){return e[t]})}(a);o["default"]=n.a},"29fa":function(t,o,i){o=t.exports=i("2350")(!1),o.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 集体经济uniapp 配色方案*/.poll-icon-color[data-v-2bd88a4e]{color:#9788ff}.poll-icon-color1[data-v-2bd88a4e]{color:#6cbaf8}.header-box[data-v-2bd88a4e]{width:auto;padding:%?20?%;border-bottom:%?2?% solid #e8e8e8}.title-box[data-v-2bd88a4e]{width:auto;line-height:%?50?%;color:#666;font-size:%?32?%}.title-box span[data-v-2bd88a4e]{margin-right:%?15?%}\n/** poll 基础信息部分*/.info-status[data-v-2bd88a4e]{padding:%?20?%;width:auto;height:%?60?%}.info-status .info-xuantou[data-v-2bd88a4e]{float:left;line-height:%?60?%;font-size:%?28?%;color:#666}.info-status .info-status-text[data-v-2bd88a4e]{float:right;line-height:%?60?%;font-size:%?28?%;color:#666}.info-text[data-v-2bd88a4e]{margin:0 auto;width:90%;background:#fff7cc;padding:%?20?%;border-radius:%?15?%;font-size:%?28?%;line-height:%?40?%;color:#f56723}.poll-content[data-v-2bd88a4e]{width:auto;padding:%?40?%}.poll-content .poll-content-text[data-v-2bd88a4e]{width:auto;line-height:%?40?%;color:#666;font-size:%?28?%}\n/** 投票列表项相关*/.poll-item-box[data-v-2bd88a4e]{width:auto;margin-top:%?10?%}.poll-item-box .poll-item[data-v-2bd88a4e]{float:left;margin:%?20?% 0 0 %?40?%;padding:%?20?% %?40?%;font-size:%?28?%;border-radius:%?15?%}.poll-item-unActive[data-v-2bd88a4e]{background:#fff;color:#6cbaf8;border:%?2?% solid #6cbaf8}.poll-item-active[data-v-2bd88a4e]{background:#6cbaf8;color:#fff;border:%?2?% solid #6cbaf8}\n/* 按钮相关*/.poll-btn[data-v-2bd88a4e]{padding:%?20?%;margin-top:%?40?%}',""])},5682:function(t,o,i){var e=i("29fa");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("4840e9a4",e,!0,{sourceMap:!1,shadowMode:!1})},"7eec":function(t,o,i){"use strict";var e=i("288e");Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=e(i("f499"));i("c5f6");var a={name:"pollInfo",data:function(){return{pollInfo:{},pollDetail:{},pollOptions:[],optionActive:[],quorum:0,opsNum:0,waiver:0,ticketCount:0,activeNums:0,isPollShow:!1,isBtnShow:!1,status:-1,successData:[],voteTimeOver:!1}},methods:{getVoteDetail:function(t){var o=this;this.$api.getVoteDetail(t,function(t){if(t.data.rc==o.$util.RC.SUCCESS){o.pollDetail=o.$util.tryParseJson(t.data.c),o.ticketCount=o.pollDetail.ticketCount,o.quorum=o.pollDetail.vote.quorum;for(var i=0;i<o.pollDetail.ops.length;i++)"弃权"==o.pollDetail.ops[i].title&&(o.waiver+=o.pollDetail.ops[i].ballotCount),o.opsNum+=Number(o.pollDetail.ops[i].ballotCount)}})},getVoteOptions:function(t){var o=this;this.$api.getVoteOptions(t,function(t){if(t.data.rc==o.$util.RC.SUCCESS){o.pollOptions=o.$util.tryParseJson(t.data.c);var i={voteId:o.pollInfo.id,userId:JSON.parse(uni.getStorageSync("userInfo")).id};console.log(i),o.getVoteTicket(i)}})},getVoteTicket:function(t){var o=this;this.$api.getVoteTicket(t,function(t){if(console.log(o.pollOptions),t.data.rc==o.$util.RC.SUCCESS){var i=o.$util.tryParseJson(t.data.c);if(i){o.isPollShow=!0,o.isBtnShow=!1;for(var e=0;e<o.pollOptions.length;e++)o.optionActive.push(!1);var n=JSON.parse(i.selection);if(0==n.length)console.log("弃权");else for(var a=0;a<n.length;a++)for(var s=0;s<o.pollOptions.length;s++)n[a]==o.pollOptions[s].id&&(o.optionActive[s]=!0)}else{o.isPollShow=!1,o.isBtnShow=!0;for(var l=0;l<o.pollOptions.length;l++)o.optionActive.push(!1)}}o.getStatus()})},voteBtn:function(t,o,i){if(this.isPollShow)uni.showToast({icon:"none",title:"您已完成投票！",duration:500});else if("弃权"==t.title){for(var e=0;e<this.optionActive.length;e++)this.$set(this.optionActive,e,!1);0==o?(this.$set(this.optionActive,i,!0),this.activeNums=1):(this.$set(this.optionActive,i,!1),this.activeNums=this.pollInfo.choiceCount)}else{for(var n=0,a=0;a<this.optionActive.length;a++)1==this.optionActive[a]&&(n+=1);0==o?n==this.activeNums?uni.showToast({icon:"none",title:"选项数量不能超出限制",duration:500}):this.$set(this.optionActive,i,!0):this.$set(this.optionActive,i,!1)}},getStatus:function(){this.successData=[];var t=this.pollDetail.ops,o=0,i=0;o=33==this.pollInfo.effectiveRatio?1/3:50==this.pollInfo.effectiveRatio?.5:2/3,i=33==this.pollInfo.failureRatio?1/3:50==this.pollInfo.failureRatio?.5:2/3;var e=Math.ceil(this.quorum*o),n=Math.ceil(this.quorum*i);if(this.waiver>=n)this.status=0;else{for(var a=0,s=0;s<t.length;s++)t[s].ballotCount>=e&&(a=1);if(1==a)for(var l=0;l<t.length;l++)t[l].ballotCount>=e&&this.ticketCount>=n&&(this.status=1,this.successData.push(t[l].title));else this.ticketCount==this.quorum?this.status=2:this.status=-1}},submitVoteBtn:function(){for(var t=this,o=[],i=0;i<this.optionActive.length;i++)1==this.optionActive[i]&&o.push(this.pollOptions[i].id);var e=JSON.parse(uni.getStorageSync("orgUserInfo")),a=JSON.parse(uni.getStorageSync("poll")),s={orgId:e.orgId,voteId:a.id,userId:e.id,selections:(0,n.default)(o),ballotCount:e.weight,remark:"无"};this.$api.vote(s,function(o){o.data.rc==t.$util.RC.SUCCESS?(uni.showToast({icon:"success",title:"投票成功",duration:1500}),t.isPollShow=!0,t.isBtnShow=!1,t.resetData()):(uni.showToast({icon:"none",title:"投票失败，无权限或已超时",duration:1500}),t.resetData())})},resetData:function(){var t=uni.getStorageSync("poll");this.pollInfo=JSON.parse(t),this.activeNums=this.pollInfo.choiceCount;var o={voteId:this.pollInfo.id};this.getVoteDetail(o),this.getVoteOptions(o)},toPollRes:function(){uni.navigateTo({url:"./pollRes"})},toBack:function(){uni.navigateBack()}},onLoad:function(){var t=uni.getStorageSync("poll");this.pollInfo=JSON.parse(t),this.activeNums=this.pollInfo.choiceCount;var o=new Date;o=o.getTime(),o>this.pollInfo.expiryTime&&(this.voteTimeOver=!0);var i={voteId:this.pollInfo.id};this.getVoteDetail(i),this.getVoteOptions(i)}};o.default=a},"897f":function(t,o,i){"use strict";var e=function(){var t=this,o=t.$createElement,i=t._self._c||o;return i("v-uni-view",[i("v-uni-view",{staticClass:"header-box"},[i("v-uni-view",{staticClass:"title-box"},["1"==t.pollInfo.template?i("span",{staticClass:"poll-icon-color1 iconfont icon-paimingbiaoqian"}):t._e(),"0"==t.pollInfo.template?i("span",{staticClass:"poll-icon-color iconfont icon-user-list"}):t._e(),t._v(t._s(t.pollInfo.title))])],1),i("v-uni-view",{staticClass:"poll-info"},[i("v-uni-view",{staticClass:"info-status"},[i("v-uni-view",{staticClass:"info-xuantou"},["-1"==t.status?i("span",{staticStyle:{color:"#40c9c6"}},[t._v("投票未完成")]):t._e(),"0"==t.status?i("span",{staticStyle:{color:"#909399"}},[t._v("投票失效")]):t._e(),"1"==t.status?i("span",{staticStyle:{color:"#67C23A"}},[t._v("投票成功")]):t._e(),"2"==t.status?i("span",{staticStyle:{color:"#F56C6C"}},[t._v("投票失败")]):t._e()]),i("v-uni-view",{staticClass:"info-status-text"},[t._v("最多选投:"+t._s(t.activeNums)+" 项")])],1),i("v-uni-view",{staticClass:"info-text"},[t._v("应到总人数："+t._s(t.quorum)+" 人，已参投有效人数："+t._s(t.ticketCount)+" 人，已投票数："+t._s(t.opsNum)+"票，其中弃权人数："+t._s(t.waiver)+" 人，未参投人数："+t._s(t.quorum-t.ticketCount)+" 人")])],1),i("v-uni-view",{staticClass:"poll-content"},[i("v-uni-view",{staticClass:"poll-content-text"},[t._v(t._s(t.pollInfo.remark))])],1),i("v-uni-view",{staticClass:"poll-item-box"},[t._l(t.pollOptions,function(o,e){return i("v-uni-view",{key:e},t._l(t.optionActive,function(n,a){return i("v-uni-view",{key:a},[e==a&&0==n?i("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.voteBtn(o,n,a)}}},[i("v-uni-view",{staticClass:"poll-item poll-item-unActive"},[t._v(t._s(o.title))])],1):t._e(),e==a&&1==n?i("v-uni-view",{on:{click:function(i){i=t.$handleEvent(i),t.voteBtn(o,n,a)}}},[i("v-uni-view",{staticClass:"poll-item poll-item-active"},[t._v(t._s(o.title))])],1):t._e()],1)}),1)}),i("v-uni-view",{staticStyle:{clear:"both"}})],2),i("v-uni-view",{staticClass:"poll-btn"},["0"==t.pollInfo.status&&t.isBtnShow&&!t.voteTimeOver?i("v-uni-button",{attrs:{type:"primary"},on:{click:function(o){o=t.$handleEvent(o),t.submitVoteBtn()}}},[t._v("提交投票")]):i("v-uni-button",{attrs:{type:"primary"},on:{click:function(o){o=t.$handleEvent(o),t.toPollRes(o)}}},[t._v("结果详情")]),i("v-uni-button",{attrs:{type:"default"},on:{click:function(o){o=t.$handleEvent(o),t.toBack(o)}}},[t._v("返回上一页")])],1)],1)},n=[];i.d(o,"a",function(){return e}),i.d(o,"b",function(){return n})},a2bd:function(t,o,i){"use strict";var e=i("5682"),n=i.n(e);n.a},b35f:function(t,o,i){"use strict";i.r(o);var e=i("897f"),n=i("1702");for(var a in n)"default"!==a&&function(t){i.d(o,t,function(){return n[t]})}(a);i("a2bd");var s=i("2877"),l=Object(s["a"])(n["default"],e["a"],e["b"],!1,null,"2bd88a4e",null);o["default"]=l.exports}}]);