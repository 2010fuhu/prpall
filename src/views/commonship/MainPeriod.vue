<template>
  <div>
	<table class=common cellpadding="3" cellspacing="0" >
		<tr>
			<td class=formtitle>
				<img name="AddressImg" style="cursor:hand" src="@/assets/images/butCollapse.gif" @click="show()">
				<span id="spanAddressTitle">保险期间</span>
			</td>
		</tr>
	</table>
	<table ref="Period" class=common cellpadding="3" cellspacing="0" v-show="isShow" >
		<tr>
			<td class="title">保险期间：</td>
			<td  class="page" colspan=3 >
		      	<input type="hidden" name="Period_Flag">
		      	<label >自</label>
				<el-date-picker v-model="startDate" type="date"  format="yyyy-MM-dd" ref="startDate" :readonly='$route.path!="/main"'   name="endDate"  v-validate="'required'"
						value-format="yyyy-MM-dd" placeholder="终保日期" size="mini" @blur="checkStartDateForCermical();intervalmonth();changetime()">
					</el-date-picker> 日
				<!-- <input class="common4"  name="startDate" v-model="startDate" type="text"   format="yyyy-MM-dd"  :readonly='$route.path!="/main"' v-validate="'required'"
					 placeholder="起保日期" @click="SelectDate($event,'yyyy-MM-dd');" />日 -->
				<input type="text" class="common" style="width:20px" maxlength="2"  description="起保小时"
					@change="setEndHour()" @keypress="$uiCommon.pressInteger($event);" @blur="$uiCommon.checkInteger($event,0,24);"  v-model="startHour" >
					&nbsp;时
				<span id="spanEndDate">
					起&nbsp;至
					<el-date-picker v-model="endDate" type="date"  format="yyyy-MM-dd" ref="endDate" :readonly='$route.path!="/main"'   name="endDate"  v-validate="'required'"
						value-format="yyyy-MM-dd" placeholder="终保日期" size="mini" @blur="checkEndDateForCermical();intervalmonth();changetime()">
					</el-date-picker> 
					<!-- <input class="common4" v-model="endDate" type="text" ref="endDate" :readonly='$route.path!="/main"'   v-validate="'required'"
						placeholder="终保日期" size="mini"  @click="SelectDate($event,'yyyy-MM-dd');"> -->
					&nbsp;日
					<input type="text" name="endHour" class="common" style="width:20px" maxlength="2" v-model="endHour" description="终保小时"
						 @keypress="$uiCommon.pressInteger($event);" @blur="$uiCommon.checkInteger($event,0,24);">
					&nbsp;时止&nbsp;&nbsp;共
					<input type="text" name="IntervalMonth" class="common" style="width:5%" maxlength="10" v-model="IntervalMonth"  readonly >个月
				</span>
            </td>
		</tr>
	</table>
    <table class="common" ref="MainMiddle"  v-show="isShow" cellpadding="3" cellspacing="0" >
		<tr id="trOperateDate">
			<td class="title" >投保日期
			</td>
			<td class="input">
				<input type="text" name="operateDate"  class="common3" description="投保日期"  ref='operateDate' v-model='operateDate'
					@blur="$uiCommon.checkFullDate($event);$uiCommon.pressFullDate($event);"
					@change="checkOperateDate()">
			</td>
			<td class="title" id="tdSignDateTitle">
				制单日期：
			</td>
			<td class="input">
				<input type="text" name="signDate" class="common3" description="制单日期" :value='signDate'
					readonly @blur="$uiCommon.checkFullDate($event);" >
			</td>
		</tr>
		<tr id="trEndorDateValidDate" v-if="$route.path=='/pgMain'||$route.path=='/reinsPgMain'">
			<td class="title" id="tdEndorDateTitle">
				批改日期：
			</td>
			<td class="input">
				<input type="text" name="endorDate" class="readonly3" readonly 
					:value="endorDate"	description="批改日期">
			</td>
			<td class="title" id="tdValidTitle">
				生效日期：
			</td>
			<td class="input">
				<input type="text" name="validDate" class="readonly3"  :value="$store.state.validDate"
					style="width: 55%" readonly description="生效日期">&nbsp;日
				<input type="text" name="validHour" class="readonly3"  :value="$store.state.validHour"
					style="width: 19%" readonly description="生效小时数">&nbsp;时
			</td>
		</tr>
</table>
  </div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainPeriod${global.show}.js`)
let MainPeriod=moduel.default
export default{
	...MainPeriod
}
</script>
