<template>
  <div>
<table class="common" cellpadding="3" cellspacing="0" style="display:" id="tableInsured">
<tr>
	<td class="formtitle" colspan=4>
		<img name="NameImg" style="cursor:hand" src="@/assets/images/butCollapse.gif" @click="show()">
		被保险人
	</td>
</tr>
</table>
<table id="Insured" ref="Insured" class="common" cellpadding="3" cellspacing="0"    v-show="isShow" >
	<tbody>
		<tr>
			<td class="title">
				客户代码：
			</td>
			<td class="input">
				<input type="hidden" name="flag" ref="flag" v-model="insuredShow.flag">
				<input type="hidden" name="serialNo"  ref="serialNo" :class="insuredShow.flag=='I'?'commoni':(insuredShow.flag=='D')?'commond':'common'" readonly description="序号"  
				v-model="insuredShow.serialNo">
				<input type="text" name="customerCode" :class="insuredShow.flag=='I'?'commoni':(insuredShow.flag=='D')?'commond':'common'" placeholder="请录入被保险人代码"
					style="width:120px" maxlength="16"  ref="customerCode"   v-model="insuredShow.customerCode" >
				<img  :src="imgUrl">
				<input type="button" name="buttonAddInsuredCustomer" class="button"  alt="新增/查询" value="新增/查询"
				 v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" @click="addInsuredCustomer('InsuredInsured')" >
			</td>
			<td class="title">客户名称：</td>
			<td class="input">
				<input type="text" name="InsuredInsuredName" :class="insuredShow.flag=='I'?'commoni':(insuredShow.flag=='D')?'commond':'common'" ref="customerCName"
				 	maxlength="120" placeholder="请录入被保险人名称" 
					v-model="insuredShow.customerCName"><img :src="imgUrl">
			</td>
		</tr>
		<tr>
			<td class="title">证件类型：</td>
			<td class="input">
				<select name="identifyType" :class="insuredShow.flag=='I'?'commoni':(insuredShow.flag=='D')?'commond':'common'" ref="identifyType" v-model="insuredShow.identifyType">
					<option :value="IdentifyType.id" v-for="IdentifyType,index in IdentifyTypeList" :key="index" >{{IdentifyType.name}}</option>   
				</select><img :src="imgUrl">
			</td>
			<td class="title" style="display:none">证件号码：</td>
			<td class="input" style="display:none">
				<input type="text" name="identifyNo" class="common" ref="identifyNo" maxlength="18" size="18" placeholder="请录入证件号码"
					  v-model="insuredShow.identifyNo"	@blur="checkIdentifyNumber();">
				 <img :src="imgUrl">
			</td>
		</tr>
		<tr>
			<td class="title">客户类型：</td>
			<td class="input">
				<select name="InsuredInsuredType" :class="insuredShow.flag=='I'?'commoni':(insuredShow.flag=='D')?'commond':'common'" ref="insuredType" v-model='insuredShow.insuredType'>
						<option value='1'>个人客户</option>
						<option value='2'>团体</option>
						<option value='3'>虚拟客户</option>
				</select>
				<select name="InsuredInsuredFlag" class="common" description="客户标识" style="display:none" @change="setMainInsuredValue()">
				</select>
			</td>
			<td class="title"  style="display:none" id="tdInsuredMobileTitle">联系人移动电话：</td>
			<td class="input"  style="display:none">
			<input type="hidden" name="mobile" class="common" ref="mobile" v-model="insuredShow.mobile"
				maxlength="80" size="20" description="联系人移动电话" @blur="checkMobile()">
				<img :src="imgUrl">
			</td>
			</tr>
		<tr style="display:none">
			<td id="tdInsuredInsuredNatureTitle" class="title">客户性质：</td>
			<td class="input" style="display:none">
				<select name="InsuredInsuredNature" class="common"
					description="客户性质" @change="changeInsuredInsuredNature()">
				</select>
			</td>
			<td class="title" style="display:none">客户语种：</td>
			<td class="input" style="display:none">
				<select name="InsuredLanguage" class="common" description="语种">
				</select>
			</td>
			<td class="title">联系人：</td>
			<td class="input">
				<input type="text" name="InsuredLinkerName"  maxlength="20" size="20" description="联系人姓名"
					v-model="insuredShow.linkName"	 @blur="$uiCommon.checkLength($event)">
			</td>
			<td class="title">被保险人备注手机号：</td>
			<td class="input">
				<input type="text" name="InsuredUrgentPhone" class="readonly" readonly
					style="width:30%" maxlength="30" size="20" description="被保险人备注手机号"
					v-model="insuredShow.phoneNumber" @blur="$uiCommon.checkLength($event)">		
			</td>
		</tr>
		<tr  style="display:none">
			<td class="title">联系人电话：</td>
			<td class="input">
				<input type="text" name="InsuredPhoneNumber1" class="common"
					style="width:30%" maxlength="30" size="20" placeholder="请录入联系人电话"
					@blur="$uiCommon.checkLength($event)" @change="changeInsuredPhoneNumber(this)">
			</td>
		</tr>
		<tr style="display:none;">
			<td class="title">移动电话：</td>
			<td class="input">
				<input type="text" name="InsuredMobile" class="common"
					maxlength="30" size="20" placeholder="请录入移动电话"
					@blur="$uiCommon.checkLength($event);checkMobile(this)">
			</td>
		</tr>
		<tr  style="display:none">
		<td class="title" id="tdInsuredAccAddressTitle" rowspan="2">客户地址：</td>
		<td class="input" colspan="6">
		<input type="hidden" class="common" name="address1Name"  ref="address1Name" v-model="insuredShow.address1Name">
			<select  name="InsuredAddress1" class="common"  style="width:20%" ref="address1"  v-model="insuredShow.address1"
				@change='changeAddress("address1")'>
				<option value='' disabled>请选择</option>
					<option :value="address.addressCode" 
					v-for="address,i in addressInfoVoList" :key="i" >{{address.addressName}}</option>   
				</select>省
		<input type="hidden" class="common" name="address2Name" ref="address2Name" v-model="insuredShow.address2Name">
			<select  name="InsuredAddress2" class="common"  style="width:20%"  ref="address2" v-model="insuredShow.address2"
				@change='changeAddress("address2")'>
				<option value='' disabled>请选择</option>
				<option :value="address2.addressCode" 
				v-for="address2,i in address2InfoVoList" :key="i" >{{address2.addressName}}</option>   
			</select>市
		<input type="hidden" class="common" name="address3Name" ref="address3Name"  v-model="insuredShow.address3Name">
			<select  name="InsuredAddress3" class="common"  style="width:20%"   ref="address3" 
			@change="getInsuredAddress()" v-model="insuredShow.address3">
				<option value='' disabled>请选择</option>
				<option :value="address3.addressCode" 
				v-for="address3,i in address3InfoVoList" :key="i" >{{address3.addressName}}</option>   
			</select>区/县
			<input class="common" type="hidden"  name="address4" ref="address4"  style='width:30%' v-model='insuredShow.address4' size="20" >
		</td> 
		</tr>
		<tr style="display:none" >
			<td class=input colspan=3>
			<input class="common" name="insuredAddress" ref='insuredAddress' style='width:96%' maxlength="100" 
			v-model="insuredShow.insuredAddress">
			<img :src="imgUrl">
			</td>
		</tr>
		<tr style="display:none">
			<td class="title">E-Mail：</td>
			<td class=input>
				<input class="common" name="InsuredEmail" maxlength="50"
					@blur="$uiCommon.checkLength($event)">
			</td>
			
		</tr>
		<tr style="display:none;">
			<td class="title">联系人地址：</td>
			<td class="input" colspan="3">
				<input type="text" name="InsuredPostAddress" class="common"
					style="width:96%" maxlength="255" size="20" description="联系人地址"
					@blur="$uiCommon.checkLength($event)">
			</td>
		</tr>
		<tr style="display:none;">
			<td class="title">开户银行：</td>
			<td class="input">
				<input type="text" name="InsuredBank" class="common"
					maxlength="100" size="20" description="开户银行"
					@blur="$uiCommon.checkLength($event)">
			</td>
			<td class="title">帐号：</td>
			<td class="input">
				<input type="text" name="InsuredAccount" class="common"
					maxlength="50" size="20" description="银行帐号"
					@blur="$uiCommon.checkLength($event)">
			</td>
		</tr>
		
		<tr style="display:none;">
			<td class="title">邮政编码：</td>
			<td class="input">
				<input type="text" name="postCode" class="common" ref="postCode"
					maxlength="6" size="20" placeholder="请录入联系人邮编" v-model="insuredShow.postCode"
					@blur="$uiCommon.checkInteger($event,0,8);$uiCommon.checkLength($event)">
			</td>
			
			<td class="title" id="InsuredPhoneNumberTitle" style="display:none;">联系人电话：</td>
			<td class="input" id="InsuredPhoneNumberTD" style="display:none;">
				<input type="text" name="InsuredPhoneNumber2" class="common"
					style="width:30%" maxlength="30" size="20" description="联系人电话"
					@blur="$uiCommon.checkLength($event)" onchange="changeInsuredPhoneNumber(this)">
			</td>
		</tr>
			<tr style="display:none;">
			<td class="title">银行客户经理：</td>
			<td class="input">
				<input type="text" name="ChannelManager" class="common"  maxlength="50">
			</td>
			<td class="title">银行销售渠道：</td>
				<td class="input">
				<select name="SalesChannels" class="common" >
					<option value="1">公司业务部</option>
					<option value="2">中小企业部</option>
					<option value="3">国际结算部</option>
				</select>
			</td>
		</tr>
	</tbody>
 </table>	
	<table id="PageTurn" class="common" cellpadding="3" cellspacing="1"  v-show="isShow">
			<tr  class="common" >
				<td>
					<input type="button" name="button_Insured_Insert" class="button" alt="添加" value="添 加"  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" @click="Add()">
				</td>
				<td>
					<input type="button" name="button_Insured_Delete" class="button" alt="删除" value="删 除"   v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'" @click="Remove(currentPage)">
				</td>
			</tr>
			<tr class="common" id="PreviousNext">
				<td>
					<input type="button" name="button_Insured_Previous" class="button" alt="上一条" value="上一条" @click="prePage">
				</td>
				<td>
					<input type="button" name="button_Insured_Next" class="button" alt="下一条" value="下一条" @click="nextPage">
				</td>
			</tr>
			<tr class=common id="tdIndex" style="display:">
				<td>
					到第<input type="number" name="text_Index" class="small"  style="width:10%"  min="1" 
					:max="pageNum"   v-model="GoPage" size="5" maxlength="10" @change="page(GoPage)">条
				</td>
				<td>
					第<input type="text" name="page" :value="currentPage+1" class="small" readonly="readonly" style="width:5%" size="5" maxlength="4">
					条/共<input type="text" name="pageindex"  readonly="readonly" :value="pageNum" class="small"  style="width:5%" size="5" maxlength="4" >
					条
				</td>
				<td></td>
				<td></td>
			</tr>
	</table>
  </div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainInsured${global.show}.js`)
let MainInsured=moduel.default
export default{ ...MainInsured}
</script>
<style scoped>
  select{
	width: 80%;
  }
</style>