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
                coSumClaim:'',//共同理赔金额
                oriAmount:'',//原保单总保额
                oriPremium:'',//原保单总保费
                dicDesc:'',//DIC差异描述
                oriOutReinsCode:'',
                oriOutReinsName:'',
                outLinkerName:'',
                reinsCededType:'',
                offeredLine:'0.0000',//我司比例(offered)
                signedLine:'0.0000',//
                inAmount:'10000',//分入保额
                inPremium:'10000',//分入毛保费
                exchangeFlag:'按比例',//费用计算方式
                commSignedLine:'0.0000',//手续费比例(signed)
                commOfferedLine:'',//手续费比例(offered)
                reinsCiCharges:'0.00',//分保手续费
                billsFeeRate:'0.0000',//出单费比例
                billsFee:'0.00',//出单费
                taxRate:'0.0000',//税金比例
                tax:'0.00',   //税金
                addedTaxRate:'0.0000',//增值税率
                addedTaxFee:'0.00',//增值税
                noHaveTaxFee:'10000',//不含税分入保费  这个
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
           //this.getselectcoinscodeinfo()
        },
        updated(){
          if(this.isReinsChildShow){
            this.setReadOnly()
          }

        },
        methods:{
            okCallback(){
                this.$emit('closeReins1')
            },
            cancelCallback(){
                this.$emit('closeReins1')
            },
            initMainReinsData(orderData){
               this.getselectcoinscodeinfo()
               this.coinsInfoVoList=orderData.endorseDataVo.coinsInfoVos;//这个不做处理
               this.reinsBrokerInfoVoList=orderData.endorseDataVo.reinsBrokerInfoVos
               let oldReinsBrokerList=orderData.originDataVo.reinsBrokerInfoVos;
               let oldReinsBrokerMap=new Map()
               if(oldReinsBrokerList.length>0){
                oldReinsBrokerList.forEach((item)=>{
                  oldReinsBrokerMap.set(item.serialNo,item)
                })
               }
               let reinsCededInfoVo=orderData.endorseDataVo.reinsCededInfoVo
               let orginReinsCededInfo=orderData.originDataVo.reinsCededInfoVo
               this.$nextTick(()=>{
                for(let key in reinsCededInfoVo){
                  if(key in  this.reinsCededInfoVo){
                     this.reinsCededInfoVo[key]=reinsCededInfoVo[key]?reinsCededInfoVo[key]:''
                  }
                
                  if(key in orginReinsCededInfo&&orginReinsCededInfo.flag){
                       if( this.$refs[key]){
                          this.$refs[key].title=orginReinsCededInfo[key]?orginReinsCededInfo[key]:''
                          if(this.$refs[key].title!=this.reinsCededInfoVo[key]){
                            this.$refs[key].className=`${this.$refs[key].className}u`
                          }
                       }else if(this.$refs.mainReinsRef.$refs[key]) {
                          this.$refs.mainReinsRef.$refs[key].title=orginReinsCededInfo[key]?orginReinsCededInfo[key]:''
                          if(this.$refs.mainReinsRef.$refs[key].title!=this.reinsCededInfoVo[key]){
                            this.$refs.mainReinsRef.$refs[key].className=`${this.$refs.mainReinsRef.$refs[key].className}u`
                          }
                       }
                  }else{
                       if(this.$refs[key]){
                          this.$refs[key].title=orginReinsCededInfo[key]?orginReinsCededInfo[key]:''
                       }else if(this.$refs.mainReinsRef.$refs[key]){
                          this.$refs.mainReinsRef.$refs[key].title=this.reinsCededInfoVo[key]
                       }
                  }
                }
                if(oldReinsBrokerList.length>0){
                    this.coinsInfoVoList.forEach((item,index)=>{
                        if(oldReinsBrokerMap.get(item.serialNo)){
                            for(let key in item){
                              if(this.$refs[key]){
                                    if(this.$refs[key][index]){
                                        this.$refs[key][index].title=oldReinsBrokerMap.get(item.serialNo)[key]
                                        if(this.$refs[key][index].title!=item[key]){
                                            this.$refs[key][index].className=`${this.$refs[key][index].className}u`
                                        }
                                    }
                              }
                            }
                        }
                    })
                }
              })
              },
            offeredRate(){},
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
            async initReinsCededInfoVo(){
              this.reinsCededInfoVo.oriCurrency=this.$store.state.currency1Fee
              //原币币别不计算了 暂时没有找到实际得意义
              this.reinsCededInfoVo.inAmount=this.$store.state.sumAmount1 
              this.reinsCededInfoVo.inPremium=this.$store.state.sumPremium2 
              
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
            setReadOnly(){
              this.$uiCommon.setContainerReadonly(this.$refs.Reins,true)
            },
           
        },
  }