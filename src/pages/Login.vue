<template>
  <div class="login">
    <video src="../assets/calc.mp4" autoplay loop></video>
    <div class="login-box">
      <div class="login-title">管理系统登录</div>
      <form>
        <el-input v-model="username" placeholder="用户名"></el-input>
        <el-input v-model="password" placeholder="密码" show-password></el-input>
        <el-button @click="login">登录</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post("http://132.232.17.176:9090/login/Login/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          const code = res.data.code;
          if (code == 2010) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.vuexLogin(this.username);
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 1000);
          } else {
            this.$message.error("账号或者密码错误");
          }
        });
    },
    ...mapMutations(["vuexLogin"])
  }
};
</script>

<style lang="stylus" scoped>
.login >>> .el-input__inner
  height: 8vh
  line-height: 8vh
  border: 1px solid #DCDEE0
  background-color: transparent
  color: #fff
.login
  position: relative
  video
    position: fixed
    width: 100vw
    heiht: 100vh
    z-index: -1
  .login-box
    position: absolute
    top: 15vh
    left: 35vw
    box-sizing: border-box
    width: 30vw
    height: 70vh
    padding: 5vh 2vw
    background: rgba(0, 0, 0, 0.8)
    .login-title
      color: #fff
      width: 26vw
      height: 10vh
      line-height: 10vh
      background: rgba(24, 159, 146, 0.5)
      padding-left: 4vw
      transform: translateX(-4vw)
      margin-top: 2vh
    .el-input
      margin-top: 5vh
    .el-button
      margin-top: 5vh
      background: rgba(24, 159, 146, 0.5)
      color: #fff
      width: 100%
      height: 8vh
      line-height: 8vh
      border: 0
      padding: 0
</style>
