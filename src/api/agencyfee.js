import request from '@/utils/request'
export default {
    getagencyfee(value){
        let url=`/calculate/agencyfee`
        return request({
        url,
        method: 'post',
        data:JSON.stringify(value)
        })
    },
   getselectagentdetailinfo(comCode,riskCode,agreementNo) {//获取手续费分成比例接口
        let url=''
        if(process.env.NODE_ENV=="production"){
            url=`/selectbaseinfo/getselectagentdetailinfo`
        }else{ 
            url=`/getselectagentdetailinfo`
        }
        return request({
        url,
        method: 'get',
        params:{
            comCode,
            riskCode,
            agreementNo,
        }
        })
    },
    getselectagentusernameinfo(agentCode) {//中介机构业务员姓名/执业证号码查询接口
        let url=''
        if(process.env.NODE_ENV=="production"){
           url=`/selectbaseinfo/getselectagentusernameinfo`
        }else{ 
            url=`/getselectagentusernameinfo`
        }
        return request({
        url,
        method: 'get',
        params:{
            agentCode
        }
        })
    }

} 