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
            isShow:false,
            PayType:'1',//缴别
            PlanOneTimes:'',//
            payTimes:'1',//缴费次数
            payMode:'1',//缴费方式
            planInfoVoList:[],//
            PrpPlanCurrencyName:'',//币别名称
            oldSumPremium1:0,//源保单支付币别缴费金额合计
          }
        },
        computed: {
          sumPremium1 () {
            return this.$store.state.sumPremium1
          }
        },
        watch:{
          sumPremium1:function(newVal, oldVal) {
            if(newVal!=oldVal){
              this.refreshPlanByPayTimes(this.payTimes);
            }
          }
        },
        methods:{
          show(){
              this.isShow=!this.isShow;
           },
           initMainPlanData(orderData){
            this.planInfoVoList=[]
            this.payTimes=orderData.mainInfoVo.payTimes
            this.payMode=orderData.mainInfoVo.payMode
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
            let plandata=orderData.planInfoVos
            for(let data of plandata){
              let obj= new palnObject()
              for(let key in data){
                if(key in obj){ 
                  obj[key]=data[key]
                }
                if(key=='planFee'){
                  this.oldSumPremium1+=parseFloat(data.planFee)
                }
                obj.payRefFee=data.planFee-data.delinquentFee
              }
              this.planInfoVoList.push(obj)
            }
        },
          changePayType(){},//改变缴费类别
          refreshPlan(){},
          checkPayTimes(){},
          refreshPlanByPayTimes(e) { 
            let strStartDate = this.$store.state.validDate;
            let strEndDate = this.$store.state.endDate;
            let intPayTimes = parseInt(e);
            let i = 0;
            strStartDate = strStartDate.replace(/-/g,"/");
            strEndDate = strEndDate.replace(/-/g,"/");
            let startDate = new Date(strStartDate);
            let endDate = new Date(strEndDate);
            let intStartDate = startDate.getTime();
            let intEndDate = endDate.getTime();
            let intDispersion = Math.floor((intEndDate-intStartDate)/intPayTimes);
            let dbSumPremium1 = 0;
            let dbLeftPremium = 0;
            let dbSubPremium = 0;
            let intDateSub = 0;
            let dateSub;
            let endDateSub;
            let SumPremium1Fee=this.$store.state.sumPremium1;
            //删除当前信息
            //this.planInfoVoList=[];
            let map=new Map()
            this.planInfoVoList.forEach((item,key) => {
              if(item.flag=='I'){
                map.set(key,key)
              }
            });
            map.forEach((item,index)=>{
              this.planInfoVoList.splice(index,1)
            })
            dbSumPremium1 = parseFloat(SumPremium1Fee);
            //异常处理
            if(dbSumPremium1-this.oldSumPremium1==0){
                 return true;
            }else{
              dbSumPremium1=dbSumPremium1-this.oldSumPremium1
            }
            if(isNaN(dbSumPremium1)) {dbSumPremium1 = 0;}
              dbLeftPremium = dbSumPremium1;
              dbSubPremium = dbSumPremium1/intPayTimes;
              for(i=0;i<intPayTimes;i++)
              {
                let obj =  new palnObject(); 
                intDateSub = intStartDate+intDispersion*i;
                dateSub = new Date(intDateSub);
                endDateSub = this.$uiCommon.getNextDateFullDate(this.$uiCommon.convertFullDateToString(dateSub),15);
                //增加见费出单的缴费计划判断 改首期起期为操作日期 止期为保险起期前一天
                let OperateDate=this.$uiCommon.getCurrentDate();
                if("1"==this.$store.state.nonCarJfeeflag&&i==0)
                {
                  if(this.$store.state.comCode.substring(0,2) != "12"){
                  dateSub = new Date(new Date(OperateDate.replace(/-/g,"/")).getTime());
                  endDateSub = this.$uiCommon.getPreDateFullDate(this.$uiCommon.convertFullDateToString(new Date(intStartDate)),1);
                  //投保日期>起保日期-1时
                if(this.$uiCommon.compareFullDate(OperateDate,
                this.$uiCommon.getPreDateFullDate(this.$store.state.startDate,1))==1)//当首期缴费止期大于起期时 使起期等于止期 --见费业务
                {
                  dateSub = new Date(new Date(endDateSub.replace(/-/g,"/")).getTime());
                  }
                }
                }
                //缴费原因
                let riskCode=this.$store.state.riskCode
                if(riskCode=="JAK"||riskCode=="ECU")
                {
                  obj.payReason = "R50";
                }else{
                  if(i==0){
                     obj.payReason = "R10";
                  }else{
                     obj.payReason = "R20";
                  }
                }
                //期次
                obj.payNo = this.planInfoVoList.length;
                obj.serialNo= this.planInfoVoList.length;
                //add by hangang 20131224 辽宁按费出票 begin
                // if(typeof fm.FeePrintFlag != "undefined" ){
                //   if("1"==fm.FeePrintFlag.value&&("0,1,3".indexOf(fm.CoinsFlag.value)>-1)){
                //       if(i==0){
                //     fm.planStartDate[i+1].value = fm.OperateDate.value;
                //     fm.planStartDate[i+1].readOnly=false;
                //     fm.planEndDate[i+1].value=getPreDateFullDate(fm.StartDate.value,1);
                //     }else{
                //     fm.planStartDate[i+1].value =getPreDateFullDate(convertFullDateToString(dateSub),1);
                //     fm.planStartDate[i+1].readOnly=false;
                //     fm.planEndDate[i+1].value=getPreDateFullDate(convertFullDateToString(dateSub),1);
                //     }
                //   }else{ 
                //   //缴费起期
                //   fm.planStartDate[i+1].value = convertFullDateToString(dateSub);
                //   //缴费止期
                //   fm.planEndDate[i+1].value = endDateSub;
                //   }
                // }else{ 
                //缴费起期
                 obj.planStartDate = this.$uiCommon.convertFullDateToString(dateSub);
                //缴费止期
     
                obj.planEndDate= endDateSub;
                obj.flag='I'
                //}//add by hangang 20131224 辽宁按费出票 end
                //币别
                 obj.currency = this.$store.state.currency1Fee;
                 if( obj.currency=="CNY"){
                    this.PrpPlanCurrencyName="人民币";
                 }else if( obj.currency=="USD"){
                    this.PrpPlanCurrencyName="美元";
                 }else if( obj.currency=="HKD"){
                    this.PrpPlanCurrencyName="港币";
                 }else if(obj.currency=="AUD"){
                    this.PrpPlanCurrencyName="澳大利亚元";
                 }
                //应缴金额
                if(i==(intPayTimes-1)) //最后一次的分摊保费为余额
                {
                  obj.planFee =this.$uiCommon.numberFormat(this.$uiCommon.pointTwo(dbLeftPremium.toFixed(2)));
                }
                else
                {
                  dbLeftPremium = dbLeftPremium-dbSubPremium.toFixed(2);
                  obj.planFee = this.$uiCommon.numberFormat(this.$uiCommon.pointTwo(dbSubPremium.toFixed(2)));
                }
                //未缴金额
                 obj.delinquentFee = this.$uiCommon.pointTwo(this.$uiCommon.replaced(obj.planFee));
                //实缴金额（肯定为0）
                 obj.payRefFee= "0";
                 this.planInfoVoList.push(obj);
              }
          },
            checkPayType(){},
            generatePlanEngage(){
                this.$parent.$refs.MainEngage.generatePlanEngage()
            },
            checkPlanFlag(){},
          //修改应缴金额后触发
           // eslint-disable-next-line no-unused-vars
           changePlanFee(index){
            // let dbSumPremium1 = this.$uiCommon.replaced(this.$store.state.sumPremium1);
            // let dbLeftPremium = 0;
            // let dbSubPremium = 0;
            // let intLeftCount = 0;
            // let i = 0;
            // //异常处理
            // if(isNaN(dbSumPremium1))
            //   dbSumPremium1 = 0;

            // if(parseFloat(this.$uiCommon.replaced(this.planInfoVoList[index].planFee))==0) //应缴金额不能为0
            // {
            //   this.$alert('应缴金额不能为0！','缴费计划',{ type:'warning'})
            //   this.planInfoVoList[index].planFee = this.$uiCommon.pointTwo(parseFloat(this.$uiCommon.replaced( this.$refs.planFee[index].oldValue)).toFixed(2));//modify by gengxiaobo 20071120 格式化前取消页面千分位符号
            //   this.planInfoVoList[index].delinquentFee = this.$uiCommon.pointTwo(parseFloat(this.planInfoVoList[index].planFee).toFixed(2));
            //   this.planInfoVoList[index].payRefFee = "0.00";
            //   return false;
            // }
            // if(parseFloat(this.$uiCommon.replaced(this.planInfoVoList[index].planFee))>dbSumPremium1) //检验金额超过该币别的保费
            // {
            //   this.$alert("现"+ this.PrpPlanCurrencyName+"缴费已多于原计划"+(parseFloat(this.$uiCommon.replaced( this.planInfoVoList[index].planFee))-dbSumPremium1,2).toFixed(2)+"元",
            //   '缴费计划',{ type:'warning'})
            //   this.planInfoVoList[index].planFee = this.$uiCommon.pointTwo(parseFloat(this.$uiCommon.replaced(this.$refs.planFee[index].oldValue)).toFixed(2));
            //   this.planInfoVoList[index].delinquentFee = this.$uiCommon.pointTwo(parseFloat(this.planInfoVoList[index].planFee).toFixed(2));
            //   this.planInfoVoList[index].payRefFee = "0.00";
            //   return false;
            // }
            // //向下求剩余的保费
            // dbLeftPremium = dbSumPremium1;
            // for(i=0;i<=index&&i<=this.planInfoVoList.length;i++)
            // {
            //   dbLeftPremium = dbLeftPremium-parseFloat(this.$uiCommon.replaced(this.planInfoVoList[i].planFee));//modify by gengxiaobo 20071120 计算前取消页面千分位符号    
            // }
            
            
            // //求缴费计划中剩余的条数
            // intLeftCount = this.planInfoVoList.length-(index+1);
            // //modify by gengxiaobo 20071120 格式化前取消页面千分位符号
            // if(intLeftCount==0&&parseFloat(this.$uiCommon.replaced(this.planInfoVoList[index].planFee),10)!=parseFloat(this.$uiCommon.replaced(this.$refs.planFee[index].oldValue),10))
            // {
            //   this.$alert('最后一条缴费计划的应缴金额不能如此修改！','缴费计划',{ type:'warning'})
            //   this.planInfoVoList[index].planFee = this.$uiCommon.pointTwo(parseFloat(this.$uiCommon.replaced(this.$refs.planFee[index].oldValue)).toFixed(2));//modify by gengxiaobo 20071120 格式化前取消页面千分位符号
            //   this.planInfoVoList[index].delinquentFee = this.$uiCommon.pointTwo(parseFloat(this.planInfoVoList[index].planFee).toFixed(2));
            //   this.planInfoVoList[index].payRefFee = "0.00";
            //   return false;
            // }
            // //求平均值
            // dbSubPremium = dbLeftPremium/intLeftCount;
            // //格式化页面上的值
            // for(i=0;i<=index;i++)
            // {
            //   //modify by gengxiaobo begin 20071120 格式化前取消页面千分位符号,格式化后除去修改域其他输入域格式化为千分位
            //   if(i!=index)
            //   {
            //    this.planInfoVoList[i].planFee = this.$uiCommon.numberFormat( this.$uiCommon.pointTwo(parseFloat( this.$uiCommon.replaced(this.planInfoVoList[i].planFee)).toFixed(2)));
            //   }
            //   else
            //   {
            //      this.planInfoVoList[i].planFee = this.$uiCommon.pointTwo(parseFloat(this.$uiCommon.replaced( this.planInfoVoList[i].planFee)).toFixed(2));
            //   }
            //   //modify by gengxiaobo end 20071120 格式化前取消页面千分位符号,格式化后除去修改域其他输入域格式化为千分位
            //   this.planInfoVoList[i].delinquentFee = this.$uiCommon.pointTwo(parseFloat(this.planInfoVoList[i].delinquentFee).toFixed(2));
            //   this.planInfoVoList[i].payRefFee = "0.00";    
            // }
            // for(i=index+1;i<=this.planInfoVoList.length-1;i++)
            // {
            //   if(i==this.planInfoVoList.length-1) //最后一次的分摊保费为余额
            //   {
            //     this.planInfoVoList[i].planFee = this.$uiCommon.numberFormat(this.$uiCommon.pointTwo(dbLeftPremium.toFixed(2)));//modify by gengxiaobo 20071120 格式化千分位符号
            //     this.planInfoVoList[i].delinquentFee  = this.$uiCommon.pointTwo(dbLeftPremium.toFixed(2));
            //     this.planInfoVoList[i].payRefFee = "0.00";
            //   }
            //   else
            //   {
            //     dbLeftPremium = dbLeftPremium-(dbSubPremium.toFixed(2));
            //     this.planInfoVoList[i].planFee = this.$uiCommon.numberFormat(this.$uiCommon.pointTwo(dbSubPremium.toFixed(2)));//modify by gengxiaobo 20071120 格式化千分位符号
            //     this.planInfoVoList[i].delinquentFee  = this.$uiCommon.pointTwo(dbSubPremium.toFixed(2));
            //     this.planInfoVoList[i].payRefFee = "0.00";
            //   }
            // }  
            // return true;
          },
          setOldValue(index){
            this.$refs.planFee[index].oldValue=this.$uiCommon.replaced(this.planInfoVoList[index].planFee);

          },
           getPlanDate(index)
          {
            if(this.planInfoVoList[index].planStartDate!=null&&this.planInfoVoList[index].planStartDate!="NaN"&&this.planInfoVoList[index].planStartDate!="")
              this.planInfoVoList[index].planEndDate = this.$uiCommon.getNextDateFullDate(this.planInfoVoList[index].planStartDate,15);
              if(this.$store.state.nonCarJfeeflag=='1'&&index==0){
                  this.planInfoVoList[index].planEndDate =this.planInfoVoList[index].planStartDate;
                }
          },//add by hangang 20131224 辽宁按费出票 

             checkPlan(index)
            { 
                if(this.$uiCommon.isEmpty(this.planInfoVoList[index].planStartDate))
                { 
                  this.$alert('缴费起期不能为空！','缴费计划',{ type:'warning'})
                  //fm.planStartDate[i].focus();
                  return false;
                }
                if(this.$uiCommon.isEmpty(this.planInfoVoList[index].planEndDate))
                {
                  this.$alert('缴费止期不能为空！','缴费计划',{ type:'warning'})
                  //showPageOnly(fm.PlanImg,Plan);
                  //fm.planEndDate[i].focus();
                  return false;
                }
                if(this.$uiCommon.compareFullDate(this.planInfoVoList[index].planStartDate,this.planInfoVoList[index].planEndDate)>0)
                {
                  this.$alert('缴费起期不能大于缴费止期！','缴费计划',{ type:'warning'})
                  //fm.planEndDate[i].focus();
                  return false;
                }
                // if(this.$uiCommon.isEmpty(this.planInfoVoList[index].planFee))
                // {
                //   errorMessage("应缴金额不能为空！");
                //   showPageOnly(fm.PlanImg,Plan);
                //   fm.planFee[i].focus();
                //   return false;
                // }
                let endplanNo=index+1
                if(endplanNo!=1)
                {
                  if(this.$uiCommon.compareFullDate(this.planInfoVoList[index].planStartDate,this.planInfoVoList[index-1].planEndDate)<0)
                  { 
                    this.$alert('第"+endplanNo+"期缴费止期不能大于第"+index+"期的缴费起期！','缴费计划',{ type:'warning'})
                    //fm.planEndDate[i-1].focus();
                    return false;
                  }
                }
              return true;
            },
            getPlanStartDate(index){
              this.planInfoVoList[index].planStartDate = this.$uiCommon.getPreDateFullDate( this.planInfoVoList[index].planEndDate,15);
              if(this.$uiCommon.compareFullDate(this.planInfoVoList[index].planEndDate,this.$store.state.endDate)>0)
              {
                this.$alert("缴费止期不能晚于保单止期！",'缴费计划',{ type:'warning'});
                this.planInfoVoList[index].planEndDate="";
                this.$refs.endDateRef[index].focus();
               return false;
             }
            },
            getJsonPlanInfoVoList(){
               let planInfoVoList=new Array()
               for(let planInfoVo of this.planInfoVoList){
                   let obj={
                    flag:planInfoVo.flag,
                    payReason:planInfoVo.payReason,
                    payNo:planInfoVo.payNo,
                    serialNo:planInfoVo.serialNo,
                    planStartDate:planInfoVo.planStartDate,
                    planEndDate:planInfoVo.planEndDate,
                    currency:planInfoVo.currency,
                    planFee:this.$uiCommon.replaced(planInfoVo.planFee),
                    delinquentFee:this.$uiCommon.replaced(planInfoVo.delinquentFee)
                   }
                   planInfoVoList.push(obj)

               }
                return planInfoVoList
            }
        }
        
  }