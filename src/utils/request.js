import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent

  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Ticket'] = getToken();
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
   
  }
  return config
}, error => {
  // Do something with request error
  console.log("头部请求失败") // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
  	if(response.data.code == 603){
  		  store.dispatch('FedLogOut').then(() => {
  		  	console.log(location);
  		  	location.hash = "#/login";
       })
  	}else{
      if(response.data.code != 200){
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 5 * 1000
       })
      }
  		return response;
  	}
  	
  },
  error => {
  	console.log("请求错误！");
    console.log('err' + error) // for debug
    Message({
      message: '数据请求失败，请稍后刷新重试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
