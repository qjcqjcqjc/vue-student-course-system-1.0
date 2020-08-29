/* eslint-disable eqeqeq */
<template>
  <div>
    <el-container>
      <el-header>
        <a>学生选课系统</a>
      </el-header>
      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
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
          username: '1700720133',
          password: '1700720133'
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
  a{
    font-size: 50px;
  }
  .demo-ruleForm {
    width: 300px;
    height: 500px;
    margin: 0 auto;
    margin-top: 300px;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    text-align: center;
    line-height: 160px;
    background-image: url("../assets/login.jpg");
    background-size: cover;
  }
  body > .el-container {
    margin-bottom: 80px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
