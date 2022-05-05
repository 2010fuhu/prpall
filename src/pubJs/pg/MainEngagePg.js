import {showPage} from '@/pubJs/UICommon.js'
  class engageInfoVo {
          constructor() {
            this.serialNo=''
            this.clauseCode=''
            this.clauses=''
            this.titleName=''
            this.lineNo=''
			this.titleFlag=''
			this.flag=''
        }
  }
   export default { 
        name:'Engage',
        data(){
          return{
            isShow:false,
			engageInfoVoList:[],//特别约定数据
			clauseInfoVoList:[],//特别约定代码option
            clauses:'',
			ClausesContextMap:new Map()
          }
        },
		 watch:{
              engageInfoVoList:{
				  handler(){
					  for(let i=0; i<this.engageInfoVoList.length;i++){
						  this.engageInfoVoList[i].serialNo=i+1;
					  }
				  }
			  }
		 },
        methods:{
		  engageShow(index){ 
			  if(this.$refs.ClausesContextSpan[index].style.display==''){
				  this.$refs.ClausesContextSpan[index].style.display='none'
			  }else{ 
                 this.$refs.ClausesContextSpan[index].style.display='';
			  }
		   },
          showPage() {
              this.isShow=showPage(this.isShow);
           },
		   initSelected(data){
              this.clauseInfoVoList=data.clauseInfoVoList;
              this.clauseInfoVoList.forEach(item=>{
                  this.ClausesContextMap.set(item.clausecode, item.context)

			  })
		   },
		   initEngageData(orderData){
			let data=orderData.engageInfoVos.filter(ele=>{
			  return  ele.clauseCode!='TX001'
			}) 
			this.engageInfoVoList=data
			if(this.engageInfoVoList.length>0){
				this.$nextTick(()=>{
					this.$uiCommon.setTitle(this.$refs.engageData)
					this.$uiCommon.addevent(this,'engageInfoVoList')
				})
			}
		  },
		   //生成交费特别约定
			 generatePlanEngage() { //批改部分 暂时注释调用 不通过币别确定 自动生成特别约定
				// //定义变量
				// var strClauseCodePlan = "T0013"; //代码
				// var strClauseNamePlan = "分期缴费约定"; //名称
				// var strClausesContextPlan = ""; //内容
				// var intPayTimes = parseInt(this.$parent.$refs.Mainplan.payTimes,10); //交费次数
				// var index = -1;
				// var i = 0;
				// //检查特别约定中存在该特约，并定位index
				// for (i=0;i<this.engageInfoVoList.length;i++) {
				// 	if (this.engageInfoVoList[i].clauseCode==strClauseCodePlan) {
				// 		index = i;
				// 		break;
				// 	}
				// }
				// //检查交费次数
				// if (intPayTimes<=1) {//交费次数<=1
				// 	if(index>0) {
				// 		this.deleteEngage(index);
				// 		return;
				// 	}
				// } else {//交费次数>1
				// 	if(index<0) {
				// 	//增加一条，并赋代码、名称
				// 	    this.showPage();
				// 	    this.insertEngage();
				// 		index = this.engageInfoVoList.length-1;
				// 		this.clauseInfoVoList.push({
				// 			"clausecname": strClauseNamePlan,
				// 			"clausecode": strClauseCodePlan,
				// 		});
				// 		this.engageInfoVoList[index].clauseCode=strClauseCodePlan;
				// 	} else {//index>0
				// 		//清空内容
				// 		this.engageInfoVoList[index].clauses="";
				// 	}
				// 	//生成固定特约内容
				// 	strClausesContextPlan += ""+  "兹经双方同意，本保险单项下的保险费按下列计划分期交付：\r\n"
				// 	let PlanData=this.$parent.$refs.Mainplan.planInfoVoList
				// 		for (i=0;i<PlanData.length;i++) {
				// 				strClausesContextPlan += ""
				// 					+"第"+(i+1)+"期：保费"
				// 					+PlanData[i].currency+this.$uiCommon.newString(" ",6-PlanData[i].currency.length)
				// 					+PlanData[i].PlanFee+this.$uiCommon.newString(" ",11-PlanData[i].PlanFee.length)+"，"
				// 					+"交费起期为"+PlanData[i].planStartDate+this.$uiCommon.newString(" ",11-PlanData[i].planStartDate.length)+"，"
				// 					+"交费止期为"+PlanData[i].planEndDate+this.$uiCommon.newString(" ",11-PlanData[i].planEndDate.length);
				// 		}
				// 		strClausesContextPlan += "\r\n"
				// 							+  "投保人如未在上述各交费止期前向保险人交纳约定的保险费，"
				// 							+  "本保险合同自始不生效（适用于第一期）或自当期交费止期起自动失效（适用于除第一期以外的其他各期）。";
					
				// 	this.engageInfoVoList[index].clauses = strClausesContextPlan;
				// }
			},
			insertEngage() {//新增一条特别约定
			 this.$uiCommon.insertRowForPG(this,'engageInfoVoList',new engageInfoVo())
             //this.engageInfoVoList.push(new engageInfoVo());
        	},
            deleteEngage(index) {//删除一条特别约定
             //this.engageInfoVoList.splice(index, 1);
			  // if(this.engageInfoVoList[index]==)
			   this.$uiCommon.deleteRowForPG(this,'engageInfoVoList',index)
        	},
			selectClauseCode(index){
				let flag=false;
				this.engageInfoVoList.forEach((item,key)=>{
					if(this.engageInfoVoList[index].clauseCode==item.clauseCode&&index!=key){
						flag=true
					}
				})
				if(!flag){
					this.ClausesContextMap.forEach((value,key)=>{
						if(this.engageInfoVoList[index].clauseCode==key){
							this.engageInfoVoList[index].clauses=value;
						}
					})
				}else{
					this.$alert("已有该特别约定,不能重复添加",'特别约定',{ type:'warning'})
					this.deleteEngage(index);
					return false;
				}
			}
        }
  }