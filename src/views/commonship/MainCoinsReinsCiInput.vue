<template>
    <div>
  <table id="tbCoinsReinsCi" class="common" cellpadding="5" cellspacing="1">
    <tr>
      <td style="text-align:left">
        <img id="CoinsReinsCiImg" name="CoinsReinsCiImg"  style="cursor:hand" src="@/assets/images/butCollapse.gif" @click="showPage()"/>
        原保单承保人名称及相应份额<img src="@/assets/images/markMustInput.jpg"><br>
        <table ref="coinsReinsCi" class="common"  v-show="CoinsReinsShow" border="0">
          <thead>
            <tr>
              <td class="centertitle" width="10%">序列</td>
              <td class="centertitle" width="20%">保险人名称</td>
              <td class="centertitle" width="10%">承保份额%</td>
              <td class="centertitle" width="10%">是否是分出公司</td>
              <td class="centertitle" width="15%">&nbsp;</td>
              <td class="centertitle" width="8%" v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >&nbsp;</td>
            </tr>
          </thead>
          <tbody>
          <tr id="trCoinsReinsCi" v-for="(CoinsInfoVo, index) in coinsInfoVoList" :key="index">
            <td>
            	<input type="hidden" name="CoinsReinsCi_Flag" description="承保人信息批改标志">
            	<input type="hidden" name="CoinsReinsCiSerialNo" description="承保人信息数据存储序号">
              <input type="text" name="SerialNoDisplay" class="readonly3" readonly style="width:10%"  description="承保人信息页面显示序号"  v-model='CoinsInfoVo.serialNo'>
							<input type="hidden" name="coinsType"  description="承保人类型" v-model="CoinsInfoVo.coinsType">
							<input type="text" name="CoinsTypeDisplay" class="readonly3" readonly style="width:50%"  v-if='CoinsInfoVo.coinsType=="1"' value="主承保人" description="承保人类型">
              <input type="text" name="CoinsTypeDisplay" class="readonly3" readonly style="width:50%"  v-else value="共保人" description="承保人类型">
            </td>
            <td>
              <select name="CoinsReinsCode" class="common"  v-model="CoinsInfoVo.coinsCode"  
                 @change="setcoinsName(index);calculateAddexTax(index);">
									<option value="" disabled>请选择</option>
                  <option :value="coinsCodeInfoVo.coinsCode" v-for="coinsCodeInfoVo,index in coinsCodeInfoVoList" :key="index" >{{coinsCodeInfoVo.coinsName}}</option>   
			          </select>
              <input type="hidden" name="coinsName" class="codename" style="width:100%" description="保险人名称"  v-model="CoinsInfoVo.coinsName">
            </td>
            <td>
              <input type="text"  name="coinsRate" class="common3" style="width:100%" maxlength="9" description="承保份额" v-model="CoinsInfoVo.coinsRate"
              @change="$uiCommon.checkDecimal($event,8,5,'','');calculateInAmount(index);">
            </td>
            <td>
              <select name="ReinsFlag" class="common5" style="width:100%"  v-model="CoinsInfoVo.coinsFlag"   @change="getMainAddedTaxRate(index);">
               <option value="1" selected="selected" >是分出公司</option>
               <option value="0">不是分出公司</option>
              </select>
            </td>
            <td>
            	<input type="button" name="button_AddCoinsReinsInfo_Insert"  class="longbutton" style="display:none;"
                        alt="分出公司详细信息" value="分出公司详细信息" @click="addCoinsReinsInfo()">
            </td>
            <td  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >
              <p align="right"><input type="button" name="button_CoinsReinsCi_Delete" class="button" alt="删除" value="删 除" 
                @click="deleteCoinsReinsCi(index)"></p>
            </td>
          </tr>
          </tbody>
             <tfoot>
            <tr v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >
              <td colspan="6">
                <p align="right"><input type="button" name="button_CoinsReinsCi_Insert" class="button" alt="新增" value="新 增"
                  @click="insertCoinsReinsCi()"></p>
              </td>
            </tr>
          </tfoot>
        </table>
      </td>
    </tr>
  </table>
    </div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainCoinsReinsCiInput${global.show}.js`)
let coinsReins=moduel.default
export default{
   ...coinsReins

}
</script>
