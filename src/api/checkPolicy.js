import request from '@/utils/request'
export default {
    checkdata(arg) {
        let url='/endorse/checkdata'
        return request({
        url,
        method: 'post',
        data:JSON.stringify(arg)
        })
   }
} 