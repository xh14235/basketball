<template>
  <div class="addplayer">
    <el-input v-model="pname" placeholder="姓名"></el-input>
    <el-radio-group v-model="sex">
      <el-radio :label="'男'">男</el-radio>
      <el-radio :label="'女'">女</el-radio>
    </el-radio-group>
    <el-input v-model="age" placeholder="年龄"></el-input>
    <el-input v-model="height" placeholder="身高"></el-input>
    <el-select v-model="team" clearable placeholder="请选择">
      <el-option v-for="item in teamlist" :key="item.code" :label="item.char" :value="item.code"></el-option>
    </el-select>
    <br />
    <el-button
      @click.native="add"
      style="background: #009688;border: none;"
      size="mini"
      type="success"
    >提交</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddPlayer",
  data() {
    return {
      pname: "",
      age: "",
      height: "",
      sex: "女",
      team: "",
      teamlist: []
    };
  },
  props: {
    playerobj: Object
  },
  methods: {
    getTeamList() {
      axios
        .get("http://132.232.17.176:9090/play/Team/getTeamCode")
        .then(res => {
          this.teamlist = res.data.data;
        });
    },
    add() {
      axios
        .post("http://132.232.17.176:9090/play/Team/addPlayer", {
          name: this.pname,
          sex: this.sex,
          age: this.age,
          stature: this.height,
          team: this.team
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.closeAddPlayer();
          }
        });
    },
    closeAddPlayer() {
      this.$emit("closeAdd");
    }
  },
  mounted() {
    this.getTeamList();
    this.pname = this.playerobj.name;
    this.age = this.playerobj.age;
    this.height = this.playerobj.stature;
    this.sex = this.playerobj.sex;
    this.team = this.playerobj.team;
  }
};
</script>

<style lang="stylus" scoped>
.addplayer >>> .el-input__inner
  height: 30px
  line-height: 30px
  margin-bottom: 20px
.addplayer >>> .el-input__suffix
  height: 35px
.addplayer
  width: 90%
  margin: 0 5%
  .el-radio-group
    margin-bottom: 20px
</style>
