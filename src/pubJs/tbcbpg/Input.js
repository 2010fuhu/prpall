import ProposalGenerateReq from '@/json/ProposalGenerateReq.json'
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
              this.fetchData()
            });
          },
        methods:{
          show(){this.isShow=!this.isShow;},
          //queryBizList(){ },
          loaded(){ 
            this.isloading=!this.isloading
            
          },//加载罩的功能
          coinsReinsAgriShow(e){
              if(this.$store.state.refreshFlagFee=='0'){
                this.$alert('请先点击币别确定计算保费!!!','',{type:'warning'})
                return false;
              }
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
                    initBaseData.getSelsetData(this.$store.state.riskCode,this.$store.state.comCode, 
                      this.$store.state.userCode).then(res => {
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
                      this.$store.state.bizType='PROPOSAL'
                      //this.$refs.MainTail.arbitraryBoardList=data.arbitraryBoardList//仲裁方式
                      if(this.$store.state.certiType=='U'||this.$store.state.bizType=='ENDORSE'){
                          this.binNo=this.$route.query.businessNo
                          this.copybinNoData()
                      }else{
                          this.loaded();
                      }
                }).catch((err)=>{
                    new Error(err);
                })
          },
          async submitForm1(){
            let flag= await this.checkProposalData()
            //let flag=true
            if(flag){
                    let jsonObj= this.generateProposalJson()
                    this.saveProposalorEndorse(jsonObj).then((proposalNo)=>{
                    this.$router.push({path: '/Save',query: { proposalNo: proposalNo } })
                }).catch((message)=>{
                    this.$alert(message,'保存',{type:'warning'})
                    return false 
                })
            }else{
               return false
            }
              
          },
          cancelForm(){
             this.$router.replace({path:'/endorse'})
          },
          nextform(){
            this.$router.push({ path: '/endorseText'})
          },
          changeBizNoTitle(){  //选择是新保还是复制 还是续保等JS方法
            this.$store.state.editType=this.editType 
          },
          reLoadForm(){
            if(this.binNo.trim()==''){
              this.$alert('投保单/保单不能为空！','',{ type:'warning'})
              return false;
            }
            this.loaded();
            this.copybinNoData()
          },
          async copybinNoData(){
              let orderData= await this.callDataByBinNo()
              if(orderData instanceof Object){
                 if(this.$route.path=='/reinsMain'&&orderData.mainInfoVo.channelType1!='h'){
                     this.$alert('非分入业务投保单或保单数据,请到投保管理投保单录入操作!!!','',{type:'warning'})
                     return false;
                 }else if(this.$route.path=='/Main'&&orderData.mainInfoVo.channelType1=='h'){
                     this.$alert('分入业务投保单或保单,请到分入投保管理操作!!!','',{type:'warning'})
                     return false;
                 }
              }
              //初始化页面得数据
              this.$store.state.refreshFlagFee='1'  //刷新币别标志
              await  this.$refs.MainHead.initMainHeadData(orderData)
              if(this.$store.state.certiType=='U'&&(this.$store.state.channelType1=='92'||this.$store.state.channelType1=='93')){
                this.$store.state.refreshFlagAgent='1';//代理标志刷新成1
              }
              if(this.$store.state.agriType=='1'){
                this.$store.state.refreshFlagAgri='1'//刷新涉农标志成1
                this.isAgriShow=true;
              }
              if(this.$store.state.coinsFlag!='0'){
                this.$store.state.refreshFlagCoins='1';//刷新联共保标志成1
                this.isCoinsShow=true;
              }
              if(this.$store.state.channelType1=='h'){
                this.$store.state.refreshFlagReins='1'//刷新分入业务标志成1
                this.isReinsShow=true;
              }
              await  this.$refs.AppliInsured.initAppliInsuredData(orderData)
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
              if(orderData.mainInfoVo.argueSolution=='2'){
                 this.argueShow=true
              }
              if(this.$store.state.agriType=='1'){
                this.$store.state.refreshFlagFee='0'           //刷新币别标志
                this.$refs.MainAgri.initMainAgriData(orderData)
              }
              if(this.$store.state.coinsFlag!='0'){
                this.$refs.MainCoins.initMainCoinsData(orderData)
              }
              if(this.$store.state.channelType1=='h'){
               
                this.$refs.MainReins.initMainReinsData(orderData)
              }
              this.loaded();
              //this.$store.state.initStatus=1
          },
          callDataByBinNo(){//查询获取投保单或者保单明细方法
            let data=''
            return  new Promise((resolve,reject)=>{
              if(this.editType=='COPY_PROPOSAL'||this.$store.state.certiType=='U'){
                Order.findProposalInfo(this.binNo).then(res => {
                  data=res.data;
                  if(res.status==200){
                      if(data.code=='9999'){
                        reject(data.msg)
                      }else{
                        resolve(data)
                      }
                  }else{
                      reject("调用投保单号查询报错")
                  }
                })
              }else {
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
              }    
            }).catch((message)=>{
              this.$router.push( {path: '/UnderwriteSubmit',query: {status:'failure',message }})
            })
          },
          //投保单保存 校验页面数据
          async checkProposalData(){
              let flag=true 
              await  this.$refs.MainHead.checkMainHead().then((msg)=>{flag=msg})
              if(!flag){return false}
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
                  saveOrder.proposalGenerate(jsonObj).then((res)=>{
                      if(res.data.resHeader.errCode=='000000'){
                        resolve(res.data.proposalGenerateMainInfoRes.proposalNo)
                      }else if(res.data.resHeader.errCode=='999999'){
                        reject(res.data.resHeader.errMsg)
                      }
                  })

              })
           },
           //保存组织JSON数据对象
           generateProposalJson(){
              let obj= ProposalGenerateReq
              //1.组织ReqHeader对象信息
              obj.reqHeader.transNo=this.$uiCommon.uuid(16, 32)
              obj.reqHeader.transDate=this.$uiCommon.getCurrentDate()
              //2.组织ProposalGenerateMainInfoReq对象信息
              obj= this.GenerateMainInfoReq(obj)
              return obj;
           },
           GenerateMainInfoReq(obj){
              //1先组织MainInfoVo对象
            obj.proposalGenerateMainInfoReq.mainInfoVo.certiType=this.$store.state.certiType
            obj.proposalGenerateMainInfoReq.mainInfoVo.bizType="PROPOSA"
            obj.proposalGenerateMainInfoReq.mainInfoVo.editType=this.editType
            obj.proposalGenerateMainInfoReq.mainInfoVo.riskCode=this.$store.state.riskCode
            obj.proposalGenerateMainInfoReq.mainInfoVo.policyType='02'
            obj.proposalGenerateMainInfoReq.mainInfoVo.policySort=this.$refs.MainHead.policySort
            obj.proposalGenerateMainInfoReq.mainInfoVo.language=this.$refs.MainHead.language
            if(this.$store.state.certiType=="U"&&typeof(this.$route.query.businessNo)!='undefined'){
               obj.proposalGenerateMainInfoReq.mainInfoVo.proposalNo=this.$route.query.businessNo
            }
            if(this.editType=="RENEWAL"){
              obj.proposalGenerateMainInfoReq.mainInfoVo.oldPolicyNo=this.binNo
            }
            obj.proposalGenerateMainInfoReq.mainInfoVo.businessKind=this.$refs.MainHead.businesskind
            obj.proposalGenerateMainInfoReq.mainInfoVo.coinsFlag=this.$store.state.coinsFlag
            obj.proposalGenerateMainInfoReq.mainInfoVo.agriType=this.$store.state.agriType
            obj.proposalGenerateMainInfoReq.mainInfoVo.shareHolderFlag=this.$refs.MainHead.shareHolderFlag
            obj.proposalGenerateMainInfoReq.mainInfoVo.businessModeCode=this.$refs.MainHead.businessModeCode
            obj.proposalGenerateMainInfoReq.mainInfoVo.channelType1=this.$refs.MainHead.channelType1
            obj.proposalGenerateMainInfoReq.mainInfoVo.channelType2=this.$refs.MainHead.channelType2
            obj.proposalGenerateMainInfoReq.mainInfoVo.channelType3=this.$refs.MainHead.channelType3
            obj.proposalGenerateMainInfoReq.mainInfoVo.agentCode=this.$refs.MainHead.agentCode
            obj.proposalGenerateMainInfoReq.mainInfoVo.agreementNo=this.$refs.MainHead.agreementNo
            if(this.$store.state.comCode.substring(0,2)=='31'){
              obj.proposalGenerateMainInfoReq.mainInfoVo.roadBranchCode=this.$refs.MainHead.roadBranchCode
            }
            obj.proposalGenerateMainInfoReq.mainInfoVo.disRate=this.$uiCommon.replaced(this.$refs.MainExpernses.commissionRate)
            obj.proposalGenerateMainInfoReq.mainInfoVo.currency=this.$store.state.currency2Fee
            obj.proposalGenerateMainInfoReq.mainInfoVo.sumAmount=this.$uiCommon.replaced(this.$store.state.sumAmount2)
            obj.proposalGenerateMainInfoReq.mainInfoVo.sumPremium=this.$uiCommon.replaced(this.$store.state.sumPremium2)
            obj.proposalGenerateMainInfoReq.mainInfoVo.flag=""
            let strOthFlag = "000000YY000000000000";
            //let strMainPolicyNo=""//预约保单号
            //obj.proposalGenerateMainInfoReq.mainInfoVo.othFlag=""、
            //let strReinsBill =obj.proposalGenerateMainInfoReq.mainInfoVo.reinsBill// 账单标识
            obj.proposalGenerateMainInfoReq.mainInfoVo.othFlag=strOthFlag//标识 投保单 保单的标志位
            obj.proposalGenerateMainInfoReq.mainInfoVo.makeCom=this.$store.state.comCode
            obj.proposalGenerateMainInfoReq.mainInfoVo.comCode=this.$refs.MainHead.comCode
            obj.proposalGenerateMainInfoReq.mainInfoVo.handlerCode=this.$refs.MainHead.handlerCode
            obj.proposalGenerateMainInfoReq.mainInfoVo.handlerName=this.$refs.MainHead.handlerName
            obj.proposalGenerateMainInfoReq.mainInfoVo.operateDate=this.$refs.MainPeriod.operateDate
            obj.proposalGenerateMainInfoReq.mainInfoVo.signDate=this.$refs.MainPeriod.signDate
            obj.proposalGenerateMainInfoReq.mainInfoVo.inputDate=this.$refs.MainPeriod.signDate
            obj.proposalGenerateMainInfoReq.mainInfoVo.startDate=this.$store.state.startDate
            obj.proposalGenerateMainInfoReq.mainInfoVo.startHour=this.$store.state.startHour
            obj.proposalGenerateMainInfoReq.mainInfoVo.endDate=this.$store.state.endDate
            obj.proposalGenerateMainInfoReq.mainInfoVo.endHour=this.$store.state.endHour
            obj.proposalGenerateMainInfoReq.mainInfoVo.operatorCode=this.$store.state.userCode
            //obj.proposalGenerateMainInfoReq.mainInfoVo.inputDate=""
            //obj.proposalGenerateMainInfoReq.mainInfoVo.inputHour=""
            //obj.proposalGenerateMainInfoReq.mainInfoVo.updateCode=""
            //obj.proposalGenerateMainInfoReq.mainInfoVo.updateDate=""
            //obj.proposalGenerateMainInfoReq.mainInfoVo.updateHour=""
            obj.proposalGenerateMainInfoReq.mainInfoVo.isNeedEpolicy="0"
            obj.proposalGenerateMainInfoReq.mainInfoVo.invoiceMan=this.$refs.AppliInsured.invoiceMan==''?this.$refs.AppliInsured.customerCName:this.$refs.AppliInsured.invoiceMan
            //obj.proposalGenerateMainInfoReq.mainInfoVo.invoiceNumber=""
            obj.proposalGenerateMainInfoReq.mainInfoVo.payMode=this.$refs.MainPlan.PayType;
            obj.proposalGenerateMainInfoReq.mainInfoVo.payTimes=this.$refs.MainPlan.payTimes;
            obj.proposalGenerateMainInfoReq.mainInfoVo.jfeeFlag=this.$store.state.nonCarJfeeflag
            obj.proposalGenerateMainInfoReq.mainInfoVo.judicalScope=this.$refs.MainTail.judicalScope
            obj.proposalGenerateMainInfoReq.mainInfoVo.argueSolution=this.$refs.MainTail.argueSolution
            obj.proposalGenerateMainInfoReq.mainInfoVo.arbitBoardName=this.$refs.MainTail.arbitBoardName
            obj.proposalGenerateMainInfoReq.mainInfoVo.remark=this.$refs.MainTail.remark
            //组织itemkindinfo
            obj.proposalGenerateMainInfoReq.itemKindInfoVoList=[];
            for(let item of this.$refs.MainItemkind.itemKindInfoVoList){
               let obj1={
                 serialNo:item.serialNo,
                 mainsubFlag:'1',
                 calculateFlag:item.calculateFlag,
                 flag:item.flag,
                 kindCode:item.kindCode,
                 kindName:item.kindName,
                 currency:item.currency,
                 shortRateFlag:item.shortRateFlag,
                 shortRate:this.$uiCommon.replaced(item.shortRate),
                 amount:this.$uiCommon.replaced(item.amount),
                 rate:this.$uiCommon.replaced(item.rate),
                 premium:this.$uiCommon.replaced(item.premium)
               }
               obj.proposalGenerateMainInfoReq.itemKindInfoVoList.push(obj1)
            }
            //组织经办人信息集合
            obj.proposalGenerateMainInfoReq.handlerInfoVoList=[];
            for(let handler of this.$refs.MainHead.handlerInfoVo){
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
               for(let departmentInfo of this.$refs.MainHead.departmentInfoVoList){
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
               if(this.$store.state.comCode.substring(0,2)=='41' &&
                 this.$refs.MainExpernses.AllPerformance_Data.length>0 &&
                 this.$store.state.refreshFlagPerformance=='1'){
                  for(let  Performance of this.$refs.MainExpernses.AllPerformance_Data){
                    if(obj2.handlerCode==Performance.EveryUserCode){
                        obj2.performanceRate = Performance.PerformancePercent
                        obj2.performanceAmount=Performance.PerformanceFee
                        obj2.currency=Performance.PerformanceCurrency
                        break;
                    }
                  }
               }
              obj.proposalGenerateMainInfoReq.handlerInfoVoList.push(obj2)
            }
            //组织投保人信息模块
            obj.proposalGenerateMainInfoReq.appliInfoVo=this.$refs.AppliInsured.appliInfoVo
            if(this.$refs.AppliInsured.appliInfoVo.capitalauThority!=""){
              obj.proposalGenerateMainInfoReq.appliInfoVo.capitalauThority=this.$uiCommon.replaced(this.$refs.AppliInsured.appliInfoVo.capitalauThority)
            }
            if(this.$refs.AppliInsured.appliInfoVo.doBesinessIncome!=""){
              obj.proposalGenerateMainInfoReq.appliInfoVo.doBesinessIncome=this.$uiCommon.replaced(this.$refs.AppliInsured.appliInfoVo.doBesinessIncome)
            }
            //组织被保人信息模块 insuredInfoList、
            obj.proposalGenerateMainInfoReq.insuredInfoVoList=JSON.parse(JSON.stringify(this.$refs.Insured.insuredInfoList))
            //组织建设工程信息模块
            obj.proposalGenerateMainInfoReq.constructInfoVo=this.$refs.MainConstruct.constructInfoVo
            //组织反担保信息
            obj.proposalGenerateMainInfoReq.guaranteeInfoVo=this.$refs.MainLoan.guaranteeInfoVo
            //组织反担保子信息
            obj.proposalGenerateMainInfoReq.guaranteeSubInfoVoList=JSON.parse(JSON.stringify(this.$refs.MainLoan.guaranteeSubInfoVoList))
            //组织履约义务人信息
            obj.proposalGenerateMainInfoReq.performanceObligorInfoVoList=[]
            obj.proposalGenerateMainInfoReq.performanceObligorInfoVoList.push({
                serialNo:'1',
                obligorCode:this.$refs.MainPerformance.obligorCode,
                obligorName:this.$refs.MainPerformance.obligorName,
                obligorAddress:this.$refs.MainPerformance.obligorAddress,
                businessCode:this.$refs.MainPerformance.businessCode,
                limitAmount:this.$uiCommon.replaced(this.$refs.MainPerformance.limitAmount),
                flag:''
            })
            //组织 保额保费信息集合
            obj.proposalGenerateMainInfoReq.feeInfoVoList=this.$refs.MainFee.getJsonFeeInfoVoList();
            //组织缴费计划信息集合
            obj.proposalGenerateMainInfoReq.planInfoVoList=this.$refs.MainPlan.getJsonPlanInfoVoList();
            //组织免赔约定和特别约定
            
            obj.proposalGenerateMainInfoReq.engageInfoVoList=[]
            obj.proposalGenerateMainInfoReq.engageInfoVoList=JSON.parse(JSON.stringify(this.$refs.MainEngage.engageInfoVoList))
            obj.proposalGenerateMainInfoReq.engageInfoVoList.push(this.$refs.MainDeductible.engageInfoVo)
            //组织中介业务信息集合
            obj.proposalGenerateMainInfoReq.agentInfoVoList=this.$refs.MainExpernses.getJsonAgentInfoVoList()
            //组织涉农信息集合
            obj.proposalGenerateMainInfoReq.subSidyInfoVoList=[]
            if(this.$store.state.agriType=='1'&&this.isAgriShow){
              obj.proposalGenerateMainInfoReq.subSidyInfoVoList=this.$refs.MainAgri.getJsonSubSidyInfoVoList()
            }
            //组织联共保信息集合
            obj.proposalGenerateMainInfoReq.coinsInfoVoList=[]
            obj.proposalGenerateMainInfoReq.coinsDetailInfoVoList=[]
            if(this.$store.state.coinsFlag!='0'&&this.isCoinsShow){
                  obj.proposalGenerateMainInfoReq.coinsInfoVoList=this.$refs.MainCoins.getJsonCoinsInfoVoList();
                  obj.proposalGenerateMainInfoReq.coinsDetailInfoVoList=this.$refs.MainCoins.getJsonCoinsDetailInfoVoList();
            }
            obj.proposalGenerateMainInfoReq.reinsCededInfoVo={}
            obj.proposalGenerateMainInfoReq.reinsBrokerInfoVoList=[]
            if(this.$store.state.channelType1=='h'&&this.isReinsShow){
              //组织分入信息  
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo=this.$refs.MainReins.reinsCededInfoVo
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.oriCurrencyRate=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.oriCurrencyRate)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.coSumClaim=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.coSumClaim)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.oriAmount=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.oriAmount)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.oriPremium=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.oriPremium)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.offeredLine=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.offeredLine)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.signedLine=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.signedLine)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.inAmount=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.inAmount)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.inPremium=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.inPremium)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.exchangeFlag=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.exchangeFlag)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.commSignedLine=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.commSignedLine)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.commOfferedLine=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.commOfferedLine)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.billsFeeRate=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.billsFeeRate)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.billsFee=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.billsFee)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.taxRate=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.taxRate)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.tax=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.tax)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.addedTaxRate=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.addedTaxRate)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.addedTaxFee=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.addedTaxFee)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.noHaveTaxFee=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.noHaveTaxFee)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.inDisPremium=this.$uiCommon.replaced(this.$refs.MainReins.reinsCededInfoVo.inDisPremium)
              obj.proposalGenerateMainInfoReq.reinsCededInfoVo.businessNature='h'
                //组织分入再保经纪人信息集合
              obj.proposalGenerateMainInfoReq.reinsBrokerInfoVoList=this.$refs.MainReins.getJsonReinsBrokerList()
              obj.proposalGenerateMainInfoReq.coinsInfoVoList= this.$refs.MainReins.coinsInfoVoList
            }
            console.log("-----------------生成的投保单JSON对象-----------------")
            console.log(obj)
            console.log("-----------------生成的投保单JSON对象----------------")
            return obj
       },
           
        }     
  }

  