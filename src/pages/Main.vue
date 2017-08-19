<template>
  <div class="main-page">
    <div class="item" v-for="item in list" @click="gotoLink(item.routeName)">{{item.text}}</div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      list: [
        {
          text:'滴滴出行2018校招我的专属内推链接',
          routeName: 'Recruit'
        }
      ]
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-page {
    background-color: rgb(239, 239, 244);
    height: 100%;
    padding: 10px;
  .item {
    background: #fa8919;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    font-size: 18px;
    text-align: center;
    margin: 10px;
  }
}
</style>
