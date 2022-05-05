import request from '@/utils/request'
 
export default {
    getselectbusinessinfo(code, codeLevel) {
        let url;
        if(process.env.NODE_ENV=="production"){
            url=`/selectbaseinfo/getselectbusinessinfo`
        }else{ 
            if(codeLevel=='1'){
                url='/getselectbusinessinfo'
            }else{
                url='/getselectbusinessinfoTwo'
            }
        }
           
        return request({
        url,
        method: 'get',
        params:{
            code,
            codeLevel
            }
        })
    },
    getselectagentinfo(comCode, riskCode,agentType) {
        let url;
         if(process.env.NODE_ENV=="production"){
             url=`/selectbaseinfo/getselectagentinfo`
         }else{ 
            url='/getselectagentinfo'
        }
        
        return request({
        url,
        method: 'get',
        params:{
            comCode,
            riskCode,
            agentType
            }
        })
   }

} 