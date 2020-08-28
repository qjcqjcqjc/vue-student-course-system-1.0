import Vue from 'vue'
import Router from 'vue-router'
import MainContent from '@/components/MainContent.vue'
import Home from '@/components/Home'
import Login from '@/pages/Login'
import Index from '@/components/Index'
import ChooseCourse from '@/pages/Student/ChooseCourse'
import ModifyHomePage from '@/pages/Administrator/ModifyHomePage'
import viewUser from '@/pages/Administrator/UserManagement/viewUser'
import viewStudent from '@/pages/Administrator/UserManagement/viewStudent'
import viewTeacher from '@/pages/Administrator/UserManagement/viewTeacher'
import findUser from '@/pages/Administrator/UserManagement/findUser'
import findStudent from '@/pages/Administrator/UserManagement/findStudent'
import findTeacher from '@/pages/Administrator/UserManagement/findTeacher'
import addUser from '@/pages/Administrator/UserManagement/addUser'
import addStudent from '@/pages/Administrator/UserManagement/addStudent'
import addTeacher from '@/pages/Administrator/UserManagement/addTeacher'
import addCourse from '@/pages/Administrator/CourseManagement/addCourse'
import viewCourse from '@/pages/Administrator/CourseManagement/viewCourse'
import findCourse from '@/pages/Administrator/CourseManagement/findCourse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        name: '登录'
      },
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/HomePage',
          /* meta的name主要用来做面包屑 */
          meta: {
            name: '主页'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: Home
            }
          ]
        },
        {
          path: '/ChooseCourse',
          meta: {
            name: '选择专业'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: ChooseCourse
            }
          ]
        },
        {
          path: '/ModifyHomePage',
          meta: {
            name: '修改主页内容'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: ModifyHomePage
            }
          ]
        },
        // 用户管理
        {
          path: '/viewUser',
          meta: {
            name: '查看用户'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: viewUser
            }
          ]
        },
        {
          path: '/viewStudent',
          meta: {
            name: '查看学生'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: viewStudent
            }
          ]
        },
        {
          path: '/viewTeacher',
          meta: {
            name: '查看教师'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: viewTeacher
            }
          ]
        },
        {
          path: '/findUser',
          meta: {
            name: '查找用户'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: findUser
            }
          ]
        },
        {
          path: '/findStudent',
          meta: {
            name: '查找学生'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: findStudent
            }
          ]
        },
        {
          path: '/findTeacher',
          meta: {
            name: '查找老师'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: findTeacher
            }
          ]
        },
        {
          path: '/addUser',
          meta: {
            name: '添加用户'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: addUser
            }
          ]
        },
        {
          path: '/addStudent',
          meta: {
            name: '添加学生'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: addStudent
            }
          ]
        },
        {
          path: '/addTeacher',
          meta: {
            name: '添加老师'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: addTeacher
            }
          ]
        },
        // 课程管理
        {
          path: '/addCourse',
          meta: {
            name: '添加课程'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: addCourse
            }
          ]
        },
        {
          path: '/viewCourse',
          meta: {
            name: '查看课程'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: viewCourse
            }
          ]
        },
        {
          path: '/findCourse',
          meta: {
            name: '查找课程'
          },
          component: MainContent,
          children: [
            {
              path: '',
              component: findCourse
            }
          ]
        }
      ]
    }
  ]
})
