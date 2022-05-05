import request from '@/utils/request'
export default {//查询履约义务人接口
    performerQuery(arg) {
        return request({
        baseURL:process.env.NODE_ENV === 'production'?process.env.VUE_APP_PERFORMERQUERY:process.env.VUE_APP_BASE_API,
        url:`/quoinformationquery`,
        //https://www.fastmock.site/mock/d5c45fd7c80457f67d21946888437aee/getSelectData/quoinformationquery
        method: 'post',
        data:JSON.stringify(arg)
        })
   }
} 