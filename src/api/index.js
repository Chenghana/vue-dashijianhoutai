// 封装的是具体接口的请求方法
// 每个方法只负责一个url请求地址
import request from '@/utils/request'
// export 和 export default：
// 相同点：都可用于导出常量、函数、文件、模块
// 不同点： 一个文件或模块中 export可以有多个 exportdefault只能有一个，
// 并且export方式导出再倒入要加{}并且不能自定义名字、exportdefault不用加{}，并且可以自定义名字

export const registerAPI = () => request({
  url: '/api/reg',
  method: 'POST',
  data: {
    username: 'sunchhan',
    password: '111111',
    repassword: '111111'
  }
})
