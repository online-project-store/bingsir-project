import axios from 'axios'
import { setModalLogin } from "@/store/actions";
import appStore from '@/store';
// import method from "./method"
// import { message } from 'antd';
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'api'
}else{
    axios.defaults.baseURL = ''
}
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000

//  axios拦截器
 axios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    /* if (method.getQueryString('token')) { //jwt请求头
        config.headers['Authorization'] = 'Bearer ' + method.getQueryString('token');
    } */
    return config
 });
  
 axios.interceptors.response.use(response => {
     // 在这里你可以判断后台返回数据携带的请求码
    if (response.data.code == 1) {
      return  response.data;
    } else if (response.data.code == '-1' && response.data.data.lose && window.location.pathname != '/') {
        //  console.log(setModalLogin);
         appStore.dispatch(setModalLogin(true))
         //setModalLogin(false)
        /*  message.info('登录已失效,即将跳转到首页', 1.5, () => {
             window.location.href = '/'
         }); */
    } else {
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
            //  console.log('ajax数据',result);
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


