import request from '@/utils/request'
export default {//获取 市或者 区县接口 根据上级地区代码查询
    getselectaddressinfo(upperCode) {
        let url;
        if(process.env.NODE_ENV=="production"){
            url=`/selectbaseinfo/getselectaddressinfo`
            //`selectbaseinfo/getselectaddressinfo`
        }else{ 
            url='/getselectaddressinfo'
        }
        return request({
        url,
        method: 'get',
        params:{
            upperCode,//上级地区代码
            
            }
        })
   }

} 