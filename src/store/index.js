import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1.用来存储登录成功之后的token值
    token: '',
    // 用户信息
    userInfo: {} // 用来保存用户信息(id,username,nickname,email,user_pic)
  },
  getters: {
    nickname: state => state.userInfo.nickname, // 昵称
    username: state => state.userInfo.username, // 用户名
    user_pic: state => state.userInfo.user_pic // 用户头像
  },
  mutations: {
    // 2.更新token的mutation函数
    updateToken (state, newToken) {
      state.token = newToken
    },
    // 保存用户的信息
    updateUserInfo (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    async  getUserInfoAction (store) {
      const { data: res } = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data)
    }
  },
  modules: {
  },
  // 配置vuex的插件
  plugins: [createPersistedState()]
})
