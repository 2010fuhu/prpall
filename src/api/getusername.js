import request from '@/utils/request'
export default {
    getusername(userCode){//保单明细查询-
        return request({
            url:`/selectbaseinfo/getusername`,
            method: 'get',
            params:{
                userCode,
                time: new Date().getTime()
            }
        })
    },
    getdepartmentInfo(comCode){
        return request({
            url:`/selectbaseinfo/getdepartmentInfo`,
            method: 'get',
            params:{
                comCode,
                time: new Date().getTime()
            }
        })
    }   
}