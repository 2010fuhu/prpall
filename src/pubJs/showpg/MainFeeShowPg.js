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
var currencyMap=new Map();	
export default ({
	data(){
        return{
		   originFeeMap:new Map(),
           isShow:false,
		   feeInfoVoList:[],//费用集合
		   currencyInfoVoList:[],//汇总币别options 
           currency2Fee:'CNY',//汇总币别
		   currency1Fee:'CNY',//支付币别
           exchangeRate1Map: new Map(),
		   exchangeRate2Map: new Map(),

		}
	},
	mounted(){},
	methods:{
		show(){
			this.isShow=!this.isShow 
		},
		initSelected(data){
			this.currencyInfoVoList=data.currencyInfoVoList;
			for(let item of this.currencyInfoVoList ){
					currencyMap.set(item.currency,item.currencyname)
			}
		},
		//投保单、保单查询 初始化方法
		initMainFeeData(orderData){
			orderData.originDataVo.feeInfoVos.forEach((item)=>{
				let orginfeeinfo=new feeInfoVo();
				orginfeeinfo.flag=item.flag//币别批改标志
				orginfeeinfo.currency=item.currency//原币代码
				orginfeeinfo.currencyNameFee=currencyMap.get(item.currency)//原币名称
				orginfeeinfo.amount=item.amount//原币保额
				orginfeeinfo.premium=item.premium//原币保费
				orginfeeinfo.currency2=item.currency2//汇总币别代码
				orginfeeinfo.exchangeRate2=item.exchangeRate2//汇总币别兑换率
				orginfeeinfo.amount2=item.amount2//汇总
				orginfeeinfo.premium2=item.premium2//汇总币别保费
				orginfeeinfo.exchangeRate1=item.exchangeRate1//支付币别兑换率
				orginfeeinfo.amount1=item.amount1//支付币别保额
				orginfeeinfo.premium1=item.premium1//支付币别保费
				orginfeeinfo.currency1=item.currency1//支付币别代码
                this.originFeeMap.set(item.currency,orginfeeinfo)
			})
			 orderData.endorseDataVo.feeInfoVos.forEach((fee,index) => {
				 let feeinfo=new feeInfoVo();
				 for(let key in fee){
					 if(key in feeinfo){
						feeinfo[key]=orderData.endorseDataVo.feeInfoVos[index][key]
					 }
					 if(key=='currency'){
						feeinfo.currencyNameFee=currencyMap.get(feeinfo[key])
					 }
				 }
				 feeinfo.flag=this.originFeeMap.get(feeinfo.currency)?this.originFeeMap.get(feeinfo.currency).flag:''
				 this.feeInfoVoList.push(feeinfo)
			 });
			 this.currency2Fee=this.feeInfoVoList[0].currency2
			 this.currency1Fee=this.feeInfoVoList[0].currency1
             this.$nextTick(()=>{
				 this.feeInfoVoList.forEach((item1,index)=>{
					if(item1.flag!=''&&item1.flag=='U'){
                         for(let key in item1){
							 if(this.$refs[key]){
								 if(this.$refs[key][index]){
									 this.$refs[key][index].title=this.originFeeMap.get(item1.currency)[key]
									 if(this.$refs[key][index].title!=item1[key]){
										
										this.$refs[key][index].className=this.$refs[key][index].className=='commonu'?'commonu':`${this.$refs[key][index].className}u`
									 }
								 }
							 }
						 }
					}
				 })
			 })
		},
		//如果要是修改了 汇总兑换率得话 
		// eslint-disable-next-line no-unused-vars
		checkExchangeRate2Fee(index){
			
		},
		// eslint-disable-next-line no-unused-vars
		checkExchangeRate1Fee(index){
		
		},
		refreshFlag(){//点击币别确定刷新各种标志

			},
	},
	
})