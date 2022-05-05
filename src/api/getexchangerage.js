import request from '@/utils/request'
export default {//获取币别兑换率接口
    getexchangerage(mainCurrency,sumCurrency,payCurrency,exchangeDate) {
        let url=''
        if(process.env.NODE_ENV=="production"){
            url=`/selectbaseinfo/getexchangerage`
        }else{ 
            url='/getexchangerage'
        }
        return request({
        url,
        method: 'get',
        params:{
            mainCurrency,//原币
            sumCurrency,//汇总币别
            payCurrency,//支付币别
            exchangeDate
            }
        })
   }

} 