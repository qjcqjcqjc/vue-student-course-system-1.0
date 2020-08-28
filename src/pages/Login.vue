/* eslint-disable eqeqeq */
<template>
  <div class="all">
    <el-container>
      <el-header>
        <img src="../assets/logo.png" >
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
          class="demo-ruleForm"
        >
          <el-form-item  prop="username" >
            <el-input v-model="ruleForm.username" type="text" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" type="password" placeholder="密码"></el-input>
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
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
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
            this.$axios
              .post('http://localhost:8080/StudentCourse/login', {'username': this.ruleForm.username, 'password': this.ruleForm.password})
              .then(res => {
                /* 模拟服务器响应 */
                if (res.data.code === 200) {
                  console.log(res.data.data)
                  localStorage.setItem('menus', JSON.stringify(res.data.data))
                  this.$message.success(res.data.msg)
                  _that.$router.push('/index')
                } else {
                  this.$message.error(res.data.msg)
                }
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
  img{
    width:80px;
    height:60px;
    margin-left:-20px;

  }
  .el-header {
    background-color:rgba(30,144,255,0.7);
    color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    width:400px;
    height:100px;
    margin:0 auto;
    margin-top:7%;
    box-sizing: border-box;
    font-size: 25px;
  }
  .el-main {
    text-align: center;
    line-height: 160px;
    width:400px;
    height:300px;
    margin:0 auto;
    background-color: rgba(255,255,255,0.7);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    box-sizing: border-box;

  }

  .title{
    text-align: center;
    box-sizing: border-box;
    margin-top:-50px;
  }
  .demo-ruleForm{
    margin:0 auto;
    margin-top:50px;
    width:360px;
    margin-left:-50px;
  }
  .all{
    background: url("../assets/login.jpg") no-repeat;
    width:101.4%;
    height:100%;
    margin:-10px -10px;
    box-sizing: border-box;
    background-size :cover ;
    padding-bottom: 13%;
  }

</style>
