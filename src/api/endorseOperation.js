import request from '@/utils/request'
export default {
    findEndorseWhereTotal(arg){//批单条数查询
        console.log("批单条数查询 begin")
        console.log(JSON.stringify(arg))
        console.log("批单条数查询 end")
        return request({
            url:`/endorse/findlist`, //
            method: 'post',
            data:JSON.stringify(arg)
        })
    },
    findEndorseWhere(arg){//批单明细查询
        console.log("批单明细查询 begin")
        console.log(JSON.stringify(arg))
        console.log("批单明细查询 end")
        return request({
            url:`/endorse/findlist`, //
            method: 'post',
            data:JSON.stringify(arg)
        })
    },
    findEndorseInfo(EndorseNo){//批单明细查询
        console.log(EndorseNo)
        return request({
            url:`/endorse/findlist`,
            method: 'get',
            params:{
                EndorseNo,
                time: new Date().getTime()
            }
        })    
    },
    endorseDelete(arg){//批单删除
        let url=`/endorse/delete` //
        return request({
            url,
            method: 'post',
            params:{
                arg
            }
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