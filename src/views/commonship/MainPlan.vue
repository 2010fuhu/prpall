<template>
    <div id="plan">
      <table class="common" cellpadding="3" cellspacing="0">
          <tr>
            <td class="formtitle">
              <img name="PlanImg" style="cursor:hand" src="@/assets/images/butCollapse.gif" @click="show">
              缴费计划
              </td>
						<td id="tdPayType" class="formtitle" style="display:;width:15%">缴别
						  <select name="PayType" style="width:65%" description="缴别"
							@change="changePayType()"  v-model="PayType">
							<option value='1'>趸缴</option>
							<option value='2'>月缴</option>
							<option value='3'>季缴</option>
							<option value='4'>年缴</option>
							<option value='5'>其他</option>
						  </select>
						</td>
						<td class="formtitle" style="width:15%;text-align:right;">
              <input type="hidden" name="PlanOneTimes" v-model="PlanOneTimes">缴费
              <input type="text" name="payTimes" class="common" style="width:50px;text-align:center;"
               maxlength="4" value="1" description="缴费次数"  ref="refPayTimes"
                @keypress="$uiCommon.pressInteger($event);"
                @change="checkPayType();refreshPlan(payTimes);generatePlanEngage();"  :readonly="PayType!='5'"
                v-model="payTimes">&nbsp;次&nbsp;&nbsp;
                <!--@change="generateCoinsEngageForRepeat();"-->
            </td>
					
						<td id="tdPayMode" class="formtitle" style="width:20%">缴费方式
						  <select name="payMode" style="width:60%"   v-model="payMode" description="缴费方式">
							<option value='1'>个人缴费</option>
							<option value='2'>单位缴费</option>
							<option value='3'>单位代缴</option>
						  </select>
						</td>
          </tr>
        </table>
        <table id="Plan" v-show="isShow" class=list cellpadding="3" cellspacing="1">
          <thead>
            <tr>
              <td class="centertitle" style="width:10%">期次</td>
              <td class="centertitle" style="width:15%">缴费起期</td>
              <td class="centertitle" style="width:15%">缴费止期</td>
              <td class="centertitle" style="width:20%">币别</td>
              <td class="centertitle" style="width:20%">应缴金额</td>
              <td class="centertitle" style="width:20%">实缴金额</td>
            </tr>
          </thead>
          <tbody  id="Plan_Data"  v-if="planInfoVoList.length>0">
            <tr class=common  v-for="(plan, index) in planInfoVoList" :key="index"  >
              <td>
                <input type="hidden" name="Plan_Flag" v-model="plan.flag">
                <input type="hidden" name="payReason" v-model="plan.payReason">
                <input type="text" name="serialNo" class="readonly" readonly style="width:100%"  v-model="plan.serialNo">

                <input type="hidden" name="payNo" class="readonly"  style="width:100%"  v-model="plan.payNo">
              </td>
              <td>
                <input type="text" name="planStartDate" :class="plan.flag=='I'?'commoni':'common'" style="width:100%" :readonly="$store.state.nonCarJfeeflag=='1'? true:false" v-model="plan.planStartDate"
                  @keypress="$uiCommon.pressFullDate($event);"
                  @blur="$uiCommon.checkFullDate($event);"
                  @change="getPlanDate(index);checkPlan(index);generatePlanEngage();checkPlanFlag();" >
              </td>
              <td>
                <input type="text" name="planEndDate"  :class="plan.flag=='I'?'commoni':'common'" style="width:100%"    v-model="plan.planEndDate" ref='endDateRef'
                   @keypress="$uiCommon.pressFullDate($event);"
                   @blur="$uiCommon.checkFullDate($event);"
                   @change="getPlanStartDate(index);checkPlan(index);generatePlanEngage();checkPlanFlag();">
              </td>
              <td>
                <input type="text" name="currency"  :class="plan.flag=='I'?'commoni':'common'" readonly style="width:30%"  v-model="plan.currency">
                <input type="text" name="PrpPlanCurrencyName"  :class="plan.flag=='I'?'commoni':'common'" readonly style="width:60%" v-model="PrpPlanCurrencyName">
              </td>
              
              <td>
                <input type="text" name="planFee"  :class="plan.flag=='I'?'commoni':'common'" style="width:100%" :readonly="($route.path!='/main'&&$route.path!='/reinsMain') ||PayType=='1'" 
                  v-model="plan.planFee" 
                  @keypress="$uiCommon.pressDecimal($event);"
                  @blur="$uiCommon.checkDecimal1($event,17,2,'','');"
                  @change="changePlanFee(index);generatePlanEngage();$uiCommon.numberFormatMoney($event)"
                  @focus="setOldValue(index);$uiCommon.checkFocusZero($event)"  ref="planFee">
              </td>
              <td>
                <input type="hidden" name="delinquentFee" v-model="plan.delinquentFee" >
                <input type="text" name="payRefFee"  :class="plan.flag=='I'?'commoni':'common'" readonly style="width:100%" v-model="plan.payRefFee">
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
let moduel=require(`@/pubJs/${global.path}/MainPlan${global.show}.js`)
let MainPlan=moduel.default
export default{
   ...MainPlan
}

</script>