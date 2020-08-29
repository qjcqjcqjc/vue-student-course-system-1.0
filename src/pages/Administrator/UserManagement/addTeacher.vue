<template>
  <div class="container">
      <el-form ref="teacherForm" :model="teacherForm" :rules="rules" label-width="80px">
        <el-form-item label="教师编号" prop="teacherId">
          <el-input type="number" v-model="teacherForm.teacherId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="teacherName">
          <el-input v-model="teacherForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="学院编号" prop="schoolId">
          <el-input type="number" v-model="teacherForm.schoolId"></el-input>
        </el-form-item>

        
        <div style="text-align:center">
          <el-button type="primary" @click="onSubmit('teacherForm')">添加</el-button>
          <el-button @click="onReset('teacherForm')">重置</el-button>
        </div>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      teacherForm: {
        teacherId: '',
        teacherName: '',
        schoolId: ''
      },
      rules: {
        teacherName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        teacherId: [
          { required: true, message: '请输入教师编号', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为 6 的数值', trigger: 'blur' }
        ],
        schoolId: [
          { required: true, message: '请输入教师编号', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 的数值', trigger: 'blur' }
        ]
      },
      dataList: [],
      isEdit: false,
      index: null
    }
  },
  methods: {
    onSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const teacher = {
            teacherId: this.teacherForm.teacherId,
            teacherName: this.teacherForm.teacherName,
            schoolId: this.teacherForm.schoolId        
          }
          const _that = this
          this.$axios
            .post('addTeacher', this.$qs.stringify(this.teacherForm))
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

