<template>
  <div class="container">
        <el-form ref="courseForm" :model="courseForm" :rules="rules" label-width="80px">
          <el-form-item label="课程编号" prop="courseId">
            <el-input v-model="courseForm.courseId" clearable></el-input>
          </el-form-item>
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="courseForm.courseName" clearable></el-input>
          </el-form-item>
           <el-form-item label="老师编号" prop="teacherId">
            <el-input v-model="courseForm.teacherId" clearable></el-input>
          </el-form-item>
          <el-form-item label="专业编号" prop="majorId">
            <el-input @keyup.enter=onSubmit() v-model="courseForm.majorId" clearable></el-input>
          </el-form-item>
          <div style="text-align:center">
            <el-button type="primary" @click="onSubmit('courseForm')" >添加</el-button>
            <el-button @click="onReset('courseForm')">重置</el-button>
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
      course: [],
      courseForm: {
        courseId: '',
        courseName: '',
        teacherId: '',
        majorId: ''
      },

      rules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        courseId: [
          { required: true, message: '请输入课程编号名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 的数值', trigger: 'blur' }
        ],
        teacherId: [
          { required: true, message: '请输入老师编号名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 的数值', trigger: 'blur' }
        ],
        majorId: [
          { required: true, message: '请输入专业编号名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 的数值', trigger: 'blur' }
        ]
      },
      isEdit: false,
      index: null
    }
  },
  created () {
    this.handlecourse()
  },
  methods: {

    onSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const courses = {
            courseId: this.courseForm.courseId,
            courseName: this.courseForm.courseName,
            teacherId: this.courseForm.teacherId,
            majorId: this.courseForm.majorId
          }
          const _that = this
          console.log(this.courseForm.courseName)
          this.$axios
            .post('addCourse', this.$qs.stringify(this.courseForm))
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
