import request from '@/utils/request'
export default {
    getselectcoinscodeinfo(codeType) {//获取联共保、再保经纪人select 数据接口
            let url;
            if(process.env.NODE_ENV=="production"){
                url=`/selectbaseinfo/getselectcoinscodeinfo`
            }else{ 
                if(codeType=='ReinsCi'){
                    url='/selectbaseinfo/getselectcoinscodeinfo'
                }else if(codeType=='ComCode'){
                    url='/selectbaseinfo/getselectcoinscodeinfo1'
                }else if(codeType=='ReinsCode'){
                    url='/selectbaseinfo/getselectcoinscodeinfo2'
                }
            }
            return request({
            url,
            method: 'get',
            params:{
                codeType
                }
            })
    },
    getreinstaxrate(code,codeType) {//分入业务 获取经济费增值税、分入信息增值税
        let url;
        if(process.env.NODE_ENV=="production"){
            url=`/selectbaseinfo/getreinstaxrate`
        }else{ 
            url='/selectbaseinfo/getreinstaxrate'
        }
        
        return request({
        url,
        method: 'get',
        params:{
            code,
            codeType
            }
        })
}

}