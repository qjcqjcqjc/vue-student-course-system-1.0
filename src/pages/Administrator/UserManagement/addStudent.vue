<template>
  <div class="container">
        <el-form ref="studentForm" :model="studentForm" :rules="rules" label-width="80px">
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="studentForm.studentId" clearable></el-input>
          </el-form-item>
          <el-form-item label="名字" prop="studentName">
            <el-input v-model="studentForm.studentName" clearable></el-input>
          </el-form-item>
           <el-form-item label="班级" prop="classId">
            <el-input v-model="studentForm.classId" clearable></el-input>
          </el-form-item>
          <div style="text-align:center">
            <el-button type="primary" @click="onSubmit('studentForm')" >添加</el-button>
            <el-button @click="onReset('studentForm')">重置</el-button>
          </div>
        </el-form>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      currentPage: 1, // 初始页
      pagesize: 5, //  每页的数据
      student: [],
      studentForm: {
        studentId: '',
        studentName: '',
        classId: ''
      },
      rules: {
        studentName: [
          { required: true, message: '请输入名字名称', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        studentId: [
          { required: true, message: '请输入学号名称', trigger: 'blur' },
          { min: 10, max: 10, message: '长度为 10 的数值', trigger: 'blur' }
        ],
        classId: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 的数值', trigger: 'blur' }
        ]
      },
      isEdit: false,
      index: null
    }
  },
  methods: {
    onSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const student = {
            studentId: this.studentForm.studentId,
            studentName: this.studentForm.studentName,
            classId: this.studentForm.classId
          }
          const _that = this
          console.log(this.studentForm.studentName)
          this.$axios
            .post('http://localhost:8080/StudentCourse/addStudent', this.$qs.stringify(this.studentForm))
            .then(res => {
            /* 模拟服务器响应 */
              if (res.data.code !== 200) {
                console.log(res.data.msg)
                return this.$message.error(res.data.msg)
              }
              this.$message.success(res.data.msg)
              this.$refs[formName].resetFields()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
    },
    mounted () {}
  }
}
</script>
<style scoped>
  .container{
    margin-top:7%;
    width:400px;
    margin-left: 25%;
  }
  .el-button{
    margin-left:5%;
  }
  
</style>
