// 封装的是具体接口的请求方法
// 每个方法只负责一个url请求地址
// import store from '@/store/index'
import request from '@/utils/request'
// export 和 export default：
// 相同点：都可用于导出常量、函数、文件、模块
// 不同点： 一个文件或模块中 export可以有多个 exportdefault只能有一个，
// 并且export方式导出再倒入要加{}并且不能自定义名字、exportdefault不用加{}，并且可以自定义名字

// 注册账号的接口
export const registerAPI = ({ username, password, repassword }) => request({
  url: '/api/reg',
  method: 'POST',
  data: {
    username,
    password,
    repassword
  }
})
// 登录账号接口
export const loginAPI = ({ username, password }) => request({
  url: '/api/login',
  method: 'POST',
  data: {
    username,
    password
  }
})

// 获取用户信息
export const getUserInfoAPI = () => request({
  url: '/my/userinfo'
  // 传参数给后台： params(查询字符串query)、data(请求体body)、headers(请求头)
  // headers: {
  //   Authorization: store.state.token
  // }
})

// 获取菜单
export const getMenusAPI = () => request({
  url: '/my/menus'
  // headers: {
  //   Authorization: store.state.token
  // }
})

// 更新用户资料

export const updateUserInfoAPI = ({ id, username, nickname, emaill, user_pic }) => request({
  url: '/my/userinfo',
  method: 'PUT',
  data: {
    id,
    username,
    nickname,
    emaill,
    user_pic
  }
})

/**
 * 更新用户的头像
 * @param {*} avatar 头像图片base64字符串
 * @returns Promise对象
 */
export const updateAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}
/**
 * 修改重置密码的
 * @param {*} old_pwd为旧密码 new_pwd, re_pwd为新密码
 * @returns 返回一个promise对象
 */
export const updatePwdAPI = ({ old_pwd, new_pwd, re_pwd }) => request({
  url: '/my/updatepwd',
  method: 'PATCH',
  data: {
    old_pwd,
    new_pwd,
    re_pwd
  }
})

/**
 * 获取-文章分类
 * @returns Promise对象
 */
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

/**
 * 增加-文章分类
 * @param {*} param0 { cate_name: 文章分类名字, cate_alias: 文章分类别名 }
 * @returns Promise对象
 */
export const addArtCateAPI = ({ cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/add',
    method: 'POST',
    data: {
      cate_name,
      cate_alias
    }
  })
}

/**
 * 更新-文章分类
 * @param {*} param0 { id: 文章分类id, cate_name: 文章分类名字, cate_alias: 文章分类别名 }
 * @returns Promise对象
 */
export const updateArtCateAPI = ({ id, cate_name, cate_alias }) => {
  return request({
    url: '/my/cate/info',
    method: 'PUT',
    data: {
      id,
      cate_name,
      cate_alias
    }
  })
}
/**
 * 删除-文章分类
 * @param {*} id 要删除的-文章分类id
 * @returns Promise对象
 */
export const delArtCateAPI = (id) => {
  return request({
    url: '/my/cate/del',
    method: 'DELETE',
    params: {
      id
    }
  })
}

// 获取文章分类
export const getArtCateAPI = () => request({
  url: '/my/cate/list',
  method: 'GET'
})

/**
 * 发布文章
 * @param {*} fd 表单对象
 * @returns Promise对象
 */
export const uploadArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'POST',
    data: fd // 参数要的是表单对象, 不能写普通对象, axios内部会判断, 如果是表单对象, 传递的请求体会设置Content-Type: form-data与后端对应
  })
}

/**
 * 获取文章列表
 * @param {*} param0 { pagenum: 当前页码数, pagesize: 当前页条数, cate_id: 文章分类id, state: 文章状态 }
 * @returns Promise对象
 */
export const getArticleListAPI = ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
/**
 * 获取文章详情
 * @param {*} id是文章id
 * @returns
 */
export const getArticleDetailFn = (id) => request({
  url: '/my/article/info',
  params: {
    id
  }
})

// 删除文章
export const delArticleAPI = (id) => request({
  url: '/my/article/info',
  method: 'DELETE',
  params: {
    id
  }
})
