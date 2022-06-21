    // eslint-disable-next-line no-unused-vars
    class palnObject  {
        constructor() {
            this.flag=''
            this.payReason=''
            this.payNo=''
            this.serialNo=''
            this.planStartDate=''
            this.planEndDate=''
            this.currency=''
            this.planFee=''
            this.delinquentFee=''
            this.payRefFee=''
        }
    }
   export default { 
        name:'plan',
        data(){
          return{
            originMap:new Map(),
            isShow:false,
            PayType:'1',//缴别
            PlanOneTimes:'',//
            payTimes:'1',//缴费次数
            payMode:'1',//缴费方式
            planInfoVoList:[],//
            PrpPlanCurrencyName:'',//币别名称
          }
        },
      
        methods:{
          show:function() {
              this.isShow=!this.isShow;
           },
          initMainPlanData(orderData){
              if(orderData.originDataVo.mainInfoVo){
                  for(let item  of orderData.originDataVo.itemKindInfoVos){
                    this.originMap.set(item.serialNo,item)
                  }
              }
              this.payTimes=orderData.endorseDataVo.mainInfoVo.payTimes
              this.payMode=orderData.endorseDataVo.mainInfoVo.payMode
              let strName=''
              if(this.payTimes=="1")
                strName = "1";
              else if(this.payTimes=="12")
                strName = "2";
              else if(this.payTimes=="4")
                strName = "3";
              else
                strName = "5";
              this.PayType=  strName
              let plandata=orderData.endorseDataVo.planInfoVos
              for(let data of plandata){
                let obj= new palnObject()
                for(let key in data){
                    if(key in obj){ 
                      obj[key]=data[key]
                    }
                    obj.payRefFee=data.planFee-data.delinquentFee
                    obj.flag=this.originMap.get(obj.serialNo)?this.originMap.get(obj.serialNo).flag:''
                }
                this.planInfoVoList.push(obj)
              }
              this.$nextTick(()=>{
                this.planInfoVoList.forEach((item,index)=>{
                    if(item.flag!=''){
                      for(let key in item){
                            if(this.$refs[key]){
                              if(this.$refs[key][index]){
                                this.$refs[key][index].title= this.originMap.get(item.serialNo)[key]
                              }
                              if(this.$refs[key][index].title&&item.flag.charAt(0)=='U'&&this.$refs[key][index].title!=item[key]){
                                this.$refs[key][index].className=`${this.$refs[key][index].className}u`
                              }
                            }
                      }
                    }
                })
              })
          },
          changePayType(){},
          refreshPlan(){},
          checkPayType(){},
          generatePlanEngage(){},
          checkPlanFlag(){},
          changePlanFee(){},
          setOldValue(){},
          getPlanDate(){},
          getPlanStartDate(){},
        }
        
  }