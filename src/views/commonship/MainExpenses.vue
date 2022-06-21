<template>
   <div>
    <span>
	<table ref="tbExpenses" class="common" cellpadding="0" cellspacing="0">
		<tr>
			<td class="formtitle"  colspan=4>
				<img id="ExpensesImg" name="ExpensesImg" style="cursor:hand" src="@/assets/images/butCollapse.gif" @click="show($event)">
				费用信息 
				 <input type="button" name="button_Agent_information" class="button" alt="获取费用信息" value=" 获取费用信息 "  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'" @click="getAllCommissionAmount();"> 
				 手续费率%<input type="text" name="Agent_information" class="common" style="width:20%" maxlength="9"  ref='commissionRate' v-model="commissionRate" @keypress="$uiCommon.pressDecimal($event)" @blur="$uiCommon.checkDecimal($event,8,4,'0','100')" @change='getAgentFeeRate()'>
			</td>
		</tr>
		<tr>
			<table id="Expenses" class="common" v-show="isExpensesShow" cellpadding="0" cellspacing="1">
				<tr id="trAllAgent" > 
					<td colspan="4">
						<input type="hidden" name="AgentNum" class="readonly" readonly style="width:100%;" value="0" description="总数">
						<input type="hidden" name="RefreshAllAgent_Flag" description="重新计算手续费费标志">
						<table id="AllAgent" class=list cellpadding="3" cellspacing="1" >
							<thead>
								<tr>
									<td class="centertitle" style="width:10%">序号</td>
									<td class="centertitle" style="width:15%">代理人代码</td>
									<td class="centertitle" style="width:15%">代理人名称 </td>
									<td class="centertitle" style="width:10%">手续费计算方式</td>
									<td class="centertitle" style="width:10%">手续费分成比例%</td>
									<td class="centertitle" style="width:10%">代理人手续费率%</td>
									<td class="centertitle" style="width:10%">手续费金额</td>
									<td class="centertitle" style="width:20%">中介机构业务员姓名/执业证号码</td>
								</tr>
							</thead>
							<tbody> 
								<tr ref="agentData" class="common"  v-for="(Agent,index) in agentInfoVoList" :key="index">
								    <td>
										<input type="hidden" name="CommissionType" class="readonly" readonly style="width:100%;" description="手续费类型">
										<input type="hidden" name="flag"      ref='flag'  description="批改标志"  :value="Agent.flag" >
										<input type="hidden" name="transId"   ref='transId'  class="readonly" readonly style="width:100%;" :value="Agent.transId" description="手续费计算ID">
										<input type="text"   name="serialNo"  ref='serialNo'  class="readonly" readonly style="width:100%;" :value="Agent.serialNo" description="序号">
									</td>
									<td>
										<input type="text" name="agentCode"   ref='agentCode'  class="common3" style="width:100%;"  :value="Agent.agentCode" description="代理人代码" readonly>
									</td>
									<td>
										<input type="text" name="agentName"    ref='agentName'  class="common3" style="width:100%"   :value="Agent.agentName" description="代理人名称" readonly>
										<input type="hidden" name="agreementNo" ref='agreementNo' class="common3"  :value="Agent.agreementNo" description="代理人名称" readonly>
									</td>
									<td>
								     	<input type="text" name="disPayFeeWay"  ref='disPayFeeWay' class="common3" style="width:100%"  v-if="Agent.disPayFeeWay=='0'" value="含税" description="手续费计算方式" readonly>
										<input type="text" name="disPayFeeWay"  ref='disPayFeeWay'  class="common3" style="width:100%"  v-else value="不含税" description="手续费计算方式" readonly>

									</td>
									<td>
										<input type="text" name="commissionPercent" ref='commissionPercent' class="common3" readonly style="width:100%"  :value="Agent.commissionPercent"  description="手续费分成比例" >
									</td>
									<td>
										<input type="text" name="commissionPercentReal"  ref='commissionPercentReal' class="common3" readonly style="width:100%" description="手续费率分成比例"   :value="Agent.commissionPercentReal">      
									</td>
									<td>
										<input type="text" name="commissionAmount"  ref='commissionAmount'  class="common3" readonly style="width:100%" description="手续费金额" :value="Agent.commissionAmount">
									</td>
									<td>
                                       <select name="professionalNo" class="common"  v-model="Agent.professionalNo" >
												<option value="" disabled>请选择</option>
												<option :value="AgentUser.professionalNo" v-for="AgentUser,index in Agent.AgentUserList" :key="index" >{{AgentUser.professionalNo}}-{{AgentUser.salesName}}</option>
			                            </select>
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr class="common"  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'" >
									<td id="tdbutton_AllAgent_Insert" colspan="8">
										<p align="right">
											<input type="button" name="button_Agent_Insert" class="smallbutton" alt="新增" value="+"  @click="getAllAgent();">
										</p>
									</td>
								</tr>
							</tfoot>
							<tbody>
							</tbody>
						</table>       
					</td>
				</tr>
				<tr id="trChangePremiumDisRate" style="display:none">
					<td class="title">手续/经纪费金额变化量：</td>
					<td class="input">
						<input type="text" name="ChangePremiumDisRate" class="readonly3" readonly description="手续/经纪费金额变化量">
					</td>
					<td colspan=2 class=page>&nbsp;</td>
				</tr>
				<tr id="trManageFeeRate" style="display:none">
					<td class="title">管理费比例%：</td>
					<td class="mei">
						<input type="hidden" name="ExpensesFlag2" description="录入投保单/保单时归属机构是否允许录入管理费比例标志">
						<input type="hidden" name="MaxManageFeeRate" description="最大管理费比例">
						<input type="text" name="ManageFeeRate" class="common3" maxlength="9" description="管理费比例">
                    </td>       
					<td class="mei"></td>
					<td class="mei"></td>
				</tr>
				<tr id="trDisProportionFlag1" style="display:none">
					<td class="title">特殊因子计入方式：</td>
					<td>
						<input type="text" name="DisProportionFlag1" class="readonly3" readonly description="特殊因子计入方式名称">
					</td>
					<td class="title">我方承担比例%：</td>
					<td>
						<input type="text" name="SelfRate1" class="readonly3" readonly description="特殊因子我方承担比例">
					</td>
				</tr>
				<tr id="trDisRate1" style="display:none">
					<td class="title">特殊因子比例%：</td>
					<td class="mei">
						<input type="text" name="DisRate1" class="common3" maxlength="9" description="特殊因子比例">
					</td>
					<td class="title">特殊因子金额：</td>
					<td class="mei">
						<input type="text" name="PremiumDisRate1" class="readonly3" readonly description="特殊因子金额">
					</td>
				</tr>
				<tr id="trChangePremiumDisRate1" style="display:none">
					<td class="title">特殊因子金额变化量：</td>
					<td class="mei">
						<input type="text" name="ChangePremiumDisRate1" class="readonly3" readonly description="特殊因子金额变化量">
					</td>
					<td class="mei"></td>
					<td class="mei"></td>
				</tr>
			</table>
		</tr>
	</table>
</span>
<span id="jxkh">
	<table id="tbPerformance"  class="common" cellpadding="0" cellspacing="0">
		<tr>
			<td class="formtitle"  colspan=4>
			<img id="PerformanceImg" name="PerformanceImg" style="cursor:hand" src="@/assets/images/butCollapse.gif" @click="show($event)">绩效费用信息
			<input type="button" name="button_Performance_information"  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'"  
			  :class="isButtonPerformance?'':'button'" :disabled="isButtonPerformance" alt="获取绩效费用信息" value=" 获取绩效费用信息 "   @click="getPerformance()">
            <main-performance-input  v-if="isPerformanceparentShow" v-bind:PerformanceArgs="PerformanceArgs"    @closePerformanceChild="closePerformanceChild" ></main-performance-input>
			</td>
		</tr>
		<tr>
			<input type="hidden" name="Peragreement_Flag" description="重新计算绩效费用标志">
			<input type="hidden" name="PerformanceCoinsPremium">
			<table id="Performance" class="common" v-show="isPerformanceShow" cellpadding="0" cellspacing="1">
				<tr id="trAll" > 
					<td colspan="4">
						<table id="AllPerformance" class=list cellpadding="3" cellspacing="1" >
							<thead>
								<tr>
									<td class="centertitle" style="width:10%">序号</td>
									<td class="centertitle" style="width:20%">业务员代码</td>
									<td class="centertitle" style="width:20%">业务员名称</td>
									<td class="centertitle" style="width:10%">绩效费率%</td>
									<td class="centertitle" style="width:10%">币别</td>
									<td class="centertitle" style="width:15%">绩效金额</td>
								</tr>
							</thead>
							<tbody>
								<tr  ref='Performance' class="common"  v-for="(Performance,index) in AllPerformance_Data" :key="index">
									<input type="hidden" name="MaxPerCent" :value="Performance.MaxPerCent">
									<input type="hidden" name="AllPerformance_Flag" description="批改标志"  :value="Performance.AllPerformance_Flag">
									<td><input type="text" name="PerformanceNo" class="common3" style="width:100%;" description="序号"  	   readonly   :value="Performance.PerformanceNo"></td>
									<td><input type="text" name="EveryUserCode" class="common3" style="width:100%;" description="业务员代码" 	readonly   :value="Performance.EveryUserCode"></td>
									<td><input type="text" name="EveryUserName" class="common3" style="width:100%" description="业务员名称"   	readonly   :value="Performance.EveryUserName"></td>
									<td><input type="text"  name="PerformancePercent" ref="PerformancePercent" :class="Performance.AllPerformance_Flag=='U'?'common3u':'common3'" style="width:100%" description="绩效费率%" readonly  :value="Performance.PerformancePercent"></td>
									<td><input type="text" name="PerformanceCurrency" ref="PerformanceCurrency" class="common3"  style="width:100%" description="币别" 	readonly  :value="Performance.PerformanceCurrency"></td>
									<td><input type="text" name="PerformanceFee"  	  ref="PerformanceFee" :class="Performance.AllPerformance_Flag=='U'?'common3u':'common3'"   style="width:100%" description="绩效金额"   	readonly  :value="Performance.PerformanceFee"></td>
								</tr>          
							</tbody>
							<tfoot>
								<tr class="common"  >
									<td id="tdbutton_Insert" colspan="7"></td>
								</tr>
							</tfoot>
							<tbody>
							</tbody>
						</table>       
					</td>
				</tr>
			</table>
		</tr>
	</table>
</span>
   </div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainExpenses${global.show}.js`)
let MainExpenses=moduel.default
//import MainExpenses from  '@/pubJs/MainExpenses.js'
export default {
  ...MainExpenses
}

</script>

