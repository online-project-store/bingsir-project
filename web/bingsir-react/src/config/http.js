import axios from 'axios'
import method from "./method"
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'api'
}else{
    axios.defaults.baseURL = ''
}
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
// console.log(method.getQueryString('token').length);

//  axios拦截器
 axios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    if (method.getQueryString('token')) {
        config.headers['Authorization'] = 'Bearer ' + method.getQueryString('token');
    }
    return config
 });
  
 axios.interceptors.response.use(response => {
     // 在这里你可以判断后台返回数据携带的请求码
    if (response.data.code == 1) {
      return  response.data
    }else {
      // 非200请求抱错
      console.log(response.data);
      throw Error(response.data.msg || '服务异常')
    }
});


const http = {
    post(url, data = {}, success, errcallback) {
        return axios({
            method: "post", // 请求协议
            url, // 请求的地址
            data,
        }).then((result) => {
             console.log('ajax数据',result);
            if (result.code == "1") {
                success(result.data);
            } else if (result.code == "0" || result.code >= 500) {
                errcallback(result)
            } 
        }).catch((error) => {
            errcallback(error)
        });
    }
}
export default http;


