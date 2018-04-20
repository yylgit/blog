import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import SpringList2018 from '@/pages/SpringList2018.vue';
import SpringMain2018 from '@/pages/SpringMain2018.vue';
// import Recruit from '@/pages/Recruit.vue';
// import RecruitDetail from '@/pages/RecruitDetail.vue';

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    // {
    //   path: '/',
    //   name: 'Main',
    //   component: Main
    // },
    {
      path: '/',
      name: 'SpringMain2018',
      component: SpringMain2018
    },
    {
      path: '/SpringList2018',
      name: 'SpringList2018',
      component: SpringList2018
    },
    // {
    //   path: '/recruit',
    //   name: 'Recruit',
    //   component: Recruit
    // },
    // {
    //   path: '/recruitdetail',
    //   name: 'RecruitDetail',
    //   component: RecruitDetail
    // },
  ]
})
