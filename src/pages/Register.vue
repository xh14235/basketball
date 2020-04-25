<template>
  <div class="register">
    <video src="../assets/calc.mp4" autoplay loop></video>
    <div class="register-box">
      <div class="register-title">管理系统注册</div>
      <form>
        <el-input v-model="username" placeholder="用户名"></el-input>
        <el-input v-model="password" placeholder="密码" show-password></el-input>
        <el-button @click="register">注册</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    register() {
      axios
        .post("http://132.232.17.176:9090/login/register/register", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          const code = res.data.code;
          if (code == 2000) {
            this.$message({
              message: "注册成功",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push({ path: "/login" });
            }, 1000);
          } else if (code == 2030) {
            this.$message({
              message: "该账号已注册",
              type: "warning"
            });
          } else {
            this.$message.error("注册失败");
          }
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.register
  position: relative
  video
    position: fixed
    width: 100vw
    heiht: 100vh
    z-index: -1
  .register-box
    position: absolute
    top: 15vh
    left: 35vw
    box-sizing: border-box
    width: 30vw
    height: 70vh
    padding: 5vh 2vw
    background: rgba(0, 0, 0, 0.8)
    .register-title
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
