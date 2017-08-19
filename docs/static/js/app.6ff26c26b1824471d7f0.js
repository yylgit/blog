webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_Main__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_Main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__pages_Main__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_Recruit_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_Recruit_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__pages_Recruit_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_RecruitDetail_vue__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_RecruitDetail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__pages_RecruitDetail_vue__);






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'Main',
    component: __WEBPACK_IMPORTED_MODULE_2__pages_Main___default.a
  }, {
    path: '/recruit',
    name: 'Recruit',
    component: __WEBPACK_IMPORTED_MODULE_3__pages_Recruit_vue___default.a
  }, {
    path: '/recruitdetail',
    name: 'RecruitDetail',
    component: __WEBPACK_IMPORTED_MODULE_4__pages_RecruitDetail_vue___default.a
  }]
}));

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(13);






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
  state: __WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */],
  mutations: __WEBPACK_IMPORTED_MODULE_3__mutations__["a" /* default */],
  actions: __WEBPACK_IMPORTED_MODULE_4__actions__["a" /* default */]
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(18)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(25),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  computed: {},
  watch: {
    '$route'(to, from) {
      document.body.scrollTop = 0;
    }
  },
  methods: {},
  created: function () {}
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Main',
  data() {
    return {
      list: [{
        text: '滴滴出行2018校招我的专属内推链接',
        routeName: 'Recruit'
      }]
    };
  },
  methods: {
    gotoLink(routerName) {
      this.$router.push({
        name: routerName
      });
    }
  }
});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (30:6)\n\n\u001b[0m \u001b[90m 28 | \u001b[39m    }\u001b[33m,\u001b[39m\n \u001b[90m 29 | \u001b[39m    computed\u001b[33m:\u001b[39m {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 30 | \u001b[39m      \u001b[33m...\u001b[39mmapState([\n \u001b[90m    | \u001b[39m      \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 31 | \u001b[39m        \u001b[32m'recruitData'\u001b[39m\n \u001b[90m 32 | \u001b[39m    ])\n \u001b[90m 33 | \u001b[39m    }\u001b[33m,\u001b[39m\u001b[0m\n");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function () {
    return {
      url: ''
    };
  },
  computed: {
    pcLink: function () {
      return `https://www.nowcoder${this.url}?type=neitui&source=D11190`;
    },
    h5Link: function () {
      return `https://m.nowcoder${this.url}?type=neitui&source=D11190`;
    },
    qrLink: function () {
      var encodeUrl = encodeURIComponent(`https://m.nowcoder.com${this.url}?type=neitui&source=D11190`);
      return `https://www.nowcoder.com/qr/to?url=${encodeUrl}&size=200`;
    }
  },
  created() {
    console.log(this.$route);
    let { url } = this.$route.query;
    this.url = url;
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fetch_detector__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fetch_detector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fetch_detector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fetch_ie8__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fetch_ie8___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fetch_ie8__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store__ = __webpack_require__(4);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.







__WEBPACK_IMPORTED_MODULE_2_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_2_vue__["a" /* default */]({
  el: '#app',
  store: __WEBPACK_IMPORTED_MODULE_5__store__["a" /* default */],
  router: __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_3__App___default.a }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  changePageData(state, pageData) {
    state.pageData = pageData;
  },
  changeOnlineLink(state, onlineLink) {
    state.onlineLink = onlineLink;
  }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  recruitData: [{ "jobs": ["研发工程师"], "url": "/careers/301486/92" }, { "jobs": ["安全工程师"], "url": "/careers/301485/91" }, { "jobs": ["算法工程师"], "url": "/careers/301484/85" }, { "jobs": ["Linux内核工程师", "测试开发工程师", "系统开发工程师", "运维开发工程师", "地图工艺工程师", "反作弊工程师", "计算机视觉研发工程师", "智能驾驶研发工程师", "智能交互技术研发工程师"], "url": "/careers/didi1/79" }, { "jobs": ["财务管培生（会计方向）", "财务管培生（资金管理方向）", "财务管培生（BT项目管理）", "法务管培生", "采购管培生", "财务管培生（税务方向）"], "url": "/careers/didi2/80" }, { "jobs": ["产品助理"], "url": "/careers/301469/81" }, { "jobs": ["市场营销-品质出行"], "url": "/careers/301496/82" }, { "jobs": ["战略规划", "战略BP"], "url": "/careers/301492/83" }, { "jobs": ["数据分析师-汽车资产管理中心"], "url": "/careers/301490/84" }, { "jobs": ["运营管培生-品质出行"], "url": "/careers/301497/86" }, { "jobs": ["UI设计师-品质出行"], "url": "/careers/301493/87" }, { "jobs": ["IT风控合规顾问", "风控合规顾问"], "url": "/careers/301482/88" }, { "jobs": ["交互设计师-品质出行"], "url": "/careers/301494/90" }, { "jobs": ["用户研究-快捷出行", "市场管培生-快捷出行", "运营管培生-快捷出行"], "url": "/careers/301489/93" }, { "jobs": ["城市经理管培生"], "url": "/careers/301487/94" }, { "jobs": ["数据分析师-快捷出行", "战略顾问-快捷出行"], "url": "/careers/301488/96" }, { "jobs": ["交互设计师-海浪事业群", "视觉设计-海浪事业群", "车辆管理管培生", "区域运营管培生", "产品助理-海浪事业群"], "url": "/careers/301483/97" }, { "jobs": ["客户画像&数据分析管培生", "战略规划管培生", "数据分析师-CTO", "战略顾问-CTO"], "url": "/careers/301468/98" }, { "jobs": ["用户研究--品质出行"], "url": "/careers/301495/99" }, { "jobs": ["数据分析师-品质出行"], "url": "/careers/301498/100" }, { "jobs": ["数据分析师-顺风车"], "url": "/careers/301491/101" }]

});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(16)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(23),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-11e2b03e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(19)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(26),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(17)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(24),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main-page"
  }, _vm._l((_vm.list), function(item) {
    return _c('div', {
      staticClass: "item",
      on: {
        "click": function($event) {
          _vm.gotoLink(item.routeName)
        }
      }
    }, [_vm._v(_vm._s(item.text))])
  }))
},staticRenderFns: []}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "recruit-detail"
  }, [_c('div', {
    staticClass: "qrimg-wrap"
  }, [_c('img', {
    attrs: {
      "src": _vm.qrLink
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "tip-text"
  }, [_vm._v("\n      长按图片可保存二维码\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v("\n    PC端链接:\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "link"
  }, [_vm._v("\n    " + _vm._s(_vm.pcLink) + "\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v("\n    移动端链接:\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "link"
  }, [_vm._v("\n    " + _vm._s(_vm.h5Link) + "\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v("\n    内推活动安排:\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "link"
  }, [_vm._v("\n    内推活动时间：8.07-8.25 笔试时间：8.26 面试时间：8.28-9.08 offer发放时间：9月\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "title"
  }, [_vm._v("\n    内推对象:\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "link"
  }, [_vm._v("\n    2018届应届毕业生\n  ")])])
},staticRenderFns: []}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "recruit-page"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("\n  滴滴出行2018校招我的专属内推链接！\n  ")]), _vm._v(" "), _vm._l((_vm.recruitData), function(item) {
    return _c('div', {
      staticClass: "item-row"
    }, [_c('div', {
      staticClass: "name-list"
    }, _vm._l((item.jobs), function(nameItem) {
      return _c('div', {
        staticClass: "name-item"
      }, [_vm._v("\n        " + _vm._s(nameItem) + "\n      ")])
    })), _vm._v(" "), _c('div', {
      staticClass: "link"
    }, [_c('div', {
      staticClass: "link-btn",
      on: {
        "click": function($event) {
          _vm.gotoDetail(item.url)
        }
      }
    }, [_vm._v("\n        内推链接\n      ")])])])
  })], 2)
},staticRenderFns: []}

/***/ })
],[12]);
//# sourceMappingURL=app.6ff26c26b1824471d7f0.js.map