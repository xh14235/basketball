<template>
  <div class="header">
    <span class="title">大学校园篮球联赛管理系</span>
    <el-dropdown>
      <span class="user">{{username}}</span>
      <i class="el-icon-caret-bottom"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapState(["username"])
  },
  methods: {
    logout() {
      this.vuexLogout();
      this.$router.push({ path: "/login" });
    },
    ...mapMutations(["vuexLogout"])
  }
};
</script>

<style lang="stylus" scoped>
.header
  display: flex
  justify-content: space-between
  line-height: 50px
  .title
    font-size: 18px
  .el-dropdown
    color: #fff
</style>
