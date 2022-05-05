<template>
    <div>
		<table  class="common" cellpadding="3" cellspacing="0">
			<tr>
				<td class="formtitle" colspan="4">
					<img id="EngageImg" name="EngageImg" style="cursor:hand" src="@/assets/images/butCollapse.gif" @click="showPage()">
					特约及附加信息
				</td>
			</tr>
		</table>		
			<table id="Engage"  class="list"  cellpadding="3" cellspacing="1" v-show="isShow">
				<thead>
					<tr>
						<td class="centertitle" width="25%">序号</td>
						<td class="centertitle" width="25%">特约名称</td>
						<td class="centertitle" width="25%">特约内容</td>
						<td class="centertitle" width="25%" v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >&nbsp;</td>
					</tr>
				</thead>
				<tfoot>
					<tr  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'">
						<td colspan="5"  align="right" class=mei>
							<input type="button" name="button_Engage_Insert" class="button" alt="新增" value="新 增" @click="insertEngage()" ref="button_Engage_Insert">
						</td>
					</tr>
				</tfoot>
				<tbody>
					<tr class=common  ref="engageData" v-for="(engageData,index) in engageInfoVoList" :key="index">
						<td>
							<input type="hidden" name="flag" description="特约及附加信息批改标志" :value="engageData.flag" >
							<input class="common" type="text" name="serialNo"  ref="serialNo" readonly style="width:100%"  description="特约及附加信息页面显示序号" :value='engageData.serialNo'>
						</td>
						<td>
							<select  name="clauseCode" ref="clauseCode" class="common"   style="width:100%" description="特别约定代码" v-model="engageData.clauseCode" @change="selectClauseCode(index);" :disabled="engageData.clauseCode=='T0013'">
								<option value="" disabled>请选择</option>
								<option :value="clauseInfoVoData.clausecode" v-for=" clauseInfoVoData,i in clauseInfoVoList" :key="i" >{{clauseInfoVoData.clausecname}}</option>
							</select>
						</td>
						<td align=center>
						<input type="button" name="button_Engage_Context_Open" class="button" alt="查看" value="......" @click="engageShow(index)">
							<span id="span_Engage_Context"  style="width:520;position:absolute;left:269px; top:1012px;background-color:C0C0C0;display:none;" 
							      ref="ClausesContextSpan">
								<table class=list cellpadding="3" cellspacing="1"  >
									<tr class=common>
										<td>
											<textarea type="text" class='common' name="clauses" ref="clauses" v-model="engageData.clauses"  rows="20" cols="100"
												description="特别约定内容" :readonly="engageData.clauseCode=='T0013'">
												</textarea>
										</td>
									</tr>
									<tr class=common>
										<td>
											<input type="button" name="button_Engage_Context_Close" class="button" alt="确定" value="确 定"
												@click="engageShow(index)">
										</td>
									</tr>
								</table>
							</span>	
						</td>
						<td  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'">  
							<p align="right"><input type="button" name="button_Engage_Delete" class="button" alt="删除" value="删 除"
								@click="deleteEngage(index)"></p>
						</td>
					</tr>
				</tbody>
			</table>
</div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainEngage${global.show}.js`)
let MainEngage=moduel.default
//import MainEngage from '@/pubJs/MainEngage.js'
export default{
	...MainEngage
}
</script>