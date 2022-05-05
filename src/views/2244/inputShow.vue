<template>
<div>
  <div id="maskDiv" v-if="isloading"></div>
  <div id="loadingMsg" v-if="isloading">
    <div id="loadingfont" v-if="isloading" ref="loadingfont">加载中...</div>
  </div>
  <main-head      ref="MainHead"/>
  <Appli-Insured  ref="AppliInsured"/>
  <main-insured   ref="Insured"/>
  <main-period    ref="MainPeriod" />
  <main-construct ref="MainConstruct"/>
  <main-loan      ref="MainLoan"/>
  <main-performance ref="MainPerformance"/>
  <main-itemkind  ref="MainItemkind"/>
  <main-deductible  ref="MainDeductible"/>
  <main-fee  ref="MainFee"/>
  <main-plan ref="MainPlan"/>
  <main-engage  ref="MainEngage"/>
  <main-expernses ref="MainExpernses"/>
  <table id="Tail" class="common" cellpadding="5" cellspacing="1">
    <tr id="trJudicalScope">
      <input type="hidden" name="Tail_Flag" description="保单尾模块批改标志">
      <td id="tdJudicalScopeTitle" class="title" style="width:20%">司法管辖：</td>
      <td id="tdJudicalScopeInput" class="input" style="width:80%" colspan="3">
        <input type="text" name="judicalScope" class="readonly3" readonly description="司法管辖" :value="obj.judicalScope">
      </td>
    </tr>
    <tr id="trArgueSolutionArbitBoardName">
      <td id="tdArgueSolutionTitle" class="title">合同争议解决方式：</td>
      <td id="tdArgueSolutionInput" class="input" colspan="3">
          <select name="argueSolution" class="common3" style="width:8%" description="合同争议解决方式" :value="obj.argueSolution">
            <option value="1" selected>诉讼</option>
            <option value="2">仲裁</option>
            <option value="3">协商</option>
          </select>
        <span id="spanArbitBoardName" v-show='argueShow'>
           <select name="arbitBoardName" v-model='obj.arbitBoardName'>
              <option :value="arbitraryBoard.codeCode"  v-for=" arbitraryBoard,i in arbitraryBoardList" :key="i" >
              {{arbitraryBoard.codeName}}</option>
            </select>&nbsp;仲裁
          <img src="@/assets/images/markMustInput.jpg">
        </span>
        <span id="spanOther" style="display:none">
            <input type="text" name="OtherText" style="width:25%" readonly class="readonly3" description="其它">&nbsp;其它
            <img src="@/assets/images/markMustInput.jpg">
          </span>
      </td>
    </tr>
     <tr id="tdArbitBoardAddress" style="display:none">
       <td class="title">仲裁地点:</td>
        <td class="input">
        <input type="text" name="ArbitBoardAddress"  readonly class="readonly3" style="width:28%" description="仲裁地点">
        <img src="@/assets/images/markMustInput.jpg">
     </td>
    </tr>
    <tr id="trOperatorCode" style="display:">
      <td id="tdOperatorCodeTitle" class="title">操作员：</td>
      <td id="tdOperatorCodeInput" class="input">
        <input type="text" name="operatorCode" class="readonly3" readonly style="width:26%" description="录单人代码" :value="obj.operatorCode">
        <input type="text" name="OperatorName" class="readonly3" readonly style="width:56%" description="录单人名称">
      </td>
      <td id="tdOperateDateTitle" class="title">录单日期：</td>
      <td id="tdOperateDateInput" class="input">
        <input type="text" name="inputDate" class="readonly3" readonly description="输入日期" :value="obj.inputDate">
      </td>
    </tr>
    <tr id="trUpdaterCode" style="display:">
      <td id="tdUpdaterCodeTitle" class="title">最近修改人：</td>
      <td id="tdUpdaterCodeInput" class="input">
        <input type="text" name="updateCode" class="readonly3" readonly style="width:26%" description="最近修改人代码" :value="obj.updateCode">
        <input type="text" name="updateName" class="readonly3" readonly style="width:56%" description="最近修改人名称">
      </td>
      <td id="tdUpdateDateTitle" class="title">最近修改日期：</td>
      <td id="tdUpdateDateInput" class="input">
        <input type="text" name="updateDate" class="readonly3" readonly description="最近修改日期" :value="obj.updateDate">
      </td>
    </tr>
    <tr id="trUnderWriteCode" style="display:">
      <td id="tdUnderWriteTitle" class="title">核保人：</td>
      <td id="tdUnderWriteInput" class="input">
        <input type="text" name="underwriteCode" class="readonly3" readonly style="width:26%" description="核保人代码" :value="obj.underwriteCode">
        <input type="text" name="underwriteName" class="readonly3" readonly style="width:56%" description="核保人名称" :value="obj.underwriteName">
      </td>
      <td id="tdUnderWriteEndDateTitle" class="title">核保通过日期：</td>
      <td id="tdUnderWriteEndDateInput" class="input">
        <input type="text" name="underwriteEndDate" class="readonly3" readonly description="核保通过日期" :value="obj.underwriteEndDate">
      </td>
    </tr>
    <tr id="trEndorseOperator" style="display:none">
      <td id="tdOperatorCodePTitle" class="title">批单操作员：</td>
      <td id="tdOperatorCodePInput" class="input">
        <input type="text" name="OperatorCodeP" class="readonly3" readonly style="width:26%" description="批单操作员代码">
        <input type="text" name="OperatorNameP" class="readonly3" readonly style="width:56%" description="批单操作员名称">
      </td>
      <td class="title">&nbsp;</td>
      <td class="input">&nbsp;</td>
    </tr>
    <tr id="trEndorseUnderWrite" style="display:none">
      <td id="tdUnderWriteCodePTitle" class="title">核批人：</td>
      <td id="tdUnderWriteCodePInput" class="input">
        <input type="text" name="UnderWriteCodeP" class="readonly3" readonly style="width:26%" description="核批人代码">
        <input type="text" name="UnderWriteNameP" class="readonly3" readonly style="width:56%" description="核批人名称">
      </td>
      <td id="tdUnderWriteEndDatePTitle" class="title">核批通过日期：</td>
      <td id="tdUnderWriteEndDatePInput" class="input">
        <input type="text" name="UnderWriteEndDateP" class="readonly3" readonly description="核批通过日期">
      </td>
    </tr>
    <tr id="trMainRemark">
      <td id="tdMainRemarkTitle" class="title">出单员意见：</td>
      <td id="tdMainRemarkInput" class="input" colspan="3">
        <textarea type="text" name="remark" class="readonly" readonly style="width:85%" rows="3" description="备注"   :value='obj.remark'></textarea>
      </td>
    </tr>
    <tr id="trCoinsFlag">
      <td id="tdCoinsFlagTitle" class="title">联共保标志：</td>
      <td id="tdCoinsFlagInput" class="input" colspan="2">
        <input type="button" name="btCoins" :class="this.$store.state.coinsFlag=='0'?'':'button'"  alt="查看" value="查 看" v-bind:disabled="this.$store.state.coinsFlag=='0'"  @click="coinsReinsAgriShow($event)">
           <main-coins  v-show="isCoinsShow" v-bind:isCoinschildShow="isCoinschildShow"  ref='MainCoins' @closeCoins="closeCoins"></main-coins>
      </td>
    </tr>
    <tr id="trReinsFlag">
      <td id="tdReinsTitle" class="title">分入业务信息：</td>
      <td class="input" colspan="3">
         <input type="button" name="btReins"  :class="this.$store.state.channelType1=='h'?'button':''" alt="查看" value="查 看"  v-bind:disabled="this.$store.state.channelType1!='h'"  @click="coinsReinsAgriShow($event)">
          <main-reins  v-show="isReinsShow" v-bind:isReinsChildShow="isReinsChildShow"  ref='MainReins' @closeReins1="closeReins"></main-reins>
      </td>
    </tr>
    <tr id="trAgriType">
      <td id="tdAgriTypeTitle" class="title">涉农信息：</td>
      <td class="input" colspan="3">
          <input type="button" name="btAgriType" :class="this.$store.state.agriType=='1'?'button':''"  alt="查看" value="查 看"  v-bind:disabled="this.$store.state.agriType!='1'"  @click="coinsReinsAgriShow($event)">
            <main-agri-type v-show="isAgriShow" v-bind:isAgriChildShow="isAgriChildShow"  :subSidyInfoVoData=obj  @closeAgri="closeAgri" ref="MainAgri" ></main-agri-type>
      </td>
    </tr>
    <tr id="trLimitRequest" style="display:none">
      <td id="tdLimitRequestTitle" class="title">信用额度：</td>
      <td class="input" colspan="3">
        <input type="button" name="btALimitRequest" class="button" alt="查看" value="查 看"
          onclick="showLimitRequest()">
      </td>
    </tr>
  </table>
  <table class="common" cellpadding="3" cellspacing="0" >
    <tr>
        <td class="button" type="button" style="display:" >
          <input name="buttonViewTrace" class="button" type="button"  alt="核保意见" value="核保意见" @click="$uiCommon.viewTraceForUndwrt($store.state.proposalNo)"/>
        </td>
        <td class="button" type="button" >
          <input name="buttonCancel" class="button" type="button"  alt="取消"  value="取 消" onclick="cancelForm();"/>
        </td>    
    </tr>          
  </table>           
</div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/Input${global.show}.js`)
let Input=moduel.default
export default {
  ...Input
} 
</script>


