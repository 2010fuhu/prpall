<template>
  <div  class="dialog"  v-show="isReinsChildShow">
    <div class="content" >
        <div  class="mainContent"  ref="Reins"> 
          <table ref="reinsMainHead"  class="common"> 
            <tr>
                <input type="hidden" name="ReinsMainHead_Flag" description="分入业务主信息批改标志">            
                <td>
                原保单号码/分出公司保单号码：
                <input type="text" name="outPolicyNo" ref="outPolicyNo" style="width:25%" maxlength="22" class="common" v-validate="'required'"  v-model="reinsCededInfoVo.outPolicyNo">
                <img :src="imgUrl">
              </td>
              <td v-if="$route.path=='/pgMain'">
                原批单号码/分出公司批单号码：
                <input type="text" name="outEndorseNo"  ref="outEndorseNo" style="width:25%" maxlength="21" class="common" v-model="reinsCededInfoVo.outEndorseNo">
                <img :src="imgUrl">
              </td> 
              <input type="hidden" name="ReinsBrokerExtraRate" description="经纪费附加税比例" v-model="reinsCededInfoVo.reinsBrokerExtraRate">
              <input type="hidden" name="ReinsUpdateFlag" description="分入信息修改标志">
              <td  ref='reinsbillTD'>账单标识：
                <input type="radio" name="reinsBill"  ref="reinsBill" class='radio' value="0" checked description="账单标识" v-model="reinsCededInfoVo.reinsBill">未来账单
                <input type="radio" name="reinsBill"  ref="reinsBill" class='radio' value="1" description="账单标识" v-model="reinsCededInfoVo.reinsBill" >已来账单
              </td>
            </tr>
            <tr>
              <td class="title5" colspan="4">
                <label>业务类型：&nbsp; </label>
                <select name="transferFlag" ref="transferFlag" class="common5" style="width:16%" v-model="reinsCededInfoVo.transferFlag" > 
                  <option value="1">直接业务</option>
                  <option value="2">再保经纪人业务</option>
                </select>
                <input type="hidden" name="ReinsCededType" description="分入类型">
              </td>
            </tr>
            </table>
          <table ref="reinsBroker" class="common" v-show="reinsCededInfoVo.transferFlag=='2'"  border="0">
            <thead>
              <tr>
                <td class="centertitle" width="5%">序号</td>
                <td class="centertitle" width="15%">再保经纪人名称</td>
                <td class="centertitle" width="15%">经纪费比例%</td>
                <td class="centertitle" width="15%">经纪费</td>
                <td class="centertitle" width="10%">经纪费增值税%</td>
                <td class="centertitle" width="15%">经纪费增值税</td>
                <td class="centertitle" width="5%" v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              <tr  ref="reinsBrokerData"  class=common v-for="(reinsBrokerInfoVo, index) in reinsBrokerInfoVoList" :key="index">
                <td id="tdSerialNoDisplay" >
                  <input type="hidden" name="flag" ref="flag" description="信息批改标志" v-model="reinsBrokerInfoVo.flag">
                  <input type="text" name="serialNo" ref="serialNo" class="title" readonly style="width:100%;text-align:center;" 
                   v-model="reinsBrokerInfoVo.serialNo" >
                </td>
                <td id="tdReinsCode" >
                    <select class="common" name="brokerCode"  ref='brokerCode'  maxlength="3" description="再保经纪人代码" style="width:50%" 
                    v-model="reinsBrokerInfoVo.brokerCode"   @change="GetAddedTaxRate(index);">
                        <option value='' disabled >请选择</option>
                        <option :value="coinsCodeInfoVo.coinsCode" v-for="coinsCodeInfoVo,index in coinsCodeInfoVoList" :key="index" >{{coinsCodeInfoVo.coinsName}}</option>   
                    </select>
                </td>
                <td>
                  <input  class="common3"  type="text" name="brokerAgeRate" ref="brokerAgeRate" style="width:100%;text-align:center;" maxlength="9" description="经纪费比例%"
                    v-model="reinsBrokerInfoVo.brokerAgeRate"
                    @change="calculateReinsBrokerFee(index);inDisPremium1();">
                </td>
                <td>
                  <input type="text" name="brokerAgeFee"  ref="brokerAgeFee" class="common3" style="width:100%;text-align:center;" maxlength="9" description="经纪费" 
                     v-model="reinsBrokerInfoVo.brokerAgeFee" @change="inDisPremium1();">
                </td>
                <td>
                  <input type="text" name="reinsBrokerAddedTaxRate" ref="reinsBrokerAddedTaxRate" class="common3"  style="width:100%;text-align:center;" maxlength="9" description="经纪费增值税率" 
                  v-model="reinsBrokerInfoVo.reinsBrokerAddedTaxRate"
                  @change="calculateReinsBrokerAddedTaxFee(index);inDisPremium1();"  readonly>
                </td>
                <td>
                  <input type="text" name="reinsBrokerAddedTaxFee" ref="reinsBrokerAddedTaxFee" class="common3" style="width:100%;text-align:center;" maxlength="9" description="经纪费增值税" 
                   v-model="reinsBrokerInfoVo.reinsBrokerAddedTaxFee"
                  @change="inDisPremium1();">
                </td>
                <td v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >
                  <p align="right"><input type="button" name="button_ReinsBroker_Delete" class="button" alt="删除" value="删 除" 
                    @click="deleteReinsBroker(index);inDisPremium1();"></p>
                </td>
                </tr>
                </tbody>
            <tfoot>
              <tr v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >
                <td colspan="12">
                  <p align="right"><input type="button" name="button_ReinsBroker_Insert" class="button" alt="新增" value="新 增"
                    @click="insertReinsBroker()"></p>
                </td>
              </tr>
            </tfoot>
          </table>
          <table ref="reinsMainOri"  class="common">
              <tr>
                  <td colspan="4">
                      原单币别：
                          <select name="oriCurrency" ref='oriCurrency' class='' v-model='reinsCededInfoVo.oriCurrency'>
                              <option  value="CNY">人民币</option>
                              <option  value="USD">美元</option>
                              <option  value="HKD">港币</option>
                              <option  value="AUD">澳大利亚元</option>
                          </select>
                      本币兑换率<input type="text" name="oriCurrencyRate" ref="oriCurrencyRate" class="common" style="width:20%" maxlength="18" description="本币兑换率" 
                      v-model='reinsCededInfoVo.oriCurrencyRate'>
              </td>
                </tr>
                <tr>
                  <td>
                    共同理赔金额
                <input type="text" name="coSumClaim"  ref="coSumClaim" class="common" style="width:20%" value="0.00" maxlength="18" description="共同理赔金额"  v-model='reinsCededInfoVo.coSumClaim'
                @focus="$uiCommon.checkFocusZero($event)"
                @keypress="$uiCommon.pressDecimal($event);"
                @blur="$uiCommon.checkDecimal1($event,17,2,'','',',',3);"
                @change="$uiCommon.numberFormatMoney($event);">
                  </td>
                </tr>
              <tr>
                  <td colspan="4">原保单总保额
                <input type="text" name="oriAmount" ref='oriAmount' class="common" style="width:20%" value="0.00" maxlength="18" description="原保单总保额显示"
                   v-validate="'required'" v-model='reinsCededInfoVo.oriAmount'
                 @blur="$uiCommon.checkDecimal1($event,17,2,'','',',',3);" @change="offeredRate()">
                <img  :src="imgUrl">
                原保单不含税总保费
                <input type="text" name="oriPremium" ref='oriPremium' class="common" style="width:20%" value="0.00" maxlength="18" description="原保单总保费显示"
                  v-validate="'required'"  v-model='reinsCededInfoVo.oriPremium'  @blur="$uiCommon.checkDecimal1($event,17,2,'','',',',3);" >
                <img  :src="imgUrl">
              </td>
                </tr>
                <tr>
                  <td colspan="4">DIC差异描述
              <input type="text" name="dicDesc" ref="dicDesc" class="common" style="width:80%"  maxlength="200" description="DIC差异描述"
              v-model="reinsCededInfoVo.dicDesc">
            </td>
                </tr>
          </table>
              <coinsReins ref="coinsReinsRef"  :coinsCodeInfoVoList="coinsCodeInfoVoList" :coinsInfoVoList="coinsInfoVoList"></coinsReins>
              <main-reins-ci-input :ReinsCededInfo="reinsCededInfoVo"   ref="mainReinsRef"/>

            <tr>
                  <td colspan="2">
                    <table class="common" border="0">
                      <tr>
                        <td v-show="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >
                          <p align="left"><input type="button" name="buttonSubmit" class="button" alt="确定" value="确 定" @click="okCallback();"></p>
                        </td>
                        <td>&nbsp;</td>
                        <td width="50%"  v-show="$route.path!='/pgMain'">
                          <p align="center"><input type="button" name="buttonCancel" class="button" alt="取消" value="取 消" @click="cancelCallback()"></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
            </div>
         </div>
     </div>

</template>
<script>
  let moduel=require(`@/pubJs/${global.path}/MainReins${global.show}.js`)
  let MainReins=moduel.default
  export default{
   ...MainReins
  }
</script>
<style scoped>
    .mainContent{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        margin-bottom: 1%;
    }
    .dialog{
        background-color: rgba(0,0,0,0.8);
        position:fixed;
        top: 0px;
        left:0;
        right:0;
        bottom:0;
        width: 100%;
        height: 100%;
        padding:20px;
        font:bold 14px verdana,tahoma,helvetica;
        text-align:center;
    }
    .close.big {
        -webkit-transform: scale(2);
        -moz-transform: scale(2);
        -ms-transform: scale(2);
        -o-transform: scale(2);
        transform: scale(2);
    }
    .close{
        position: relative;
        display: inline-block;
        overflow: hidden;
        right: 20px;
        top:20px;
        color:#000;
    }
    .content{
        position:relative;
        top:40%;
        left:50%;
        transform:translate(-50%,-50%);
        background-color: #fff;
        width: 1000px;
        height: 400px;
        border:2px solid;
        border-radius:25px;
        padding: 20px;
        z-index: 999;
        text-align: left;
        box-shadow:0px 0px 0px  #ccc;
    }
</style>