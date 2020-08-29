<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input type="number" v-model="searchIdData" placeholder="请输入课程编号" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="searchId" >查询</el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchNameData" placeholder="请输入课程姓名" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="searchName">查询</el-button>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchTeaNameData" placeholder="请输入老师姓名" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="searchTeaName">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="data">
      <el-table-column prop="courseId" label="课号" width="150"></el-table-column>
      <el-table-column prop="courseName" label="课程名称" width="180"></el-table-column>
      <el-table-column prop="teacher.teacherId" label="老师编号" width="150"></el-table-column>
      <el-table-column prop="teacher.teacherName" label="老师姓名" width="150"></el-table-column>
      <el-table-column prop="major.majorId" label="专业编号" width="150"></el-table-column>
      <el-table-column prop="major.school.schoolName" label="学院名称" width="180"></el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2,5, 10]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data () {
    return {
      data: [],
      list: [],
      limit: 5,
      total: null,
      page: 1,
      searchIdData: '',
      searchNameData: '',
      searchTeaNameData: ''

    }
  },
  created () {
    this.pageList()
  },
  methods: {
    pageList () {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.$axios.get('getAllCourse').then((res) => {
        // 这是从本地请求的数据接口，
        this.list = res.data.data
      })
      this.getListId()
      this.getListName()
      this.getListTeaName()
    },
    // 处理数据
    getListId () {
      // es6过滤得到满足搜索条件的展示数据list
      let data = this.list.filter((item, index) =>
        item.courseId.includes(this.searchIdData)
      )
      this.data = data.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      )
      this.total = data.length
    },
    // 处理数据
    getListName () {
      // es6过滤得到满足搜索条件的展示数据list
      let data = this.list.filter((item, index) =>
        item.courseName.includes(this.searchNameData)
      )
      this.data = data.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      )
      this.total = data.length
    },
    // 处理数据
    getListTeaName () {
      // es6过滤得到满足搜索条件的展示数据list
      let data = this.list.filter((item, index) =>
        item.teacher.teacherName.includes(this.searchTeaNameData)
      )
      this.data = data.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      )
      this.total = data.length
    },
    // 当每页数量改变
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.getListId()
    },
    // 当当前页改变
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getListId()
    },
    // 搜索过滤数据
    searchId () {
      this.page = 1
      this.getListId()
    },
    // 搜索过滤数据
    searchName () {
      this.page = 1
      this.getListName()
    },
    searchTeaName () {
      this.page = 1
      this.getListTeaName()
    },


    delClick (row) {
      // 弹出确定取消框，是否删除用户
      this.$confirm('是否删除该课程', '删除提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios.get('deleteCourse?courseId=' + row.courseId).then((res) => {
        // 判断如果删除失败，就做提示
          if (res.data.code !== 200) return this.$message.error('删除课程失败')
          // 修改成功的提示
          this.$message.success('删除课程成功')
          this.reload()
          // 重新请求最新的数据
          this.getUserListId()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
