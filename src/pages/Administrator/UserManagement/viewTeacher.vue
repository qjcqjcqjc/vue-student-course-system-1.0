<template>
  <div class="deit">
    <div class="crumbs">
      <div class="cantainer">
        <el-table
          style="width: 100%;"
          :data="teacher.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        >
          <el-table-column prop="teacherId" label="教师编号" width="180"></el-table-column>
          <el-table-column prop="teacherName" label="姓名" width="180"></el-table-column>
          <el-table-column prop="school.schoolId" label="学院编号"></el-table-column>
          <el-table-column prop="school.schoolName" label="学院名称"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
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
          :total="teacher.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      currentPage: 1,
      pagesize: 10,
      teacher: []
    }
  },
  created () {
    this.handleTeacher()
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    handleTeacher () {
      this.$axios
        .get('getAllTeacher')
        .then((res) => {
          // 这是从本地请求的数据接口，
          this.teacher = res.data.data
        })
    },
    delClick (row) {
      this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          this.$axios
            .get(
              'deleteTeacher?teacherId=' +
                row.teacherId
            )
            .then((res) => {
              // 这是从本地请求的数据接口，
              if (res.data.code !== 200) {
                return this.$message.error(res.data.msg)
              }
              this.$message.success(res.data.msg)
              this.reload()
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>