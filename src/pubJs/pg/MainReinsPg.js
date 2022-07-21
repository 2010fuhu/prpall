import  coinsReins  from '@/views/commonship/MainCoinsReinsCiInput.vue';
import  MainReinsCiInput  from '@/views/commonship/MainReinsCiInput.vue';
import  coinscodeinfo   from '@/api/getselectcoinscodeinfo.js';
import obj from '@/json/ProposalGenerateReq.json'
export default{
    name:'MainReins',
        components:{
           coinsReins,
           MainReinsCiInput
          },
          data(){
            return{
              reinsBillOrg:null,
              oriCurrencyRate:'',
              reinsCededInfoVo:{
                serialNo:'1',
                outPolicyNo:'',//原保单号码/分出公司保单号码
                outEndorseNo:'',//原批单号码/分出公司批单号码
                businessNature:'h',//渠道标志
                reinsBill:'0',//账单标识
                oriCurrency:"CNY",//币别代码
                oriCurrencyRate:'1.00',//本币兑换率
                coSumClaim:'0.00',//共同理赔金额
                oriAmount:'0.00',//原保单总保额 没有
                oriPremium:'0.00',//原保单总保费 没有
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
            this.initReins()
        },
        
        watch:{
          'reinsCededInfoVo.reinsBill':{
             handler(){
                   if(this.reinsBillOrg){
                        if(this.reinsBillOrg!=this.reinsCededInfoVo.reinsBill){
                          this.$refs.reinsbillTD.className='commonu'
                        }else{
                          this.$refs.reinsbillTD.className=''
                        }
                   }
             },
             immediate:false
          }
         
        },
        methods:{
         async initReins(){
            await this.getselectcoinscodeinfo()
            this.initMainReinsData()
          },
          initMainReinsData(){
            let coinsInfoVos=obj.proposalGenerateMainInfoReq.coinsInfoVoList;
            this.coinsInfoVoList=[]
            this.reinsBrokerInfoVoList=[]
            this.coinsInfoVoList=coinsInfoVos
            this.reinsBrokerInfoVoList=obj.proposalGenerateMainInfoReq.reinsBrokerInfoVoList
            let reinsCededInfoVo=obj.proposalGenerateMainInfoReq.reinsCededInfoVo
            for(let key in reinsCededInfoVo){
              if(key in  this.reinsCededInfoVo){
                 this.reinsCededInfoVo[key]=reinsCededInfoVo[key]
              }
            }
            this.reinsCededInfoVo.reinsBill=this.$store.state.othFlag.substring(19,20)
            this.reinsBillOrg=this.$store.state.othFlag.substring(19,20)
            this.setStyle()
         },
         setStyle(){
            this.$nextTick(()=>{
                this.$uiCommon.setTitle(this.$refs.reinsMainHead.children)
                this.$uiCommon.addevent(this,'outPolicyNo')
                this.$uiCommon.addevent(this,'outEndorseNo')
                this.$uiCommon.setReadonlyOfElement(this.$refs.transferFlag) // 设置业务Select域为只读
                this.$uiCommon.setTitle(this.$refs.reinsMainOri.children)
                this.$uiCommon.addevent(this,'oriCurrency')
                this.$uiCommon.addevent(this,'oriCurrencyRate')
                this.$uiCommon.addevent(this,'coSumClaim')
                this.$uiCommon.addevent(this,'oriAmount')
                this.$uiCommon.addevent(this,'oriPremium')
                //dicDesc
                this.$uiCommon.addevent(this,'dicDesc')
                this.$uiCommon.setReadonlyOfElement(this.$refs.oriCurrency)
                if(this.reinsCededInfoVo.transferFlag=='2'){//如果再保经纪人业务，需要设置再报经纪人为只读
                  this.$uiCommon.setTitle(this.$refs.reinsBroker.children)
                  this.$uiCommon.setContainerReadonly(this.$refs.reinsBroker,true)
                }
                this.$refs.coinsReinsRef.setreadOnly()
                this.$refs.mainReinsRef.setTitle()
            })
         },
            okCallback(){
                if(this.checkMainReinsInfo()){
                  this.$store.state.refreshFlagReins='1'//点击确定刷新分入业务标志
                  this.$emit('closeReins1','ok')
                }
            },
            
            cancelCallback(){
                this.okCallback()
            },
            deleteReinsBroker(){},
            insertReinsBroker(){},
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
              this.$uiCommon.setColor(this.$refs.brokerAgeFee[index])
            },
            calculateReinsBrokerAddedTaxFee(index){
              //经纪费增值税=经纪费(不含税)*费率
              var AddedTaxRate=(this.reinsBrokerInfoVoList[index].reinsBrokerAddedTaxRate/100).toFixed(2);
              if(isNaN(AddedTaxRate)){AddedTaxRate=0}
              this.reinsBrokerInfoVoList[index].reinsBrokerAddedTaxFee=
              this.$uiCommon.numberFormat(this.$uiCommon.pointTwo(
                (AddedTaxRate*parseFloat(this.$uiCommon.replaced(this.reinsBrokerInfoVoList[index].brokerAgeFee,",")))
                .toFixed(2)));
              this.$uiCommon.setColor(this.$refs.reinsBrokerAddedTaxFee[index])
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
            // initReinsCededInfoVo(){
              
            //   this.reinsCededInfoVo.oriCurrency=this.$store.state.currency1Fee
            //   //原币币别不计算了 暂时没有找到实际得意义
            //   this.reinsCededInfoVo.inAmount=this.$store.state.sumAmount1 
            //   this.reinsCededInfoVo.inPremium=this.$store.state.sumPremium1 
            //   this.reinsCededInfoVo.inDisPremium=this.$store.state.sumPremium1 
            //   //coinsReinsRef
            //   this.$refs.coinsReinsRef.insertCoinsReinsCi()
              
            // },
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
                }else if(this.reinsCededInfoVo.outEndorseNo==''){
                  this.$alert('原批单号码/分出公司批单号码不能为空','分入信息',{type:'warning'});  // ui框架的提示弹窗
                  return false   

                }else if(this.reinsCededInfoVo.oriAmount==''){
                  this.$alert('原保单总保额不能为空','分入信息',{type:'warning'});  // ui框架的提示弹窗
                  return false 
                }else if(this.reinsCededInfoVo.oriPremium==''){
                  this.$alert('原保单不含税总保费不能为空','分入信息',{type:'warning'});  // ui框架的提示弹窗
                  return false
                }else{
                  //获取保单的支付保额
                  let sumAmount1=this.$store.state.refreshFlag=='1'?this.$store.state.sumAmount1:this.reinsCededInfoVo.inAmount
                  let num1=parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.inAmount,","))-parseFloat(this.$uiCommon.replaced(sumAmount1,","))
                  if(num1!=0){
                    this.$alert('分入保额与保单保额不一致!!!','分入信息',{type:'warning'});  // ui框架的提示弹窗
                    return false
                  }
                  let num =parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.inAmount,","))-parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.oriAmount,","))
                  if(num>0){
                    this.$alert('原保单总保额不小于分入保额!!!','分入信息',{type:'warning'});  // ui框架的提示弹窗
                    return false 
                  }
                  let inPremium=parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.inPremium))
                  let addedTaxFee=parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.addedTaxFee))
                  let noHaveTaxFee=parseFloat(this.$uiCommon.replaced(this.reinsCededInfoVo.noHaveTaxFee))
                  if((addedTaxFee+noHaveTaxFee)-inPremium!=0){
                    this.$alert('不含税分入保费与增值税之和不等于分入总保费!!!','分入信息',{type:'warning'});  
                    return false 
                  }
                }
              return true
            }
           
        },
  }