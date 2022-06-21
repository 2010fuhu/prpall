import ProposalGenerateReq from '@/json/ProposalGenerateReq.json'
import EndoresGenerateReq from '@/json/EndoresGenerateReq.json'
import initBaseData  from '@/api/initBaseData' 
import saveOrder  from  '@/api/underwrtAndGenerate.js'
import MainHead from '@/views/commonship/MainHead.vue'
import AppliInsured from '@/views/commonship/MainAppliInsured.vue'
import MainInsured from '@/views/commonship/MainInsured.vue'
import MainPeriod   from '@/views/commonship/MainPeriod.vue'
import MainConstruct from '@/views/commonship/MainConstruct.vue'
import MainLoan from '@/views/2244/MainLoan.vue'
import MainPerformance from '@/views/commonship/MainPerformanceObligor.vue'
import MainItemkind    from '@/views/2244/MainItemkind.vue'
import MainDeductible  from '@/views/commonship/MainDeductible.vue'
import MainFee  from '@/views/commonship/MainFee.vue'
import MainPlan from '@/views/commonship/MainPlan.vue'
import MainEngage from '@/views/commonship/MainEngage.vue'
import MainExpernses from '@/views/commonship/MainExpenses.vue'
import MainTail from '@/views/commonship/MainTail.vue'
import MainCoins from '@/views/commonship/MainCoins.vue'
import MainReins from '@/views/commonship/MainReins.vue'
import MainAgriType from '@/views/commonship/MainAgriType.vue'
import Order  from '@/api/queryOrderList' 
import  originalPolicy from '@/json/originalPolicy.json'
export default {
  name: 'proposalno',
  components: {
    MainHead,
    AppliInsured,
    MainInsured,
    MainPeriod,
    MainConstruct,
    MainLoan,
    MainPerformance,
    MainItemkind,
    MainDeductible,
    MainFee,
    MainPlan,
    MainEngage,
    MainExpernses,
    MainTail,
    MainCoins,
    MainReins,
    MainAgriType,
  },

  
  data(){
          return{
            isShow:false,
            isloading:false,
            isCoinsShow:false,
            isCoinschildShow:false,
            isReinsShow:false,
            isReinsChildShow:false,
            isAgriShow:false,
            isAgriChildShow:false,
            editType:'NEW',//编辑类型 时投保单 还是批单
            binNo:''
          }
        },
         created(){
            //1
            //2 从承保系统进去该系统时 获取地址栏后参数 判断时投保单录入还是普通批改录入
            //this.editType= this.$route.query.editType
            this.loaded();//这个是父组件的加载罩
            this.$nextTick(() => {//拿到后台得数据
              try{
                this.fetchData()
              }catch(e){
                this.$router.push( {path: '/UnderwriteSubmit',query: {status:'failure',message:'普通批单录入初始化失败!!!'}})
              }
            });
          },

        methods:{
          show(){this.isShow=!this.isShow;},
          loaded(){ 
            this.isloading=!this.isloading
          },//加载罩的功能
          coinsReinsAgriShow(e){
              if(e.target.name=='btCoins'){
                if(this.$refs.MainHead.comCode==''){
                  this.$alert('请先录入经办部门!!!','',{type:'warning'})
                  return false;
                }else{
                  this.isCoinschildShow = this.isCoinsShow = true
                }
              }else if(e.target.name=='btReins'){
                this.isReinsChildShow=this.isReinsShow=true
              }else{
                this.isAgriChildShow=this.isAgriShow=true
              }
          },
          closeCoins(args){//控制联共保业务模块的显示与隐藏
            if(args=='cancel'){
               this.isCoinschildShow=false;
               this.isCoinsShow=false;
            }else{
              this.isCoinschildShow=false;
            }
           },
          closeReins(args){ //控制分入业务模块的显示与隐藏
            if(args=='cancel'){
              this.isReinsChildShow=false;
              this.isReinsShow=false;
            }else if(args=='ok'){
              this.isReinsChildShow=false;
            }
          },
          closeAgri(args){  //控制涉农业务模块的显示与隐藏
            if(args=='cancel'){
              this.isAgriChildShow=false;
              this.isAgriShow=false;
            }else if(args=='ok'){
              this.isAgriChildShow=false;
            }
          },
          fetchData(){
                return  new Promise((resolve,reject)=>{
                    initBaseData.getSelsetData(this.$store.state.riskCode,
                       this.$store.state.comCode, this.$store.state.userCode).then(res => {
                    let data=res.data.data;
                    if(res.status==200){
                        resolve(data)
                    }else{
                        reject(data)
                    }
                    })
                }).then((data)=>{
                    this.$refs.MainHead.initOpitons(data);
                    this.$refs.AppliInsured.initOpitons(data);
                    this.$refs.Insured.initOpitons(data);
                    this.$refs.MainItemkind.initSelected(data);
                    this.$refs.MainFee.initSelected(data);
                    this.$refs.MainEngage.initSelected(data);
                    this.$refs.MainTail.initSelected(data)
                    //this.$refs.MainTail.arbitraryBoardList=data.arbitraryBoardList//仲裁方式
                    this.$store.state.bizType='ENDORSE'
                    this.binNo=this.$route.query.businessNo
                    this.copybinNoData()
                }).catch((e)=>{
                     throw e.message
                })
          },
          cancelForm(){
             //this.$router.replace({path:'/endorse'})
             this.$router.go(-1)
          },
           nextform(){
            //let flag= await this.checkProposalData()
            let flag=true
            if(flag){
                    let jsonObj= this.generateEndorseJson()
                    this.saveProposalorEndorse(jsonObj).then((data)=>{
                        this.$router.push({ path: '/endorseText',query:{endorseNo:data.endorseNo,endorseText:data.endorseText}})
                        
                }).catch((message)=>{
                    this.$alert(message,'批单保存',{type:'warning'})
                    return false 
                })
            }else{
               return false
            }
          },
          changeBizNoTitle(){  //选择是新保还是复制 还是续保等JS方法
            //this.$store.state.editType=this.editType 
          },
          reLoadForm(){},
          async copybinNoData(){
            try{
              let orderData= await this.callDataByBinNo()
              let orderDataOrigin=JSON.parse(JSON.stringify(orderData))
              originalPolicy.mainInfoVo=orderDataOrigin.mainInfoVo
              originalPolicy.appliInfoVo=orderDataOrigin.appliInfoVo
              originalPolicy.itemKindInfoVos=orderDataOrigin.itemKindInfoVos
              originalPolicy.handlerInfoVos=orderDataOrigin.handlerInfoVos
              originalPolicy.insuredInfoVos=orderDataOrigin.insuredInfoVos
              originalPolicy.constructInfoVo=orderDataOrigin.constructInfoVo
              originalPolicy.guaranteeInfoVo=orderDataOrigin.guaranteeInfoVo
              originalPolicy.guaranteeSubInfoVos=orderDataOrigin.guaranteeSubInfoVos
              originalPolicy.performanceObligorInfoVos=orderDataOrigin.performanceObligorInfoVos
              originalPolicy.feeInfoVos=orderDataOrigin.feeInfoVos
              originalPolicy.planInfoVos=orderDataOrigin.planInfoVos
              originalPolicy.engageInfoVos=orderDataOrigin.engageInfoVos
              originalPolicy.agentInfoVos=orderDataOrigin.agentInfoVos
              originalPolicy.subSidyInfoVos=orderDataOrigin.subSidyInfoVos
              originalPolicy.coinsInfoVos=orderDataOrigin.coinsInfoVos
              originalPolicy.coinsDetailInfoVos=orderDataOrigin.coinsDetailInfoVos
              originalPolicy.reinsCededInfoVo=orderDataOrigin.reinsCededInfoVo
              originalPolicy.reinsBrokerInfoVos=orderDataOrigin.reinsBrokerInfoVos
              console.log(originalPolicy)
              //初始化页面得数据
              this.$store.state.refreshFlagFee='1';//点击币别标志刷新成1
              await  this.$refs.MainHead.initMainHeadData(orderData)
              if(this.$store.state.channelType1=='92'||this.$store.state.channelType1=='93'){
                this.$store.state.refreshFlagAgent='1';//代理标志刷新成1
              }
              let obj= ProposalGenerateReq
              if(this.$store.state.agriType=='1'){
                this.$store.state.refreshFlagAgri='1'; 
                obj.proposalGenerateMainInfoReq.subSidyInfoVoList=orderData.subSidyInfoVos//将这个放入到JSON对象上
                this.isAgriShow=true;
              }
              if(this.$store.state.coinsFlag!='0'){
                this.$store.state.refreshFlagCoins='1';
                obj.proposalGenerateMainInfoReq.coinsInfoVoList=orderData.coinsInfoVos
                obj.proposalGenerateMainInfoReq.coinsDetailInfoVoList=orderData.coinsDetailInfoVos//将这个放入到JSON对象上 
                this.isCoinsShow=true;
              }
              if(this.$store.state.channelType1=='h'){
                this.$store.state.refreshFlagReins='1'; 
                obj.proposalGenerateMainInfoReq.coinsInfoVoList=orderData.coinsInfoVos
                obj.proposalGenerateMainInfoReq.reinsBrokerInfoVoList=orderData.reinsBrokerInfoVos
                obj.proposalGenerateMainInfoReq.reinsCededInfoVo=orderData.reinsCededInfoVo
                this.isReinsShow=true;
                //this.isReinsChildShow=true;
              }
              await  this.$refs.AppliInsured.initAppliInsuredData(orderData);
              this.$refs.Insured.initInsuredData(orderData)
              this.$refs.MainPeriod.initPeriod(orderData)
              this.$refs.MainConstruct.initMainConstructData(orderData)
              this.$refs.MainLoan.initMainLoanData(orderData)
              this.$refs.MainPerformance.initPerFormanceData(orderData)
              this.$refs.MainItemkind.initMainItemkindData(orderData)
              this.$refs.MainFee.initMainFeeData(orderData)
              this.$refs.MainDeductible.initMainDeductibleData(orderData)
              this.$refs.MainPlan.initMainPlanData(orderData)
              this.$refs.MainEngage.initEngageData(orderData)
              this.$refs.MainExpernses.initExpernsesData(orderData) 
              this.$refs.MainTail.initMainTailData(orderData) 
              this.loaded();
              this.$store.state.initStatus=1
            }catch(e){
                 throw e.message
            }
          },
          callDataByBinNo(){//查询获取投保单或者保单明细方法
            let data=''
            return  new Promise((resolve,reject)=>{
                Order.findPolicyInfo(this.binNo).then(res => {
                  data=res.data;
                  if(res.status==200){
                      if(data.code=='9999'){
                        reject(data.msg)
                      }else{
                        resolve(data)
                      }
                  }else{
                      reject("调用保单号查询报错")
                  }
                })
   
            }).catch(()=>{})
          },
          //投保单保存 校验页面数据
          async checkProposalData(){
              let flag=true 
              //await  this.$refs.MainHead.checkMainHead().then((msg)=>{flag=msg})
              //if(!flag){return false}
              await this.$refs.AppliInsured.checkAppliInsured().then( (msg)=>{flag=msg})
              if(!flag){return false}
              if(this.$refs.Insured.checkInsured()){return false}
              await this.$refs.MainConstruct.checkConstructInfo().then((msg)=>{flag=msg})
              if(!flag){return false}
              await this.$refs.MainPerformance.checkPerformanceObligor().then((msg)=>{flag=msg})
              if(!flag){return false}
              await this.$refs.MainDeductible.checkDeductibleInfo().then((msg)=>{flag=msg})
              if(!flag){return false}//refreshFlagPerformance
              if(this.$store.state.refreshFlagFee=='0'){
                    this.$alert('请点击币别确定重新获取保费！！！。','币别信息',{type:'warning'})
                    return false
              }else{
                 if(this.$store.state.refreshFlagAgent=='0'&&(this.$store.state.channelType1=='92'||this.$store.state.channelType1=='93')){
                    this.$alert('代理业务请重新获取费用信息！！！。','费用信息',{type:'warning'})
                    return false
                 }
                 if(this.$store.state.refreshFlagPerformance=='0'&&this.$store.state.comCode.substring(0,2)=='41'
                 &&this.$store.state.businessKind=='00'&&this.$store.state.channelType1=='91'){
                  this.$alert('请重新获取绩效费用信息！！！。','绩效费用信息',{type:'warning'})
                      return false
                 }
                 if(this.$store.state.coinsFlag!='0'&&this.$store.state.refreshFlagCoins=='0'){
                    this.$alert('请刷新联共保信息！！！。','联共保信息',{type:'warning'})
                    return false
                 }
                 if(this.$store.state.refreshFlagReins=='0'&&this.$store.state.channelType1=='h'){
                    this.$alert('请刷新分入信息！！！。','分入信息',{type:'warning'})
                    return false
                 }
                 if(this.$store.state.agriType=='1'&&this.$store.state.refreshFlagAgri=='0'){
                    this.$alert('请刷新涉农信息！！！。','涉农信息',{type:'warning'})
                    return false
                 }
              }
              return true
           },
           //投保单保存 调用接口方法 
           saveProposalorEndorse(jsonObj){
              //调用投保单保存接口
              return   new Promise((resolve,reject)=>{
                  saveOrder.endorseGenerate(jsonObj).then((res)=>{
                      if(res.data.resHeader.errCode=='0000'){
                        resolve({endorseNo:res.data.endorseNo,endorseText:res.data.endorseText})
                      }else if(res.data.resHeader.errCode=='9999'){
                        reject("保单生成失败!!!")
                      }
                  })

              })
           },
           //保存组织JSON数据对象
           generateEndorseJson(){
              let obj= EndoresGenerateReq
              //1.组织ReqHeader对象信息
              obj.reqHeader.transNo=this.$uiCommon.uuid(16, 32)
              obj.reqHeader.transDate=this.$uiCommon.getCurrentDate()
              //2.组织ProposalGenerateMainInfoReq对象信息
              obj= this.GenerateMainInfoReq(obj)
              return obj;
           },
           GenerateMainInfoReq(obj){
            let endorseType='';
              //1先组织MainInfoVo对象
            //obj.infoData.mainInfoVo.certiType=""
            obj.infoData.mainInfoVo=JSON.parse(JSON.stringify(originalPolicy.mainInfoVo));
            obj.infoData.mainInfoVo.bizType=this.$store.state.bizType
            //obj.infoData.mainInfoVo.editType=this.editType
            obj.infoData.mainInfoVo.riskCode=this.$store.state.riskCode
            obj.infoData.mainInfoVo.policyType='02'
            obj.infoData.mainInfoVo.policySort=this.$refs.MainHead.policySort
            obj.infoData.mainInfoVo.language=this.$refs.MainHead.language
            obj.infoData.mainInfoVo.policyNo=this.$store.state.policyNo
            obj.infoData.mainInfoVo.businessKind=originalPolicy.mainInfoVo.businesskind
            obj.infoData.mainInfoVo.coinsFlag=originalPolicy.mainInfoVo.coinsFlag
            obj.infoData.mainInfoVo.agriType=originalPolicy.mainInfoVo.agriType
            obj.infoData.mainInfoVo.shareHolderFlag=this.$refs.MainHead.shareHolderFlag
            obj.infoData.mainInfoVo.businessModeCode=this.$refs.MainHead.businessModeCode
            obj.infoData.mainInfoVo.channelType1=originalPolicy.mainInfoVo.channelType1
            obj.infoData.mainInfoVo.channelType2=originalPolicy.mainInfoVo.channelType2
            obj.infoData.mainInfoVo.channelType3=originalPolicy.mainInfoVo.channelType3
            obj.infoData.mainInfoVo.agentCode=originalPolicy.mainInfoVo.agentCode
            obj.infoData.mainInfoVo.agreementNo=originalPolicy.mainInfoVo.agreementNo
            if(this.$store.state.comCode.substring(0,2)=='31'){
              obj.infoData.mainInfoVo.roadBranchCode=this.$refs.MainHead.roadBranchCode
            }
            if(originalPolicy.mainInfoVo.channelType1=='92'||originalPolicy.mainInfoVo.channelType1=='93'){
              obj.infoData.mainInfoVo.disRate= this.$uiCommon.replaced(this.$refs.MainExpernses.commissionRate)
            }else{
              obj.infoData.mainInfoVo.disRate=originalPolicy.mainInfoVo.disRate
            }
            obj.infoData.mainInfoVo.disRate=this.$store.state.refreshFlag=='1'? this.$uiCommon.replaced(this.$refs.MainExpernses.commissionRate):originalPolicy.mainInfoVo.disRate
            obj.infoData.mainInfoVo.currency=this.$store.state.currency2Fee
            obj.infoData.mainInfoVo.sumAmount=this.$store.state.refreshFlag=='1'? this.$uiCommon.replaced(this.$store.state.sumAmount2):originalPolicy.mainInfoVo.sumAmount
            obj.infoData.mainInfoVo.sumPremium==this.$store.state.refreshFlag=='1'? this.$uiCommon.replaced(this.$store.state.sumPremium2):originalPolicy.mainInfoVo.sumPremium
            obj.infoData.mainInfoVo.flag=""
            // let strOthFlag = "000000YY000000000000";
            // let strcheckLowestChargeValue=""//水险最低保费
            // let strMainPolicyNo=""//预约保单号
            // let strReinsBill =obj.infoData.mainInfoVo.reinsBill// 账单标识
            // if(this.$refs.MainHead.channelType1=="h"){
            //   if(strOthFlag.length==20){
            //     strOthFlag = strOthFlag.substring(0,6)+"N"+strOthFlag.substring(7,20);
            //   }
            // }
            // if(strMainPolicyNo !=null && strMainPolicyNo!=""){
            //     strOthFlag = strOthFlag.substring(0,10) + "1" + strOthFlag.substring(11,strOthFlag.length());
            // }    
            // if(strMainPolicyNo !=null && strMainPolicyNo!=""&& 
            //   (this.$store.state.riskCode.substring(0,2)=="09" ||this.$store.state.riskCode.substring(0,2)=="10")){
            //     strOthFlag = strOthFlag.substring(0,10) + "2" + strOthFlag.substring(11,strOthFlag.length());
            // }
            // if(strcheckLowestChargeValue == null){
            //   strcheckLowestChargeValue = "0";
            // }
            // strOthFlag = strOthFlag.substring(0,18)+strcheckLowestChargeValue;
            // if(strReinsBill==null){strReinsBill="0";}
            // strOthFlag = strOthFlag.substring(0,19)+strReinsBill;
            // obj.infoData.mainInfoVo.othFlag=strOthFlag//标识 投保单 保单的标志位
            /*  othflag 批单的时候不传了在后端Java 中 逻辑赋值*/
            obj.infoData.mainInfoVo.makeCom=this.$store.state.comCode
            obj.infoData.mainInfoVo.comCode=this.$refs.MainHead.comCode
            obj.infoData.mainInfoVo.handlerCode==originalPolicy.mainInfoVo.handlerCode
            obj.infoData.mainInfoVo.handlerName==originalPolicy.mainInfoVo.handlerName
            obj.infoData.mainInfoVo.operateDate=this.$refs.MainPeriod.operateDate
            obj.infoData.mainInfoVo.signDate=this.$refs.MainPeriod.signDate
            obj.infoData.mainInfoVo.inputDate=this.$refs.MainPeriod.signDate
            obj.infoData.mainInfoVo.startDate=this.$store.state.startDate
            obj.infoData.mainInfoVo.startHour=this.$store.state.startHour
            obj.infoData.mainInfoVo.endDate=this.$store.state.endDate
            obj.infoData.mainInfoVo.endHour=this.$store.state.endHour
            obj.infoData.mainInfoVo.operatorCode=this.$store.state.userCode
            obj.infoData.mainInfoVo.updateCode=this.$store.state.userCode
            obj.infoData.mainInfoVo.updateDate=this.$uiCommon.getCurrentDate()//
            obj.infoData.mainInfoVo.updateHour= new Date().getHours()
            obj.infoData.mainInfoVo.isNeedEpolicy="0"
            obj.infoData.mainInfoVo.invoiceMan=this.$refs.AppliInsured.invoiceMan==''?this.$refs.AppliInsured.customerCName:this.$refs.AppliInsured.invoiceMan
            obj.infoData.mainInfoVo.payMode=this.$refs.MainPlan.PayType;
            obj.infoData.mainInfoVo.payTimes=this.$refs.MainPlan.payTimes;
            obj.infoData.mainInfoVo.jfeeFlag=this.$store.state.refreshFlag=='1'?this.$store.state.nonCarJfeeflag:originalPolicy.mainInfoVo.jfeeFlag
            obj.infoData.mainInfoVo.judicalScope=this.$refs.MainTail.judicalScope
            obj.infoData.mainInfoVo.argueSolution=this.$refs.MainTail.argueSolution
            obj.infoData.mainInfoVo.arbitBoardName=this.$refs.MainTail.arbitBoardName
            obj.infoData.mainInfoVo.remark=this.$refs.MainTail.remark
             for(let mainInfoKey in originalPolicy.mainInfoVo){
                let valOrigin=originalPolicy.mainInfoVo[mainInfoKey]
                let valNew=obj.infoData.mainInfoVo[mainInfoKey]
                if(valOrigin!=null&&mainInfoKey!='flag'&&valOrigin!=valNew){
                     console.log(mainInfoKey)
                     obj.infoData.mainInfoVo.flag="U"
                    //break;
                }
             }
            
            //组织itemkindinfo
            obj.infoData.itemKindInfoVos=[];
            let itemKindInfoVoOld=originalPolicy.itemKindInfoVos
            let itemKindInfoVoNew=JSON.parse(JSON.stringify(this.$refs.MainItemkind.itemKindInfoVoList))
            for(let item of itemKindInfoVoNew){
               let obj1={
                 serialNo:item.serialNo,
                 mainsubFlag:'1',
                 calculateFlag:item.calculateFlag,
                 //flag:item.flag,
                 flag:" 1",
                 kindCode:item.kindCode,
                 kindName:item.kindName,
                 currency:item.currency,
                 shortRateFlag:item.shortRateFlag,
                 shortRate:this.$uiCommon.replaced(item.shortRate),
                 amount:this.$uiCommon.replaced(item.amount),
                 rate:this.$uiCommon.replaced(item.rate),
                 premium:this.$uiCommon.replaced(item.premium)
               }
               for(let olditem of itemKindInfoVoOld){
                   if(olditem.kindCode==obj1.kindCode&&(obj1.flag!="D"&&obj1.flag!="I")){
                      for(let itemkey in olditem){
                          if(olditem[itemkey]!=null&&olditem[itemkey]!=obj1[itemkey]){
                              obj1.flag='U1'; 
                              endorseType+=`05,`;
                              break;
                          }
                      }
                   }
               }
               obj.infoData.itemKindInfoVos.push(obj1)
            }
            //组织经办人信息集合
            obj.infoData.handlerInfoVos=[];
            let  handlerInfoVoNew=JSON.parse(JSON.stringify(this.$refs.MainHead.handlerInfoVo));
            let  departmentInfoNew=JSON.parse(JSON.stringify(this.$refs.MainHead.departmentInfoVoList));
            let  PerformanceNew=JSON.parse(JSON.stringify(this.$refs.MainExpernses.AllPerformance_Data));
            let  handlerInfoVoOld=originalPolicy.handlerInfoVos
            for(let handler of handlerInfoVoNew){
               let obj2={
                 comCode:handler.comCode,
                 comName:'',
                 handlerCode:handler.handlerCode,
                 handlerName:'',
                 professionalNo:handler.professionalNo, 
                 perforPercentage:handler.perforPercentage,
                 performanceRate:'',
                 performanceAmount:'',
                 maxPercent:'',
                 currency:'',
                 flag:''
               }
               for(let departmentInfo of departmentInfoNew){
                    if(obj2.comCode==departmentInfo.comcode){
                      obj2.comName=departmentInfo.department
                      break;
                    }
               }
               for(let handler1CodeVo of handler.Handler1CodeVoList){
                     if(obj2.handlerCode==handler1CodeVo.handlerCode){
                          obj2.handlerName=handler1CodeVo.handlerName
                          break
                     }
               }
               if(this.$store.state.comCode.substring(0,2)=='41' &&PerformanceNew.length>0 && this.$store.state.refreshFlagPerformance=='1'){
                  for(let  Performance of PerformanceNew){
                    if(obj2.handlerCode==Performance.EveryUserCode){
                        obj2.performanceRate = Performance.PerformancePercent
                        obj2.performanceAmount=Performance.PerformanceFee
                        obj2.currency=Performance.PerformanceCurrency
                        break;
                    }
                  }
               }
              obj.infoData.handlerInfoVos.push(obj2)
            }

            // 组织经办人信息集合 为每一条数据的赋值flag
            
            for(let handlerInfoOld of handlerInfoVoOld){
                  for(let index=0;index< obj.infoData.handlerInfoVos.length;index++){
                    if(handlerInfoOld.handlerCode==obj.infoData.handlerInfoVos[index].handlerCode){
                      for(let handlerKey in handlerInfoOld ){
                        if(handlerInfoOld[handlerKey]!=null&&handlerKey!='flag'){
                          if(handlerInfoOld[handlerKey]!=obj.infoData.handlerInfoVos[index][handlerKey]){
                            obj.infoData.handlerInfoVos[index].flag='U'
                            
                            break;
                          }
                        }
                      }
                    }
                  }
            }
            //组织投保人信息模块
            let appliInfoVoOld=originalPolicy.appliInfoVo
            obj.infoData.appliInfoVo=originalPolicy.appliInfoVo
            let  appliInfoVoNew =JSON.parse(JSON.stringify( this.$refs.AppliInsured.appliInfoVo)); 
            for (let appliInfoKey in  obj.infoData.appliInfoVo){
               if((appliInfoKey in appliInfoVoNew)){
                if(appliInfoKey=='capitalauThority'||appliInfoKey=='doBesinessIncome'){
                  obj.infoData.appliInfoVo[appliInfoKey]=this.$uiCommon.replaced(appliInfoVoNew[appliInfoKey])
                }else{
                  obj.infoData.appliInfoVo[appliInfoKey]=appliInfoVoNew[appliInfoKey]
                }
               }
            }
            for(let oldkey in appliInfoVoOld){
              if(oldkey!='flag'&&appliInfoVoOld[oldkey]!= obj.infoData.appliInfoVo[oldkey]){
                  obj.infoData.appliInfoVo.flag="U"
                  endorseType+=`60,`
                  break;
              }
            }
            //组织被保人信息模块 insuredInfoList、
            let insuredInfoVos=originalPolicy.insuredInfoVos 
            obj.infoData.insuredInfoVos=JSON.parse(JSON.stringify(this.$refs.Insured.insuredInfoList))
            for(let oldinsured of insuredInfoVos){
              for(let index=0;index< obj.infoData.insuredInfoVos.length;index++){
                if(oldinsured.customerCode==obj.infoData.insuredInfoVos[index].customerCode
                  &&obj.infoData.insuredInfoVos[index].flag!="D"&&obj.infoData.insuredInfoVos[index].flag!="I"){
                  for(let insuredKey in oldinsured ){
                    if(oldinsured[insuredKey]!=null&&insuredKey!='flag'&& typeof obj.infoData.insuredInfoVos[index][insuredKey]!='undefined'){
                      if(oldinsured[insuredKey]!=obj.infoData.insuredInfoVos[index][insuredKey]){
                        obj.infoData.insuredInfoVos[index].flag='U'
                        if(endorseType.indexOf('04')<0){
                          endorseType+=`04,`
                        }
                        break;
                      }
                    }
                  }
                }else if(oldinsured.customerCode==obj.infoData.insuredInfoVos[index].customerCode
                  &&(obj.infoData.insuredInfoVos[index].flag=="D"||obj.infoData.insuredInfoVos[index].flag=="I")){
                      if(endorseType.indexOf('04')<0){
                        endorseType+=`04,`
                      }
                }
              }
          }
            //组织建设工程信息模块
            let constructInfoVo=originalPolicy.constructInfoVo 
            obj.infoData.constructInfoVo=this.$refs.MainConstruct.constructInfoVo
            for(let constructKey in constructInfoVo){
              if(constructInfoVo[constructKey]!=null&constructKey!='flag'&&constructInfoVo[constructKey]!= obj.infoData.constructInfoVo[constructKey]){
                  obj.infoData.constructInfoVo.flag="U";
                  endorseType+=`08,`
                  break;
              }
            }
            //组织反担保信息
            let guaranteeInfoVo=originalPolicy.guaranteeInfoVo 
            obj.infoData.guaranteeInfoVo=this.$refs.MainLoan.guaranteeInfoVo
            for(let guaranteeInfoKey in guaranteeInfoVo){
              if(guaranteeInfoVo[guaranteeInfoKey]!=null&guaranteeInfoKey!='flag'&&guaranteeInfoVo[guaranteeInfoKey]!= obj.infoData.guaranteeInfoVo[guaranteeInfoKey]){            
                  obj.infoData.guaranteeInfoVo.flag="U"
                  if(endorseType.indexOf('08')<0){
                    endorseType+=`08,`
                  }
                  break;
              }
            }

            //组织反担保子信息
            let guaranteeSubInfoVoOlds=originalPolicy.guaranteeSubInfoVos 
            obj.infoData.guaranteeSubInfoVos=JSON.parse(JSON.stringify(this.$refs.MainLoan.guaranteeSubInfoVoList))
            if(guaranteeSubInfoVoOlds.length>0){
                for(let oldguaranteeSub of guaranteeSubInfoVoOlds){
                  for(let index=0;index< obj.infoData.guaranteeSubInfoVos.length;index++){
                    if(oldguaranteeSub.serialNo==obj.infoData.guaranteeSubInfoVos[index].serialNo
                      &&obj.infoData.guaranteeSubInfoVos[index].flag!='D'&&obj.infoData.guaranteeSubInfoVos[index].flag!='I'){
                      for(let guaranteeSubkey in oldguaranteeSub ){
                        if(oldguaranteeSub[guaranteeSubkey]!=null&&guaranteeSubkey!='flag'){
                          if(oldguaranteeSub[guaranteeSubkey]!=obj.infoData.guaranteeSubInfoVos[index][guaranteeSubkey]){
                            obj.infoData.guaranteeSubInfoVos[index].flag='U'
                            if(endorseType.indexOf('08')<0){
                              endorseType+=`08,`
                            }
                            break;
                          }
                        }
                      }
                    }else if(oldguaranteeSub.serialNo==obj.infoData.guaranteeSubInfoVos[index].serialNo
                      &&(obj.infoData.guaranteeSubInfoVos[index].flag=='D'||obj.infoData.guaranteeSubInfoVos[index].flag=='I')){
                        if(endorseType.indexOf('08')<0){
                          endorseType+=`08,`
                        }
                    }      
                  }
              }
            }  
            //组织履约义务人信息
            let performanceObligorOld=originalPolicy.performanceObligorInfoVos 
            obj.infoData.performanceObligorInfoVos=JSON.parse(JSON.stringify(originalPolicy.performanceObligorInfoVos ))
            obj.infoData.performanceObligorInfoVos[0].obligorCode=this.$refs.MainPerformance.obligorCode
            obj.infoData.performanceObligorInfoVos[0].obligorName=this.$refs.MainPerformance.obligorName
            obj.infoData.performanceObligorInfoVos[0].obligorAddress=this.$refs.MainPerformance.obligorAddress
            obj.infoData.performanceObligorInfoVos[0].businessCode=this.$refs.MainPerformance.businessCode
            obj.infoData.performanceObligorInfoVos[0].limitAmount=this.$uiCommon.replaced(this.$refs.MainPerformance.limitAmount)
            for(let performanceKey in performanceObligorOld[0]){
                    if(performanceKey!='flag'&&performanceObligorOld[0][performanceKey]!=obj.infoData.performanceObligorInfoVos[0][performanceKey]){            
                        obj.infoData.performanceObligorInfoVos[0].flag='U'
                        break;
                    }
            
            }

            //组织 保额保费信息集合
            let feeInfoVos=originalPolicy.feeInfoVos
            obj.infoData.feeInfoVos=this.$refs.MainFee.getJsonFeeInfoVoList();
            for(let feeInfoVo of feeInfoVos){
              for(let index=0;index< obj.infoData.feeInfoVos.length;index++){
                if(feeInfoVo.currency==obj.infoData.feeInfoVos[index].currency
                  &&obj.infoData.feeInfoVos[index].flag!='D'&&obj.infoData.feeInfoVos[index].flag!='I'){
                  for(let feeInfokey in feeInfoVo ){
                    if(feeInfoVo[feeInfokey]!=null&&feeInfokey!='flag'&&feeInfoVo[feeInfokey]!=obj.infoData.feeInfoVos[index][feeInfokey]){
                        obj.infoData.feeInfoVos[index].flag='U'
                        break;
                    }
                  }
                }
              }
            }
            //组织缴费计划信息集合
            let planInfoVos=originalPolicy.planInfoVos
            obj.infoData.planInfoVos=this.$refs.MainPlan.getJsonPlanInfoVoList();
            for(let planInfoVo of planInfoVos){
              for(let index=0;index< obj.infoData.planInfoVos.length;index++){
                if(planInfoVo.serialNo==obj.infoData.planInfoVos[index].serialNo
                  &&obj.infoData.planInfoVos[index].flag!='D'&&obj.infoData.planInfoVos[index].flag!='I'){
                  for(let planInfokey in planInfoVo ){
                    if(planInfoVo[planInfokey]!=null&&planInfokey!='flag'){
                      if(planInfoVo[planInfokey]!=obj.infoData.planInfoVos[index][planInfokey]){
                        obj.infoData.planInfoVos[index].flag='U'
                        // if(endorseType.indexOf('25')<0){
                        //   endorseType+=`25,`
                        // }
                        break;
                      }
                    }
                  }
                }
                // else if(planInfoVo.serialNo==obj.infoData.planInfoVos[index].serialNo
                //   &&(obj.infoData.planInfoVos[index].flag=='D'||obj.infoData.planInfoVos[index].flag=='I')){
                //     if(endorseType.indexOf('25')<0){
                //       endorseType+=`25,`
                //     }
                // }
              }
            }
            //组织免赔约定和特别约定
            let engageInfoVos=originalPolicy.engageInfoVos
            obj.infoData.engageInfoVos=[]
            obj.infoData.engageInfoVos=JSON.parse(JSON.stringify(this.$refs.MainEngage.engageInfoVoList))
            obj.infoData.engageInfoVos.push(this.$refs.MainDeductible.engageInfoVo)
            for(let engageInfo of engageInfoVos){
              for(let index=0;index< obj.infoData.engageInfoVos.length;index++){
                if(engageInfo.clauseCode==obj.infoData.engageInfoVos[index].clauseCode
                  &&obj.infoData.engageInfoVos[index].flag!='D'&&obj.infoData.engageInfoVos[index].flag!='I'){
                  for(let engageInfokey in engageInfo ){
                    if(engageInfo[engageInfokey]!=null&&engageInfokey!='flag'){
                      if(engageInfo[engageInfokey]!=obj.infoData.engageInfoVos[index][engageInfokey]){
                        obj.infoData.engageInfoVos[index].flag='U'
                        if(endorseType.indexOf('17')<0){
                          endorseType+=`17,`
                        }
                        break;
                      }
                    }
                  }
                }else if(engageInfo.clauseCode==obj.infoData.engageInfoVos[index].clauseCode
                  &&(obj.infoData.engageInfoVos[index].flag=='D'||obj.infoData.engageInfoVos[index].flag=='I')){
                    if(endorseType.indexOf('17')<0){
                      endorseType+=`17,`
                    }
                }
              }
            }
            //组织中介业务信息集合
            let agentInfoVos=originalPolicy.agentInfoVos
            obj.infoData.agentInfoVos=this.$refs.MainExpernses.getJsonAgentInfoVoList()
            for(let agentInfoVo of agentInfoVos){
              for(let index=0;index< obj.infoData.agentInfoVos.length;index++){
                if(agentInfoVo.agentCode==obj.infoData.agentInfoVos[index].agentCode
                  &&obj.infoData.agentInfoVos[index].flag!='D'&&obj.infoData.agentInfoVos[index].flag!='I'){
                  for(let agentInfoVokey in agentInfoVo ){
                    if(agentInfoVo[agentInfoVokey]!=null&&agentInfoVokey!='flag'){
                      if(agentInfoVo[agentInfoVokey]!=obj.infoData.agentInfoVos[index][agentInfoVokey]){
                        obj.infoData.agentInfoVos[index].flag='U'
                        break;
                      }
                    }
                  }
                }
              }
            }
            //组织涉农信息集合
            
            obj.infoData.subSidyInfoVos=[]
            if(this.$store.state.agriType=='1'&&this.isAgriShow){
              let subSidyInfoVos=originalPolicy.subSidyInfoVos
              obj.infoData.subSidyInfoVoList=this.$refs.MainAgri.getJsonSubSidyInfoVoList()
              for(let subSidyInfo of subSidyInfoVos){
                for(let index=0;index< obj.infoData.subSidyInfoVos.length;index++){
                  if(subSidyInfo.serialNo==obj.infoData.subSidyInfoVos[index].serialNo
                    &&obj.infoData.subSidyInfoVos[index].flag!='D'&&obj.infoData.subSidyInfoVos[index].flag!='I'){
                    for(let subSidyInfokey in subSidyInfo ){
                      if(subSidyInfo[subSidyInfokey]!=null&&subSidyInfokey!='flag'){
                        if(subSidyInfo[subSidyInfokey]!=obj.infoData.subSidyInfoVos[index][subSidyInfokey]){
                          obj.infoData.subSidyInfoVos[index].flag='U'
                          break;
                        }
                      }
                    }
                  }
                }
              }

            }
            let coinsInfoVos=originalPolicy.coinsInfoVos
            //组织联共保信息集合
            obj.infoData.coinsInfoVos=[]
            obj.infoData.coinsDetailInfoVos=[]
            if(this.$store.state.coinsFlag!='0'&&this.isCoinsShow){
                  let coinsDetailInfoVos=originalPolicy.coinsDetailInfoVos
                  obj.infoData.coinsInfoVos=this.$refs.MainCoins.getJsonCoinsInfoVoList();
                  obj.infoData.coinsDetailInfoVos=this.$refs.MainCoins.getJsonCoinsDetailInfoVoList();
                  for(let coinsDetailInfo of coinsDetailInfoVos){
                    for(let index=0;index< obj.infoData.coinsDetailInfoVos.length;index++){
                      if(coinsDetailInfo.coinsCode==obj.infoData.coinsDetailInfoVos[index].coinsCode
                        &&obj.infoData.coinsDetailInfoVos[index].flag!='D'&&obj.infoData.coinsDetailInfoVos[index].flag!='I'){
                        for(let coinsDetailKey in coinsDetailInfo ){
                          if(coinsDetailInfo[coinsDetailKey]!=null&&coinsDetailKey!='flag'){
                            if(coinsDetailInfo[coinsDetailKey]!=obj.infoData.coinsDetailInfoVos[index][coinsDetailKey]){
                              obj.infoData.coinsDetailInfoVos[index].flag='U'
                              break;
                            }
                          }
                        }
                      }
                    }
                  }
                  
            }
            obj.infoData.reinsCededInfoVo={}
            obj.infoData.reinsBrokerInfoVos=[]
            let reinsCededInfoVo=originalPolicy.reinsCededInfoVo
            let reinsBrokerInfoVos=originalPolicy.reinsBrokerInfoVos
            if(this.$store.state.channelType1=='h'&&this.isReinsShow){
              //组织分入信息  
              obj.infoData.reinsCededInfoVo=this.$refs.MainReins.reinsCededInfoVo
              obj.infoData.reinsCededInfoVo.oriCurrencyRate=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.oriCurrencyRate)
              obj.infoData.reinsCededInfoVo.coSumClaim=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.coSumClaim)
              obj.infoData.reinsCededInfoVo.oriAmount=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.oriAmount)
              obj.infoData.reinsCededInfoVo.oriPremium=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.oriPremium)
              obj.infoData.reinsCededInfoVo.offeredLine=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.offeredLine)
              obj.infoData.reinsCededInfoVo.signedLine=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.signedLine)
              obj.infoData.reinsCededInfoVo.inAmount=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.inAmount)
              obj.infoData.reinsCededInfoVo.inPremium=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.inPremium)
              obj.infoData.reinsCededInfoVo.exchangeFlag=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.exchangeFlag)
              obj.infoData.reinsCededInfoVo.commSignedLine=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.commSignedLine)
              obj.infoData.reinsCededInfoVo.commOfferedLine=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.commOfferedLine)
              obj.infoData.reinsCededInfoVo.billsFeeRate=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.billsFeeRate)
              obj.infoData.reinsCededInfoVo.billsFee=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.billsFee)
              obj.infoData.reinsCededInfoVo.taxRate=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.taxRate)
              obj.infoData.reinsCededInfoVo.tax=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.tax)
              obj.infoData.reinsCededInfoVo.addedTaxRate=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.addedTaxRate)
              obj.infoData.reinsCededInfoVo.addedTaxFee=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.addedTaxFee)
              obj.infoData.reinsCededInfoVo.noHaveTaxFee=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.noHaveTaxFee)
              obj.infoData.reinsCededInfoVo.inDisPremium=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.inDisPremium)
              obj.infoData.reinsCededInfoVo.businessNature='h'
              for(let reinsCededKey in reinsCededInfoVo){
                if(reinsCededInfoVo[reinsCededKey]!=null&reinsCededKey!='flag'){
                  if(reinsCededInfoVo[reinsCededKey]!= obj.infoData.reinsCededInfoVo[reinsCededKey]){
                    obj.infoData.reinsCededInfoVo.flag="U"
                    break;
                  }
                }
              }
                //组织分入再保经纪人信息集合
              obj.infoData.reinsBrokerInfoVos=this.$refs.MainReins.getJsonReinsBrokerList()
              for(let reinsBroker of reinsBrokerInfoVos){
                for(let index=0;index< obj.infoData.reinsBrokerInfoVos.length;index++){
                  if(reinsBroker.brokerCode==obj.infoData.reinsBrokerInfoVos[index].brokerCode
                    &&obj.infoData.reinsBrokerInfoVos[index].flag!='D'&&obj.infoData.reinsBrokerInfoVos[index].flag!='I'){
                    for(let reinsBrokerKey in reinsBroker ){
                      if(reinsBroker[reinsBrokerKey]!=null&&reinsBrokerKey!='flag'){
                        if(reinsBroker[reinsBrokerKey]!=obj.infoData.reinsBrokerInfoVos[index][reinsBrokerKey]){
                          obj.infoData.reinsBrokerInfoVos[index].flag='U'
                          break;
                        }
                      }
                    }
                  }
                }
              }
              obj.infoData.coinsInfoVos= this.$refs.MainReins.coinsInfoVoList
              for(let coinsInfoVo of coinsInfoVos){
                for(let index=0;index< obj.infoData.coinsInfoVos.length;index++){
                  if(coinsInfoVo.coinsCode==obj.infoData.coinsInfoVos[index].coinsCode
                    &&obj.infoData.coinsInfoVos[index].flag!='D'&&obj.infoData.coinsInfoVos[index].flag!='I'){
                    for(let coinsInfokey in coinsInfoVo ){
                      if(coinsInfoVo[coinsInfokey]!=null&&coinsInfokey!='flag'){
                        if(coinsInfoVo[coinsInfokey]!=obj.infoData.coinsInfoVos[index][coinsInfokey]){
                          obj.infoData.coinsInfoVos[index].flag='U'
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
            obj.infoData.endorseInfo.endorseType=endorseType;
            obj.infoData.endorseInfo.policyNo=this.$store.state.policyNo;
            obj.infoData.endorseInfo.valiDate=this.$store.state.validDate;
            obj.infoData.endorseInfo.valiHour=this.$store.state.validHour;
            obj.infoData.endorseInfo.comCode=obj.infoData.mainInfoVo.comCode;
            obj.infoData.endorseInfo.jfeeFlag=this.$store.state.nonCarJfeeflag;
            obj.infoData.endorseInfo.endorDate=this.$uiCommon.getCurrentDate();
            console.log("-----------------生成的批单JSON对象begin-----------------")
            console.log(JSON.stringify(obj))
            console.log("-----------------生成的批单JSON对象end----------------")
            return obj
       }, 
    },
    // //eslint-disable-next-line no-unused-vars
    // beforeRouteLeave(to, from, next){
    //   from.meta.keepAlive = false
    //   next()
    // }
  }

  