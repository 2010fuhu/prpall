import request from '@/utils/request'
export default {
    findEndorseWhereTotal(arg){//批单条数查询
        return request({
            url:`/endorse/findlist`, 
            method: 'post',
            data:JSON.stringify(arg)
        })
    },
    findEndorseWhere(arg){//批单列表查询
        return request({
            url:`/endorse/findlist`, 
            method: 'post',
            data:JSON.stringify(arg)
        })
    },
    findEndorseInfo(arg){//批单明细查询
        return request({
            url:`/endorse/findinfo3`,
            method: 'post',
            data:JSON.stringify(arg)
        })    
    },
    endorseDelete(arg){//批单删除
        let url=`/endorse/delete` //
        return request({
            url,
            method: 'post',
            data:JSON.stringify(arg)
        })
    },
    endorseCencel(endorseNo){//批单撤单
        let url=`/selectbaseinfo/endorseCencel`//
        return request({
        url,
        method: 'get',
        params:{
            endorseNo
        }
        })
    }
} 