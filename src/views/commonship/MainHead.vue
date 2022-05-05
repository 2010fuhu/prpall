<template>
  <div ref="MainHead" class=common cellpadding="3" cellspacing="0">
    <table class=common cellpadding="3" cellspacing="0" >
		<tr>
			<td class=formtitle>
				<span>{{riskName}}&nbsp;{{tdRiskNameFormTitle}}</span>
			</td>
		</tr>
	</table>
    <tr id="trRationType" style="display:none">
      <td id="tdRationType" class="title">款式：</td>
      <td class="input">
        <select class="common"  name="RationType" onchange="styleChange(this)">
        </select>
      </td>
      <td class="title">保险卡号</td>
      <td class="input">
      <input type="text" name="CardNo" class="common3" maxlength="20" onchange="changeMainHeadCardNo()">
      </td>
    </tr>
    <tr id="trRenewalNo" style="display:none">
      <td id="tdRenewalNoTitle" class="title">续保通知书号：</td>
      <td class="input">
        <input type="text" name="RenewalNo" class="readonly3" readonly>
      </td>
      <td class="title">&nbsp;</td>
      <td class="input">&nbsp;</td>
    </tr>
    <tr id="trQuotationNo" style="display:none">
      <td id="tdQuotationNoitle" class="title">询报价单号：</td>
      <td class="input">
        <input type="text" name="QuotationNo" class="readonly3" readonly>
        <input type="hidden" name="QuotationNoFlag" class="readonly3" discreption="是否录入询报价内容标记" readonly>
      </td>
      <td class="title">&nbsp;</td>
      <td class="input">&nbsp;</td>
    </tr>
    <tr id="trPlatFormquNo" v-show=false >
     <td class="title">保额是否超过五亿</td>
      <td class="input" >
      <input type="radio" name="IFPlatFormquNo"  value="0"   onclick="setPlatFormquNo();"/>是
      <input type="radio" name="IFPlatFormquNo"  value="1"   onclick="setPlatFormquNo();"/>否<img :src="imgUrl">
      </td>  
      <td id="tdPlatFormquNo" class="title">平台报价单号：</td>
      <td class="input">
        <input type="text" name="PlatFormquNo" class="common" maxlength="50"  ><img :src="imgUrl">
      </td>
    </tr>
    <tr>
      <td class="title3" >投保单号：</td>
      <td class="input3">
        <input type="text" name="proposalNo"  class="common" readonly :value="$store.state.proposalNo">
      </td>
      <td class="title3">保单号：</td>
      <td class="input3">
        <input type="text" name="policyNo" maxlength="22" class="readonly" readonly :value="$store.state.policyNo">
      </td>
    </tr>
    <tr v-if="$route.path=='/endorseShow'">
      <td class="title3">批单号：</td>
      <td class="input3">
        <input type="text" name="EndorseNo" class="readonly3" readonly>
      </td>
      <td class="title3">&nbsp;</td>
      <td class="input3">&nbsp;</td>
    </tr>
    <tr id="trManualType" style="display:none">
      <td id="tdManualTypeTitle" class="title">保单号类型：</td>
      <td class="input">
        <select name="ManualType" class="common" onchange="changeManualType(this)">
          <option value="0">系统自动</option>
          <option value="1">手工编写保单号</option>
          <option value="2">印刷保单号</option>
          <option value="3">数据迁移保单标志号</option>
        </select>
      </td>
      <td class="title"><font color="#ff0000">保单号规则提示：</font></td>
      <td class="input"><font color="#0000ff"><span id="spanPolicyRule">系统规则</span></font></td>
    </tr>
    <table class=common cellpadding="3" cellspacing="0" >
		<tr>
			<td class=formtitle>
				<img name="AppliInsuredImg" style="cursor:hand" src="@/assets/images/butCollapse.gif"   @click="show()"  >
					 <!-- click="showPage()" -->
				<span >保单业务信息</span>
			</td>
		</tr>
	</table>
     <table id="polibisinfo1" class="common" cellpadding="3" cellspacing="0" v-show="isShow">
           <tr id="trIfPackage" style="display:none">
            <td class="title3" id="tdIfPackageTitle" style="display:none"></td>
            <td class="input3" id="tdIfPackageInput" style="display:none">
                    <select name="IfPackage" class="common">
                            <option value="0">否</option>
                            <option value="1">是</option>
                    </select> 
            </td>
            <td class="title3" id="tdIfFirstPolicyTitle" style="display:none">是否首张保单：</td>
            <td class="input3" id="tdIfFirstPolicyInput" style="display:none">
                    <select name="IfFirstPolicy" class="common" >
                            <option value="0">否</option>
                            <option value="1">是</option>
                    </select> 
            </td>
            <td class="title3" id="tdMainGenPolicyNoTitle" style="display:none">合同号：</td>
            <td class="input3" id="tdMainGenPolicyNoInput" style="display:none">
                    <input type="text" name="MainGenPolicyNo" class="common" STYLE="width:60%" /> 
            </td>
    </tr>
      <tr style="display:none"> 
      <td class="title3" id="tdisNeedEPolicyTitle">是否需要电子保单：</td>
      <td class="input3">
        <select  name="isNeedEPolicy" onchange="setIsNeedEPolicy()" class="common" >
            <option value="0">否</option>
        		<option value="1">是</option>
        </select>
      </td>

      </tr>
      <tr>
      <td id="tdContractNoTitle" class="title3" >协议号：</td>
      <td class="input3"  >
        <input type="text" name="ContractNo"   class="common"></td>
      <td class=title3 >续保标识：</td>
      <td class="input3">
        <input type="text" name="renewal" :value="renewal"  class="readonly" readonly></td>
     <td id="trPolicyNo" class=title3>续保保单号：</td>
     <td class=input3>
      <label id="tdOldPolicyNoRenewalInput" style="width:20%">
        <input type="text" name="oldPolicyNo"  :value="oldPolicyNo" class="readonly3" readonly>
        <input type="hidden" name="CollectType" description="是否是免导Excel团单标志" value="0">
      </label>
      </td>
    </tr>
    <tr>
      <td id="tdLanguageTitle" class="title3">语  种：</td>
      <td class="input3">
        <select name="Language" class="common" v-model="language" >
          <option value="C">中文</option>
          <option value="E">英文</option>
          <option value="Z">其他语种</option>
        </select>
      </td>
      <td id="tdPolicySortTitle" class="title3">保单种类：</td>
      <td id="tdPolicySort" class="input3">
        <select name="policySort" class="common" v-model='policySort'>
              <option :value="policySortdata.policysortcode" v-for=" policySortdata,index in policySortInfoVoList" :key="index"  >{{policySortdata.policysort}}</option>
        </select>
      </td>
      <td class="title3" id="tdInvolvedTypeTitle" >业务种类 ：</td>
       <td class="input3"  >
            <select name="BusinessKind" class="common"  v-model='businessKind'>
                  <option :value="businessKinddata.businesskindcode" v-for=" businessKinddata,index in businessKindInfoVoList" :key="index"  >{{businessKinddata.businesskind}}</option>
            </select> 
      </td> 
      </tr>
      
      <tr id="trCoinsFlag">
      <td id="tdCoinsFlagTitle" class="title3">联共保标志：</td>
      <td id="tdCoinsFlagInput" class="input3">
        <select name="coinsFlag" class="common"  v-model="coinsFlag" description="联/共保标志代码"
          @change="changeCoinsFlag()">
        <option value="0">独家承保</option>
      	<option value="1">主共保</option>
          <option value="2">从共保</option>
          <option value="3">主联保</option>
          <option value="4">从联保</option>
        </select>
      </td>
      <td id="tdShareHolderFlagTitle" class="title3">股东业务标识：</td>
      <td class="input3" >
        <select name="shareHolderFlag" class="common"  style="width:30%" v-model="shareHolderFlag" @change="changeShareHolderFlag()">
          <option value="0" selected>否</option>
          <option value="1">是</option>
        </select>
        <select name="ShareHolderName" class="common"  style="width:50%; display:none;"></select>
      </td>
     <td class="title3">涉农险标志：</td>
      <td class="input3">
            <select name="agriType" class="common"  v-model="agriType" >
              <option value="0" selected>否</option>
              <option value="1">是</option>
            </select>
      </td>
      </tr>
   <input type="hidden" name="AccFlag" description="健康险标志字段">
   <input type="hidden" name="AccPayMent" description="赔付比例必录的条款标志">
      <tr>
      <td class="title3" id="tdComCodeTitle" >经办部门：</td>
      <td class="input3">
        	<select name="comCode" class="common" 	description="comCode"    v-validate="'required'" v-model="comCode" @change="getselecthandlerinfo(comCode,-1)">
               <option  value=''  disabled>请选择</option>
               <option :value="departmentdata.comcode" v-for=" departmentdata,index in departmentInfoVoList" :key="index"  >{{departmentdata.department}}</option>

					</select>
        <img :src="imgUrl">
      </td>
      <td class="title3" id="tdHandler1CodeTitle" >
        经办人员：</td>
      <td class="input3">
          	<select name="handlerCode" class="common"     v-validate="'required'"  v-model="handlerCode"   description="经办人员" >
							<option value="" disabled>请选择</option>
              <option :value="Handler1CodeVo.handlerCode" v-for=" Handler1CodeVo,index in Handler1CodeVoList" :key="index"  >{{Handler1CodeVo.handlerName}}</option>
					</select>
           <input type="hidden" name="handlerName" v-model="handlerName"/>
        <img :src="imgUrl">
      </td>
      <td class="title3" style="display:none">境内/境外：</td>
      <td class="input3" style="display:none">
	    <select name="MNationFlag" class="common"></select>
        <img :src="imgUrl">
      </td>
	<td  class="title3">业务模式：</td>
	<td class="input3">
          <select name="businessModeCode" class="common" description="业务模式"    v-validate="'required'"  v-model="businessModeCode" >
							<option value="G">G</option>
					</select>
        <img :src="imgUrl">
	</td>
    <tr style="display:none">
      <td id="tdCommerceNatureTitle" class="title3" style="display:none">业务性质：</td>
      <td style="display:none">
        <select name="CommerceNature" class="common">
	       <option value="0" selected=true>商业性</option>
	    </select>
      </td>
    </tr>
        <tr id="trComCode" style="display:none">
       <td class="title3" style="display:none"></td>
                <td style="display:none">
                  <select name="IfMedical" class="common" STYLE="width:100%" description="<%=strName5%>">
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
       </td>
    </tr>
    <tr style="display:none">
       <td class="title3"  style="display:none">是否招投标业务：</td>
                <td style="">
                <select name="IfBidding" class="common" STYLE="width:100%" description="是否招投标业务">
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
       </td>
    </tr>

    <tr style="display:none">
       <td class="title3"  style="display:none">是否见费出单特例：</td>
                <td style="display:none">
                  <select name="IfSpecialCase" class="common" STYLE="width:100%" description="是否见费出单特例">
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
       </td>
       <td class="title3"  style="display:none">特例说明：</td>
                <td style="">
                        <input name="SpecialCaseDesc" class="common" value="无" maxlength="100" description="见费出单特例说明" onblur="checkSpecialCaseDesc();"/>
       </td>
    </tr>
    <tr style="display:none">
       
        <td class="title3"  style="display:none"></td>
                <td style="display:none">
                  <select name="SpecialType" class="common" STYLE="width:100%" description="是否特殊类型业务">
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
       </td>   
      </tr>
          <tr>
          <td ColSpan="6">
         <span id="HandlerMain">
          <table id="Handler" class=list cellpadding="3" cellspacing="1"> 
           <thead>   
            <tr>
              <td class="centertitle" style="width:20%">归属机构</td>
              <td class="centertitle" style="width:20%">归属业务员</td>
              <td class="centertitle" style="width:25%">执业证号</td>
              <td class="centertitle" style="width:25%">业绩分成比例%</td>
              <td class="centertitle" style="width:10%"   v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" >操作</td>
            </tr>
            </thead>
              <tbody  v-show="isShow"  >    
                <tr class=common    v-for="(Handleritem, index) in handlerInfoVo" :key="index">           
                 <td align="center">
                    <input class="common" name="ComName1" description="归属机构"  v-if="$route.path=='/proposalShow'||$route.path=='/policyShow'"   v-model="Handleritem.comName">
                    <select class="common" name="ComName1" description="归属机构" v-else   v-model="Handleritem.comCode" @change="getselecthandlerinfo(Handleritem.comCode,index)">
                        <!-- <option value="" v-bind:disabled="comName1Disable">请选择</option> -->
                        <option value="" disabled>请选择</option>
                        <option :value="departmentInfodata.comcode" v-for=" departmentInfodata,i in departmentInfoVoList" :key="i"  >{{departmentInfodata.department}}</option>
                    </select>
                 </td>  
                 <td>
                      <input class="common" name="handlerCode1"  v-if="$route.path=='/proposalShow'||$route.path=='/policyShow'"  v-model="Handleritem.handlerName" description="归属业务员名称"  />
                      <select class="common" name="handlerCode1" v-else v-model="Handleritem.handlerCode" description="归属业务员名称"  >
                        <option value="" disabled>请选择</option>
                        <option :value="Handler1CodeVo.handlerCode" v-for=" Handler1CodeVo,index in Handleritem.Handler1CodeVoList" :key="index"  >{{Handler1CodeVo.handlerName}}</option>
                    </select>
                 </td>
                 <td>
                   <input type="text" name="ProfessionalNo" class="common3"   style="width:100%"  v-model="Handleritem.professionalNo" description="执业证号" readonly>
                 </td>  
                 <td>
                   <input type="text" name="PerforPercentage" class="common3" style="width:100%"  maxlength="3" v-model="Handleritem.perforPercentage" description="业绩分成比例"
                     @keypress="$uiCommon.pressInteger($event);"
                     @blur="$uiCommon.checkDecimal1($event,17,2,'','',',',3);">
                 </td>  
                  <td id="trHandlerDelete"   v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'">
                       <p align="right"><input type="button" name="button_Handler_Delete"  :class="$store.state.bizType=='ENDORSE'?'':'button'" 
                        value="删 除"  @click="delHandlerData(index)"></p>
                  </td>
               </tr>             
              </tbody>
              <tfoot>
               <tr id="trHandler">
                 <td id="trHandlerInsert" colspan="5" class=mei>
                  <p align="right"><input type="button" name="button_Handler_Insert" :class="$store.state.bizType=='ENDORSE'?'':'button'" 
                     v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" value="新 增" @click="addHandlerData()"></p>
                 </td>
               </tr>
              </tfoot>
              <tbody>
              </tbody>
           </table>
         </span>
     </td>
  </tr>
 </table>
 <table id="polibisinfo3" class="common" cellpadding="3" cellspacing="0" >  
  <tr id="trBusinessNature" >
      <input type="hidden" name="BusinessNature_Flag"  >
    <td  class="title3" >业务来源：</td>
    <td class="input3"  >
      <select name="channelType1" class="common"  description="业务来源"   v-validate="'required'" v-model="channelType1"  @change="getselectbusinessinfo('1')" >
                  <option value="" disabled>请选择</option>
                  <option :value="businessNatureInfoVo.businessnature" v-for=" businessNatureInfoVo,i in businessNatureInfoVoList" :key="i"  >{{businessNatureInfoVo.businessnaturename}}</option>
      </select>
          <img :src="imgUrl"> 
      </td>
   <td  class="title3"  >二级来源：</td>
    <td class="input3"  >      
          <select name="channelType2" class="common"  description="二级来源"    v-validate="'required'"  v-model="channelType2" @change="getselectbusinessinfo('2')">
                  <option value=""  disabled>请选择</option>
                  <option :value="businessChannelInfoVo.businesschannel" v-for=" businessChannelInfoVo,i in businessChannelInfoVoList" :key="i"  >{{businessChannelInfoVo.businesschannelname}}</option>
        </select>
          <img :src="imgUrl"></td>
   <td id="tdBusinessNatureTitle1" class="title3"  >三级来源：</td> 
     <td class="input3">
           <select name="channelType3" class="common"  description="三级来源"    v-validate="'required'"  v-model="channelType3"  @change="getselectagentinfo()"  >
                  <option value="" disabled>请选择</option>
                  <option :value="businessAgentTypeInfoVo.businessagenttype" v-for=" businessAgentTypeInfoVo,i in businessAgentTypeInfoVoList" :key="i"  >{{businessAgentTypeInfoVo.businessagenttypename}}</option>

          </select>
          <img id="tdBusinessNatureTitle2" :src="imgUrl" > 
          </td>   
    </tr>
    <tr>
    <td class="title" style="width:10%"  v-if="AgentCodeShow" >代理人/经纪人：</td>
     <td class="input" style="width:15%">
            <select name="agentCode" class="common"  v-if="AgentCodeShow" v-validate="'required'"  v-model="agentCode"  @change="getselectagentAgreementNo()">
                  <option value="" disabled>请选择</option>
                  <option :value="businessAgentInfoVo.agentCode" v-for=" businessAgentInfoVo,i in businessAgentInfoVoList" :key="i"  >{{businessAgentInfoVo.agentName}}</option>
             </select>
             
      </td>
      <td id="tdAgreementNoTitle" class="title" style="width:8%"  v-if="AgreementNoShow">代理协议号：</td>
      <td class="input" style="width:10%">
          <select name="agreementNo" class="common"  v-if="AgreementNoShow"  v-validate="'required'"  v-model="agreementNo"  @change=clearOfdeleteAllRows();>
                  <option value="" disabled>请选择</option>
                  <option :value="AgentagreementNo" v-for=" AgentagreementNo,i in businessAgentagreementNoList" :key="i"  >{{AgentagreementNo}}</option>
           </select>
      </td>
       <td class="title" style="width:15%;display:none"></td>
       <td class="input" style="width:15%;display:none" > </td>   
       <td class="input" style="display:none;width:1%"> </td>
    </tr>
    <tr  v-if="$store.state.comCode.substring(0,2)=='31'">
         <td class="title" style="width:10%">路支行代码：</td>
     <td class="input" style="width:15%">
          <select name="agreementNo" class="common" v-model="roadBranchCode">
                  <option value="" disabled>请选择</option>
                  <option :value="item.roadBranchCode" v-for="item,i in roadBranchInfoVoList" :key="i"  >{{item.roadBranchName}}</option>
          </select>
      </td>
    </tr>
  </table>
  </div>
</template>
<script type="text/javascript">
let moduel=require(`@/pubJs/${global.path}/MainHead${global.show}.js`)
let MainHead=moduel.default
//import MainHead from '@/pubJs/MainHead.js'
export default{...MainHead}
</script>