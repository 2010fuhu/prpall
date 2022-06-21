import coinsJs from '@/api/getselectcoinscodeinfo.js'
//import CalJSON from '@/json/coinsCommissionCal.json'
//import {EventBus}from '@/utils/event-bus.js'
//import agencyfee from   '@/api/agencyfee.js'  
export default{
  data(){
     return{
      coinsInfoVoList:[],
      coinsSelectList:[],
      coinsDetailInfoVoList:[],
      coinsFlag:"",
      CurrencyName:'',
      reshFlagDetail:'0',
      CoinssumShow:true,
      CoinsDetailShow:true,
      CoinsAmountsum:'',
      CoinsPremiumsum:'',
      AgentFeesum:'',
      MiddleCostFeesum:'',
      OperateFeesum:'',
      proportionFlag1:'0',// 手续计入方式
      billType:'0',//发票计入方式
      billTypeDisabled:true,
      chgCoinsAmountSum:0.00,
      chgCoinsPremiumSum:0.00,
      chgAgentFeeSum:0.00,
      chgMiddleCostFeeSum:0.00,
      chgOperateFeeSum:0.00,
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
      //this.initCoinsdata()
  },
  updated(){
    if(this.isCoinschildShow){
      this.setReadOnly()
    }
  },

  methods:{
      initMainCoinsData(orderData){
          this.coinsInfoVoList=orderData.endorseDataVo.coinsInfoVos
          this.coinsDetailInfoVoList=orderData.endorseDataVo.coinsDetailInfoVos
          let oldcoinsDetail= orderData.originDataVo.coinsDetailInfoVos
          let oldcoinsDetailMap=new Map()
          if(oldcoinsDetail.length>0){
            oldcoinsDetail.forEach((item)=>{
              this.chgCoinsAmountSum+=parseFloat(item.chgCoinsAmount)
              this.chgCoinsPremiumSum+=parseFloat(item.chgCoinsPremium)
              this.chgAgentFeeSum+=parseFloat(item.chgAgentFee)
              this.chgMiddleCostFeeSum+=parseFloat(item.chgMiddleCostFee)
              this.chgOperateFeeSum+=parseFloat(item.chgOperateFee)
              oldcoinsDetailMap.set(item.coinsCode,item)
            })
          }
          let currency=this.coinsDetailInfoVoList[0].currency
          this.billType= this.coinsInfoVoList[0].billType
          this.proportionFlag1=this.coinsInfoVoList[0].proportionFlag.substring(0,1)
          debugger
          this.$refs.proportionFlag1.title=this.coinsInfoVoList[0].proportionFlag.substring(0,1)=='0'?'份额计入':'全额计入'
          this.$refs.billType.title=this.coinsInfoVoList[0].billType=='0'?'全额发票':'份额发票'

          let CurrencyName="";
          debugger
          console.log(currency)
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
          this.coinsFlag=this.$store.state.coinsFlag
          this.asynConinsSelect()
          this.$nextTick(()=>{
            this.coinsDetailInfoVoList.forEach((item,index)=>{
                  for(let key in item){
                     if(this.$refs[key]){
                       if(this.$refs[key][index]){
                         this.$refs[key][index].title=oldcoinsDetailMap.get(item.coinsCode)? oldcoinsDetailMap.get(item.coinsCode)[key]:item[key]
                         if(this.$refs[key][index].title!=item[key]){
                            this.$refs[key][index].className=`${this.$refs[key][index].className}u`
                         }
                       }
                     }
                  }
                  if(oldcoinsDetailMap.get(item.coinsCode)){
                     let obj=oldcoinsDetailMap.get(item.coinsCode)
                     this.$refs.chgCoinsAmount[index]=obj.chgCoinsAmount
                     this.$refs.chgCoinsPremium[index]=obj.chgCoinsPremium
                     this.$refs.chgAgentFee[index]=obj.chgAgentFee
                     this.$refs.chgMiddleCostFee[index]=obj.chgMiddleCostFee
                     this.$refs.chgOperateFee[index]=obj.chgOperateFee

                  }
            })
            this.setReadOnly()
          })
      },

      setReadOnly(){
        this.$uiCommon.setContainerReadonly(this.$refs.Coins,true)
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
        //只有点击计算了才将此标志置为1      
      setRefreshFlagDetailZero() {},
       //计算联共保明细保费 出单费 手续费的方法
      async  generateCoinsDetail(){
         //1 首先需要判断是否录入联共保的信息
          if(this.coinsInfoVoList.length>1){
                let coinsRateSum=0
                for(let coinsInfo of this.coinsInfoVoList){
                     coinsRateSum=coinsRateSum+parseFloat(coinsInfo.coinsRate)
                }
                if(coinsRateSum!=100){
                    this.$alert('联/共保份额(%)合计应为100%!!!.','联共保信息',{ type:'warning'})
                    return false;
                }
          }else{
            return false 
          }
          //2 通过录入的联共保的coinsInfoVoList 首先计算  coinsDetailInfoVoList 的保额和保费
          //2.1 应该拿到支付的币别， 支付的总保额 和总保费
            //拿到币别
            let Currency=this.$store.state.currency1Fee;
            let CurrencyName="";
            if(Currency=="CNY"){
             CurrencyName="人民币";
            }else if(Currency=="USD"){
              CurrencyName="美元";
            }else if(Currency=="HKD"){
              CurrencyName="港币";
            }else if(Currency=="AUD"){
              CurrencyName="澳大利亚元";
            }
            this.CurrencyName=CurrencyName;
           //拿到总保额 和总保费
            let sumAmount=this.$store.state.sumAmount1
            let sumPremium=this.$store.state.sumPremium1
          //3  循环遍历为coinsDetailInfoVoList 明细赋值 
           //
            let count =this.coinsInfoVoList.length
            this.coinsDetailInfoVoList=[];
            for (let i=0;i<count;i++){
                //3.1判断从共与从联的情况   先计算我方的保额 保费
                let coinsDetail={
                     serialNo:'',
                     coinsCode:'',
                     coinsName:'',
                     coinsAmount:'0',
                     coinsPremium:'0',
                     agentFee:'0',
                     operateFee:'0',
                     middleCostFee:'0',
                     currency:this.$store.state.currency1Fee,
                     flag:''
                } 
                if(this.coinsFlag=='2'||this.coinsFlag=='4'){
                    if(this.coinsInfoVoList[i].coinsType=='1'){
                        coinsDetail.coinsAmount=sumAmount;
                        coinsDetail.coinsPremium=sumPremium;
                    }else{
                        coinsDetail.coinsAmount=(parseFloat(sumAmount)/parseFloat(this.coinsInfoVoList[0].coinsRate)*parseFloat(this.coinsInfoVoList[i].coinsRate)).toFixed(2);
                        coinsDetail.coinsPremium=(parseFloat(sumPremium)/parseFloat(this.coinsInfoVoList[0].coinsRate)*parseFloat(this.coinsInfoVoList[i].coinsRate)).toFixed(2);

                    }
                 //3.2判断主共与主联的情况   先计算我方的保额 保费
                }else if(this.coinsFlag=='1'||this.coinsFlag=='3'){
                        coinsDetail.coinsAmount=(parseFloat(sumAmount)*parseFloat(this.coinsInfoVoList[i].coinsRate)/100).toFixed(2);
                        coinsDetail.coinsPremium=(parseFloat(sumPremium)*parseFloat(this.coinsInfoVoList[i].coinsRate)/100).toFixed(2);
                }
                  coinsDetail.serialNo=i+1;
                  coinsDetail.coinsCode=this.coinsInfoVoList[i].coinsCode;
                  coinsDetail.coinsName=this.coinsInfoVoList[i].coinsName;
                  this.coinsDetailInfoVoList.push(coinsDetail);
            }
            //4 计算联共保手续费
             let result='';
             if(this.$store.state.channelType1=='92'||this.$store.state.channelType1=='93'){
                  result= await this.coinsCommissionCal();
                  console.log(this.coinsDetailInfoVoList)
                    console.log(this.result)
                  for(let index=0; index<this.coinsDetailInfoVoList.length;index++){
                        for(let res of result.coinsInfoResList){
                              if(res.coinsCode==this.coinsDetailInfoVoList[index].coinsCode){
                                      this.coinsDetailInfoVoList[index].agentFee=res.coinsFee
                              }
                        }
                  }
             } 
            //5 计算合计
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
             //6计算尾插 
             if(this.coinsFlag=='1'||this.coinsFlag=='3'){
               if((parseFloat(this.CoinsAmountsum)-parseFloat(sumAmount))!=0){
                       let chgAmount =parseFloat(this.CoinsAmountsum)-parseFloat(sumAmount)
                       if(chgAmount>0){
                         this.coinsDetailInfoVoList[0].coinsAmount=this.coinsDetailInfoVoList[0].coinsAmount-chgAmount
                        }else{
                          this.coinsDetailInfoVoList[0].coinsAmount=this.coinsDetailInfoVoList[0].coinsAmount+chgAmount
                       }
               }
               if((parseFloat(this.CoinsPremiumsum)-parseFloat(sumPremium))!=0){
                    let chgPremium =parseFloat(this.CoinsPremiumsum)-parseFloat(sumPremium)
                    if(chgPremium>0){
                         this.coinsDetailInfoVoList[0].coinsPremium=this.coinsDetailInfoVoList[0].coinsPremium-chgPremium
                        }else{
                          this.coinsDetailInfoVoList[0].coinsPremium=this.coinsDetailInfoVoList[0].coinsPremium+chgPremium
                       }
               }
             }            
             //7显示 联共保明细 
              this.CoinsDetailShow=true;
              this.CoinssumShow=true;
              //8设置出单费为只读 不能修改 
                for( let index  in this.coinsDetailInfoVoList){
                if((this.coinsDetailInfoVoList[index].coinsCode==this.coinsInfoVoList[0].coinsCode
                    &&this.coinsFlag=='2')||
                    (this.coinsDetailInfoVoList[index].coinsCode!=this.coinsInfoVoList[0].coinsCode
                    &&this.coinsFlag=='1')){
                    this.$refs.operateFee[index].readOnly=false;
                }else{
                    this.$refs.operateFee[index].readOnly=true;
                }
              }
              // 9刷新明细得标志
              this.reshFlagDetail = "1";
       },
        coinsCommissionCal(){},
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
          // eslint-disable-next-line no-unused-vars
          deleteCoins(index) {
              //  console.log("删除表格第" + index + "行");
              //  this.coinsInfoVoList.splice(index,1);
              
        },
      okCallback(){
            this.$emit('closeCoins')
      },
        cancelCallback(){
            this.$emit('closeCoins')
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
      }

  }
}