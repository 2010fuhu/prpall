<template>
        <div>
			<table class=common cellpadding="3" cellspacing="0">
				<tr>
					<td class=formtitle colspan="4">按条件查询</td>
				</tr>
				<tr>
					<td class=title>保单号码：</td>
					<td class=input>
						<select class=tag name="PolicyNoSign" v-model="obj.prpCmainQueryReq.policyNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="PolicyNo" class="query" maxlength="22"  v-model="obj.prpCmainQueryReq.policyNo">
					<td class=title>投保单号码：</td>
					<td class="input">
						<select class=tag name="ProposalNoSign"  v-model="obj.prpCmainQueryReq.proposalNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="ProposalNo" class="query" maxlength="22" v-model="obj.prpCmainQueryReq.proposalNo">
					</td>
				</tr>
				<tr>
					<td class=title>合同号：</td>
					<td class=input>
						<select class=tag name="ContractNoSign" v-model="obj.prpCmainQueryReq.contractNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="ContractNo"  class="query" maxlength="21" v-model="obj.prpCmainQueryReq.contractNo"></td>
					<td class=title>印刷号：</td>
					<td class=input>
						<select class=tag name="PrintNoSign"   v-model="obj.prpCmainQueryReq.printNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="PrintNo" class="query" maxlength="21"  v-model="obj.prpCmainQueryReq.printNo">
					</td>
				</tr>
				<tr>
					<td class=title>投保人代码：</td>
					<td class=input>
						<select class=tag name="AppliCodeSign"   v-model="obj.prpCmainQueryReq.appliCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="AppliCode" class="query" maxlength="16"  v-model="obj.prpCmainQueryReq.appliCode">
					</td>
					<td class=title>投保人名称：</td>
					<td class=input>
						<select class=tag name="AppliNameSign" v-model="obj.prpCmainQueryReq.appliNameSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="AppliName" class="query" maxlength="120" v-model="obj.prpCmainQueryReq.appliName">
					</td>
				</tr>

				<tr>
					<td class=title>被保险人代码：</td>
					<td class=input>
						<select class=tag name="InsuredCodeSign"  v-model="obj.prpCmainQueryReq.insuredCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="InsuredCode" class="query" maxlength="16"  v-model="obj.prpCmainQueryReq.insuredCode">
					</td>
					<td class=title>被保险人名称：</td>
					<td class=input>
						<select class=tag name="InsuredNameSign" v-model="obj.prpCmainQueryReq.insuredNameSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="InsuredName" class="query" maxlength="120" v-model="obj.prpCmainQueryReq.insuredName"/>
					</td>
				</tr>
				<tr>
					<td class=title>起保日期：</td>
					<td class=input>
						<select class=tag name="StartDateSign" v-model="obj.prpCmainQueryReq.startDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
							</select><input name="StartDate"  v-model="obj.prpCmainQueryReq.startDate" class="query" maxlength="21" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
						</td>
					<td class=title>终保日期：</td>
					<td class=input>
						<select class=tag name="EndDateSign"  v-model="obj.prpCmainQueryReq.endDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select><input name="EndDate"     v-model="obj.prpCmainQueryReq.endDate" class="query" maxlength="21" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
				</tr>
				<tr>
					<td class=title>总保险金额：</td>
					<td class=input>
						<select class=tag name="SumAmountSign"  v-model="obj.prpCmainQueryReq.sumAmountSign">
							 <option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select><input name="SumAmount"  v-model="obj.prpCmainQueryReq.sumAmount" class="query" @keypress="$uiCommon.pressDecimal($event)">
					</td>
					<td class=title>总保险费：</td>
					<td class=input>
						<select class=tag name="SumPremiumSign" v-model="obj.prpCmainQueryReq.sumPremiumSign" >
                    	 <option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select><input name="SumPremium"  v-model="obj.prpCmainQueryReq.sumPremium"  class="query" @keypress="$uiCommon.pressDecimal($event)">
					</td>
				</tr>

				<tr>
					<td class=title>出单机构：</td>
					<td class=input>
						<select class=tag name="MakeComSign"  v-model="obj.prpCmainQueryReq.makeComSign" >
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="MakeCom" class="query" maxlength="8"  v-model="obj.prpCmainQueryReq.makeCom" >
					<td class=title>经办人代码：</td>
					<td class=input>
						<select class=tag name="HandlerCodeSign"  v-model="obj.prpCmainQueryReq.handlerCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="HandlerCode"   v-model="obj.prpCmainQueryReq.handlerCode" class="query" maxlength="10">
					</td>
				</tr>
				<tr>
					<td class=title>操作员代码：</td>
					<td class=input>
						<select class=tag name="OperatorCodeSign"  v-model="obj.prpCmainQueryReq.operatorCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="OperatorCode"  v-model="obj.prpCmainQueryReq.operatorCode" class="query" maxlength="10">
					</td>
					<td class=title>签单日期：</td>
					<td class=input>
						<select class=tag name="OperateDateSign" v-model="obj.prpCmainQueryReq.operateDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select><input name="OperateDate"  v-model="obj.prpCmainQueryReq.operateDate" class="query" maxlength="21" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
				</tr>
				<tr>
					<td class=title>输入日期：</td>
					<td class=input>
						<select class=tag name="InputDateSign"  v-model="obj.prpCmainQueryReq.inputDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select><input name="InputDate"  v-model="obj.prpCmainQueryReq.inputDate" class="query" maxlength="21" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
					<td class=title>核保人代码</td>
					<td class=input>
						<select class=tag name="UnderwriteCodeSign" v-model="obj.prpCmainQueryReq.underWriteCodeSign" >
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="UnderwriteCode"   v-model="obj.prpCmainQueryReq.underWriteCode" class="query" maxlength="10">
					</td>      
				</tr>
				<tr>
					<td class=title>核保人名称</td>
					<td class=input>
						<select class=tag name="UnderwriteNameSign" v-model="obj.prpCmainQueryReq.underWriteNameSign" >
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="UnderwriteName"  v-model="obj.prpCmainQueryReq.underWriteName"  class="query" maxlength="20">
					</td>      
					<td class=title>投保状态：</td>
					<td class=input>
						<input type="checkbox" name="UnderWriteFlag"  v-model="obj.prpCmainQueryReq.underWriteFlag" value="0">初始值
						<input type="checkbox" name="UnderWriteFlag"  v-model="obj.prpCmainQueryReq.underWriteFlag" value="1">通过
						<input type="checkbox" name="UnderWriteFlag"  v-model="obj.prpCmainQueryReq.underWriteFlag" value="2">下发修改<br>
						<input type="checkbox" name="UnderWriteFlag"  v-model="obj.prpCmainQueryReq.underWriteFlag" value="3">无需核保
						<input type="checkbox" name="UnderWriteFlag"  v-model="obj.prpCmainQueryReq.underWriteFlag" value="9">待核保
					</td>
				</tr>
				<tr>
					<td class=title>核保通过日期：</td>
					<td class=input>
						<select class=tag name="UnderwriteEndDateSign"   v-model="obj.prpCmainQueryReq.underWriteEndDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="UnderwriteEndDate"   v-model="obj.prpCmainQueryReq.underWriteEndDate" class="query" maxlength="21" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
					<td class=title>其它标志字段：</td>
					<td class=input >
						<input type="checkbox" name="OthFlag1"   v-model="obj.prpCmainQueryReq.othFlag1" value="0">新保
						<input type="checkbox" name="OthFlag1"   v-model="obj.prpCmainQueryReq.othFlag1" value="1">续保
					</td>
				</tr>
				<tr>
					<td class=title>商业分保标志：</td>
					
					<td class=input>
						<input type="checkbox" name="ReinsFlag"  v-model="obj.prpCmainQueryReq.reinsFlag" value="0">无需分保
						<input type="checkbox" name="ReinsFlag"  v-model="obj.prpCmainQueryReq.reinsFlag" value="1">合同分保
						<input type="checkbox" name="ReinsFlag"  v-model="obj.prpCmainQueryReq.reinsFlag" value="2">临时分保
					</td>
					<td class="title">联/共保标志：</td>
					<td class="input">

						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="0">独家承保
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="1">主共保
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="2">从共保<br>
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="3">主联保
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="4">从联保
						
					</td> 
				</tr>  
				<tr>
					<td class=title >业务类型字段：</td>
					<td class=input >
						<input type="checkbox" name="OthFlag2" value="0" v-model="obj.prpCmainQueryReq.othFlag2">正常
						<input type="checkbox" name="OthFlag2" value="1" v-model="obj.prpCmainQueryReq.othFlag2">分入
					</td>
					<td class=title>保单状态：</td>
					<td class=input >
						<input type="radio" name="OthFlag3" value="0" v-model="obj.prpCmainQueryReq.othFlag3">有效
						<input type="radio" name="OthFlag3" value="1" v-model="obj.prpCmainQueryReq.othFlag3">注销  
						<input type="radio" name="OthFlag3" value="2" v-model="obj.prpCmainQueryReq.othFlag3">退保    
					</td>
				</tr>
				
				<tr>
					<td class=title>是否中行缴费：</td>
					<td class=input>
						<select class=tag name="AgentoperateFlag"  v-model="obj.prpCmainQueryReq.agentOperateFlag">
							<option value="">请选择</option>
							<option value="1">是&nbsp;</option>
							<option value="0">否&nbsp;</option>
						</select>
					</td>
				</tr>
				<tr>
					<td colspan=2 class=button>
						<input name="buttonSubmit" class="button" type="button"  alt="查询"  value="查 询" @click="submitForm()">
					</td>
					<td colspan=2 class=button>
						<input name="buttonCancel" class="button" type="button"  alt="重置"  value="重 置" @click="resetForm()">
					</td>
				</tr>
			</table>
		</div>		
</template>
<script >
let obj1={}
import obj from '@/json/queryPolicyOrderList.json'
import OrderList  from '@/api/queryOrderList.js'
export default({
	data(){
		return{
			 obj
		}
	},
	mounted(){
       obj1=JSON.parse(JSON.stringify(obj))
	},
	methods:{
 		submitForm(){
            obj.reqHeader.transNo=this.$uiCommon.uuid(16,32)
			obj.reqHeader.transDate=this.$uiCommon.getCurrentDate()
            obj.reqHeader.transTime=this.$uiCommon.getCurrentTime()
			obj.reqHeader.sysUserCode=this.$store.state.userCode;
			let JsonObj=JSON.parse(JSON.stringify(obj))
			JsonObj.prpCmainQueryReq.riskCode=this.$store.state.riskCode
			JsonObj.prpCmainQueryReq.underWriteFlag=JsonObj.prpCmainQueryReq.underWriteFlag.toString()
			JsonObj.prpCmainQueryReq.othFlag1=JsonObj.prpCmainQueryReq.othFlag1.toString()
			JsonObj.prpCmainQueryReq.reinsFlag=JsonObj.prpCmainQueryReq.reinsFlag.toString()
			JsonObj.prpCmainQueryReq.coinsFlag=JsonObj.prpCmainQueryReq.coinsFlag.toString()
			JsonObj.prpCmainQueryReq.othFlag2=JsonObj.prpCmainQueryReq.othFlag2.toString()
			JsonObj.prpCmainQueryReq.othFlag3=JsonObj.prpCmainQueryReq.othFlag3.toString()
			this.queryData(JsonObj).then(()=>{
                 this.$router.push({name:'queryPolicyList',params:{Conditionobj: JsonObj}})
			}).catch((err)=>{
				 this.$router.push({path:'/UnderwriteSubmit',query:{status:'failure',message:err}})
			})
		},
		queryData(val){
		  return new Promise((resolve,reject)=>{
              OrderList.findPolicyWhereTotal(val).then((res)=>{
               if(res.data.code=='9998'||res.data.code=='9999'){
				   reject(res.data.msg)
				}else{
                   resolve()
				}
			})
		  })  
		},
		resetForm(){
			Object.assign(this.obj,JSON.stringify(obj1))
		},
	}
})
</script>