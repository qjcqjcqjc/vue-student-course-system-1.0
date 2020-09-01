<template>
  <div>
        桂林电子科技大学学生选课管理系统
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
div{
    margin-top:3%;
    color:blue;
    text-align: center;
    font-size: 30px;
    box-sizing: border-box;
}
</style>