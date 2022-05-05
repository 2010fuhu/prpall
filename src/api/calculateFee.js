import request from '@/utils/request'
export default {//币别确定
    calculateFeebycurrency(arg) {
        let url=''
        if(process.env.NODE_ENV=="production"){
            url=`/calculate/collectbycurrencyandcalculateflag`
        }else{ 
            url='/collectbycurrencyandcalculateflag'
        }
        console.log(JSON.stringify(arg))
        return request({
        url,
        method: 'post',
        data:JSON.stringify(arg)
        })
   }

} 