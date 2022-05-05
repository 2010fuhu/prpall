<template>
    <table id='commonMainLoanImgMss' class=common cellpadding="3" cellspacing="0" style="display:">
    <tr>
      <td class="formtitle" >
       <img style="cursor:hand;" src="@/assets/images/butCollapse.gif" name="MainLoanImgMss" 
       @click="show();"> 履约义务人信息
       <input type="hidden" name="LoanImgMssNo" value='1'>
       <img :src="imgUrl">
        <table id="MainLoanImgMssDel" class=list cellpadding="3" cellspacing="1" v-show="isShow">
          <thead>
            <tr>
              <td class="centertitle" style="width:7%">序号 <img :src="imgUrl"></td>
              <td class="centertitle" style="width:12%">业务编号 <img :src="imgUrl"></td>
              <td class="centertitle" style="width:12%">履约义务人名称 <img :src="imgUrl"></td>
              <td class="centertitle" style="width:13%">统一社会信用代码 <img :src="imgUrl"></td>
              <td class="centertitle" style="width:10%">保险金额 <img :src="imgUrl"></td>
              <td class="centertitle" style="width:12%">履约义务人注册地址</td>
              <td class="centertitle" style="width:10%"  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'"></td>
            </tr>
          </thead>
          <tfoot>
          </tfoot>
          <tbody>
            <tr class=common>
              <td>
                <input type="hidden" name="Mainloan_New_Flag" v-model="Mainloan_New_Flag">
                <input type="text" name="MainLoanImgNumber" class="readonly" style="width:100%" maxlength="20" size="20"   v-model="MainLoanImgNumber" readonly description="序号">
                <input type="hidden" name="MainLoanImgNumberFlag" v-model="MainLoanImgNumberFlag">
                <!-- <input type="hidden" name="MainloanItemKindNo"> -->
               </td>
               <td>
                  <input type="text" name="obligorCode" ref='obligorCode' class="common" style="width:100%" maxlength="20" size="20"  v-model="obligorCode" description="业务编号"         v-validate="'required'"  v-changeFlag="obligorCode" >
                </td>
                <td>
                  <input type="text" name="obligorName" ref='obligorName' class="common" style="width:100%" maxlength="20" size="20" v-model="obligorName" description="履约义务人名称"      v-validate="'required'"   v-changeFlag="obligorName">
                </td>
                <td>
                  <input type="text" name="businessCode" ref='businessCode' class="common" style="width:100%" maxlength="20" size="20" v-model="businessCode" description="统一社会信用代码"   v-validate="'required'" v-changeFlag="businessCode">
                </td>
                 <td>
                  <input type="text" name="limitAmount" ref='limitAmount' class="common" style="width:100%" maxlength="20" size="20"  v-model.number="limitAmount" description="保险金额"   v-validate="'required'"
                    @blur="$uiCommon.checkDecimal1($event,17,2,'','','','',3);" 
                    @change="mainLoanImgLimitMoney();">
                </td>
                <td>
                  <input type="text" name="obligorAddress" ref='obligorAddress' class="common" style="width:100%" maxlength="50" size="100" readonly v-model="obligorAddress"   description="履约义务人注册地址">
                </td>
                <td class=kun id="tdbutton_MainLoanImg_Query"  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'">
                   <input type="button" name="button_MainLoanImg_Query"  ref='button_MainLoanImg_Query' id="button_MainLoanImg" class="button" alt="查询履约义务人信息" value="查询履约义务人信息" @click="addQueryMainLoanImg()">
                </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainPerformanceObligor${global.show}.js`)
let MainPerformanceObligor=moduel.default
//import  MainPerformanceObligor from '@/pubJs/MainPerformanceObligor.js'
export default{
  ...MainPerformanceObligor
}
</script>