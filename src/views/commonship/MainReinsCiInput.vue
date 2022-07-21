<template>
  <table class="common" cellpadding="3" cellspacing="0">
    <tr>
      <td class="common" style="text-align:left">
        <img name="MainReinsCiImg" style="cursor:hand" src="@/assets/images/butCollapse.gif"
          @click="show()">
        分入信息<img src="@/assets/images/markMustInput.jpg"><br>
        <table id="MainReinsCi" class="common" style="" border="0" v-show="MainReinsCiShow">
          <thead>
            <tr>
              <td class="centertitle" style="width:6%">我司比例(offered)%</td>
              <td class="centertitle" style="width:6%">我司比例(signed)%</td>
              <td class="centertitle" style="width:8%">分入保额</td>
              <td class="centertitle" style="width:8%">不含税分入保费</td>
              <td class="centertitle" style="width:8%">费用计算方式</td>
              <td class="centertitle" style="width:6%">再保手续费%</td>
              <td class="centertitle" style="width:8%">再保手续费</td>
              <td class="centertitle" style="width:6%">出单费%</td>
              <td class="centertitle" style="width:8%">出单费</td>
              <td class="centertitle" style="width:6%">增值税%</td>
              <td class="centertitle" style="width:6%">增值税</td>
              <td class="centertitle" style="width:8%">分入净保费</td>
              <td class="centertitle" style="width:8%">是否预估</td>
            </tr>
          </thead>
          <tbody>
                <tr  ref="mainReinsCiData">
                        <input type="hidden" name="MainReinsCi_Flag">
                        <input type="hidden" name="StartDateMain">
                        <input type="hidden" name="EndDateMain">
                    <td>
                        <input type="text" name="offeredLine" ref="offeredLine" class="common" style="width:100%"  maxlength="9" description="我司比例（offered）" v-model='ReinsCededInfo.offeredLine' @blur="offeredRate();inDisPremium1();">
                    </td>
                    <td>
                        <input type="text" name="signedLine"  ref="signedLine" class="common" style="width:100%"  maxlength="9" description="我司比例（signed）" v-model='ReinsCededInfo.signedLine' @blur="offeredRate();">
                    </td>
                    <td>
                        <input type="text" name="inAmount"  ref="inAmount" class="common" style="width:100%"  maxlength="18" description="分入保额"  v-model='ReinsCededInfo.inAmount'
                        @blur="$uiCommon.numberFormatMoney($event);$uiCommon.checkDecimal1($event,17,2,'','',',',3);">
                    </td>
                    <td>
                        <input type="text" name="noHaveTaxFee"  ref="noHaveTaxFee" class="common" style="width:100%"  maxlength="18" description="不含税分入保费"  v-model='ReinsCededInfo.noHaveTaxFee'
                           @change="taxFeeRate();operateFeeRate();agentSignedFeeRate();inDisPremium1();$uiCommon.checkDecimal1($event,17,2,'','',',',3);$uiCommon.numberFormatMoney($event);">
                        <input type="hidden" name="inPremium"  ref="inPremium" class="common" style="width:100%"  maxlength="18" description="分入毛保费"   v-model='ReinsCededInfo.inPremium'
                            @blur="inDisPremium1();$uiCommon.checkDecimal1($event,17,2,'','',',',3);">
                    </td>
                    <td> 
                        <select  name="exchangeFlag"   ref="exchangeFlag" class="common" style="width:100%" v-model='ReinsCededInfo.exchangeFlag'>
                          <option value='1'>按比例</option>
                        </select>                   
                    </td>
                    <td>
                        <input type="text" name="commSignedLine"   ref="commSignedLine"  class="common" style="width:100%"  maxlength="9" description="其他手续费费率%" 
                         v-model='ReinsCededInfo.commSignedLine'
                         @blur="agentSignedFeeRate();inDisPremium1();checkRate($event);">
                        
                    </td>
                    <td>
                    <input type="text" name="reinsCiCharges"  ref="reinsCiCharges" class="common" style="width:100%"  maxlength="18" description="分保手续费" 
                         @blur="inDisPremium1();$uiCommon.checkDecimal1($event,17,2,'','',',',3);$uiCommon.numberFormatMoney($event);"  v-model='ReinsCededInfo.reinsCiCharges'>
                        </td>
                    <td>
                        <input type="text" name="billsFeeRate" ref="billsFeeRate" class="common" style="width:100%"  maxlength="9" description="出单费比例" 
                             v-model='ReinsCededInfo.billsFeeRate'
                            @blur="operateFeeRate();inDisPremium1();checkRate($event);">
                    </td>
                    <td>
                        <input type="text" name="billsFee"  ref="billsFee"  class="common" style="width:100%"  maxlength="18" description="出单费" 
                        v-model='ReinsCededInfo.billsFee' @blur="inDisPremium1();$uiCommon.checkDecimal1($event,17,2,'','',',',3);$uiCommon.numberFormatMoney($event);" >
                        </td>
                        <td>
                        <input type="hidden" name="taxRate"  ref="taxRate"  class="common" style="width:100%"  maxlength="9" description="税金比例" 
                            v-model="ReinsCededInfo.taxRate"
                            @blur="taxFeeRate();inDisPremium1();checkRate($event);">
                        <input type="text" name="addedTaxRate" ref="addedTaxRate" class="common" style="width:100%"  maxlength="9" description="增值税比例" 
                             v-model="ReinsCededInfo.addedTaxRate"
                            @change="calculateAddexTaxFee();taxFeeRate();operateFeeRate();agentSignedFeeRate();inDisPremium1();checkRate($event);">
                      
                        </td>
                        <td>
                        <input type="hidden" name="tax"  ref="tax" class="common" style="width:100%"  maxlength="18" description="税金" 
                            @blur="inDisPremium1();$uiCommon.checkDecimal1($event,17,2,'','',',',3);" v-model='ReinsCededInfo.tax'>
                        <input type="text" name="addedTaxFee"  ref="addedTaxFee" class="common" style="width:100%" maxlength="18" description="增值税"
                         v-model='ReinsCededInfo.addedTaxFee' 
                            @blur="inDisPremium1();$uiCommon.checkDecimal1($event,17,2,'','',',',3);$uiCommon.numberFormatMoney($event);">
                        </td>
                        <td>
                        <input type="text" name="inDisPremium" ref="inDisPremium" class="common" style="width:100%"  maxlength="18" description="分入净保费显示" 
                            v-model="ReinsCededInfo.inDisPremium"
                            @blur="inDisPremium1();$uiCommon.checkDecimal1($event,17,2,'','',',',3);">
                    </td>
                    <td>
                        <select class="common" style="width: 100%" name="isNeedEstimate" ref="isNeedEstimate" description="是否预估"  v-model="ReinsCededInfo.isNeedEstimate">
                            <option value=1>是</option> 
                            <option selected value=0>否</option>
                        </select>
                    </td>
                </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainReinsCiInput${global.show}.js`)
let MainReinsCiInput=moduel.default
export default {
  ...MainReinsCiInput
}

</script>