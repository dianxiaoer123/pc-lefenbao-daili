import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    url: '/pcagentapi/login',
    method: 'post',
    data
  })
}

export function orderList(data) {
  return request({
    url: '/pcagentapi/order/list',
    method: 'post',
    data
  })
}

export function cancelOrder(data) {
  return request({
    url: '/pcagentapi/order/cancel',
    method: 'post',
    data
  })
}

export function appealsOrder(data) {
  return request({
    url: '/pcagentapi/order/appeals',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/pcagentapi/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 订单初始化
export function orderInit() {
  return request({
    url: '/pcagentapi/order/data',
    method: 'post'
  })
}

// 订单提交
export function orderSubmit(data) {
  return request({
    url: '/pcagentapi/order/submit',
    method: 'post',
    data
  })
}

// 发送给客户
export function sendsms(data) {
  return request({
    url: '/pcagentapi/order/sendsms',
    method: 'post',
    data
  })
}

