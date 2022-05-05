import request from '@/utils/request'
export default {//获取河南绩效费用接口
    getperformanceinfo(riskCode,handlerCode) {
        let url;
        if(process.env.NODE_ENV=="production"){
            url=`/selectbaseinfo/getperformanceinfo`
        }else{ 
            url='/getperformanceinfo'
        }
        return request({
        url,
        method: 'get',
        params:{
            riskCode,//险种代码
            handlerCode,//归属机构代码,示例handlerCode=0000792,0000793
            }
        })
   }

} 