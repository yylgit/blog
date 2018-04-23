<template>
  <div class="main-page">
 
  <h3>2018年的春季校招内推开始了！</h3>
  <h3>18届校招，19届及以后实习！！</h3>
  <p>18届的同学们，是不是马上毕业手上还没有offer？是不是对现在的offer还不太满意？赶快来参加一下吧，赶紧上车，乘风破浪，2018注定是不平凡的一年！</p>
  <p>19届及以后的同学们，是不是想早点体验互联网公司的工作节奏？ 是不是想早点出来工作走上人生巅峰？赶快来实习吧，益处多多！</p>
  <p>网申分为普通网申和内部推荐，我是滴滴员工，把我的内部推荐链接分享给大家。详细介绍看下面的图片。</p>
  <p class="red">仔细看下面说明，慎重选择，只能内推一个岗位</p>
  <p class="red">选创建快捷简历，然后会给你的邮箱发送完善简历的邮件</p>
  <div class="item"  @click="gotoLink('SpringList2018')">点这里进入内部推荐</div>
  <p>通过我的内推链接投递的简历，可以通过yangyiliang@didichuxing.com邮箱联系我，查询志愿具体状态</p>
  <img src="../assets/2018Spring.jpeg" class="logo">
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
    }
  },
  methods: {
    gotoLink(routerName) {
      this.$router.push({
        name: routerName
      })
    }
  }
}
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-page {
  .logo {
    width: 100%;
  }
  h3 {
    text-align: center;
    color: #fa8919;
  }
  p{
    padding: 10px;
    text-align: left;
    font-size: 16px;
  }
  .item {
    background: #fa8919;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    font-size: 18px;
    text-align: center;
    margin: 10px;
  }
  .red {
    color: red;
  }
}
</style>
