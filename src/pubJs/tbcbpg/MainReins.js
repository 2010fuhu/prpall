import  coinsReins  from '@/views/commonship/MainCoinsReinsCiInput.vue';
import  MainReinsCiInput  from '@/views/commonship/MainReinsCiInput.vue';
import  coinscodeinfo   from '@/api/getselectcoinscodeinfo.js';
export default{
    name:'MainReins',
        components:{
           coinsReins,
           MainReinsCiInput
          },
          data(){
            return{
              oriCurrencyRate:'',
              reinsCededInfoVo:{
                serialNo:'1',
                outPolicyNo:'',//原保单号码/分出公司保单号码
                businessNature:'h',//渠道标志
                reinsBill:'0',//账单标识
                oriCurrency:"CNY",//币别代码
                oriCurrencyRate:'1.00',//本币兑换率
                coSumClaim:'0.00',//共同理赔金额
                oriAmount:'0.00',//原保单总保额
                oriPremium:'0.00',//原保单总保费
                dicDesc:'',//DIC差异描述
                oriOutReinsCode:'',
                oriOutReinsName:'',
                outLinkerName:'',
                reinsCededType:'',
                offeredLine:'0.0000',//我司比例(offered)
                signedLine:'0.0000',//
                inAmount:'10000',//分入保额
                inPremium:'10000',//分入毛保费
                exchangeFlag:'1',//费用计算方式
                commSignedLine:'0.0000',//手续费比例(signed)
                commOfferedLine:'0.0000',//手续费比例(offered)
                reinsCiCharges:'0.00',//分保手续费
                billsFeeRate:'0.0000',//出单费比例
                billsFee:'0.00',//出单费
                taxRate:'0.0000',//税金比例
                tax:'0.00',   //税金
                addedTaxRate:'0.0000',//增值税率
                addedTaxFee:'0.00',//增值税
                noHaveTaxFee:'0.00',//不含税分入保费  这个
                inDisPremium:'0.00',//分入净保费
                isNeedEstimate:'0',//是否预估
                transferFlag:"1",
                reinsBrokerExtraRate:'12',//附加税比例
                flag:''
              },
              reinsBrokerInfoVoList:[],//分入再保经纪人信息集合
              coinsCodeInfoVoList:[],
              coinsInfoVoList:[],
              coinsflag:new Map(),
              imgUrl:require('@/assets/images/markMustInput.jpg'),
            }
          },
           props:{
          //   接受父组件传的值
            isReinsChildShow:{
                type:Boolean
            }
        },
        created(){
            this.getselectcoinscodeinfo()
        },
        mounted(){},
        computed: {
          sumAmount1() {
            return this.$store.state.sumAmount1
          },
          sumPremium1() {
            return this.$store.state.sumPremium1
          },
        },
        watch:{
          sumAmount1:{
            handler(newValue){
              this.reinsCededInfoVo.inAmount=newValue
            },
            immediate:true
          },
          sumPremium1:{
            handler(newValue){
              this.reinsCededInfoVo.inPremium=newValue
              this.reinsCededInfoVo.inDisPremium=newValue
            },
            immediate:true
           
          },
          reinsBrokerInfoVoList:{
            handler(){
              for(let index in this.reinsBrokerInfoVoList){
                this.reinsBrokerInfoVoList[index].serialNo=parseInt(index)+1;
               }
             }
          },
          coinsInfoVoList:{
            handler(){
              for(let index in this.coinsInfoVoList){
                this.coinsInfoVoList[index].serialNo=parseInt(index)+1;
               }
             }
          }
        },
        methods:{
          initMainReinsData(orderData){//分入初始化的方法
            this.$nextTick(()=>{
                let coinsInfoVos=orderData.coinsInfoVos;
                this.coinsInfoVoList=[]
                this.reinsBrokerInfoVoList=[]
                this.coinsInfoVoList=coinsInfoVos
                this.reinsBrokerInfoVoList=orderData.reinsBrokerInfoVos
                let reinsCededInfoVo=orderData.reinsCededInfoVo
                for(let key in reinsCededInfoVo){
                  if(key in  this.reinsCededInfoVo){
                    this.reinsCededInfoVo[key]=reinsCededInfoVo[key]
                  }
                }
                this.reinsCededInfoVo.reinsBill=orderData.mainInfoVo.othFlag.substring(19,20)
            })
         },
            okCallback(){
                if(this.checkMainReinsInfo()){
                  this.$store.state.refreshFlagReins='1'//点击确定刷新涉农业务标志
                  this.$emit('closeReins1','ok')
                }
            },
            
            cancelCallback(){
                this.$emit('closeReins1','cancel')
            },
            deleteReinsBroker(index){
              this.reinsBrokerInfoVoList.splice(index,1);
            },
            insertReinsBroker(){
               this.reinsBrokerInfoVoList.push({
                  serialNo:"",
                  brokerCode:'',
                  brokeName:'',
                  brokerAgeRate:'',
                  brokerAgeFee:'',
                  reinsBrokerAddedTaxRate:'',
                  reinsBrokerAddedTaxFee:'', 
                  flag:''                 
               })
            },
            getselectcoinscodeinfo(){
              return  new Promise((resolve,reject)=>{
                  coinscodeinfo.getselectcoinscodeinfo('ReinsCi').then(res=>{
                  let data=res.data.data;
                  if(res.status==200){
                    resolve(data)
                  }else{
                    reject()
                  }
                })
              }).then((val)=>{
                    for(let item of val){
                      this.coinsCodeInfoVoList.push({coinsCode:item.coinsCode,coinsName:item.coinsName})
                      //this.$refs
                      this.coinsflag.set(item.coinsCode,item.flag)
                    }
              })
            },
            calculateReinsBrokerFee(index){
              //公式变更为不含税分入保费*经纪费率
              
              var InPre=parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.noHaveTaxFee,","));
              if(isNaN(InPre)){InPre=0}
              this.reinsBrokerInfoVoList[index].brokerAgeFee
              =this.$uiCommon.numberFormat(this.$uiCommon.pointTwo((InPre*parseFloat(this.reinsBrokerInfoVoList[index].brokerAgeRate)/100).toFixed(2)));
            },
            calculateReinsBrokerAddedTaxFee(index){
              //经纪费增值税=经纪费(不含税)*费率
              var AddedTaxRate=(this.reinsBrokerInfoVoList[index].reinsBrokerAddedTaxRate/100).toFixed(2);
              if(isNaN(AddedTaxRate)){AddedTaxRate=0}
              this.reinsBrokerInfoVoList[index].reinsBrokerAddedTaxFee=
              this.$uiCommon.numberFormat(this.$uiCommon.pointTwo(
                (AddedTaxRate*parseFloat(this.$uiCommon.replaced(this.reinsBrokerInfoVoList[index].brokerAgeFee,",")))
                .toFixed(2)));
            },
            GetAddedTaxRate(index){//获取在把经纪人 经纪费增值税%
                  
                    let brokerCode=this.reinsBrokerInfoVoList[index].brokerCode
                    return  new Promise((resolve,reject)=>{
                      coinscodeinfo.getreinstaxrate(brokerCode,'ReinsTaxRate').then(res=>{
                      let data=res.data.data;
                      if(res.status==200){
                        resolve(data)
                      }else{
                        reject(data)
                      }
                    })
                  }).then((val)=>{
                     if(val!=''){
                      this.reinsBrokerInfoVoList[index].reinsBrokerAddedTaxRate=val;
                     }else{
                      this.reinsBrokerInfoVoList[index].reinsBrokerAddedTaxRate='0.00'
                     }
                     this.inDisPremium1();
                  })
            },
            inDisPremium1(){
              this.$refs.mainReinsRef.inDisPremium1();
            },
            offeredRate(){
              this.$refs.mainReinsRef.offeredRate();
            },
            initReinsCededInfoVo(){
              
              this.reinsCededInfoVo.oriCurrency=this.$store.state.currency1Fee
              //原币币别不计算了 暂时没有找到实际得意义
              this.reinsCededInfoVo.inAmount=this.$store.state.sumAmount1 
              this.reinsCededInfoVo.inPremium=this.$store.state.sumPremium1 
              this.reinsCededInfoVo.inDisPremium=this.$store.state.sumPremium1 
              this.$refs.coinsReinsRef.insertCoinsReinsCi()
              
            },
            getJsonReinsBrokerList(){
              let list=[];
              for(let reinsBrokerInfoVo of this.reinsBrokerInfoVoList){
                reinsBrokerInfoVo.brokerAgeRate=this.$uiCommon.replaced(reinsBrokerInfoVo.brokerAgeRate)
                reinsBrokerInfoVo.brokerAgeFee=this.$uiCommon.replaced(reinsBrokerInfoVo.brokerAgeFee)
                reinsBrokerInfoVo.reinsBrokerAddedTaxRate=this.$uiCommon.replaced(reinsBrokerInfoVo.reinsBrokerAddedTaxRate)
                reinsBrokerInfoVo.reinsBrokerAddedTaxFee=this.$uiCommon.replaced(reinsBrokerInfoVo.reinsBrokerAddedTaxFee)
                list.push(reinsBrokerInfoVo)
              }
              return list
            },
            checkMainReinsInfo(){
                if(this.reinsCededInfoVo.outPolicyNo=="") {
                  this.$alert('原保单号码/分出公司保单号码不能为空','分入信息',{type:'warning'});  // ui框架的提示弹窗
                  return false         
                }else if(this.reinsCededInfoVo.oriAmount==''){
                  this.$alert('原保单总保额不能为空','分入信息',{type:'warning'});  // ui框架的提示弹窗
                  return false 
                }else if(this.reinsCededInfoVo.oriPremium==''){
                  this.$alert('原保单不含税总保费不能为空','分入信息',{type:'warning'});  // ui框架的提示弹窗
                  return false
                }else{
                  let num =parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.inAmount,","))-parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.oriAmount,","))
                  if(num>0){
                    this.$alert('原保单总保额不小于分入保额!!!','分入信息',{type:'warning'});  // ui框架的提示弹窗
                    return false 
                  }
                  if(this.coinsInfoVoList.length<=0){
                    this.$alert('原保单承保人名称及相应份额列表不能为空','分入信息',{type:'warning'});  // ui框架的提示弹窗
                    return false 
                  }else{
                    for(let i=0 ;i< this.coinsInfoVoList.length;i++){
                      let item=this.coinsInfoVoList[i]
                      if(item.coinsCode==''){
                        this.$alert(`第${i+1}行原保单承保人名称不能为空`,'分入信息',{type:'warning'});  // ui框架的提示弹窗
                        return false 
                      }
                      if(item.coinsRate==''){
                        this.$alert(`第${i+1}行原保单承保份额不能为空`,'分入信息',{type:'warning'});  // ui框架的提示弹窗
                        return false 
                      }
                    }
                  }
                }
              return true
            }
           
        },
  }