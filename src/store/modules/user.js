import { loginByUsername, logout, orderList, cancelOrder,appealsOrder,orderInit,orderSubmit,sendsms,getUserInfotation} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, data) {
      return new Promise((resolve, reject) => {
        loginByUsername(data).then(response => {
          const data = response.data.data;
          commit('SET_TOKEN', data.ticket);
          setToken(data.ticket);
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
       // 获取用户信息
       GetUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
          getUserInfotation().then(response => {
            const data = response.data.data;
            commit('SET_ROLES', [data.account]);
            resolve(response.data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      

    // 订单列表
    OrderList({ commit }, data) {
      return new Promise((resolve, reject) => {
        orderList(data).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 提交订单
    OrderSubmit({ commit }, data) {
      return new Promise((resolve, reject) => {
        orderSubmit(data).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 发送给客户
    Sendsms({ commit }, data) {
      return new Promise((resolve, reject) => {
        sendsms(data).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    

    // 订单初始化
    OrderInit({ commit }, state) {
      return new Promise((resolve, reject) => {
        orderInit().then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    

    // 删除订单
    CancelOrder({ commit }, data) {
      return new Promise((resolve, reject) => {
        cancelOrder(data).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 申诉
    AppealsOrder({ commit }, data) {
      return new Promise((resolve, reject) => {
        appealsOrder(data).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          console.log(resolve.data);
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
