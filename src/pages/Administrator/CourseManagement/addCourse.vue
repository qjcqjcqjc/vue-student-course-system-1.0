<template>
  <div class="container" style="margin-left:15%;">
    <div style="margin-left:34%;">
      <el-button type="primary" @click="addCourse()">添加</el-button>
    </div>
    <h3 style="margin-left:300px;">课程信息</h3>
    <div class="cantainer">
      <el-table
        class="coursetable"
        style="width: 100%;"
        :data="course.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      >
        <el-table-column prop="courseId" align="center" label="课程编号" width="120"></el-table-column>
        <el-table-column prop="courseName" align="center" label="课程名称" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.courseName" class="input"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="teacher.teacherId" align="center" label="老师编号" width="100">
          <template slot-scope="scope">
            <el-input  v-model="scope.row.teacher.teacherId" class="input"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="major.majorId" align="center" label="专业编号" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.major.majorId" class="input"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="editCourse(scope.row)">保存</el-button>
            <el-button size="mini" type="danger" @click="delClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="course.length"
      ></el-pagination>

      <el-dialog title="添加课程" :visible.sync="dialogVisible" align="center" width="50%">
        <el-form ref="courseForm" :model="courseForm" label-width="80px">
          <div style="width:400px;">
            <el-form-item label="课程编号" prop="courseId">
              <el-input v-model="courseForm.courseId" clearable></el-input>
            </el-form-item>
            <el-form-item label="课程名称" prop="courseName">
              <el-input v-model="courseForm.courseName" clearable></el-input>
            </el-form-item>
            <el-form-item label="老师编号" prop="teacherId">
              <el-input v-model="courseForm.teacherId" clearable></el-input>
            </el-form-item>
            <el-form-item label="专业编号" prop="credit">
              <el-input @keyup.enter="onSubmit()" v-model="courseForm.majorId" clearable></el-input>
            </el-form-item>
          </div>
          <div style>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onReset('courseForm')">重置</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
  name: 'HelloWorld',
  data () {
    return {
      dialogVisible: false,
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

      addCourse () {
          this.dialogVisible = true
      },
      onSubmit () {
          this.$refs.courseForm.validate((valid) => {
              if (valid) {
                  const courses = {
                      courseId: this.courseForm.courseId,
                      courseName: this.courseForm.courseName,
                      teacherId: this.courseForm.teacherId,
                      majorId: this.courseForm.majorId
                  }
                  this.$axios
                      .post(
                          'addCourse',
                          this.$qs.stringify(courses)
                      )
                      .then((res) => {
                          /* 模拟服务器响应 */
                          if (res.data.code !== 200) {
                              console.log(res.data.msg)
                              return this.$message.error(res.data.msg)
                          } else {
                              this.$message.success(res.data.msg)
                              this.$refs.courseForm.resetFields()
                              this.handlecourse()
                          }
                          this.dialogVisible = false
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
      editCourse (row) {
          const courses = {
              courseId: row.courseId,
              courseName: row.courseName,
              teacherId: row.teacher.teacherId,
              majorId: row.major.majorId
          }
          this.$axios
              .post(
                  'updateCourse',
                  this.$qs.stringify(courses)
              )
              .then((res) => {
                  /* 模拟服务器响应 */
                  if (res.data.code !== 200) {
                      console.log(res.data.msg)
                      return this.$message.error(res.data.msg)
                  } else {
                      this.$message.success(res.data.msg)
                      this.$refs.row.resetFields()
                      this.handlecourse()
                  }
              })
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
          this.pagesize = size
          console.log(this.pagesize) // 每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
          console.log(this.currentPage) // 点击第几页
      },
      handlecourse () {
          this.$axios
              .get('getAllCourse')
              .then((res) => {
                  /* 模拟服务器响应 */
                  if (res.data.code === 200) {
                      this.course = res.data.data
                  } else {
                      console.log(res.data.msg)
                  }
              })
      },
      delClick (row) {
          // 弹出确定取消框，是否删除用户
          this.$confirm('是否删除该课程', '删除提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
          })
              .then(() => {
                  this.$axios
                      .get(
                          'aDeleteCourse?courseId=' +
                          row.courseId
                      )
                      .then((res) => {
                          // 判断如果删除失败，就做提示
                          if (res.data.code !== 200) {
                              return this.$message.error('删除课程失败')
                          } else {
                              this.$message.success('删除课程成功')
                              this.handlecourse()
                          }
                      })
              })
              .catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  })
              })
      },
    mounted () {}
  }
}
</script>
<style>
  .coursetable input.el-input__inner{
    border:none
  }
</style>
<style scoped>

</style>
