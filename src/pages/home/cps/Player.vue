<template>
  <div class="hello">
    <el-button
      size="mini"
      type="success"
      icon="el-icon-circle-plus-outline"
      style="background: #009688;border: none;"
      @click.native="addPlayer()"
    >添加</el-button>
    <el-table
      :data="list"
      border
      style="width: 100%"
      :header-cell-style="{background:'#F2F2F2'}"
      class="table1"
    >
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="stature" label="身高"></el-table-column>
      <el-table-column prop="team" label="所属球队"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deletePlayer(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="changePlayer(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      @current-change="changePage"
    ></el-pagination>
    <el-drawer
      :title="playermsg"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="closeDrawer"
    >
      <add-player @closeAdd="closeAddPlayer" :playerobj="playerobj" v-if="drawer"></add-player>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import AddPlayer from "@/pages/common/AddPlayer";
export default {
  name: "Player",
  components: {
    AddPlayer
  },
  data() {
    return {
      list: [],
      total: 0,
      currpage: 1,
      pagesize: 8,
      drawer: false,
      direction: "rtl",
      playermsg: "",
      playerobj: {}
    };
  },
  methods: {
    getPlayerList(page) {
      axios
        .get(
          "http://132.232.17.176:9090/play/Team/playerList?current_page=" +
            page +
            "&size=" +
            this.pagesize
        )
        .then(res => {
          this.list = res.data.data.list;
          this.total = res.data.data.total;
        });
    },
    changePage(page) {
      this.currpage = page;
      this.getPlayerList(page);
    },
    deletePlayer(row) {
      axios
        .post("http://132.232.17.176:9090/play/Team/delPlayer", { id: row.id })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getPlayerList(1);
          }
        });
    },
    changePlayer(row) {
      this.direction = "ltr";
      this.playermsg = "修改球员信息";
      this.playerobj = row;
      this.drawer = true;
    },
    addPlayer() {
      this.direction = "rtl";
      this.playermsg = "添加球员";
      this.playerobj = {
        name: "",
        age: "",
        sex: "男",
        team: "",
        stature: ""
      };
      this.drawer = true;
    },
    closeDrawer() {
      this.drawer = false;
    },
    closeAddPlayer() {
      this.drawer = false;
      this.getPlayerList(this.currpage);
    }
  },
  mounted() {
    this.getPlayerList(1);
  }
};
</script>

<style lang="stylus" scoped>
.table1 >>> td, .table1 >>> th
  padding: 6px
.table1
  margin: 15px 0
</style>
