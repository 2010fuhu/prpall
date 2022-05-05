export default{
    name :"MainReinsCiInput",
    data(){
          return{
            MainReinsCiShow:false
          }
    },
    props:{
      ReinsCededInfo:{
        type:Object
      }
    },
    methods:{
       show(){ this.MainReinsCiShow=!this.MainReinsCiShow;},
       offeredRate(){
        if(this.ReinsCededInfo.oriAmount==0){
          alert("请先输入原保单总保额");
        }else{
          this.ReinsCededInfo.offeredLine=this.$uiCommon.pointFour((this.$uiCommon.replaced(this.ReinsCededInfo.inAmount,",")
          /this.$uiCommon.replaced(this.ReinsCededInfo.oriAmount,",")*100).toFixed(4));
          this.ReinsCededInfo.signedLine =this.$uiCommon.pointFour((this.$uiCommon.replaced(this.ReinsCededInfo.inAmount,",")
          /this.$uiCommon.replaced(this.ReinsCededInfo.oriAmount,",")*100).toFixed(4));
        }
      },
      operateFeeRate(){
        this.ReinsCededInfo.billsFee = this.$uiCommon.numberFormat(this.$uiCommon.pointTwo((this.$uiCommon.replaced(this.ReinsCededInfo.noHaveTaxFee,",")
        * this.ReinsCededInfo.billsFeeRate/100).toFixed(2)));
      }, 
      agentSignedFeeRate(){
        this.ReinsCededInfo.reinsCiCharges = 
        this.$uiCommon.numberFormat(this.$uiCommon.pointTwo((this.$uiCommon.replaced(this.ReinsCededInfo.noHaveTaxFee,",")*this.ReinsCededInfo.commSignedLine/100).toFixed(2)));
      },
      //修改后按费用更改计算分入净保费
       inDisPremium1(){
          var dbReinsBrokerFee=0.00;
          console.log(this.$parent)
          //完整公式：分入净保费（境外经纪人）=不含税分入保费+增值税-再保手续费-出单费-（经纪费-经纪费增值税*附加税比例）
          //		      分入净保费（境内经纪人）=不含税分入保费+增值税-再保手续费-出单费-(经纪费+经纪费增值税)
          this.$parent.reinsBrokerInfoVoList.forEach((reinsBrokerInfoVo,index)=>{
          this.$parent.calculateReinsBrokerFee(index);
          this.$parent.calculateReinsBrokerAddedTaxFee(index);
          if(this.$parent.coinsflag.get(reinsBrokerInfoVo.brokerCode)=="F"){//境外经纪人
            dbReinsBrokerFee = dbReinsBrokerFee 
            +parseFloat(this.$uiCommon.replaced(reinsBrokerInfoVo.brokerAgeFee,","))
            -parseFloat(this.$uiCommon.replaced(reinsBrokerInfoVo.reinsBrokerAddedTaxFee,","))
            *parseFloat(this.ReinsCededInfo.reinsBrokerExtraRate)/100
          }else{
            dbReinsBrokerFee = dbReinsBrokerFee 
            + parseFloat(this.$uiCommon.replaced(reinsBrokerInfoVo.brokerAgeFee,","))
            +parseFloat(this.$uiCommon.replaced(reinsBrokerInfoVo.reinsBrokerAddedTaxFee,","));
          }


        })
        if(this.ReinsCededInfo.transferFlag=="1"){
          dbReinsBrokerFee=0.00;
        }
        //含税保费=不含税保费+增值税
        var InPre=parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.noHaveTaxFee,","))
               +parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.addedTaxRate,","));
        //分入净保费=含税保费-（出单费+再保手续费+经纪费-经纪费增值税*附加税比例） 
        var inDisPre=this.$uiCommon.pointTwo((InPre-(parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.billsFee,","))
                      +parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.reinsCiCharges,","))
                      +parseFloat(dbReinsBrokerFee)).toFixed(2)));
          if (inDisPre<0){
            this.ReinsCededInfo.inDisPremium="0.00";
          }else{
            this.ReinsCededInfo.inDisPremium=this.$uiCommon.numberFormat(inDisPre);
            //this.ReinsCededInfo.inDisPremium=this.$uiCommon.numberFormat("345.66");   
          }	
      },
      inDisPremium2(){},
      taxFeeRate(){
       this.ReinsCededInfo.tax=this.$uiCommon.numberFormat(
        this.$uiCommon.pointTwo((this.$uiCommon.replaced(this.ReinsCededInfo.inPremium,",")
        *this.ReinsCededInfo.taxRate/100).toFixed(2)))

      },
   
      // eslint-disable-next-line no-unused-vars
      checkRate(e){
        if(e.target.value==''){
          if(e.target.name=='addedTaxRate'){
                //获取增值税得税率
              if(this.$parent.$refs.coinsReinsRef.coinsInfoVoList.length>0){
                var index=0;
                for(let i in this.$parent.$refs.coinsReinsRef.coinsInfoVoList){
                     if(this.$parent.$refs.coinsReinsRef.coinsInfoVoList[i].coinsFlag=='1'){
                       index=i;
                       break;
                     }
                }
                this.$parent.$refs.coinsReinsRef.getMainAddedTaxRate(index);
              }else{
                this.ReinsCededInfo.addedTaxRate='0.0000'//等于获取到得税率
              }
          }else if(e.target.name=='commSignedLine'){
            this.ReinsCededInfo.commSignedLine='0.00'
          }else if(e.target.name=='billsFeeRate'){
            this.ReinsCededInfo.billsFeeRate='0.00'
          }else if(e.target.name=='taxRate'){
            this.ReinsCededInfo.taxRate='0.00'
          }
        }        
      },
      calculateAddexTaxFee(){
        //增值税=分入毛保费*（增值税率%）/（1+增值税率%）
        this.ReinsCededInfo.addedTaxFee=this.$uiCommon.numberFormat(this.$uiCommon.pointTwo(((parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.inPremium,","))
        *(parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.addedTaxRate,",")/100))
        /(1+parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.addedTaxRate,",")/100)))).toFixed(2)));
        //不含税分入保费=分入毛保费-增值税;
        this.ReinsCededInfo.noHaveTaxFee=this.$uiCommon.numberFormat(this.$uiCommon.pointTwo((parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.inPremium,","))
        -parseFloat(this.$uiCommon.replaced(this.ReinsCededInfo.addedTaxFee,","))).toFixed(2)));
      }
    }
}