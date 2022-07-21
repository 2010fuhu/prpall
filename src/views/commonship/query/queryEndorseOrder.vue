<template>
	<div>
		<form>
			<table class="common" cellpadding="3" cellspacing="0">
				<tr>
					<td class="formtitle" colspan="4">批单查询
						<input type="hidden" name="riskCode"  v-model="obj.prpPmainQueryReq.riskCode">
						<input type="hidden" name="policySort"  v-model="obj.prpPmainQueryReq.policySort">
					</td>
				</tr>
				<tr>
					<td class="title">批单号码：</td>
					<td class="input">
						<select name="endorseNoSign" class="tag" v-model="obj.prpPmainQueryReq.endorseNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="endorseNo" class="query" maxlength="25" v-model="obj.prpPmainQueryReq.endorseNo">
					</td>
					<td class="title">保单号：</td>
					<td class=input>
						<select name="policyNoSign" class="tag" v-model="obj.prpPmainQueryReq.policyNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="policyNo" class="query" maxlength="22" v-model="obj.prpPmainQueryReq.policyNo">
					</td>
				</tr>
				<tr>
					<td class="title">被保险人代码：</td>
					<td class=input>
						<select name="insuredCodeSign" class="tag" v-model="obj.prpPmainQueryReq.insuredCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="insuredCode" class="query" maxlength="16" v-model="obj.prpPmainQueryReq.insuredCode">
					</td>
					<td class="title">被保险人名称：</td>
					<td class=input>
						<select name="insuredNameSign" class="tag" v-model="obj.prpPmainQueryReq.insuredNameSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="insuredName" class="query" maxlength="120" v-model="obj.prpPmainQueryReq.insuredName">
					</td>
				</tr>
				<tr>
					<td class="title">批改日期：</td>
					<td class=input>
						<select name="endorDateSign" class="tag" v-model="obj.prpPmainQueryReq.endorDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="endorDate" class="query" maxlength="10" v-model="obj.prpPmainQueryReq.endorDate" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
					<td class="title">批改生效日期：</td>
					<td class=input>
						<select name="validDateSign" class="tag" v-model="obj.prpPmainQueryReq.validDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="validDate" class="query" maxlength="10" v-model="obj.prpPmainQueryReq.validDate" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
				</tr>
				<tr>
					<td class="title">经办人代码：</td>
					<td class=input>
						<select name="handlerCodeSign" class="tag" v-model="obj.prpPmainQueryReq.handlerCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="handlerCode" class="query" maxlength="10" v-model="obj.prpPmainQueryReq.handlerCode">
					</td>
					<td class="title">操作员代码：</td>
					<td class=input>
						<select name="operatorCodeSign" class="tag" v-model="obj.prpPmainQueryReq.operatorCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="operatorCode" class="query" maxlength="10" v-model="obj.prpPmainQueryReq.operatorCode">
					</td>
				</tr>
				<tr>
					<td class="title">批单印刷号：</td>
					<td class=input>
						<select name="printNoSign" class="tag" v-model="obj.prpPmainQueryReq.printNoSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="printNo" class="query" maxlength="25" v-model="obj.prpPmainQueryReq.printNo">
					</td>
					<td class="title">输入日期：</td>
					<td class=input>
						<select name="inputDateSign" class="tag" v-model="obj.prpPmainQueryReq.inputDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="inputDate" class="query" maxlength="10" v-model="obj.prpPmainQueryReq.inputDate" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
				</tr>
				<tr>
					<td class="title">核保人代码：</td>
					<td class=input>
						<select name="underWriteCodeSign" class="tag" v-model="obj.prpPmainQueryReq.underWriteCodeSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="underWriteCode" class="query" maxlength="10" v-model="obj.prpPmainQueryReq.underWriteCode">
					</td>
					<td class="title">核保人名称：</td>
					<td class=input>
						<select name="underWriteNameSign" class="tag" v-model="obj.prpPmainQueryReq.underWriteNameSign">
							<option value="=">=&nbsp;</option>
                            <option value="*">*&nbsp;</option>
						</select>
						<input name="underWriteName" class="query" maxlength="120" v-model="obj.prpPmainQueryReq.underWriteName">
					</td>
				</tr>
				<tr>
					<td class="title">核保标志：</td>
					<td class=input>
						<input type="checkbox" name="underWriteFlag" value="0" v-model="obj.prpPmainQueryReq.underWriteFlag">初始值
						<input type="checkbox" name="underWriteFlag" value="1" v-model="obj.prpPmainQueryReq.underWriteFlag">通过
						<input type="checkbox" name="underWriteFlag" value="2" v-model="obj.prpPmainQueryReq.underWriteFlag">不通过
						<br>
						<input type="checkbox" name="underWriteFlag" value="3" v-model="obj.prpPmainQueryReq.underWriteFlag">无需核保
						<input type="checkbox" name="underWriteFlag" value="9" v-model="obj.prpPmainQueryReq.underWriteFlag">待核保
						<input type="checkbox" name="underWriteFlag" value="C" v-model="obj.prpPmainQueryReq.underWriteFlag">风险累计中
					</td>
					<td class="title">核保通过日期：</td>
					<td class=input>
						<select name="underWriteValidDateSign" class="tag" v-model="obj.prpPmainQueryReq.underWriteValidDateSign">
							<option value="=">=&nbsp;</option>
                            <option value=">">&gt;&nbsp;</option>
                            <option value="<">&lt;&nbsp;</option>
                            <option value=">=">&gt;=</option>
                            <option value="<=">&lt;=</option>
                            <option value=":">:&nbsp;</option>
						</select>
						<input name="underWriteValidDate" class="query" maxlength="10" v-model="obj.prpPmainQueryReq.underWriteValidDate" @keypress="$uiCommon.pressDatetime($event)" @blur="$uiCommon.checkBetweenDate($event);">
					</td>
				</tr>
				<tr>
					<td class="title">特殊批改类型：</td>
					<td class=input colspan=3>
						<input type="checkbox" name="endorType" value="21" v-model="obj.prpPmainQueryReq.endorType">全单退保批改
						<input type="checkbox" name="endorType" value="03" v-model="obj.prpPmainQueryReq.endorType">保单遗失批改
						<input type="checkbox" name="endorType" value="19" v-model="obj.prpPmainQueryReq.endorType">保单注销批改
						<input type="checkbox" name="endorType" value="14" v-model="obj.prpPmainQueryReq.endorType">赔款后减少保额
					</td>
				</tr>
				<tr>
					<td colspan=2 class=button>
						<input name="buttonSubmit" class="button" type="button" alt="查询" value="查 询" @click="submitForm()">
					</td>
					<td colspan=2 class=button>
						<input name="buttonCancel" class="button" type="button" alt="重置" value="重 置" @click="resetForm()">
					</td>
				</tr>
			</table>
		</form>
	</div>
</template>

<script>
let obj1={}
import obj from '@/json/queryEndorseOrderList.json'
import OrderList  from '@/api/endorseOperation.js'
export default {
    name:"QueryEndorseInput",
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
			this.queryData(JsonObj).then(()=>{
                 this.$router.push({name:'queryEndorseList',params:{Conditionobj: JsonObj}})
			}).catch((err)=>{
				 this.$router.push({path:'/UnderwriteSubmit',query:{status:'failure',message:err}})
			})
		},
		queryData(val){
		  return new Promise((resolve,reject)=>{
              OrderList.findEndorseWhereTotal(val).then((res)=>{
				const resHeader=res.data.resHeader
               if(resHeader.errCode=='9998'||resHeader.errCode=='9999'){
				   reject(resHeader.errMsg)
				}else{
                   resolve()
				}
			})
		  })  
		},
		resetForm(){
			Object.assign(this.obj,JSON.parse(JSON.stringify(obj1)))
		},
	}
}
</script>

<style>

</style>