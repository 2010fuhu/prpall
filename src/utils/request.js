import axios from 'axios'
import { Notification } from 'element-ui';
const request = axios.create({
    // /db.json >  通过 axios > /dev-api/db.json >  通过 代理转发（vue.config.js）》 http://localhost:8001/db.json
    // baseURL: '/dev-api', VUE_APP_SERVICE_URL
    baseURL:process.env.VUE_APP_BASE_API,
    timeout: 10000, // 请求超时，5000毫秒
    headers: {
        'Cache-Control': 'no-cache'
    }

})
request.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// 请求拦截器
request.interceptors.request.use(config => {
    return config
}, error => {
    // 出现异常
    return Promise.reject(error);
})

// 响应拦截器
request.interceptors.response.use(response =>{
    const resp = response.data

    // 后台正常响应的状态，如果不是 2000， 说明后台处理有问题
    if(resp.code !== 200) {
        // Notification.error({
        //     title: '错误',
        //     message: response.data.header.message,
        // });
    }

    // return response.data // 可以在这里统一的获取后台响应的数据进行返回，而这里面就没有请求头那些
    return response
}, error => {
    let message="";
    if (error&&error.response){
        switch (error.response.status) {
            case 400:
                message=error.response.message;
                break;
            case 403:
                message="找不到请求地址";
                break;
            case 405:
                message="请求方法不允许";
                break;
            case 500:
                message="服务器端出错";
                break;
            case 504:
                message="网络超时";
                break;
        }
    }else{
        message="网络异常，请稍后重试"
    }
    Notification.error({
        title: '错误',
        message: message,
    });
    return Promise.reject(error);
})


export default request // 导出自定义创建 axios 对象