<template>
  <div>
    <el-row>
      <el-col :span="6">
          <el-input v-model="searchData"  placeholder="输入姓名搜索" clearable></el-input>
      </el-col>
      <el-col :span="2">
          <el-button type="success" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="6">
          <el-input type="number" v-model="searchId"  placeholder="输入学号搜索" clearable></el-input>
      </el-col>
      <el-col :span="2">
          <el-button type="success" @click="searchid">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="data">
      <el-table-column label="姓名" prop="studentName"></el-table-column>
      <el-table-column label="学号" prop="studentId"></el-table-column>
      <el-table-column
        prop="clazz.clazzId"
        label="班级">
      </el-table-column>
      <el-table-column
        prop="clazz.grade"
        label="年级">
      </el-table-column>
      <el-table-column
        prop="clazz.major.majorId"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="clazz.major.school.schoolId"
        label="学院编号">
      </el-table-column>
      <el-table-column
        prop="clazz.major.school.schoolName"
        label="学院名称">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="delClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page" :page-sizes="[1, 2,5, 10]" :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
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
      searchData: '',
      searchId: ''
    }
  },
  created () {
    this.pageList()
  },
  methods: {
    pageList () {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.$axios.get('getAllStudent').then(res => { // 这是从本地请求的数据接口，
        this.list = res.data.data
      })
      this.getList()
      this.getListId()
    },
    // 处理数据
    getList () {
      // es6过滤得到满足搜索条件的展示数据list
      let data = this.list.filter((item, index) =>
        item.studentName.includes(this.searchData)
      )
      this.data = data.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.total = data.length
    },
    // 处理数据
    getListId () {
      // es6过滤得到满足搜索条件的展示数据list
      let data = this.list.filter((item, index) =>
        item.studentId.includes(this.searchId)
      )
      this.data = data.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.total = data.length
    },
    // 当每页数量改变
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.getList()
    },
    // 当当前页改变
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getList()
    },
    // 搜索过滤数据
    search () {
      this.page = 1
      this.getList()
    },
    // 搜索过滤数据
    searchid () {
      this.page = 1
      this.getListId()
    },
    delClick (row) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios.get('deleteStudent?id=' + row.studentId).then(res => { // 这是从本地请求的数据接口，
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg)
          }
          this.$message.success(res.data.msg)
          this.reload()
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

