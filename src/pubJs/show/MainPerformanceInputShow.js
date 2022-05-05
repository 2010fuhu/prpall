import performanceinfo from '@/api/getperformanceinfo.js'
import exchangeRate  from '@/api/getexchangerage.js'
class Performance{
         constructor(){
            this.No=''
            this.MinPerCent=''
            this.MaxPerCent=''
            this.HandlerCode=''
            this.HandlerName=''
            this.PerformancePercent=''
            this.PerformanceFee=''
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
                // handlerInfoVo:{
                //     type:Array
                // }
            },
          created(){
             
          },
          mounted(){
              //1 需要先获取归属人员
              var strhandlerCode='';
              for(let i=0;i<this.PerformanceArgs.handlerInfoVo.length;i++){
                    var obj = new Performance();
                    obj.No=i+1;
                    obj.MinPerCent='';
                    obj.MaxPerCent='';
                    obj.HandlerCode=this.PerformanceArgs.handlerInfoVo[i].HandlerCode1
                    obj.HandlerName='';
                    obj.PerformancePercent='';
                    obj.PerformanceFee='';
                    this.PerAgreeMentDetData.push(obj)
                    strhandlerCode+=this.PerformanceArgs.handlerInfoVo[i].HandlerCode1+",";
                }
                strhandlerCode = strhandlerCode.substring(0, strhandlerCode.lastIndexOf(','));
                this.getperformanceinfo(strhandlerCode);
            },
          methods:{
            PerformanceChange(index) {//调整页面绩效费率 调整绩效金额；
                if(this.PerAgreeMentDetData[index].PerformancePercent==''){
                    //this.$alert('第'+(index+1)+'行绩效费率不能为空！','绩效费用信息',{ type:'warning'})
                }else{
                   if(parseFloat(this.PerAgreeMentDetData[index].PerformancePercent)>parseFloat(this.PerAgreeMentDetData[index].MaxPerCent)){

                       this.$alert('绩效费率不能大于最大费率！！！。','绩效费用信息',{ type:'warning'})
                       this.PerAgreeMentDetData[index].PerformancePercent=this.PerAgreeMentDetData[index].MaxPerCent
                       return  false
                   }else if(parseFloat(this.PerAgreeMentDetData[index].PerformancePercent)<parseFloat(this.PerAgreeMentDetData[index].MinPerCent)){
                       this.$alert('绩效费率不能小于最小费率！！！。','绩效费用信息',{ type:'warning'})
                        this.PerAgreeMentDetData[index].PerformancePercent=this.PerAgreeMentDetData[index].MinPerCent
                       return  false
                   }else{
                       this.PerAgreeMentDetData[index].PerformanceFee=this.$uiCommon.pointFour(
                           (parseFloat(this.PerAgreeMentDetData[index].PerformancePercent)
                           *parseFloat(this.PerformanceArgs.sumPremium)/100).toFixed(2));
                        return true;
                   }    
                }
        },
        addDetail()  {// 点击确定按钮 将数据待会主页面
             this.$emit('closePerformanceChild','add',this.PerAgreeMentDetData);
        },
        ChncelDetail(){//取消按钮
            this.$emit('closePerformanceChild',' Chncel',[]);
        },
        getperformanceinfo(strhandlerCode){
              let that=this;
              performanceinfo.getperformanceinfo(this.$store.state.comCode, strhandlerCode).then(response => {
                 let dataArray = response.data 
                 if(response.status==200){
                    for(var data of dataArray){
                          for(var i=0;i<that.PerAgreeMentDetData.length;i++){
                              if(that.PerAgreeMentDetData[i].HandlerCode==data.usercode){
                                  that.PerAgreeMentDetData[i].HandlerName=data.username;
                                  that.PerAgreeMentDetData[i].MinPerCent=data.minpercent;
                                  that.PerAgreeMentDetData[i].MaxPerCent=data.maxpercent;
                                  that.PerAgreeMentDetData[i].PerformancePercent=data.maxpercent;
                              }
                          }
                    }
                 }
             }).then(()=>{
                  //3 调用接口 getexchangerage  获取兑换率 CNY 与支付币别之间的兑换率
                  this.getexchangerage(that);
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
                     that.PerAgreeMentDetData[i].PerformanceFee=(parseFloat(sumPremium)*parseFloat(data.exchangeRatePay)*parseFloat(that.PerAgreeMentDetData[i].MaxPerCent)/1000).toFixed(2)
                 }                     
                    }
                }).then(()=>{
                  //3 调用接口 getexchangerage  获取兑换率 CNY 与支付币别之间的兑换率
                  this.fullscreenLoading=false;
             })
        }
    }   
}