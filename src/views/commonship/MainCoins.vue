<template >
     <div  class="dialog"  v-show="isCoinschildShow" >
         <div class="content"  ref="Coins">
             <div  class="mainContent">
            <table ref="coinsData" class="common" cellpadding="3" cellspacing="0" >
              <thead>
                <tr>
                  <td class="formtitle" colspan="9">联/共保信息</td>
                </tr>
                <tr>
                  <td class="centertitle" style="width:4%">序号</td>
                  <td class="centertitle" style="width:12%;display:none">主保单号码选项</td>
                  <td class="centertitle" style="width:16%">主保单号码</td>
                  <td class="centertitle" style="width:12%">联/共保身份</td>
                  <td class="centertitle" style="width:7%">是否首席</td>
                  <td class="centertitle" style="width:16%">联/共保人名称</td>
                  <td class="centertitle" style="width:11%">联/共保份额(%)</td>
                  <td class="centertitle" style="width:9%">&nbsp;</td>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(coinsInfoVo, index) in coinsInfoVoList" :key="index">
                <td>
                  <input type="hidden" name="Coins_Flag" description="联/共保主信息批改标志">
                  <input type="text" name="SerialNoCoins" class="common" readonly style="width:100%" description="联/共保主信息序号"  v-model='coinsInfoVo.serialNo'>
                </td>
                <td style="display:none">
                  <select name="SameToPolicyNo" class="common3"  style="width:100%;display:none" description="主保单号码选项">
                    <option value="1">同主保单号</option>
                    <option value="0">不同于主保单号</option>
                  </select>
                </td>
                <td>
                  <input type="text" name="mainPolicyNo" class="common3" style="width:100%" maxlength="23" description="主保单号码" 
                    v-model="coinsInfoVo.mainPolicyNo" @blur="$uiCommon.checkLength($event);">
                </td>
                <td>
                  <select name="coinsType" class="common3" style="width:100%" description="联/共保身份"  :disabled="index=='0'" v-model="coinsInfoVo.coinsType"
                    @blur="changeCoinsType($event)"
                    @change="setRefreshFlagDetailZero()">
                    <option value='' disabled>请选择</option>
                    <option value="1" v-if="index=='0'">我方</option>
                    <option value="2" v-else-if="index!='0'&&($store.state.coinsFlag=='3'||$store.state.coinsFlag=='4')">系统内其他方</option>
                    <option value="3" v-else-if="index!='0'&&($store.state.coinsFlag=='1'||$store.state.coinsFlag=='2')">系统外其他方</option>
                  </select>
                </td>
                <td>
                  <select name="chiefFlag" class="common3" style="width:100%" description="是否首席" :disabled="index=='0'"  v-model="coinsInfoVo.chiefFlag">
                    <option value='' disabled>请选择</option>
                    <option value="1">是</option>
                    <option value="0">否</option>
                  </select>
                </td>
                <td>
                    <select name="coinsCode" class="common3" style="width:100%" description="联/共保人名称"   v-if="index=='0'"  disabled  v-model="coinsInfoVo.coinsCode">
                      <option :value="coinsInfoVo.coinsCode" >{{coinsInfoVo.coinsName}}</option></select>
                    <select name="coinsCode" class="common3" style="width:100%" description="联/共保人名称"   v-else  v-model="coinsInfoVo.coinsCode" @change=selectCoins(index)>
                      <option value='' disabled>请选择</option>
                      <option :value="item.coinsCode" v-for=" item,i in coinsSelectList" :key="i"  >{{item.coinsName}}</option></select>
                </td>
                <td>
                    <input type="text" name="coinsRate" class="common3" style="width:100%" maxlength="8" description="联/共保份额"
                     v-model="coinsInfoVo.coinsRate"
                    @keypress="$uiCommon.pressDecimal($event)"
                    @blur="$uiCommon.checkDecimal($event,'6','4','0','100')"
                    @change="setRefreshFlagDetailZero();checkCoinsRate()">
                </td>
                <td   v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'" >
                  <p align="right"><input type="button" class="button" ACCESSKEY="-" name="button_Coins_Delete"   :disabled="index=='0'"  alt="删 除" value="删 除"
                    @click="deleteCoins(index)"></p>
                </td>
              </tr>
              </tbody>
              <tfoot>
                <tr  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'" >
                  <td colspan="9">
                    <p align="right"><input type="button" name="button_Coins_Insert" class="button" alt="新增" value="新 增"
                      @click="insertCoins()"></p>
                  </td>
                </tr>
              </tfoot>
            </table>
            <table ref="coinsMiddle" class="common" cellpadding="5" cellspacing="1" border="0">
              <tr >
                <td align="center" width="50%">
                  <input type="hidden" name="CoinsMiddle_Flag" description="联/共保中信息批改标志">
                  <input type="hidden" name="ProportionFlag1Value" value="1" description="手续/经济费计入方式代码">手续费：
                  <input type="radio"  ref="proportionFlag1" value="0" v-model="proportionFlag1" @change="setRefreshFlagDetailZero()">份额计入
                  <input type="radio"  ref="proportionFlag1" value="1" :disabled="billTypeDisabled" v-model="proportionFlag1"  @change="setRefreshFlagDetailZero()">全额计入 
                </td>
                <td align="center" width="50%" style="display:">
                  <input type="hidden" name="BillTypeValue" value="1" description="开具发票方式">开具发票方式：
                  <input type="radio" name="billType" ref="billType" value="0" checked  v-model="billType" @change="setRefreshFlagDetailZero()">全额发票
                  <input type="radio" name="billType" ref="billType" value="1"  :disabled="billTypeDisabled"  v-model="billType" @change="setRefreshFlagDetailZero()">份额发票 
                </td>  
                <!-- <td align="center" width="50%" style="display:none">
                  <input type="hidden" name="ProportionFlag2Value" value="1" description="特殊因子计入方式代码">特殊因子费：
                  <input type="radio" name="ProportionFlag2" value="0" checked 
                    onchange="setRefreshFlagDetailZero()">份额计入
                  <input type="radio" name="ProportionFlag2" value="1" 
                    onchange="setRefreshFlagDetailZero()">全额计入
                </td> -->
              </tr>
              <tr>
                <td colspan="2">
                
                </td>
              </tr>
            </table>
            <table id="CoinsDetail" class="list" v-show="CoinsDetailShow" cellpadding="3" cellspacing="0" >
              <thead>
                <tr>
                  <td class="formtitle" colspan="8">手续费/经纪费、特殊因子联共保信息</td>
                </tr>
                <tr>
                  <td class="centertitle" style="width:4%">序号</td>
                  <td class="centertitle" style="width:16%">联/共保人名称</td>
                  <td class="centertitle" style="width:12%">币别</td>
                  <td class="centertitle" style="width:18%">保额</td>
                  <td class="centertitle" style="width:16%">保费</td>
                  <td class="centertitle" style="width:12%">手续费/经纪费</td>
                  <td class="centertitle" style="width:12%;display:none">特殊因子费</td>
                  <td class="centertitle" style="width:10%">出单费</td>
                </tr>
              </thead>
              <tbody>
                <tr  ref='coinsDetail' v-for="(coinsDetailInfoVo, key) in coinsDetailInfoVoList" :key="key">
                <td>
                  <input type="hidden" name="CoinsDetail_Flag" description="联/共保明细信息批改标志">
                  <input type="text" ref="serialNo" class="common" readonly style="width:100%" description="联/共保明细信息序号" :value="coinsDetailInfoVo.serialNo">
                </td>
                <td>
                  <input type="text" name="coinsName" ref="coinsName" class="common" readonly style="width:100%" description="联/共保人名称"  :value="coinsDetailInfoVo.coinsName">
                </td>
                <td>
                  <input type="text" name="currency" ref="currency"  class="common" readonly style="width:30%" description="币别代码" :value="coinsDetailInfoVo.currency">
                  <input type="text" name="CurrencyName" class="common" readonly style="width:60%" description="币别名称" :value="CurrencyName">
                </td>
                <td>
                  <input type="text" name="coinsAmount" ref="coinsAmount"  class="common" style="width:50%"  description="联/共保各方保额" v-model="coinsDetailInfoVo.coinsAmount"
                    @keypress="pressDecimal($event)"
                    @blur="$uiCommon.checkDecimal($event,14,2,'','');changeAmount();">
                  <span id="spanChgCoinsAmount" v-show="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="chgCoinsAmount" ref='chgCoinsAmount' class="common" readonly style="width:45%" description="保额变化量" value=0.00  >
                  </span>
                </td>
                <td>
                  <input type="text" name="coinsPremium" ref="coinsPremium" class="common" readonly style="width:50%" description="联/共保各方保费" :value="coinsDetailInfoVo.coinsPremium">
                  <span id="spanChgCoinsPremium" v-show="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="chgCoinsPremium"  ref='chgCoinsPremium'  class="common" readonly style="width:45%" description="保费变化量" value=0.00 >
                  </span>
                </td>
                <td>
                  <input type="text" name="agentFee" ref="agentFee" class="common"  readonly style="width:50%" description="联/共保各方手续费/经纪费"   :value="coinsDetailInfoVo.agentFee">
                  <span id="spanChgAgentFee" v-show="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="chgAgentFee"  ref='chgAgentFee'  class="common" readonly style="width:45%" description="联/共保各方手续费/经纪费变化量" value=0.00>
                  </span>
                </td>
                <td style="display:none">
                  <input type="text" name="middleCostFee" class="common"  readonly style="width:50%" description="联/共保各方特殊因子费"   :value="coinsDetailInfoVo.middleCostFee">
                  <span id="spanChgMiddleCostFee" v-show="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="chgMiddleCostFee" ref='chgMiddleCostFee'  class="common" readonly style="width:45%" description="联/共保各方特殊因子费变化量" value=0.00>
                  </span>
                </td>
                <td>
                  <span id="spanOperateFee">
                    <input type="text" name="operateFee" class="common"  style="width:50%"  description="联/共保各方出单费"  readonly  ref="operateFee"  @change="calOperateFeesum" v-model="coinsDetailInfoVo.operateFee">
                  </span>
                  <span id="spanChgOperateFee" v-show="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="chgOperateFee"  ref='chgMiddleCostFee' class="common" readonly style="width:45%" description="联/共保各方出单费变化量" value=0.00> 
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
            <table id="Coinssum" class="list"   v-show="CoinssumShow" cellpadding="3" cellspacing="0" >
              <thead>
                <tr>
                  <td class="centertitle" style="width:4%"></td>
                  <td class="centertitle" style="width:16%"></td>
                  <td class="centertitle" style="width:12%"></td>
                  <td class="centertitle" style="width:18%">合计保额</td>
                  <td class="centertitle" style="width:16%">合计保费</td>
                  <td class="centertitle" style="width:12%">合计手续费/经纪费</td>
                  <td class="centertitle" style="width:12%;display:none">合计特殊因子费</td>
                  <td class="centertitle" style="width:10%">合计出单费</td>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <!-- <input type="hidden" name="CoinsDetail_Flagsum" description="联/共保明细信息批改标志">
                  <input type="text" name="SerialNoDetailsum" class="common" readonly style="width:100%" value="     " description="联/共保明细信息序号"> -->
                </td>
                <td>
                  <!-- <input type="text" name="CoinsNameDetailsum" class="common" readonly  style="width:100%" value="    " description="联/共保人名称"> -->
                </td>
                <td>
                  <!-- <input type="text" name="CurrencyDetailsum"  class="common" readonly style="width:30%" value="    " description="币别代码">
                  <input type="text" name="CurrencyNameDetailsum" class="common" readonly  style="width:60%"  value="   " description="币别名称"> -->
                </td>
                <td >
                  <input type="text" name="CoinsAmountsum" class="common3" style="width:50%"  :readonly="$route.path=='/pgMain'||$route.path=='/endorseShow'" description="联/共保合计保额"  :value="CoinsAmountsum">
                  <span  v-if="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="ChgCoinsAmountsum" class="common" readonly style="width:45%" description="保额变化量"
                    :value="chgCoinsAmountSum">
                  </span>
                </td>
                <td>
                  <input type="text" name="CoinsPremiumsum" class="common3" style="width:50%" description="联/共保合计保费"   :value="CoinsPremiumsum">
                  <span  v-if="$route.path=='/pgMain'||$route.path=='/endorseShow'" >
                    <br><input type="text" name="ChgCoinsPremiumsum" class="common" readonly style="width:45%" description="合计保费变化量"
                    :value="chgCoinsPremiumSum">
                  </span>
                </td>
                <td>
                  <input type="text" name="AgentFeesum" class="common3"  style="width:50%"  :readonly="$route.path=='/pgMain'||$route.path=='/endorseShow'" description="联/共保合计手续费/经纪费"   :value="AgentFeesum" >
                  <span  v-if="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="ChgAgentFeesum" class="common" readonly style="width:45%" description="联/共保合计手续费/经纪费变化量"
                    :value="chgAgentFeeSum">
                  </span>
                </td>
                <td style="display:none">
                  <input type="text" name="MiddleCostFeesum" class="common" readonly style="width:50%" description="联/共保合计特殊因子费"  :value='MiddleCostFeesum'>
                  <span  v-if="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="ChgMiddleCostFeesum" class="common" readonly style="width:45%" description="联/共保合计特殊因子费变化量"
                    :value="chgMiddleCostFeeSum">
                  </span>
                </td>
                <td>
                  <span id="spanOperateFeesum">
                    <input type="text" name="OperateFeesum" class="common3" style="width:50%"   :readonly="$route.path=='/pgMain'||$route.path=='/endorseShow'"   description="联/共保合计出单费"    :value='OperateFeesum'>
                  </span>
                  <span  v-if="$route.path=='/pgMain'||$route.path=='/endorseShow'">
                    <br><input type="text" name="chgOperateFeeSum" class="common" readonly style="width:45%" description="联/共保各合计出单费变化量"
                    :value="chgOperateFeeSum">
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
            <table class="common" border="0">
                    <tr>
                      <td width="34%"  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'">
                        <p align="left"><input type="button" name="buttonSubmit" class="button" alt="确定" value="确 定"
                          @click="okCallback();"></p>
                      </td>
                      <td width="33%">
                        <p align="center"><input type="button" name="buttonCancel" class="button" alt="取消" value="取 消"
                          @click="cancelCallback()"></p>
                      </td>    
                      <td width="33%"  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'" >
                        <p align="right"><input type="button" name="buttonGenerate" class="button" alt="计算" value="计 算"
                          @click="generateCoinsDetail();"></p>
                      </td>
                    </tr>
            </table>
             </div>
         </div>
     </div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainCoins${global.show}.js`)
let MainCoins=moduel.default
export default{
  ...MainCoins
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
        width: 100%;
        height: 100%;
         
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