<template>
      <div>
			<table class=common cellpadding="3" cellspacing="0">
				<tr>
					<td class=formtitle colspan="4">按条件查询</td>
				</tr>
				<tr>
					<td class=title>投保单号码：</td>
					<td class="input" >
						<select class=tag name="ProposalNoSign" v-model="obj.prpCmainQueryReq.proposalNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="ProposalNo" class="query" maxlength="22" v-model="obj.prpCmainQueryReq.proposalNo">
					</td>
				</tr>
				<tr>
					<td class=title>合同号：</td>
					<td class=input>
						<select class=tag name="ContractNoSign" v-model="obj.prpCmainQueryReq.contractNoSign">
                            <option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
					    </select>
					<input name="ContractNo" class="query" maxlength="21"  v-model="obj.prpCmainQueryReq.contractNo"></td>
					<td class=title>印刷号：</td>
					<td class=input>
						<select class=tag name="PrintNoSign"  v-model="obj.prpCmainQueryReq.printNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="PrintNo" class="query" maxlength="21"  v-model="obj.prpCmainQueryReq.printNo">
					</td>
				</tr>
				<tr>
					<td class=title>投保人代码：</td>
					<td class=input>
						<select class=tag name="AppliCodeSign"  v-model="obj.prpCmainQueryReq.appliCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="AppliCode" class="query" maxlength="16" v-model="obj.prpCmainQueryReq.appliCode">
					</td>
					<td class=title>投保人名称：</td>
					<td class=input>
						<select class=tag name="AppliNameSign" v-model="obj.prpCmainQueryReq.appliNameSign">
						    <option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="AppliName" class="query" maxlength="120" v-model="obj.prpCmainQueryReq.appliName">
					</td>
				</tr>
				<tr>
					<td class=title>被保险人代码：</td>
					<td class=input>
						<select class=tag name="InsuredCodeSign"  v-model="obj.prpCmainQueryReq.insuredCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="InsuredCode" class="query" maxlength="16"  v-model="obj.prpCmainQueryReq.insuredCode">
					</td>
					<td class=title>被保险人名称：</td>
					<td class=input>
						<select class=tag name="InsuredNameSign"  v-model="obj.prpCmainQueryReq.insuredNameSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="InsuredName" class="query" maxlength="120"  v-model="obj.prpCmainQueryReq.insuredName">
					</td>
				</tr>
				<tr>
					<td class=title>起保日期：</td>
					<td class=input>
						<select class=tag name="StartDateSign"    v-model="obj.prpCmainQueryReq.startDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="StartDate" class="query" maxlength="21"  description="起保日期" v-model="obj.prpCmainQueryReq.startDate" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
					<td class=title>终保日期：</td>
					<td class=input>
						<select class=tag name="EndDateSign"  v-model="obj.prpCmainQueryReq.endDateSign" >
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="EndDate" class="query" maxlength="21" description="终保日期"   v-model="obj.prpCmainQueryReq.endDate" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
				</tr>
				<tr>
					<td class=title>总保险金额：</td>
					<td class=input>
						<select class=tag name="SumAmountSign"  v-model="obj.prpCmainQueryReq.sumAmountSign" >		
                            <option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="SumAmount" class="query"  v-model="obj.prpCmainQueryReq.sumAmount"   @keypress="$uiCommon.pressDecimal($event)">
					</td>
					<td class=title>总保险费：</td>
					<td class=input>
						<select class=tag name="SumPremiumSign"  v-model="obj.prpCmainQueryReq.sumPremiumSign"  >
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="SumPremium" class="query"  v-model="obj.prpCmainQueryReq.sumPremium"  @keypress="$uiCommon.pressDecimal($event)">
					</td>
				</tr>
				<tr>
					<td class=title>出单机构：</td>
					<td class=input>
						<select class=tag name="MakeComSign"  v-model="obj.prpCmainQueryReq.makeComSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="MakeCom" class="query" maxlength="8"   v-model="obj.prpCmainQueryReq.makeCom">
					</td>
					<td class=title>经办人代码：</td>
					<td class=input>
						<select class=tag name="HandlerCodeSign"  v-model="obj.prpCmainQueryReq.handlerCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select><input name="HandlerCode" class="query" maxlength="10"  v-model="obj.prpCmainQueryReq.handlerCode"  ></td>
				</tr>
				<tr>
					<td class=title>操作员代码：</td>
					<td class=input>
						<select class=tag name="OperatorCodeSign"   v-model="obj.prpCmainQueryReq.operatorCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="OperatorCode" class="query" maxlength="10"   v-model="obj.prpCmainQueryReq.operatorCode">
					</td>
					<td class=title>制单日期：</td>
					<td class=input>
						<select class=tag name="OperateDateSign"  v-model="obj.prpCmainQueryReq.operateDateSign">
						   <option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="OperateDate" class="query" maxlength="21"  description="制单日期"  v-model="obj.prpCmainQueryReq.operateDate"  @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
				</tr>
				<tr>
					<td class=title>输入日期：</td>
					<td class=input>
						<select class=tag name="InputDateSign"    v-model="obj.prpCmainQueryReq.inputDateSign" >
                            <option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
                        </select>
						<input name="InputDate" class="query" maxlength="21" description="输入日期"   v-model="obj.prpCmainQueryReq.inputDate" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">

					</td>
					<td class=title>核保人代码：</td>
					<td class=input>
						<select class=tag name="UnderwriteCodeSign"    v-model="obj.prpCmainQueryReq.underWriteCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="UnderwriteCode" class="query" maxlength="10"  v-model="obj.prpCmainQueryReq.underWriteCode">
					</td>
				</tr>
				<tr>
					<td class=title>核保人名称：</td>
					<td class=input>
						<select class=tag name="UnderwriteNameSign"  v-model="obj.prpCmainQueryReq.underWriteNameSign">
						    <option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="UnderwriteName" class="query" maxlength="20"   v-model="obj.prpCmainQueryReq.underWriteName">
					</td>
					<td class=title>投保状态：</td>
					<td class=input>
						<input type="checkbox" name="UnderWriteFlag"   v-model="obj.prpCmainQueryReq.underWriteFlag"  value="0">初始值
						<input type="checkbox" name="UnderWriteFlag"   v-model="obj.prpCmainQueryReq.underWriteFlag"  value="1">通过
						<input type="checkbox" name="UnderWriteFlag"   v-model="obj.prpCmainQueryReq.underWriteFlag"  value="2">下发修改<br>
						<input type="checkbox" name="UnderWriteFlag"   v-model="obj.prpCmainQueryReq.underWriteFlag"  value="3">无需核保
						<input type="checkbox" name="UnderWriteFlag"   v-model="obj.prpCmainQueryReq.underWriteFlag"  value="9">待核保
					</td>
				</tr>
				<tr>
					<td class=title>核保通过日期：</td>
					<td class=input>
						<select class=tag name="UnderwriteEndDateSign" v-model="obj.prpCmainQueryReq.underWriteEndDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                         	<option value=":">:&nbsp;</option>
	 					</select>
						<input name="UnderwriteEndDate" class="query"  maxlength="21"   description="核保通过日期"  v-model="obj.prpCmainQueryReq.underWriteEndDate" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
					<td class=title>其它标志字段：</td>
					<td class=input >
						<input type="checkbox" name="OthFlag1" v-model="obj.prpCmainQueryReq.othFlag1" value="0">新保
						<input type="checkbox" name="OthFlag1" v-model="obj.prpCmainQueryReq.othFlag1"  value="1">续保
						<select  name="OthFlag4" style="width:100" v-model="obj.prpCmainQueryReq.othFlag4">
							<option value="0" selected>有效</option>
							<option value="2">废弃/超时注销</option>
							<option value="3">拒保</option>
							<option value="">所有</option>
						</select>  
					</td>
				</tr>
				<tr>
					<td class="title">联/共保标志：</td>
					<td class="input">
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="0">独家承保
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="1">主共保
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="2">从共保
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="3">主联保
						<input type="checkbox" name="CoinsFlag"  v-model="obj.prpCmainQueryReq.coinsFlag"  value="4">从联保
		     		</td>
				</tr>
				<tr>
					<td colspan=2 class=button>
						<input name="buttonSubmit" class="button" type="button"  value="查 询" alt="查询"  @click="submitForm()">
					</td>
					<td colspan=2 class=button>
						<input name="buttonCancel" class="button" type="button" value="重 置" alt="重置"   @click="resetForm()">
					</td>
				</tr>
			</table>
      </div>
</template>
<script>
import obj from '@/json/queryOrderList.json'
import OrderList  from '@/api/queryOrderList.js'
let obj1={}
export default({
	data(){
		return{
			obj,
		//transNo:obj.reqHeader.transNo
      }
	},
	mounted(){
       obj1=JSON.parse(JSON.stringify(obj))//为了记录初始化时候obj对象中属性的初始值
	},
	methods:{
		submitForm(){
			//1需要组织 reqHeader
			obj.reqHeader.transNo=this.$uiCommon.uuid(16,32)
			obj.reqHeader.transDate=this.$uiCommon.getCurrentDate()
            obj.reqHeader.transTime=this.$uiCommon.getCurrentTime()
			obj.reqHeader.sysUserCode=this.$store.state.userCode;
			let JsonObj=JSON.parse(JSON.stringify(obj))
			JsonObj.prpCmainQueryReq.riskCode=this.$store.state.riskCode
			JsonObj.prpCmainQueryReq.underWriteFlag=JsonObj.prpCmainQueryReq.underWriteFlag.toString()
			JsonObj.prpCmainQueryReq.othFlag1=JsonObj.prpCmainQueryReq.othFlag1.toString()
			JsonObj.prpCmainQueryReq.coinsFlag=JsonObj.prpCmainQueryReq.coinsFlag.toString()
			this.queryData(JsonObj).then(()=>{
                 this.$router.push({name:'queryProposalList',params:{Conditionobj: JsonObj}})
			}).catch((err)=>{
				 this.$router.push({path:'/UnderwriteSubmit',query:{status:'failure',message:err}})
			})
		},
		queryData(val){
		  return new Promise((resolve,reject)=>{
              OrderList.findProposalWhereTotal(val).then((res)=>{
               if(res.data.code=='9998'||res.data.code=='9999'){
				   reject(res.data.msg)
				}else{
                   resolve()
				}
			})
		  })  
		},
		resetForm(){
			Object.assign(this.obj,JSON.parse(JSON.stringify(obj1)))
			console.log(this.obj)
		},
	}
})
</script>