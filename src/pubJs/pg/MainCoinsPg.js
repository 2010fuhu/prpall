import coinsJs from '@/api/getselectcoinscodeinfo.js'
import CalJSON from '@/json/coinsCommissionCal.json'
import obj from '@/json/ProposalGenerateReq.json'
import {EventBus}from '@/utils/event-bus.js'
import agencyfee from   '@/api/agencyfee.js'  
export default{
  data(){
     return{
      coinsInfoVoList:[],
      coinsSelectList:[],
      coinsDetailInfoVoList:[],
      //CoinsData:[{}],
      //CoinsDetailData:[{}],
      //CoinssumData:[],
      coinsFlag:"",
      reshFlagDetail:'0',
      CoinssumShow:false,
      CoinsDetailShow:false,
      CoinsAmountsum:'',
      CoinsPremiumsum:'',
      AgentFeesum:'',
      MiddleCostFeesum:'',
      OperateFeesum:'',
      proportionFlag1:'0',// 手续计入方式
      billType:'0',//发票计入方式
      billTypeDisabled:false,
      chgCoinsAmountSum:0.00,
      chgCoinsPremiumSum:0.00,
      chgAgentFeeSum:0.00,
      chgMiddleCostFeeSum:0.00,
      chgOperateFeeSum:0.00,
      originalAmount:0.00,//原始的保额//原始的保额
      originalPremium:0.00,//原始的保费
      originalAgentFee:0.00,//原始的手续费
      originalOperateFee:0.00,//原始的出单费
      originalMiddleCostFee:0.00,
      }
  },
    props:{
    //   接受父组件传的值
      isCoinschildShow:{
          type:Boolean
      }
  },
  created(){
      //1 需要拿到是否是新编 如果是新录入投保单的话 默认给一条数据
      this.initCoinsdata()
      this.initMainCoinsData()
  },
  watch:{
      coinsInfoVoList:{
          handler(){
              for(let index in this.coinsInfoVoList){
                this.coinsInfoVoList[index].serialNo=parseInt(index)+1;
               }
             }
      },
      

   
  },
  methods:{
      async initCoinsdata(){
              this.coinsFlag=this.$store.state.coinsFlag
              await  this.asynConinsSelect();
              if(this.coinsFlag=='1'||this.coinsFlag=='3'){
                this.billTypeDisabled=false;
              }else if(this.coinsFlag=='2'||this.coinsFlag=='4'){
                  this.billTypeDisabled=true;
                }
      },
      initMainCoinsData(){
        this.coinsInfoVoList=obj.proposalGenerateMainInfoReq.coinsInfoVoList
        this.coinsDetailInfoVoList= obj.proposalGenerateMainInfoReq.coinsDetailInfoVoList
        this.CoinsDetailShow=true;
        this.CoinssumShow=true;
        let currency=this.coinsInfoVoList[0].currency
        this.billType= this.coinsInfoVoList[0].billType
        this.proportionFlag1=this.coinsInfoVoList[0].proportionFlag.substring(0,1)
        let CurrencyName="";
        if(currency=="CNY"){
         CurrencyName="人民币";
        }else if(currency=="USD"){
          CurrencyName="美元";
        }else if(currency=="HKD"){
          CurrencyName="港币";
        }else if(currency=="AUD"){
          CurrencyName="澳大利亚元";
        }
        this.CurrencyName=CurrencyName;
        //计算合计
        let CoinsAmountsum=0
        let CoinsPremiumsum=0
        let AgentFeesum=0
        let MiddleCostFeesum=0
        let OperateFeesum=0
        for(let item of this.coinsDetailInfoVoList){
              CoinsAmountsum=CoinsAmountsum+parseFloat(item.coinsAmount)
              CoinsPremiumsum=CoinsPremiumsum+parseFloat(item.coinsPremium)
              AgentFeesum=AgentFeesum+parseFloat(item.agentFee)
              OperateFeesum=OperateFeesum+parseFloat(item.operateFee)
              MiddleCostFeesum=MiddleCostFeesum+parseFloat(item.middleCostFee)
        } 
        this.CoinsAmountsum=CoinsAmountsum
        this.CoinsPremiumsum=CoinsPremiumsum
        this.AgentFeesum=AgentFeesum
        this.OperateFeesum=OperateFeesum
        this.MiddleCostFeesum=MiddleCostFeesum
        this.originalAmount=CoinsAmountsum
        this.originalPremium=CoinsPremiumsum
        this.originalAgentFee=AgentFeesum
        this.originalOperateFee=OperateFeesum
        this.originalMiddleCostFee=MiddleCostFeesum
        this.$nextTick(()=>{
          this.$uiCommon.setContainerReadonly(this.$refs.coinsData,true)
          this.$uiCommon.setContainerReadonly(this.$refs.coinsMiddle,true)
          this.$uiCommon.setTitle(this.$refs.coinsDetail)
        })
        this.reshFlagDetail = "0";
    },
      asynConinsSelect(){
            return  new Promise((resolve,reject)=>{
                  let  codeType="";
                  if(this.coinsFlag=='3'||this.coinsFlag=='4'){ 
                      codeType='ComCode'
                  }else if(this.coinsFlag=='1'||this.coinsFlag=='2'){
                      codeType='ReinsCode'
                  }     
                  coinsJs.getselectcoinscodeinfo(codeType).then(res=>{
                  let data=res.data.data;
                  if(res.status==200){
                    resolve(data)
                  }else{
                    reject(res.data.msg)
                  }
                })
                }).then((val)=>{
                    this.coinsSelectList=val
            })
            
      },
      changeCoinsType(){},
      checkCoinsRate(){},
      changeAmount(){},   
        //只有点击计算了才将此标志置为1      
      setRefreshFlagDetailZero() {},
       //计算联共保明细保费 出单费 手续费的方法
      async  generateCoinsDetail(){
           //1 计算联共保手续费
           let result='';
           if(this.$store.state.channelType1=='92'||this.$store.state.channelType1=='93'){
                if(this.$store.state.refreshFlagAgent=='0'){
                  this.$alert('请先重新获取手续费!!!','联共保信息',{type:'warning'})
                   return false;
                }
                result= await this.coinsCommissionCal();
                if(result.coinsInfoResList){
                  for(let index=0; index<this.coinsDetailInfoVoList.length;index++){
                        for(let res of result.coinsInfoResList){
                              if(res.coinsCode==this.coinsDetailInfoVoList[index].coinsCode){
                                      this.coinsDetailInfoVoList[index].agentFee=res.coinsFee
                                      if(parseFloat(this.coinsDetailInfoVoList[index].agentFee).toFixed(2)!=parseFloat(this.$refs.agentFee[index].title).toFixed(2)){
                                          this.$refs.agentFee[index].className='commonu'
                                          this.$refs.chgAgentFee[index].value=(parseFloat(this.coinsDetailInfoVoList[index].agentFee)-parseFloat(this.$refs.agentFee[index].title)).toFixed(2)
                                      }else{
                                          this.$refs.agentFee[index].className='readonly3'
                                      }
                              }
                        }
                  }
              }
           } 
           //拿到总保额 和总保费
            let sumAmount=this.$store.state.refreshFlag=='1'?  this.$store.state.sumAmount1:this.CoinsAmountsum
            let sumPremium=this.$store.state.refreshFlag=='1'? this.$store.state.sumPremium1:this.CoinsPremiumsum
          //2 循环遍历为coinsDetailInfoVoList 明细赋值 
            let count =this.coinsDetailInfoVoList.length
            for (let i=0;i<count;i++){
                if(this.coinsFlag=='2'||this.coinsFlag=='4'){
                    if(this.coinsInfoVoList[i].coinsType=='1'){
                      this.coinsDetailInfoVoList[i].coinsAmount=sumAmount;
                      this.coinsDetailInfoVoList[i].coinsPremium=sumPremium;
                    }else{
                      this.coinsDetailInfoVoList[i].coinsAmount=(parseFloat(sumAmount)/parseFloat(this.coinsInfoVoList[0].coinsRate)*parseFloat(this.coinsInfoVoList[i].coinsRate)).toFixed(2);
                      this.coinsDetailInfoVoList[i].coinsPremium=(parseFloat(sumPremium)/parseFloat(this.coinsInfoVoList[0].coinsRate)*parseFloat(this.coinsInfoVoList[i].coinsRate)).toFixed(2);
                    }
                 //2.2判断主共与主联的情况   先计算我方的保额 保费
                }else if(this.coinsFlag=='1'||this.coinsFlag=='3'){
                    this.coinsDetailInfoVoList[i].coinsAmount=(parseFloat(sumAmount)*parseFloat(this.coinsInfoVoList[i].coinsRate)/100).toFixed(2);
                    this.coinsDetailInfoVoList[i].coinsPremium=(parseFloat(sumPremium)*parseFloat(this.coinsInfoVoList[i].coinsRate)/100).toFixed(2);
                }
                if(parseFloat(this.coinsDetailInfoVoList[i].coinsAmount).toFixed(2)!=parseFloat(this.$refs.coinsAmount[i].title).toFixed(2)){
                  this.$refs.coinsAmount[i].className='commonu'
                  this.$refs.chgCoinsAmount[i].value=(parseFloat(this.coinsDetailInfoVoList[i].coinsAmount)-parseFloat(this.$refs.coinsAmount[i].title)).toFixed(2)
                }else{
                  this.$refs.coinsAmount[i].className='common3'
                }
                if(parseFloat(this.coinsDetailInfoVoList[i].coinsPremium).toFixed(2)!=parseFloat(this.$refs.coinsPremium[i].title).toFixed(2)){
                  this.$refs.coinsPremium[i].className='commonu'
                  this.$refs.chgCoinsPremium[i].value=(parseFloat(this.coinsDetailInfoVoList[i].coinsPremium)-parseFloat(this.$refs.coinsPremium[i].title)).toFixed(2)

                }else{
                  this.$refs.coinsPremium[i].className='common3'
                }
            }
           
            //3 计算合计
             let CoinsAmountsum=0
             let CoinsPremiumsum=0
             let AgentFeesum=0
             let MiddleCostFeesum=0
             let OperateFeesum=0
             for(let item of this.coinsDetailInfoVoList){
                   CoinsAmountsum=parseFloat(CoinsAmountsum)+parseFloat(item.coinsAmount)
                   CoinsPremiumsum=parseFloat(CoinsPremiumsum)+parseFloat(item.coinsPremium)
                   AgentFeesum=parseFloat(AgentFeesum)+parseFloat(item.agentFee)
                   OperateFeesum=parseFloat(OperateFeesum)+parseFloat(item.operateFee)
                   MiddleCostFeesum=parseFloat(MiddleCostFeesum)+parseFloat(item.middleCostFee)
             } 
             this.CoinsAmountsum=CoinsAmountsum
             this.CoinsPremiumsum=CoinsPremiumsum
             this.AgentFeesum=AgentFeesum
             this.OperateFeesum=OperateFeesum
             this.MiddleCostFeesum=MiddleCostFeesum
             //4计算尾插 
             if(this.coinsFlag=='1'||this.coinsFlag=='3'){
               if((parseFloat(this.CoinsAmountsum)-parseFloat(sumAmount))!=0){
                       let chgAmount =(parseFloat(this.CoinsAmountsum)-parseFloat(sumAmount)).toFixed(2)
                       if(chgAmount>0){
                          this.coinsDetailInfoVoList[0].coinsAmount=(parseFloat(this.coinsDetailInfoVoList[0].coinsAmount)-parseFloat(chgAmount)).toFixed(2)
                        }else{
                          this.coinsDetailInfoVoList[0].coinsAmount=(parseFloat(this.coinsDetailInfoVoList[0].coinsAmount)+parseFloat(chgAmount)).toFixed(2)
                       }
               }
               if((parseFloat(this.CoinsPremiumsum)-parseFloat(sumPremium))!=0){
                    let chgPremium =(parseFloat(this.CoinsPremiumsum)-parseFloat(sumPremium)).toFixed(2)
                    if(chgPremium>0){
                         this.coinsDetailInfoVoList[0].coinsPremium=(parseFloat(this.coinsDetailInfoVoList[0].coinsPremium)-parseFloat(chgPremium)).toFixed(2)
                        }else{
                          this.coinsDetailInfoVoList[0].coinsPremium=(parseFloat(this.coinsDetailInfoVoList[0].coinsPremium)+parseFloat(chgPremium)).toFixed(2)
                       }
               }
               if(parseFloat(this.coinsDetailInfoVoList[0].coinsAmount).toFixed(2)-parseFloat(this.$refs.coinsAmount[0].title).toFixed(2)!=0){
                    this.$refs.chgCoinsAmount[0].value=(parseFloat(this.coinsDetailInfoVoList[0].coinsAmount)-parseFloat(this.$refs.coinsAmount[0].title)).toFixed(2)    
                }
                if(parseFloat(this.coinsDetailInfoVoList[0].coinsPremium).toFixed-parseFloat(this.$refs.coinsPremium[0].title).toFixed(2)!=0){
                   this.$refs.chgCoinsPremium[0].value=(parseFloat(this.coinsDetailInfoVoList[0].coinsPremium)-parseFloat(this.$refs.coinsPremium[0].title)).toFixed(2)   
                }
             }            
              //5计算 联共保  保额 保费，手续费 出单费，出单因子 合计的变化量
              this.chgCoinsAmountSum= (parseFloat(this.CoinsAmountsum)- parseFloat(this.originalAmount)).toFixed(2)
              this.chgCoinsPremiumSum=(parseFloat(this.CoinsPremiumsum)- parseFloat(this.originalPremium)).toFixed(2)
              this.chgAgentFeeSum=(parseFloat(this.AgentFeesum)- parseFloat(this.originalAgentFee)).toFixed(2)
              this.chgMiddleCostFeeSum=(parseFloat(this.MiddleCostFeesum)- parseFloat(this.originalMiddleCostFee)).toFixed(2)
              this.chgOperateFeeSum=(parseFloat(this.OperateFeesum)- parseFloat(this.originalOperateFee)).toFixed(2)
              // 6刷新明细得标志
              this.reshFlagDetail = "1";
             
       },
        coinsCommissionCal(){
              let json=CalJSON;
              //1 agencyFeeMainInfoReq 请求对象
              EventBus.$on('AgentInfo',(msg)=>{
                      json.agencyFeeMainInfoReq.agreementNo=msg[0].agreementNo
                      json.agencyFeeMainInfoReq.disPayFeeWay=msg[0].disPayFeeWay
                      json.agencyFeeMainInfoReq.transId=msg[0].transId
              })
              EventBus.$on('AgentInfoRate',(MSGRATE)=>{
                json.agencyFeeMainInfoReq.agentRate=MSGRATE;
              })
              json.agencyFeeMainInfoReq.currency=this.$store.state.currency1Fee;
              json.agencyFeeMainInfoReq.businessType='CE';
              json.agencyFeeMainInfoReq.comCode=this.$store.state.comCode;
              json.agencyFeeMainInfoReq.endDate= this.$store.state.endDate;
              json.agencyFeeMainInfoReq.endorType=this.$store.state.endorType;
              json.agencyFeeMainInfoReq.isRation='0';
              json.agencyFeeMainInfoReq.isCoreCargo='0';
              json.agencyFeeMainInfoReq.minPremium=''
              
              let reqInfoList =[]; 
              for(let item of this.coinsInfoVoList){
                  reqInfoList.push({coinsCode:item.coinsCode,coinsFlag:this.coinsFlag,
                  flag:item.coinsType,coinsRate:item.coinsRate })
              }
              console.log("-------------------------------------------")
              console.log(reqInfoList)
              console.log("-------------------------------------------")
              json.agencyFeeMainInfoReq.coinsReqInfoList=reqInfoList;
              json.agencyFeeMainInfoReq.riskCode=this.$store.state.riskCode
              json.agencyFeeMainInfoReq.startDate=this.$store.state.startDate
              //2 组织reqHeader对象
              console.log(json.reqHeader)
              json.reqHeader.channelCode='0'
              json.reqHeader.sign='1'
              //json.reqHeader.sysPassWord='7777'
              json.reqHeader.sysUserCode=this.$store.state.userCode
              json.reqHeader.transDate=this.$store.state.startDate
              json.reqHeader.transTime=''
             // json=JSON.stringify(json)
              return 	  new Promise((resolve,reject)=>{   
                   agencyfee.getagencyfee(json).then((res)=>{
                      if(res.status=='200'){
                         resolve(res.data.agencyFeeMainInfoRes)

                      }else{
                        reject("调用联共保手续费出错了")
                      }
                   })
              })
        },
       insertCoins() {
            //  let coinsType='';
            //  let chiefFlag="";
            //   if(this.coinsFlag=='1'||this.coinsFlag=='2'){
            //       coinsType='3'
            //     }else if(this.coinsFlag=='3'||this.coinsFlag=='4'){
            //        coinsType='2'
            //   }
            //   this.coinsInfoVoList.push({serialNo:'',mainPolicyNo:'',coinsType,chiefFlag
            //       ,coinsCode:'', coinsName:'',coinsRate:''})
        },
          //移除表格  参数为表格索引
          deleteCoins() {
              //  console.log("删除表格第" + index + "行");
              //  this.coinsInfoVoList.splice(index,1);
              
        },
      okCallback(){
          if( this.reshFlagDetail == "0"){
            this.$alert('联共保信息刷新,请重新点击计算!!!.','联共保信息',{ type:'warning'})
            return false 
          }else{
            //需要刷新联共保标志
            this.$store.state.refreshFlagCoins='1'
            this.$emit('closeCoins','OK')
          }
      },
      cancelCallback(){
            this.okCallback()
            //this.$emit('closeCoins','OK')
      },
      selectCoins(index){
          let coinsCode=this.coinsInfoVoList[index].coinsCode
          let val=this.coinsSelectList.filter((item)=>{
               return item.coinsCode==coinsCode
          })
         this.coinsInfoVoList[index].coinsName=val[0].coinsName;
         console.log(this.coinsInfoVoList[index].coinsName);

      },
      calOperateFeesum(){
           let sumOperateFee=0;
           for (let item of this.coinsDetailInfoVoList){
                   let operateFee=parseFloat(item.operateFee);
                   if(isNaN(operateFee)){ operateFee=0;}
                   sumOperateFee=sumOperateFee+operateFee;
           }
           this.OperateFeesum=sumOperateFee;
      },
      getJsonCoinsInfoVoList(){
        let coinsInfoVoList=new Array()
        
        for(let coins of this.coinsInfoVoList){
          let obj={
              serialNo:coins.serialNo,
              mainPolicyNo:coins.mainPolicyNo,
              mainProposalNo:'',
              coinsType:coins.coinsType,
              chiefFlag:coins.chiefFlag,
              coinsCode:coins.coinsCode,
              coinsName:coins.coinsName,
              coinsRate:this.$uiCommon.replaced(coins.coinsRate),
              coinsFlag:'',
              reinscifFlag:'',
              proportionFlag:this.proportionFlag1,
              billType:this.billType,
              flag:''
            
          }
          coinsInfoVoList.push(obj)
        }
        return  coinsInfoVoList;
      },
      getJsonCoinsDetailInfoVoList(){
           let list=[];
           for(let coinsDetailInfoVo of this.coinsDetailInfoVoList){
               coinsDetailInfoVo.coinsAmount=this.$uiCommon.replaced(coinsDetailInfoVo.coinsAmount)
               coinsDetailInfoVo.coinsPremium=this.$uiCommon.replaced(coinsDetailInfoVo.coinsPremium)
               coinsDetailInfoVo.agentFee=this.$uiCommon.replaced(coinsDetailInfoVo.agentFee)
               coinsDetailInfoVo.operateFee=this.$uiCommon.replaced(coinsDetailInfoVo.operateFee)
               coinsDetailInfoVo.middleCostFee=this.$uiCommon.replaced(coinsDetailInfoVo.middleCostFee)
               list.push(coinsDetailInfoVo)
           }
           return list;
      }

  }
}