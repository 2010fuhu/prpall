<template>
    <div>
    <table class="common" cellpadding="3" cellspacing="0">
	    <tr>
		    <td class="formtitle" style="text-align:left">
                <img name="FeeImg" style="cursor:hand" src="@/assets/images/butCollapse.gif"
                    @click="show();">
                币别信息
                <img src="@/assets/images/markMustInput.jpg">
      		</td>
	    </tr>
    </table>         
			<table class=common ref='currencyTable' cellpadding="3" cellspacing="0" v-show="isShow">
				<tr>
					<td class="title" >
						汇总币别：
					</td>
					<td class="input" >
						<select class="common" name="currency2Fee" v-model="currency2Fee" >
							<option :value="currencyInfoVoData.currency" v-for=" currencyInfoVoData,i in currencyInfoVoList" :key="i" >
							{{currencyInfoVoData.currencyname}}</option>
						</select>
					</td>
					<td class="title">
						支付币别：
					</td>
					<td class="input">
						<select name="currency1Fee" class="common"  description="支付保费币别代码" v-model="currency1Fee">
						   <option  value="CNY">人民币</option>
						   <option  value="USD">美元</option>
						   <option  value="HKD">港币</option>
						   <option  value="AUD">澳大利亚元</option>
						</select>
						
					</td>
            	</tr>
            	<tr class=common>
            		<td colspan=4   v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'">
								<input type="button" name="button_Fee_Refresh" class="button" 
								 alt="刷新" value="确 定" @click="getJfeeFlagOnly();" >
						<font color="red">外币保单请注意填写兑换币别和兑换率！</font>
					</td>
				</tr>

				<tr v-show="false">
					<td class="title">是否在保单上显示保费：</td>
					<td class="input">
						<select name="IfFee" class="common" description="是否在保单上显示保费">
							<option value="1">是</option>
							<option value="0">否</option>
						</select>
					</td>
				</tr>
			</table>
			
			<!-- 币别信息内容 -->
			<table id="Fee" class="list" cellspacing="1" cellpadding="3"  v-show="isShow">
				<thead>
					<tr>
						<td class="centertitle" style="width:15%" rowspan="2">
							原币
						</td>
						<td class="centertitle" style="width:11%" rowspan="2">
							保额
						</td>
						<td class="centertitle" style="width:10%" rowspan="2">
							保费
						</td>
						<td class="centertitle" style="width:32%" colspan="3">
							汇总币别
						</td>
						<td class="centertitle" style="width:32%" colspan="3">
							支付币别
						</td>
					</tr>
					<tr>
						<td class="centertitle" style="width:11%">
							兑换率
						</td>
						<td class="centertitle" style="width:11%">
							保额
						</td>
						<td class="centertitle" style="width:10%">
							保费
						</td>
						<td class="centertitle" style="width:11%">
							兑换率
						</td>
						<td class="centertitle" style="width:11%">
							保额
						</td>
						<td class="centertitle" style="width:10%">
							保费
						</td>
					</tr>
				</thead>
				<tfoot>
				</tfoot>
				<tbody  ref='feeData'>
				    <tr class=common   v-for="(Fee, index) in feeInfoVoList" :key="index" >
						<!-- 原币信息 -->
						<td>
							<input type="hidden" name="flag"     ref="flag" description="币别信息批改标志" v-model="Fee.flag">
							<input type="text" name="currency"   ref="currency"  :class="(Fee.flag=='U'||Fee.flag=='')?'readonly':Fee.flag=='I'?'commoni':'readonly'"  readonly
								style="width:30%" description="原币代码" v-model="Fee.currency" >
							<input type="text" name="CurrencyNameFee"    ref="CurrencyNameFee" :class="(Fee.flag=='U'||Fee.flag=='')?'readonly':Fee.flag=='I'?'commoni':'readonly'" readonly 
								style="width:65%" description="原币名称"  v-model="Fee.currencyNameFee">
						</td>
						<td>
							<input type="text" name="amount"  ref="amount" :class="(Fee.flag=='U')?'commonu':Fee.flag=='I'?'commoni':Fee.flag==''?'readonly':'common'" readonly
								style="width:100%" description="原币保额"   v-model="Fee.amount">
						</td>
						<td>
							<input type="text" name="premium"  ref="premium" :class="(Fee.flag=='U')?'commonu':Fee.flag=='I'?'commoni':Fee.flag==''?'readonly':'common'" readonly
								style="width:100%" description="原币保费"  v-model="Fee.premium">
						</td>
						<!-- 保单汇总币别信息 -->
						<td>
							<input type="text" name="exchangeRate2"   ref="exchangeRate2"
							    :class="(Fee.flag=='U'||Fee.flag=='')?'common':Fee.flag=='I'?'commoni':'common'"
								style="width:100%" description="汇总币别兑换率"
								@keypress="$uiCommon.pressDecimal($event)"
								@change="$uiCommon.checkDecimal($event,12,8,'','');checkExchangeRate2Fee(index);"
							   v-model="Fee.exchangeRate2">
						</td>
						<td>
							<input type="text" name="amount2" ref="amount2" :class="(Fee.flag=='U')?'commonu':Fee.flag=='I'?'commoni':Fee.flag==''?'readonly':'common'" 
								readonly  style="width:100%" v-model="Fee.amount2" description="汇总币别保额">
						</td>
						<td>
							<input type="text" name="premium2" ref="premium2" :class="(Fee.flag=='U')?'commonu':Fee.flag=='I'?'commoni':Fee.flag==''?'readonly':'common'" 
							 	readonly  style="width:100%"  v-model="Fee.premium2" description="汇总币别保费">
						</td>
						<!-- 支付保费币别 -->
						<td>
							<input type="text" name="exchangeRate1"   ref="exchangeRate1"
								style="width:100%" description="支付保费币别兑换率"
								:class="(Fee.flag=='U'||Fee.flag=='')?'common':Fee.flag=='I'?'commoni':'common'"
								v-model="Fee.exchangeRate1"
								@keypress="$uiCommon.pressDecimal($event)"
								@change="$uiCommon.checkDecimal($event,12,8,'','');checkExchangeRate1Fee(index);">
						</td>
						<td>
							<input type="text" name="amount1"   ref="amount1"  :class="(Fee.flag=='U')?'commonu':Fee.flag=='I'?'commoni':Fee.flag==''?'readonly':'common'"  
								readonly style="width:100%" v-model='Fee.amount1' description="支付币别保额"  >
						</td>
						<td>
							<input type="text" name="premium1"  ref="premium1"  :class="(Fee.flag=='U')?'commonu':Fee.flag=='I'?'commoni':Fee.flag==''?'readonly':'common'"  
								readonly style="width:100%"  v-model='Fee.premium1' description="支付币别保费">
						</td>
					</tr>
				</tbody>
			</table>
    </div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainFee${global.show}.js`)
let MainFee=moduel.default
export default{
	...MainFee
}
</script>
<style scoped>
 select{
	width: 50%;
  }
</style>
 