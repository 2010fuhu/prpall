import request from '@/utils/request'
export default {//获取见费规则
    
    getJfeeflag(arg) {
        return request({
        baseURL:process.env.NODE_ENV === 'production'?process.env.VUE_APP_GETJFEEFFLAG:process.env.VUE_APP_BASE_API,
        url:'/getJfeeflag',
        method:'post',
        data:JSON.stringify(arg)
        })
   }

} 