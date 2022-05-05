import request from '@/utils/request'
export default {
    proposalDelete(BusinessNo){//投保单删除
        let url=`/selectbaseinfo/proposalDelete`
        return request({
            url,
            method: 'get',
            params:{
                BusinessNo
            }
        })
    },
   proposalCencel(BusinessNo,UserCode) {//投保单撤单
        let url=`/selectbaseinfo/proposalCencel`
        return request({
        url,
        method: 'get',
        params:{
            BusinessNo,
            UserCode,
        }
        })
    },
    showOpinion(BusinessNo) {//核保信息查询
        let url=`/selectbaseinfo/showOpinion`
        return request({
        url,
        method: 'get',
        params:{
            BusinessNo,
            BusinessType:'UNDERWRITE'
        }
        })
    }

} 