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
    let url=''
    url='endorse/create'
    return request({
    url,
    method:'post',
    data:JSON.stringify(arg)
    })
},
   underwrt(arg) {//核保接口
       console.log("核保接口请求报文 begin")
       console.log(JSON.stringify(arg))
       console.log("核保接口请求报文 end ")
       return request({
       baseURL:process.env.NODE_ENV === 'production'?process.env.VUE_APP_UNDERWRT:process.env.VUE_APP_BASE_API,
       url:`/underwrt`,
       method:'post',
       data:JSON.stringify(arg)
       })
  }

} 