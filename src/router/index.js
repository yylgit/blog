import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Recruit from '@/pages/Recruit.vue';
import RecruitDetail from '@/pages/RecruitDetail.vue';

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/recruit',
      name: 'Recruit',
      component: Recruit
    },
    {
      path: '/recruitdetail',
      name: 'RecruitDetail',
      component: RecruitDetail
    },
  ]
})
