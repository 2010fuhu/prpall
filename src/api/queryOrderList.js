import request from '@/utils/request'
export default {
    findProposalWhereTotal(arg) {//投保单查询条数接口
        console.log("投保单查询条数接口 begin")
        console.log(JSON.stringify(arg))
        console.log("投保单查询条数接口 end")
        return request({
        url:`/selectbaseinfo/findProposalWhereTotal`,
        method: 'post',
        data:JSON.stringify(arg)
        })
   },
    //查询投保单、保单、列表方法
    findProposalWhere(arg) {
        console.log("投保单明细查询begin")
        console.log(JSON.stringify(arg))
        console.log("投保单明细查询end")
        return request({
        url:`/selectbaseinfo/findProposalWhere`,
        method: 'post',
        data:JSON.stringify(arg)
        })
   },
   findPolicyWhereTotal(arg) {//保单条数查询
        console.log("保单条数查询 begin")
        console.log(JSON.stringify(arg))
        console.log("保单条数查询 end")
        return request({
            url:`/selectbaseinfo/findPolicyWhereTotal`,
            method: 'post',
            data:JSON.stringify(arg)
        })
    },
    findPolicyWhere(arg){//保单列表查询
        console.log("保单明细查询 begin")
        console.log(JSON.stringify(arg))
        console.log("保单明细查询 end")
        return request({
            url:`/selectbaseinfo/findPolicyWhere`,
            method: 'post',
            data:JSON.stringify(arg)
        })
    },
    findProposalInfo(ProposalNo){//投保单明细查询
        console.log(ProposalNo)
        return request({
            url:`/selectbaseinfo/findProposalInfo`,
            method: 'get',
            params:{
                ProposalNo,
                time: new Date().getTime()
            }
        })    
    },
    findPolicyInfo(PolicyNo){//保单明细查询-
        return request({
            url:`/selectbaseinfo/findPolicyInfo`,
            method: 'get',
            params:{
                PolicyNo,
                time: new Date().getTime()
            }
        })
    }    
} 