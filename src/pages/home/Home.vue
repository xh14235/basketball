<template>
  <div class="home">
    <el-header>
      <com-header></com-header>
    </el-header>
    <el-container>
      <el-aside>
        <el-collapse v-model="activeName" accordion v-for="item of list" :key="item.id">
          <el-collapse-item :title="item.title+'管理'" :name="item.id">
            <router-link :to="item.linkto" tag="div">{{item.title+'列表'}}</router-link>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Game from "./cps/Game";
import Header from "../common/Header";
export default {
  name: "Home",
  data() {
    return {
      activeName: "1",
      list: [
        {
          id: "1",
          title: "球员",
          linkto: "/player"
        },
        {
          id: "2",
          title: "球队",
          linkto: "/game"
        }
      ]
    };
  },
  components: {
    ComHeader: Header,
    Game
  }
};
</script>

<style lang="stylus" scoped>
.el-collapse >>> .el-collapse-item__header
  height: 40px
  line-height: 40px
  padding-left: 10px
  background-color: transparent
  &:hover, &.is-active
    background-color: #ddd
.el-collapse >>> .el-collapse-item__wrap
  background-color: transparent
  .el-collapse-item__content
    padding-bottom: 0
    height: 35px
    line-height: 35px
    padding-left: 20px
.home
  background: #EEEEEE
  .el-header
    height: 50px !important
    background: #222
    color: #fff
  .el-container
    min-height: calc(100vh - 50px)
    .el-aside
      width: 20vw !important
      .el-collapse
        border-top: 0
        border-bottom: 1px solid #002586
    .el-main
      background: #fff
</style>
