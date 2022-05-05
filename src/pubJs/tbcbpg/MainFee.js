import collectCurrencyReq  from  '@/json/collectCurrencyReq.json'
import jfeeJson from '@/json/JfeeFlag.json'
//import { uuid } from 'vue-uuid';
import calculateFee from '@/api/calculateFee.js'
import Jfee from '@/api/getJfeeflag.js'
class  feeInfoVo{
      constructor(){
        this.flag=''//币别批改标志
		this.currency=''//原币代码
		this.currencyNameFee=''//原币名称
		this.amount=''//原币保额
		this.premium='',//原币保费
		this.currency2=''//汇总币别代码
		this.exchangeRate2=''//汇总币别兑换率
		this.amount2=''//汇总
		this.premium2=''//汇总币别保费
		this.exchangeRate1=''//支付币别兑换率
		this.amount1=''//支付币别保额
		this.premium1=''//支付币别保费
		this.currency1=''//支付币别代码
	  }
	}
class  itemKindFee{
      constructor(){
        this.kindCode=''//险别代码
		this.itemCode=''//责任代码
		this.calculateFlag=''//是否计算保额保费标志
		this.currency=''//原币
		this.exchangeRate1='',//原币转支付币兑换率
		this.exchangeRate2=''//原币转汇总币兑换率
		this.amount=''//保额
		this.premium=''//保费
		  
	  }

	}
	var currencyMap=new Map();	

export default ({
	data(){
        return{
           isShow:false,
		   feeInfoVoList:[],//费用集合
		   currencyInfoVoList:[],//汇总币别options 
           currency2Fee:'CNY',//汇总币别
		   currency1Fee:'CNY',//支付币别
           exchangeRate1Map: new Map(),
		   exchangeRate2Map: new Map(),

		}
	},
	mounted(){
        this.feeInfoVoList=[];
	},
	watch: {
    	currency1Fee: {
			handler(newVal) {
				this.$store.state.currency1Fee=newVal
			},
			immediate: true
		},
		currency2Fee: {
			handler(newVal) {
				this.$store.state.currency2Fee=newVal
			},
			immediate: true
		}
	}, 
	methods:{
		show(){this.isShow=!this.isShow },
		initSelected(data){
			this.currencyInfoVoList=data.currencyInfoVoList;
			for(let item of this.currencyInfoVoList ){
					currencyMap.set(item.currency,item.currencyname)
			}
		},
		//投保单、保单查询 初始化方法
		initMainFeeData(orderData){
			this.feeInfoVoList=[]
			orderData.feeInfoVos.forEach((fee,index) => {
				let feeinfo=new feeInfoVo();
				for(let key in fee){
					if(key in feeinfo){
					   feeinfo[key]=orderData.feeInfoVos[index][key]
					}
					if(key=='currency'){
					   feeinfo.currencyNameFee=currencyMap.get(feeinfo[key])
					}
				}
				this.feeInfoVoList.push(feeinfo)
			});
			this.currency2Fee=this.feeInfoVoList[0].currency2
			this.currency1Fee=this.feeInfoVoList[0].currency1

	   },
		async getJfeeFlagOnly(){
			let itemKindInfoVoList=this.$parent.$refs.MainItemkind.itemKindInfoVoList
			if(itemKindInfoVoList!=null){
				if(itemKindInfoVoList.length>0){
					let flag=false;
					for(let itemKindInfo of itemKindInfoVoList){
							console.log(this.$uiCommon.replaced(itemKindInfo.premium))
							if(isNaN(this.$uiCommon.replaced(itemKindInfo.premium))){
							flag=true;
							break;
							} 
					}
					if(flag){
						this.$alert('险别数组中保费有为空的数据！！！。','币别信息',{ type:'warning'})
						return  false;
					}
				}else{
					this.$alert('请先录入险别相关信息！！！。','币别信息',{ type:'warning'})
					return  false;
				}
			}
			//1 组织报文调用保费计算接口
			//1.1 先组织List<ItemKindFeeVo>
			let collectCurrency=collectCurrencyReq;
			collectCurrency.collectCurrencyMainInfoReq.currency1=this.currency1Fee;
			collectCurrency.collectCurrencyMainInfoReq.currency2=this.currency2Fee;
			collectCurrency.collectCurrencyMainInfoReq.exchangeDate=this.$store.state.startDate
			collectCurrency.collectCurrencyMainInfoReq.itemKindFeeVoList=[]
			for(let item of itemKindInfoVoList){
				let obj=new itemKindFee();
				obj.kindCode=item.kindCode;
				obj.itemCode=item.itemCode;
				obj.calculateFlag=item.calculateFlag;
				obj.currency=item.currency
				let exchangeRate1=this.exchangeRate1Map.get(item.currency+"-"+this.currency1Fee)
				if(exchangeRate1!=null){
					obj.exchangeRate1=exchangeRate1	
				}else{
					obj.exchangeRate1="";
				}
				let exchangeRate2=this.exchangeRate2Map.get(item.currency+"-"+this.currency2Fee)
				if(exchangeRate1!=null){
					obj.exchangeRate2=exchangeRate2	
				}else{
					obj.exchangeRate2="";
				}
				obj.amount=this.$uiCommon.replaced(item.amount)
				obj.premium=this.$uiCommon.replaced(item.premium)
				collectCurrency.collectCurrencyMainInfoReq.itemKindFeeVoList.push(obj);
			}
			//组织头部信息
			collectCurrency.reqHeader.transNo=this.$uiCommon.uuid(16, 32)
			let day = new Date();
			day.setTime(day.getTime());
			let  currentDay = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
			collectCurrency.reqHeader.transDate=currentDay;
			collectCurrency.reqHeader.transTime='';
			collectCurrency.reqHeader.userCode='';
			collectCurrency.reqHeader.password='';
			collectCurrency.reqHeader.sign='';
			collectCurrency.reqHeader.channelCode='0';
			//调用见费规则
			await this.getJFeeFlag()
			let obj= await this.calcurrencyFee(collectCurrency);
			let sumAmount=0 //原币保额
			let sumPremium=0 // 原币保费
			let sumPremium1=0    //支付币别保费
			let sumAmount1=0      //支付币别保额
			let sumPremium2=0     //汇总币别保费
			let sumAmount2=0     //汇总币别保额
			if(obj!=''){
				this.feeInfoVoList=[];//在给页面币别集合赋值之前需要清空以前的数据
				let currencyList=obj.collectCurrencyMainInfoRes.collectCurrencyVoList
				for (let item of currencyList ){
					let obj=new feeInfoVo();
					obj.flag="";
					obj.currency=item.currency;
					obj.currencyNameFee=currencyMap.get(obj.currency);
					obj.amount=item.amount;
					obj.premium=item.premium;
					obj.currency2=item.currency2
					obj.exchangeRate2=item.exchangeRate2;
					obj.amount2=item.amount2;
					obj.premium2=item.premium2;
					obj.currency1=item.currency1
					obj.amount1=item.amount1;
					obj.premium1=item.premium1;
					obj.exchangeRate1=item.exchangeRate1;
					this.feeInfoVoList.push(obj)
					sumAmount=parseFloat(sumAmount)+parseFloat(obj.amount)
					sumPremium=parseFloat(sumPremium)+parseFloat(obj.premium)
					sumPremium1=parseFloat(sumPremium1)+parseFloat(obj.premium1)
					sumAmount1=parseFloat(sumAmount1)+parseFloat(obj.amount1)
					sumPremium2=parseFloat(sumPremium2)+parseFloat(obj.premium2)
					sumAmount2=parseFloat(sumAmount2)+parseFloat(obj.amount2)
				}
				this.$store.state.sumAmount=sumAmount.toFixed(2)
				this.$store.state.sumPremium=sumPremium.toFixed(2)
				this.$store.state.sumPremium1=sumPremium1.toFixed(2)
				this.$store.state.sumAmount1=sumAmount1.toFixed(2)
				this.$store.state.sumPremium2=sumPremium2.toFixed(2)
				this.$store.state.sumAmount2=sumAmount2.toFixed(2)
			}
				this.refreshFlag()
		},   
		async calcurrencyFee(collectCurrency){//点击币别确定 调用后台接口方法
				let obj="";
			await new  Promise((resolve,reject)=>{
				calculateFee.calculateFeebycurrency(collectCurrency).then(
					(res)=>{
						let data=res.data;
						if(res.status==200){
							resolve(data)
						}else{
							reject(data)
						}
					})       
				}).then(resolve=>{
				obj=resolve;
				}).catch(reject=>{
					new Error(reject);
			})
			return obj;
		},
		async getJFeeFlag(){
			jfeeJson.paypremium="0"
			jfeeJson.makecom=this.$store.state.comCode
			jfeeJson.startdate=this.$store.state.startDate
			jfeeJson.enddate=this.$store.state.endDate
			jfeeJson.riskcode=this.$store.state.riskCode
			jfeeJson.currency='CNY'
			jfeeJson.businessnature=this.$store.state.channelType1
			jfeeJson.currency1='CNY'
			jfeeJson.currency2='CNY'
			jfeeJson.reqheaddto.interfcode='0'
			jfeeJson.reqheaddto.transno=this.$uiCommon.uuid(16, 32)
			jfeeJson.reqheaddto.channelcode='0'
			console.log("-----------------")
			console.log(jfeeJson);
			console.log("-----------------")
			await Jfee.getJfeeflag(jfeeJson).then((res)=>{
					let data=res.data;
						if(res.status==200){
							console.log(data)
							this.$store.state.nonCarJfeeflag=data.flag
							console.log("nonCarJfeeflag"+"="+this.$store.state.nonCarJfeeflag)
						}

			})
		},
		//如果要是修改了 汇总兑换率得话 
			checkExchangeRate2Fee(index){
				let currency= this.feeInfoVoList[index].currency
				let currency2= this.feeInfoVoList[index].currency2
				this.exchangeRate2Map.set(currency+currency2, this.feeInfoVoList[index].exchangeRate2) 
				this.$store.state.refreshFlagFee='0';
			},
			checkExchangeRate1Fee(index){
				let currency= this.feeInfoVoList[index].currency
				let currency1= this.feeInfoVoList[index].currency1
				this.exchangeRate1Map.set(currency+currency1, this.feeInfoVoList[index].exchangeRate1)  
				this.$store.state.refreshFlagFee='0';
			},
			refreshFlag(){//点击币别确定刷新各种标志
                 this.$store.state.refreshFlagFee='1';
				 if(this.$store.state.channelType1=='92'||this.$store.state.channelType1=='93'){
                        this.$store.state.refreshFlagAgent='0';
				 }else if(this.$store.state.channelType1=='h'){
                        this.$store.state.refreshFlagReins='0'; 
				 }
				 if(this.$store.state.coinsFlag!='0'){
					     this.$store.state.refreshFlagCoins='0'; 
				 }
				  if(this.$store.state.coinsFlag!='0'){
					     this.$store.state.refreshFlagCoins='0'; 
				 }
				  if(this.$store.state.agriType=='1'){
					     this.$store.state.refreshFlagAgri='0'; 
				 }
				 if(this.$store.state.businessKind=='00'&&this.$store.state.channelType1=='91'&&this.$store.state.comCode.substring(0,2)=='41'){
					      this.$store.state.refreshFlagPerformance='0'; 
				 }

			},
			getJsonFeeInfoVoList(){
				let list =[]
				for(let fee of this.feeInfoVoList){
						let obj=new feeInfoVo();
						obj.flag=fee.flag
						obj.currency=fee.currency
						obj.currencyNameFee=fee.currencyNameFee
						obj.amount=this.$uiCommon.replaced(fee.amount)
						obj.premium=this.$uiCommon.replaced(fee.premium)
						obj.currency2=fee.currency2
						obj.exchangeRate2=this.$uiCommon.replaced(fee.exchangeRate2)
						obj.amount2=this.$uiCommon.replaced(fee.amount2)
						obj.premium2=this.$uiCommon.replaced(fee.premium2)
						obj.exchangeRate1=this.$uiCommon.replaced(fee.exchangeRate1)
						obj.amount1=this.$uiCommon.replaced(fee.amount1)
						obj.premium1=this.$uiCommon.replaced(fee.premium1)
						obj.currency1=fee.currency1;
						list.push(obj)
				}
				return list
			},
	},
})