import request from '@/utils/request'
export default {//投保单生成接口
    proposalGenerate(arg) {
        let url=''
        if(process.env.NODE_ENV=="production"){
            url=`/nocar/interface/proposalgenerate`
        }else{
            url='/proposalGenerate'
        }
       
        return request({
        url,
        method:'post',
        data:JSON.stringify(arg)
        })
   },
   endorseGenerate(arg) {
    return request({
    url:'endorse/create',
    method:'post',
    data:JSON.stringify(arg)
    })
},
   underwrt(arg) {//核保接口
       return request({
       baseURL:process.env.NODE_ENV === 'production'?process.env.VUE_APP_UNDERWRT:process.env.VUE_APP_BASE_API,
       url:`/underwrt`,
       method:'post',
       data:JSON.stringify(arg)
       })
  }

} 