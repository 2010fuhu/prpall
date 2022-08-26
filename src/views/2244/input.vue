<template>
<div>
  <div id="maskDiv" v-if="isloading"></div>
  <div id="loadingMsg" v-if="isloading">
	<div id="loadingfont" v-if="isloading"  ref="loadingfont">
		  加载中...
	</div>
</div>
  <table id="MainFunction" class=common cellpadding="3" cellspacing="0" v-if="$store.state.bizType=='PROPOSAL'">
  <input type="hidden" name="RenewalSymbol" value="0">
    <tr>
      <td class="title" style="width:15%">编辑类型：</td>
      <td class="input" style="width:30%">
       <input type="hidden" name="AgentInsFlag" >
       <input type="hidden" name="ComAttribute" >
       <input type="hidden" name="strEditType" >
       <input type="hidden" name="EditTypeForUpdate" >
       <input type="hidden" name="strComCode">
        <select name="EditType" class="common" v-model="editType" @change="changeBizNoTitle()">
          <option value="NEW">新保</option>
          <option value="COPY_PROPOSAL">复制投保单</option>
          <option value="COPY_POLICY">复制保单</option>
		      <option value="RENEWAL">续保</option>
        </select>
      </td>
      <td class="title" id="tdBizNoTitle" style="width:15%" v-if="editType=='COPY_PROPOSAL'">投保单号:</td>
      <td class="title" id="tdBizNoTitle" style="width:15%" v-else-if="editType=='COPY_POLICY'">保单号:</td>
      <td class="title" id="tdBizNoTitle" style="width:15%" v-else-if="editType=='RENEWAL'">保单号:</td>
      <td class="title" id="tdBizNoTitle" style="width:15%" v-else-if="editType=='NEW'"></td>
      <td class="input" id="tdBizNoInput" style="width:30%" v-if="editType!='NEW'">
        <input type="text"   name="BizNo" class="common" style="width:45%"  v-model='binNo'>
        <!-- <input type="button" name="buttonQueryFunction" class="button" alt="查询" value="查 询" @click="queryBizList()"> -->
        <input type="button" name="buttonSubmitFunction" class="button" alt="确定" value="确 定" @click="reLoadForm();">
      </td>
      <td class="title" id="tdBlankTitle"></td>
      <td class="input" id="tdBlankInput"></td>
    </tr>
     <tr id="trisFullBooking" style="display:none">
    	<td class="title">是否合并录单：</td>
    	<td>
    		<select name="isFullBooking" class="common" onchange="reLoadFormFullBooking()">
    		<option value="0" selected="selected">否</option>
    		<option value="1">是</option>
    		</select>
   		</td>
    </tr> 
     </table>
    <table class=common cellpadding="3" cellspacing="0"  v-show="isShow" >	
     <tr>
      <td class="formtitle">
        <img name="AppliInsuredImg" style="cursor:hand" src="@/assets/images/butCollapse.gif"
          @click="show()">
          关联保单/投保单
      </td>
      </tr>
    </table>
      <table id="relevance" class="common" cellpadding="3" cellspacing="0" v-show="isShow" >
        <tr>
          <td  class="title" >关联保单/投保单：</td>
            <input type="hidden" name="RelevanceType" value="">
          <td class="input">
            <input type="checkbox" name="relevanceName" id="relevanceName"  onclick="selectRelevance()">关联保单/投保单</td>
          <td id="relevanceNo" class=title style="display:none">保单号/投保单号：</td>
            <td id="relevanceNoInput" class="input" style="display:none,width:30%">
            <input type="text" name="BizNo2" class="common" style="width:45%" onchange="strTrim(this);setEditType()">
            <input type="button" name="buttonQueryFunction" class="button" alt="查询" value="查 询" onclick="">
            <input type="button" name="buttonSubmitFunction" class="button" alt="确定" value="确 定" onclick="">
          </td>
        </tr>
      </table>
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
      <main-expernses ref="MainExpernses" />
      <main-tail  ref="MainTail" />
      
    <table class="common" cellpadding="3" cellspacing="0">
      <tr>
        <td >
          联共保信息： 
          <input type="button" name="btCoins" :class="this.$store.state.coinsFlag=='0'?'':'button'" alt="录入" value="录 入"  v-bind:disabled="this.$store.state.coinsFlag=='0'"  @click="coinsReinsAgriShow($event)">
           <main-coins  v-if="isCoinsShow" v-bind:isCoinschildShow="isCoinschildShow"  ref='MainCoins' @closeCoins="closeCoins"></main-coins>
        </td>  

        <td>
          分入信息：
          <input type="button" name="btReins"  :class="this.$store.state.channelType1=='h'?'button':''" alt="录入" value="录 入"  v-bind:disabled="this.$store.state.channelType1!='h'"  @click="coinsReinsAgriShow($event)">
          <main-reins  v-if="isReinsShow" v-bind:isReinsChildShow="isReinsChildShow"  ref='MainReins' @closeReins1="closeReins"></main-reins>
        </td> 
        <td > 
          涉农信息： 
            <input type="button" name="btAgriType" :class="this.$store.state.agriType=='1'?'button':''"  alt="录入" value="录 入"   v-bind:disabled="this.$store.state.agriType!='1'"  @click="coinsReinsAgriShow($event)">
            <main-agri-type  v-if="isAgriShow" v-bind:isAgriChildShow="isAgriChildShow"   @closeAgri="closeAgri" ref="MainAgri" ></main-agri-type>
        </td>  
      </tr>
       
       </table>
      <table class="common" cellpadding="3" cellspacing="0">
        <tr v-if="$store.state.bizType=='ENDORSE'">
          <td class="button" type="button" width="45%">
            <input  type="button" name="buttonSave"  alt="下一步" value="下一步" :class="!nextDisable?'button':''" :disabled="nextDisable" @click="nextform();">
          </td>
          <td class="button"></td>
          <td class="button" type="button" width="45%">
            <input type="button" name="buttonCancel" class="button" alt="取消" value="取 消" @click="cancelForm();">
          </td>
        </tr>
        <tr v-else>
            <td></td>
            <td align="center" >
                <input   type="button" name="buttonSave" :class="!saveDisable?'button':''" :disabled="saveDisable"  alt="保存" value="保  存" @click="submitForm1();">
            </td>
             <td></td>
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


