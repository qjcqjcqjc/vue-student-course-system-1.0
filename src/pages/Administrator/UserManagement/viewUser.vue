<template>
  <el-select v-model="value" placeholder="请选择" @change="selectGet">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '学生',
        label: '学生'
      }, {
        value: '老师',
        label: '老师'
      }],
      value: ''
    }
  },
  methods: {
    selectGet () {
      if (this.value === '学生') {
        this.$router.push('/ViewStudent')
      } else {
        this.$router.push('/ViewTeacher')
      }
    }
  }
}
</script>