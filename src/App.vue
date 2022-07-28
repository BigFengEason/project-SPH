<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在登录、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  // 组件一挂载完毕，就可以向服务器发请求
  mounted() {
    // 通知Vuex发请求，获取数据后存储于仓库当中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style scoped>
</style>