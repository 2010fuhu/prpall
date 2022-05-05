import performanceinfo from '@/api/getperformanceinfo.js'
import exchangeRate  from '@/api/getexchangerage.js'
class Performance{
         constructor(){
            this.no=''
            this.minPerCent=''
            this.maxPerCent=''
            this.handlerCode=''
            this.handlerName=''
            this.performanceNo=''
            this.performancePercent=''
            this.performanceFee=''
         }

}
export default{
         name:'',
         data(){
            return{
			   PerAgreeMentDetData:[],
               fullscreenLoading:true
              } 
          },
            props:{
                //   接受父组件传的值
                PerformanceArgs:{
                    type:Object
                },
            },
          created(){
             
          },
          mounted(){
              //1 需要先获取归属人员
              var strhandlerCode='';
              for(let i=0;i<this.PerformanceArgs.handlerInfoVo.length;i++){
                    var obj = new Performance();
                    obj.no=i+1;
                    obj.handlerCode=this.PerformanceArgs.handlerInfoVo[i].handlerCode
                    this.PerAgreeMentDetData.push(obj)
                    strhandlerCode+=this.PerformanceArgs.handlerInfoVo[i].handlerCode+",";
                }
                strhandlerCode = strhandlerCode.substring(0, strhandlerCode.lastIndexOf(','));
                this.getperformanceinfo(strhandlerCode);
            },
          methods:{
            PerformanceChange(index) {//调整页面绩效费率 调整绩效金额；
                if(this.PerAgreeMentDetData[index].performancePercent==''){
                    //this.$alert('第'+(index+1)+'行绩效费率不能为空！','绩效费用信息',{ type:'warning'})
                }else{
                   if(parseFloat(this.PerAgreeMentDetData[index].performancePercent)>parseFloat(this.PerAgreeMentDetData[index].maxPerCent)){

                       this.$alert('绩效费率不能大于最大费率！！！。','绩效费用信息',{ type:'warning'})
                       this.PerAgreeMentDetData[index].performancePercent=this.PerAgreeMentDetData[index].maxPerCent
                       return  false
                   }else if(parseFloat(this.PerAgreeMentDetData[index].performancePercent)<parseFloat(this.PerAgreeMentDetData[index].minPerCent)){
                       this.$alert('绩效费率不能小于最小费率！！！。','绩效费用信息',{ type:'warning'})
                        this.PerAgreeMentDetData[index].performancePercent=this.PerAgreeMentDetData[index].minPerCent
                       return  false
                   }else{
                       this.PerAgreeMentDetData[index].performanceFee=this.$uiCommon.pointFour(
                           (parseFloat(this.PerAgreeMentDetData[index].performancePercent)
                           *parseFloat(this.PerformanceArgs.sumPremium)/100).toFixed(2));
                        return true;
                   }    
                }
        },
        addDetail()  {// 点击确定按钮 将数据待会主页面
             if(this.PerAgreeMentDetData.length>0){
                this.$store.state.refreshFlagPerformance='1' 
             }else{
                this.$store.state.refreshFlagPerformance='0' 
             }
             this.$emit('closePerformanceChild','add',this.PerAgreeMentDetData);
        },
        ChncelDetail(){//取消按钮
            this.$store.state.refreshFlagPerformance='0' 
            this.$emit('closePerformanceChild',' Chncel',[]);
        },
        getperformanceinfo(strhandlerCode){
              let flag=false;
              let dataArray
              performanceinfo.getperformanceinfo(this.$store.state.riskCode, strhandlerCode).then(response => {
                  //dataArray = response.data.data
                 if(response.data.data){
                    dataArray = response.data.data
                 }else{
                    dataArray = response.data
                 }
                 if(response.status==200){
                    if(dataArray){
                        for(let data of dataArray){
                            for(let i=0;i<this.PerAgreeMentDetData.length;i++){
                                if(this.PerAgreeMentDetData[i].handlerCode==data.usercode){
                                    this.PerAgreeMentDetData[i].handlerName=data.username;
                                    this.PerAgreeMentDetData[i].minPerCent=data.minpercent;
                                    this.PerAgreeMentDetData[i].maxPerCent=data.maxpercent;
                                    this.PerAgreeMentDetData[i].performanceNo=data.peragreementno;
                                    this.PerAgreeMentDetData[i].performancePercent=data.maxpercent;
                                    flag=true
                                }
                            }
                        }
                   }
                 }
             }).then(()=>{
                  if(flag){
                    //3 调用接口 getexchangerage  获取兑换率 CNY 与支付币别之间的兑换率
                    this.getexchangerage(this);
                  }else{
                    this.PerAgreeMentDetData=[]
                    this.fullscreenLoading=false;
                  }
               
             })
     
        },
        getexchangerage(that){
                var sumPremium= this.PerformanceArgs.sumPremium
                let exchangeRate1=this.PerformanceArgs.payCurrency
                exchangeRate.getexchangerage('CNY',exchangeRate1,this.PerformanceArgs.payCurrency,this.$store.state.startDate).then(response => {
                    let data = response.data.data
                    if(response.status==200){
                      parseFloat(data.exchangeRatePay); 
                    for(let  i=0;i<that.PerAgreeMentDetData.length;i++){
                     that.PerAgreeMentDetData[i].performanceFee=(parseFloat(sumPremium)*parseFloat(data.exchangeRatePay)*parseFloat(that.PerAgreeMentDetData[i].maxPerCent)/1000).toFixed(2)
                 }                     
                    }
                }).then(()=>{
                  //3 调用接口 getexchangerage  获取兑换率 CNY 与支付币别之间的兑换率
                  this.fullscreenLoading=false;
             })
        }
    }   
}