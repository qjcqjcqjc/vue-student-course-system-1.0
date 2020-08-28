<template>
  <div>
    <el-menu :router="true"
      active-text-color="#409EFF" unique-opened>
      <!-- 一级菜单 -->
      <label v-for="menu in menus" :key="menu.menuId">
        <!-- 判断是否有子菜单 -->
        <el-menu-item v-if="menu.childMenus==''" :index="menu.url">{{menu.menuName}}</el-menu-item>
        <el-submenu v-else :index="menu.url">
          <template slot="title">{{menu.menuName}}</template>
          <!-- 二级菜单 -->
          <label v-for="menu in menu.childMenus" :key="menu.menuId">
            <!-- 判断是否有子菜单 -->
            <el-menu-item v-if="menu.childMenus==''" :index="menu.url">{{menu.menuName}}</el-menu-item>
            <el-submenu v-else :index="menu.url">
              <template slot="title">{{menu.menuName}}</template>
              <!-- 三级菜单，默认没有子菜单 -->
              <label v-for="menu in menu.childMenus" :key="menu.menuId">
                <el-menu-item :index="menu.url">{{menu.menuName}}</el-menu-item>
              </label>
            </el-submenu>
          </label>
        </el-submenu>
      </label>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      menus: JSON.parse(localStorage.getItem('menus'))
    }
  },
  methods: {
    menu () {
      console.log(this.menus)
    }
  }
}
</script>

<style scoped>
</style>
