/* eslint-disable eqeqeq */
<template>
  <div class="all">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" />
        <el-form class="title">
          <a>学生选课系统</a>
        </el-form>
      </el-header>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-loginForm"
        >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" show-password placeholder="密码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: '17007',
        password: '17007'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _that = this
          console.log('准备删除cookie')
          this.$cookieStore.delCookie('Authorization')
          this.$axios
            .post('login', {'username': this.ruleForm.username, 'password': this.ruleForm.password})
            .then(res => {
            /* 模拟服务器响应 */
              console.log(res.headers.authorization)
              console.log(res.data.data.menus)
              this.$cookieStore.setCookie('Authorization', res.headers.authorization, 600)
              console.log(this.$cookieStore.getCookie('Authorization'))
              localStorage.setItem('menus', JSON.stringify(res.data.data.menus))
              _that.$router.push('/index')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
img {
  width: 80px;
  height: 60px;
  margin-left: -20px;
}
.el-header {
  background-color: rgba(30, 144, 255, 0.7);
  color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 400px;
  height: 100px;
  margin: 0 auto;
  margin-top: 7%;
  box-sizing: border-box;
  font-size: 25px;
}
.el-main {
  text-align: center;
  line-height: 160px;
  width: 400px;
  height: 300px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.7);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  box-sizing: border-box;
  margin-top: -50px;
}
.demo-loginForm {
  margin: 0 auto;
  margin-top: 50px;
  width: 360px;
  margin-left: -50px;
}
.all {
  background: url("../assets/login.png") no-repeat;
  width: 101.4%;
  height: 100%;
  margin: -10px -10px;
  box-sizing: border-box;
  background-size: cover;
  padding-bottom: 13%;
}
</style>