webpackJsonp([1],[,,,,,,,,,,,,function(t,e,n){"use strict";var r=n(2),i=n(65),s=n(58),o=n.n(s),c=n(59),a=n.n(c),u=n(60),l=n.n(u);r.a.use(i.a),e.a=new i.a({mode:"hash",routes:[{path:"/",name:"Main",component:o.a},{path:"/recruit",name:"Recruit",component:a.a},{path:"/recruitdetail",name:"RecruitDetail",component:l.a}]})},function(t,e,n){"use strict";var r=n(2),i=n(1),s=n(24),o=n(23),c=n(22);r.a.use(i.b);var a=new i.b.Store({state:s.a,mutations:o.a,actions:c.a});e.a=a},,,function(t,e,n){function r(t){n(56)}var i=n(0)(n(17),n(63),r,null,null);t.exports=i.exports},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(1);e.default={name:"app",computed:{},watch:{$route:function(t,e){document.body.scrollTop=0}},methods:{},created:function(){}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Main",data:function(){return{list:[{text:"滴滴出行2018校招我的专属内推链接",routeName:"Recruit"}]}},methods:{gotoLink:function(t){this.$router.push({name:t})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(26),i=n.n(r),s=n(1);e.default={data:function(){return{}},computed:i()({},n.i(s.a)(["recruitData"])),methods:{gotoDetail:function(t){location.href=this.pcLink(t)},pcLink:function(t){return"https://www.nowcoder.com"+t+"?type=neitui&source=D11190"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(1);e.default={data:function(){return{url:""}},computed:{pcLink:function(){return"https://www.nowcoder.com"+this.url+"?type=neitui&source=D11190"},h5Link:function(){return"https://m.nowcoder.com"+this.url+"?type=neitui&source=D11190"},qrLink:function(){return"https://www.nowcoder.com/qr/to?url="+encodeURIComponent("https://m.nowcoder.com"+this.url+"?type=neitui&source=D11190")+"&size=200"}},created:function(){console.log(this.$route);var t=this.$route.query.url;this.url=t},methods:{entryPC:function(){location.href=this.pcLink},entryH5:function(){location.href=this.h5Link}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(14),i=(n.n(r),n(15)),s=(n.n(i),n(2)),o=n(16),c=n.n(o),a=n(12),u=n(13);s.a.config.productionTip=!1,new s.a({el:"#app",store:u.a,router:a.a,template:"<App/>",components:{App:c.a}})},function(t,e,n){"use strict";e.a={}},function(t,e,n){"use strict";e.a={changePageData:function(t,e){t.pageData=e},changeOnlineLink:function(t,e){t.onlineLink=e}}},function(t,e,n){"use strict";e.a={recruitData:[{jobs:["研发工程师"],url:"/careers/301486/92"},{jobs:["安全工程师"],url:"/careers/301485/91"},{jobs:["算法工程师"],url:"/careers/301484/85"},{jobs:["Linux内核工程师","测试开发工程师","系统开发工程师","运维开发工程师","地图工艺工程师","反作弊工程师","计算机视觉研发工程师","智能驾驶研发工程师","智能交互技术研发工程师"],url:"/careers/didi1/79"},{jobs:["财务管培生（会计方向）","财务管培生（资金管理方向）","财务管培生（BT项目管理）","法务管培生","采购管培生","财务管培生（税务方向）"],url:"/careers/didi2/80"},{jobs:["产品助理"],url:"/careers/301469/81"},{jobs:["市场营销-品质出行"],url:"/careers/301496/82"},{jobs:["战略规划","战略BP"],url:"/careers/301492/83"},{jobs:["数据分析师-汽车资产管理中心"],url:"/careers/301490/84"},{jobs:["运营管培生-品质出行"],url:"/careers/301497/86"},{jobs:["UI设计师-品质出行"],url:"/careers/301493/87"},{jobs:["IT风控合规顾问","风控合规顾问"],url:"/careers/301482/88"},{jobs:["交互设计师-品质出行"],url:"/careers/301494/90"},{jobs:["用户研究-快捷出行","市场管培生-快捷出行","运营管培生-快捷出行"],url:"/careers/301489/93"},{jobs:["城市经理管培生"],url:"/careers/301487/94"},{jobs:["数据分析师-快捷出行","战略顾问-快捷出行"],url:"/careers/301488/96"},{jobs:["交互设计师-海浪事业群","视觉设计-海浪事业群","车辆管理管培生","区域运营管培生","产品助理-海浪事业群"],url:"/careers/301483/97"},{jobs:["客户画像&数据分析管培生","战略规划管培生","数据分析师-CTO","战略顾问-CTO"],url:"/careers/301468/98"},{jobs:["用户研究--品质出行"],url:"/careers/301495/99"},{jobs:["数据分析师-品质出行"],url:"/careers/301498/100"},{jobs:["数据分析师-顺风车"],url:"/careers/301491/101"}]}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){function r(t){n(54)}var i=n(0)(n(18),n(61),r,"data-v-11e2b03e",null);t.exports=i.exports},function(t,e,n){function r(t){n(57)}var i=n(0)(n(19),n(64),r,null,null);t.exports=i.exports},function(t,e,n){function r(t){n(55)}var i=n(0)(n(20),n(62),r,null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main-page"},t._l(t.list,function(e){return n("div",{staticClass:"item",on:{click:function(n){t.gotoLink(e.routeName)}}},[t._v(t._s(e.text))])}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recruit-detail"},[n("div",{staticClass:"qrimg-wrap"},[n("img",{attrs:{src:t.qrLink}}),t._v(" "),n("div",{staticClass:"tip-text"},[t._v("\n      长按图片可保存二维码\n    ")])]),t._v(" "),n("div",{staticClass:"entry-row"},[n("div",{staticClass:"entry-btn",on:{click:t.entryPC}},[t._v("\n    PC端入口\n    ")]),t._v(" "),n("div",{staticClass:"entry-btn",on:{click:t.entryH5}},[t._v("\n      移动端入口\n    ")])]),t._v(" "),n("div",{staticClass:"title"},[t._v("\n    内推活动安排:\n  ")]),t._v(" "),n("div",{staticClass:"link"},[t._v("\n    内推活动时间：8.07-8.25 笔试时间：8.26 面试时间：8.28-9.08 offer发放时间：9月\n  ")]),t._v(" "),n("div",{staticClass:"title"},[t._v("\n    内推对象:\n  ")]),t._v(" "),n("div",{staticClass:"link"},[t._v("\n    2018届应届毕业生\n  ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recruit-page"},[n("div",{staticClass:"title"},[t._v("\n  滴滴出行2018校招我的专属内推链接！\n  ")]),t._v(" "),t._l(t.recruitData,function(e){return n("div",{staticClass:"item-row"},[n("div",{staticClass:"name-list"},t._l(e.jobs,function(e){return n("div",{staticClass:"name-item"},[t._v("\n        "+t._s(e)+"\n      ")])})),t._v(" "),n("div",{staticClass:"link"},[n("div",{staticClass:"link-btn",on:{click:function(n){t.gotoDetail(e.url)}}},[t._v("\n        内推申请\n      ")])])])})],2)},staticRenderFns:[]}}],[21]);
//# sourceMappingURL=app.a0781d4f29028a5ee158.js.map