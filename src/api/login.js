import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/v1/auth/login',
    headers: {
      isToken: false,
      repeatSubmit: false,
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 获取登陆用户信息
export function getAuthInfo() {
  return request({
    url: '/v1/auth/info',
    method: 'get'
  })
}