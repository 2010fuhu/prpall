import MainPerformanceInput from '@/views/commonship/MainPerformanceInput.vue'
import agencyfee from '@/api/agencyfee.js'
import commissionCal from  '@/json/commissionCal.json'
//import { uuid } from 'vue-uuid';
import {EventBus} from '@/utils/event-bus.js'
	class agentInfoVo {
	 constructor(){
		this.serialNo=''
		this.transId=''
		this.agentCode=''
		this.agentName=''
		this.agreementNo=''
		this.disPayFeeWay=''
		this.commissionPercent=''
		this.commissionPercentReal=''
		this.commissionAmount=''
		this.professionalNo=''
		this.flag=''
		this.currency=''
		this.AgentUserList=[]
	  }
	}
    export default { 
        name:'DeductibleText',
        data(){
          return{
			isButtonPerformance:false,
            isExpensesShow:false,
			isPerformanceShow:false,
			isPerformanceparentShow:false,
			isPerformanceChildShow:false,
			commissionRate:'',
			commissionRateOrg:'',
			AllPerformance_Data:[],//绩效费用集合
			agentInfoVoList:[],//手续费用结合
			PerformanceArgs:{
				isPerformanceChildShow:false,
				handlerInfoVo:[],
				payCurrency:'CNY',
				sumPremium:0
			},
			handlerInfoVo:[]//要通过这个获取归属机构数组
          }
        },
		computed:{
             computdisable(){
				
				if(this.$store.state.businessKind=='00'
				 &&this.$store.state.channelType1=='91'
				 &&this.$store.state.comCode.substring(0,2)=='41'){
                    return false
				 }else{
					return true
				 }
			 } 
		},
		watch:{
            computdisable:{
				handler(newVal) {
					
					this.isButtonPerformance=newVal
				},
				immediate:true
			}
		},
		components:{
              MainPerformanceInput
		},
        methods:{
          show(e) {
			  if(e.target.name=='ExpensesImg')
              	this.isExpensesShow=!this.isExpensesShow
			  else
			  	this.isPerformanceShow=!this.isPerformanceShow
           },
		async initExpernsesData(orderData){
			//1.初始化手续费信息
			this.agentInfoVoList=[]
			this.commissionRate=''
			this.commissionRateOrg=''
			this.AllPerformance_Data=[]
			// 代码注释调用复制投保单 保单时，手续费数据需要先点击加号生成
			if(this.$store.state.certiType=='U'){
				if(orderData.mainInfoVo.channelType1=='92'||orderData.mainInfoVo.channelType1=='93'){
					this.commissionRate=orderData.mainInfoVo.disRate
					let agentData=orderData.agentInfoVos
					let serialNo=0
					for(let item of agentData){
						let agentInfo=new agentInfoVo()
						agentInfo.serialNo=++serialNo;
						agentInfo.transId=item.transId
						agentInfo.agentCode=item.agentCode
						agentInfo.agentName=item.agentName
						agentInfo.agreementNo=orderData.mainInfoVo.agreementNo
						agentInfo.disPayFeeWay=item.disPayFeeWay	 
						agentInfo.commissionPercent=item.commissionPercent
						agentInfo.commissionPercentReal=item.commissionPercent* this.commissionRate*0.01
						agentInfo.commissionAmount=item.commissionAmount
						agentInfo.professionalNo=item.professionalNo
						agentInfo.AgentUserList.push({professionalNo:item.professionalNo,salesName:item.professionalName})
						this.agentInfoVoList.push(agentInfo)
					}
				    await this.getselectagentusernameinfo()
				}
			
			 //2初始化河南绩效费用信息
			 	if(orderData.mainInfoVo.comCode.substring(0,2)=='41'){
					 if(orderData.handlerInfoVos.length>0){
						 if(orderData.handlerInfoVos[0].currency!=null&&orderData.handlerInfoVos[0].currency!=''){
							//this.$store.state.refreshFlagPerformance='0'
							this.AllPerformance_Data=[];
							let val=orderData.handlerInfoVos
							let count=0
							for(var item of  val ){
								let obj={
									MaxPerCent:'',
									AllPerformance_Flag:'',
									PerformanceNo:++count,
									EveryUserCode:item.handlerCode,
									EveryUserName:item.handlerName,
									PerformancePercent:item.performanceRate,
									PerformanceCurrency:item.currency,
									PerformanceFee:item.performanceAmount
								}
								this.AllPerformance_Data.push(obj)
							}
						 }
					 }
			 	}
			} 
		},
           getPerformance(){//获取绩效费用
		       if(this.$store.state.comCode.substring(0,2)=='41'){
				    if(this.$parent.$refs.MainHead.checkPerforPercentage()){
						if(this.$store.state.refreshFlagFee=='0'){
                         	this.$alert('请先点击币别确定计算保费！！！','币别信息',{ type:'warning'});
                            return false;
						}else{
							this.isPerformanceparentShow=this.PerformanceArgs.isPerformanceChildShow=true
							//this.isPerformanceparentShow=this.PerformanceArgs.isPerformanceChildShow=true
							this.PerformanceArgs.handlerInfoVo=this.$parent.$refs.MainHead.handlerInfoVo;
							this.PerformanceArgs.payCurrency=this.$store.state.currency1Fee;
							this.PerformanceArgs.sumPremium=this.$store.state.sumPremium1;
						}
					}else{ return false}
			   }else{
				    this.$alert('非河南机构无法获取绩效费用','获取绩效费用信息',{ type:'warning'});
					return false 
			   }   
		   },
		   closePerformanceChild(type,val){
			   if(type=='add'){
				  
				  this.AllPerformance_Data=[];
				  for(var item of val ){
                      let obj={
						  MaxPerCent:'',
                          AllPerformance_Flag:'',
                          PerformanceNo:item.no,
						  EveryUserCode:item.handlerCode,
						  EveryUserName:item.handlerName,
						  PerformancePercent:item.performancePercent,
						  PerformanceCurrency:'CNY',
						  PerformanceFee:item.performanceFee
					  }
					  this.AllPerformance_Data.push(obj)
				  }
			   }
			   this.isPerformanceparentShow=false;
			   this.PerformanceArgs.isPerformanceChildShow=false;
		   },

		   getAllCommissionAmount(){//获取手续费费用信息
			     if(this.$store.state.refreshFlagFee=='0'){
						this.$alert('请点击币别确定计算汇总与支付保费','获取费用信息',{ type:'warning'});
						return  false;
				 }
		         if(this.agentInfoVoList.length<=0){
						this.$alert('请点击加号获取代理人相关信息','获取费用信息',{ type:'warning'});
						return  false;
				 }
				//组织JSON数据
				this.commissionJsonGenerate();
				this.$store.state.refreshFlagAgent='1';//刷新手续费计算标志
		   },
           async commissionJsonGenerate(){
               //组织agencyFeeMainInfoReq对象
               commissionCal.agencyFeeMainInfoReq.agentRate=this.commissionRate;
               commissionCal.agencyFeeMainInfoReq.agreementNo=this.agentInfoVoList[0].agreementNo;
               commissionCal.agencyFeeMainInfoReq.businessType='P';
               commissionCal.agencyFeeMainInfoReq.comCode=this.$store.state.comCode;
               commissionCal.agencyFeeMainInfoReq.currency=this.$store.state.currency1Fee;
               commissionCal.agencyFeeMainInfoReq.disPayFeeWay=this.agentInfoVoList[0].disPayFeeWay;
               commissionCal.agencyFeeMainInfoReq.startDate=this.$store.state.startDate;
               commissionCal.agencyFeeMainInfoReq.endDate=this.$store.state.endDate;
               commissionCal.agencyFeeMainInfoReq.endorType='';
               commissionCal.agencyFeeMainInfoReq.isRation='0'
               commissionCal.agencyFeeMainInfoReq.isCoreCargo='0'
               commissionCal.agencyFeeMainInfoReq.minPremium='0'
               commissionCal.agencyFeeMainInfoReq.policyNo=''
               commissionCal.agencyFeeMainInfoReq.riskCode=this.$store.state.riskCode;
               commissionCal.agencyFeeMainInfoReq.transId=this.agentInfoVoList[0].transId;
               //生成kindInfoVoList JSON数据
               let kindList= this.$parent.$refs.MainItemkind.kindInfoListGenerate()
			   let exchangeRate1Map=new Map();
			   let currency1Fee=this.$parent.$refs.MainFee.currency1Fee
			   for(let item of this.$parent.$refs.MainFee.feeInfoVoList){
				   exchangeRate1Map.set(item.currency+"-"+item.currency1,item.exchangeRate1) 
			   }
               console.log(exchangeRate1Map.get("CNY-CNY"));
			   let kindInfoVoList=[];
			   for (let kinditem of kindList){
                      let obj={ 
						"chgPremium":"",//批改得时候使用chgPremium
						"currency": kinditem.currency,
						"exchangeRate":exchangeRate1Map.get(kinditem.currency+"-"+currency1Fee)==null?'1.0000':exchangeRate1Map.get(kinditem.currency+"-"+currency1Fee),
						"kindCode":kinditem.kindCode,
						"premium": this.$uiCommon.replaced(kinditem.premium)
					}
					kindInfoVoList.push(obj);
			   }
			   commissionCal.agencyFeeMainInfoReq.kindInfoVoList=kindInfoVoList;
			//组织reqHeader对象
				commissionCal.reqHeader.channelCode='0';
				commissionCal.reqHeader.sign='1'
				commissionCal.reqHeader.sysPassWord='7777'
				commissionCal.reqHeader.sysUserCode=this.$store.state.userCode;
				let day = new Date();
				day.setTime(day.getTime());
				let  currentDay = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
				commissionCal.reqHeader.transDate=currentDay;
				commissionCal.reqHeader.transNo=this.$uiCommon.uuid(16, 32);
				commissionCal.reqHeader.transTime=""
				let result= await this.agencyfee(commissionCal);
				let agentInfoVoList= result.agencyFeeMainInfoRes.agentInfoVoList
				console.log("------------------------------------------------")
				console.log(agentInfoVoList)
				for(let index  in this.agentInfoVoList){
					 for(let resultindex in agentInfoVoList ){
                        if(agentInfoVoList[resultindex].agentCode==this.agentInfoVoList[index].agentCode){
							this.agentInfoVoList[index].commissionAmount=agentInfoVoList[resultindex].agencyFee
							console.log(this.agentInfoVoList[index].commissionAmount)
							this.agentInfoVoList[index].transId=result.agencyFeeMainInfoRes.transId
							break;
						}
					 }
				}
				EventBus.$emit('AgentInfo',this.agentInfoVoList)
				EventBus.$emit('AgentInfoRate',this.commissionRate)
           },
		   agencyfee(val){
              let commissionCal=val;
			  return new Promise((resolve)=>{
				agencyfee.getagencyfee(commissionCal).then(res=>{
                       if(res.status==200){
						 resolve(res.data)
					   }
				})
			  })
		   },
		   agencyfee01(val){
			let commissionCal=val;
			 new Promise((resolve)=>{
				agencyfee.getagencyfee(commissionCal).then(res=>{
						if(res.status==200){
						resolve(res.data)
						}
				}).then(()=>{
					
				})
			})
		 },
		
		   //加号按钮 获取代理协议对应的手续费相关代理人信息
		   getAllAgent(){
			   if(this.agentInfoVoList.length>0){
				   this.agentInfoVoList=[];
			   }
               let commissionType=this.$parent.$refs.MainHead.agreementNo;
			   if(this.checkAgentCondition(commissionType)){
                    this.getagentInfoVoListByasync(commissionType);
			   }
		   },
		    checkAgentCondition(commissionType)//校验是否录入代理人协议号
			{
				
                let  strPolicyTpye='';
				let  strEDITTYPE=this.$store.state.editType;
				let  riskCode=this.$store.state.riskCode;
				let  Model='0';
				if(strPolicyTpye == "02")
				{
				if( strEDITTYPE == "NEW" || strEDITTYPE == "COPY_PROPOSAL"  ||  strEDITTYPE == "COPY_POLICY")
				{       
					    this.$alert('需要您在修改此投保单的时候获取手续费信息！！！','获取费用信息',{ type:'warning'});
						return false;
				}else{
						if(commissionType=="")
						{
							this.$alert('请正确输入协议','获取费用信息',{ type:'warning'});
							return false;
						}
						return true;
						}
				}else if(riskCode=="9999"&&Model=="0"){
					return true;
				}else{
				if(commissionType=="")
				{
					this.$alert('请正确输入协议','获取费用信息',{ type:'warning'});
					return false;
				}
				return true;
				}
			},
			async getagentInfoVoListByasync(commissionType){
                await  this.getagreementagentinfo(commissionType)
				await  this.getselectagentusernameinfo();
				
			},
			async  getagreementagentinfo(commissionType){
                      let comCode=this.$store.state.comCode;
					  let  riskCode=this.$store.state.riskCode;
					  let  _this=this;
                await  agencyfee.getselectagentdetailinfo(comCode, riskCode,commissionType).then(response => {
						let data = response.data.data
						if(response.status==200){
							 let list=data.agentDetailSubInfoVoList;
							for(let i=0;i<list.length;i++){
								let obj =new agentInfoVo();
								obj.serialNo=list[i].serialNo
								obj.agentCode=list[i].agentCode
								obj.agentName=list[i].agentName
								obj.agreementNo=data.agreementNo
								obj.disPayFeeWay=data.disPayFeeWay
								obj.commissionPercent=list[i].commissionPercent
								obj.commissionPercentReal=list[i].commissionPercentReal
							  //得到手续费用集合
							  _this.agentInfoVoList.push(obj);
							  //给页面手续费率赋值
							  _this.commissionRate=data.disRate
							  _this.commissionRateOrg=data.disRate
							}
						}
					}).catch(error => {
						console.log("error", error);
					})
			},
		     getselectagentusernameinfo(){
				    let usernameinfoArray=[];
				    this.agentInfoVoList.forEach(item => {
					      usernameinfoArray.push(this.getagentusernameSingle(item));
						})
				   Promise.all(usernameinfoArray).then(result=>{
                        for( let key in  this.agentInfoVoList){
                               for(let obj of result){
                                     if(obj.agentCode==this.agentInfoVoList[key].agentCode&&obj.professionalArr!=null){
										   	 this.agentInfoVoList[key].AgentUserList=obj.professionalArr;
									}
							   }
						}
				}).catch(error => {
						console.log("error", error);
				})
			},
            getagentusernameSingle(item){
                   	return  new Promise((resolve,reject)=>{
					   	agencyfee.getselectagentusernameinfo(item.agentCode).then(res=>{
							let data=res.data.data;
					        let obj={agentCode:item.agentCode,
							 professionalArr:[]}
							if(res.status==200){
							  if(data!=null){
								obj.professionalArr=data;
							  }else{
								  obj.professionalArr=null;
							  }
							  resolve(obj)
							}else{
								reject("出错了");
							}
						})
					}).catch((err)=>{ new Error(err)})
			},
			getAgentFeeRate(){//修改手续费率 同时计算代理人手续费率
                //1首先拿到修改后的手续费率 
				 let  Rate=parseFloat(this.commissionRate)
			     let  commissionRateOrg=parseFloat(this.commissionRateOrg)
				 if(isNaN(Rate)){ Rate=0;}
				 if(isNaN(commissionRateOrg)){ commissionRateOrg=0;}
				 if(Rate>commissionRateOrg){
                     this.$alert('修改后的手续费率不大于原手续费率!!!','手续费信息',{ type:'warning'}); 
					 return false;
				 }else if(Rate<commissionRateOrg){
                      //2循环手续费集合，拿到从代理
					  for (let i=0; i< this.agentInfoVoList.length;i++){
                             this.agentInfoVoList[i].commissionPercentReal=(parseFloat(this.agentInfoVoList[i].commissionPercent)*Rate/100).toFixed(2)

					  }
					 this.$alert('请重新点击获取手续费!','手续费信息',{ type:'warning'}); 
					 return true;
				 }
				
			},
			calculateCommissionPercentreal(){//计算代理人手续费率方法
               // for (let index in  this.AllPerformance_Data){
			//		   this.AllPerformance_Data[index].CommissionPercentreal=
			//	}    

			},
			getJsonAgentInfoVoList(){
			   let agentInfoVoList=new Array()
			   for(let item of this.agentInfoVoList){
					let obj={
						agentCode:item.agentCode,
						agentName:item.agentName,
						agreementNo:item.agreementNo,
						disPayFeeWay:item.disPayFeeWay,
						commissionPercent:item.commissionPercent,
						commissionAmount:item.commissionAmount,
						transId:item.transId,
						professionalName:'',
						professionalNo:item.professionalNo,
						currency:this.$store.state.currency1Fee,
						flag:item.flag
					}
					for(let user of  item.AgentUserList ){
						if(user.professionalNo==obj.professionalNo){
							obj.professionalName=user.salesName
							break;
						}
					}
                    agentInfoVoList.push(obj)
				}
				return  agentInfoVoList
			}
        }
  }
