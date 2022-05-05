import request from '@/utils/request'
 
export default {
    getSelsetData(riskCode, comCode,userCode) {
        let url=''
        if(process.env.NODE_ENV=="production"){
            url=`/selectbaseinfo/getallselectbaseinfo`
        }else{
            url='/initSelectData'
        }
            return request({
            url,
            method: 'get',
            params:{
                riskCode,
                comCode,
                userCode
                }
        })
    },
    getselecthandlerinfo(comCode){//获取经办人员
        let url=''
        if(process.env.NODE_ENV=="production"){
            url=`/selectbaseinfo/getselecthandlerinfo`
        }else{
            url='/getselecthandlerinfo'
        }
        return request({
            url,
            method: 'get',
            params:{
                comCode,
                }
        })

    }

} 