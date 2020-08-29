import axios from 'axios'
import ElementUI from 'element-ui'
import {setCookie, getCookie, delCookie} from '@/cookie'

axios.defaults.baseURL = 'http://10.34.4.191:8080/StudentCourse/'
axios.defaults.headers.common['Authorization'] = getCookie('Authorization')

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
  console.log(response)
  let res = response.data
  if (res.code === 200) {
    return Promise.resolve(response)
  } else {
    ElementUI.Message.error(res.msg)
    return Promise.reject(response)
  }
})
