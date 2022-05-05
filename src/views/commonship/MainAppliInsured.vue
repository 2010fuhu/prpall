<template>
    <div>
    <table class=common cellpadding="3" cellspacing="0" >
	<tr>
		<td class="formtitle">
			<img name="AppliInsuredImg" style="cursor:hand" :src="showImgUrl" @click="show()">
			<span>投保人</span>
		</td>
	</tr>
    </table>
		<table id="AppliInsured" ref='AppliInsured' class="common" cellpadding="3" cellspacing="0" v-show="isShow">
			<tbody>
			    <tr>
				<td class=title>
					客户代码：
				</td>
				<td class="input">
					<input type="hidden" name="flag" ref='flag' :value='appliInfoVo.flag' description="投保人信息批改标志">
					<input type="hidden" name="AppliInsuredSerialNo" description="序号">
					<input type="text" name="AppliInsuredCode" class="common" ref='customerCode'  readonly
						style="width:120px"  maxlength="16"  placeholder="请录入投保人代码"  v-validate="'required'"  v-model="appliInfoVo.customerCode">
					<img :src="imgUrl">
					<input type="button" name="buttonAddAppliInsuredCustomer" class="button"  alt="新增/查询" value="新增/查询"
					v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'"	@click="changeCustomerFlag();addAppliInsuredCustomer('AppliInsured')">
				</td>
				<td class="title">
					客户名称：
				</td>
				<td class="input">
					<input type="text" name="AppliInsuredName" class="common"  maxlength="120" placeholder="请录入客户名称"  
					 v-validate="'required'" ref='customerCName'  v-model="appliInfoVo.customerCName">
					<img :src="imgUrl">
				</td>
	
				</tr>
				<tr>
				<td class="title" id="trAppliIdentifyTypeTitle" >证件类型：</td>
                  <td class="input" id="trAppliIdentifyTypeInput">
				 <select name="AppliIdentifyType"  class="common"  v-model="appliInfoVo.identifyType"   ref="identifyType">
				        <option :value="IdentifyType.id" v-for="IdentifyType,index in IdentifyTypeList" :key="index"  v-bind:disabled="IdentifyType.id==''" >{{IdentifyType.name}}</option>   
				  </select>
                  <img :src="imgUrl"></td>
					<td id="idName" class="title">
						证件号码：
					</td>
					<td class=input>
						<input type="text" name="identifyNo" ref="identifyNo" class="common" maxlength="18" size="18" 
						    placeholder="请录入证件号码"   v-validate="'required'"  v-model="appliInfoVo.identifyNo">
							<img :src="imgUrl">
						  <input type="hidden" name="datevalid" ref="datevalid" placeholder="证件有效期"  v-model="appliInfoVo.datevalid">
							<!-- return checkIdentifyNumber(this);" -->
					</td>
				</tr>
				<tr>
				<td class="title">
						客户类型：
					</td>
					<td class="input">
						<select name="AppliInsuredType"  ref="identifyNo" class="common"  v-model="appliInfoVo.insuredType"  description="客户类型" >
							<option value='1'>个人客户</option>
							<option value='2'>团体</option>
							<option value='3'>虚拟客户</option>
						</select>
					</td>
					<td class="title" id="tdAppliMobileTitle">联系人移动电话：</td>
					<td class="input" style="width:5%">
						<input type="text" name="AppliInsuredMobile"  ref="mobile" class="common"  maxlength="80" size="20" placeholder="请录入联系人移动电话"
						  v-validate="'required'" v-model="appliInfoVo.mobile">
					<img :src="imgUrl">
					</td>
          		</tr>
				<tr>
					<td class="title"  v-if="riskCode!='2244'">
						客户性质：
					</td>
					<td class="input" v-if="riskCode!='2244'">
						<select name="AppliInsuredInsuredNature" class="common"
							description="客户性质" onchange="changeAppliInsuredInsuredNature()">
						</select>
					</td>
					<td class="title">
						联系人：
					</td>
					<td class="input">
						<input type="text" name="linkName"  ref='linkName' class="common" v-model="appliInfoVo.linkName"
							description="联系人姓名"   >
					</td>
					<td class="title">
						联系人电话：
					</td>
					<td class="input">
						<input type="text" name="phoneNumber"   ref='phoneNumber' class="common" maxlength="30" size="20"
						 description="联系人电话"  v-model="appliInfoVo.phoneNumber">
					</td>
					
					<td class="title" v-if="riskCode!='2244'">
						客户语种：
					</td>
					<td class="input" v-if="riskCode!='2244'">
						<select name="AppliInsuredLanguage" class="common"
							description="语种">
						</select>
					</td>
				</tr>
				<tr id="trAppliAccAddress" style="display:">
							<td class="title" id="tdAppliAccAddressTitle" rowspan="2">
								客户地址：
							</td>
							<td class="input" colspan="3">
								<input type="hidden" class="common" name="address1Name"  ref='address1Name' v-model="appliInfoVo.address1Name">
								<select  name="address1" class="common"  style="width:20%" ref="address1" 
									 v-model="appliInfoVo.address1" @change='changeAddress("address1")'>
									<option value='' disabled>请选择</option>
									<option :value="address.addressCode" v-for="address,i in addressInfoVoList" :key="i" >{{address.addressName}}</option>   
								</select>省
								<input type="hidden" class="common" name="address2Name"   ref='address2Name'  v-model="appliInfoVo.address2Name" >
								<select  name="address2" class="common"  style="width:20%"   ref="address2"  
									v-model="appliInfoVo.address2" @change='changeAddress("address2")'>
									   <option value='' disabled>请选择</option>
									   <option :value="address2.addressCode" v-for="address2,i in address2InfoVoList" :key="i" >{{address2.addressName}}</option>   
								</select>市
								<input type="hidden" class="common" name="address3Name"  ref='address3Name' v-model="appliInfoVo.address3Name">
							    <select  name="address3" class="common"  style="width:20%"   ref="address3" 
								@change="getInsuredAddress()" v-model="appliInfoVo.address3">
									<option value='' disabled>请选择</option>
									<option :value="address3.addressCode" v-for="address3,i in address3InfoVoList" :key="i" >{{address3.addressName}}</option>   
								</select>区/县
								<input name="address4" class="common" ref='address4' style='width:200px'	
									size="20" description="地址备注" @change="getInsuredAddress()" v-model='appliInfoVo.address4'>
								<input name="AppliemployeeSum" type="hidden" description="在册员工人数"/>
							</td>
						</tr>
						<tr>
							<td class="input" colspan="3">
								<input name="insuredAddress" ref='insuredAddress' maxlength="255" class="common" style='width:96%' size="20" readonly 
								placeholder="请录入客户详细地址"   v-validate="'required'" v-model="appliInfoVo.insuredAddress">
								<img :src="imgUrl">
						</td>
				</tr>					
				<tr>
					<td id="tdAppliInsuredLoanCardCodeTitle" class="title"  v-if="riskCode!='2244'">
						中征码(贷款卡编码)：
					</td>
					<td id="tdAppliInsuredLoanCardCode" class="input" v-if="riskCode!='2244'">
						<input type="text" name="AppliInsuredLoanCardCode"
							class="common" maxlength="16" size="16" description="中征码(贷款卡编码)">
							<img :src="imgUrl">
					</td>
				</tr>
				<tr id='trBusinessSource'  v-if="riskCode!='2244'">
				<td class="title">所属行业：</td>
			     <td class="input" id="tdBusinessSourceInput" colspan="3">
			        <input type="hidden" name="BusinessSource1">
			        <input type="text" name="BusinessSourceName1" class="codename" style="width:23%"
			          querytype="always" codetype="BusinessSource1" coderelation="-1" codelimit="none">
			          <span id="BusinessSource_2" style="display:">
			        <input type="hidden" name="BusinessSource2">
			        <input type="text" name="BusinessSourceName2" class="codename" style="width:23%"
			          querytype="always" codetype="BusinessSource2" coderelation="-1" codelimit="none">
			          </span>
			        <span id="BusinessSource_3" style="display:">
			        <input type="hidden" name="BusinessSource3">
			        <input type="text" name="BusinessSourceName3" class="codename" style="width:24%"
			          querytype="always" codetype="BusinessSource3" coderelation="-1" codelimit="none">
			          </span>
			      </td>
				</tr>
				<tr id='trBusinessType' v-if="riskCode!='2244'">
				<td class="title">企业类型：</td>
				<td class="input" colspan="3">
				<input type="radio" name="AppliInsuredBusinessType"  value="1" checked/>大型企业&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="radio" name="AppliInsuredBusinessType"  value="2" />中型企业&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="radio" name="AppliInsuredBusinessType"  value="3" />小微企业
				<img :src="imgUrl"></td>
				</tr>
				<tr  v-if="riskCode!='2244'">
					<td class="title">
						E-Mail：
					</td>
					<td class=input>
						<input class="common" name="AppliInsuredEmail" maxlength="50"   v-model="appliInfoVo.email" ref="AppliInsuredEmail">
					</td>
					
				</tr>
				<tr  v-if="riskCode!='2244'">
					<td class="title">
						联系人地址：
					</td>
					<td class="input" colspan="3">
						<input type="text" name="AppliInsuredPostAddress" class="common"
							style="width:90%" maxlength="255" size="20" description="联系人地址">
					</td>
				</tr>
				<tr v-if="riskCode!='2244'">
					<td class="title">
						开户银行：
					</td>
					<td class="input">
						<input type="text" name="AppliInsuredBank" class="common"
							style="width:60%" maxlength="100" size="20" description="开户银行">
					</td>
					<td class="title">
						帐号：
					</td>
					<td class="input">
						<input type="text" name="AppliInsuredAccount" class="common"
							style="width:70%" maxlength="50" size="20" description="银行帐号">
					</td>
				</tr>
				<tr>
					<td class="title">
						邮政编码：
					</td>
					<td class="input">
						<input name="postCode" class="common" ref='postCode' maxlength="6"
							description="联系人邮编" v-model="appliInfoVo.postCode">
					</td>
		            <td class="title" id='tdAppliInsuredMobile1' v-if="riskCode!='2244'">联系人移动电话：</td>
		            <td class="input" id='tdAppliInsuredMobile2' v-if="riskCode!='2244'">
		              <input type="text" name="AppliInsuredMobile"  maxlength="15"  size="20" class="readonly"  readonly description="联系人移动电话"
					   @blur="$uiCommon.checkLength($event);checkMobile($event)" @change="changeAppliMobile();">
		            </td>		
		         			
			   	<td class="title" style="width:15%">发票抬头人：</td>
                    <td class="input" style="width:10%">
                    <input type="text" name="InvoiceMan" class="common" ref="invoiceMan" 
						maxlength="80" size="20" description="发票抬头人"  v-model="appliInfoVo.invoiceMan" >
                </td>
				</tr>
				<tr  v-if="riskCode!='2244'">
					<td class="title">
						境内境外标识：
					</td>
					<td class="input">
						境内<input type="radio" name="NationFlag" value="1" checked />
						境外<input type="radio" name="NationFlag" value="0" />
					</td>
					<td class="title"></td>
					<td class="input"></td>
				</tr>
				 <tr>
				 <td class="title">企业性质：</td>
                    <td class="input">
					  	<select name="businessSort" class="common" ref="businessSort" 
						  maxlength="4"  style="width:60px" v-model="appliInfoVo.businessSort" description="企业性质" >
							<option value='' disabled>请选择</option>
							<option  :value='businessSort.codeCode' v-for="(businessSort,index) in businessSortList " :key="index">{{businessSort.codeName}}</option>
						</select>
                    </td>
				 
	            	<td class="title">
						企业资质：
					</td>
					<td class=input>
					    <input  type="hidden"  name="businessDetail"   :value='appliInfoVo.businessDetail' />
	                    <select class="common" name="qualification" ref="qualification" style="width:40%"  
						 description="企业资质"  v-model='appliInfoVo.qualification'>
						    <option value='' disabled>请选择</option>
							<option value='1'>特级</option>
							<option value='2'>一级</option>
							<option value='3'>二级</option>
							<option value='4'>三级</option>
							<option value='5'>未评级</option>
	                    </select>
					
	                </td>
	            </tr> 
				<tr  v-if="riskCode=='2244'">
					<td class="title">农民工工资支付保证金：</td>
		           	<td class="input">
			          	<input type="text" class="common" name="capitalauThority"   ref="capitalauThority" style="width:35%" maxlength="14" 
						  v-model="appliInfoVo.capitalauThority" 
			         	  @keypress="$uiCommon.pressDecimal($event)" @focus="$uiCommon.checkFocusZero($event);"
			             	@blur="$uiCommon.checkDecimal1($event,17,2,'','')" @change="$uiCommon.numberFormatMoney($event);"> 元
		          	</td>  
			        <td class="title">企业规模：</td>
		         	<td class="input">
						 <select  class="common" name="customerLevel"  style="width:40%"  ref="customerLevel" v-model="appliInfoVo.customerLevel">
						    <option value='' disabled >请选择</option>
							<option value='1'>营业收入8亿元以上</option>
							<option value='2'>营业收入在8亿元至6000万元之间</option>
							<option value='3'>营业收入6000万元以下</option>
							<option value='4'>资产总额8亿元以上</option>
							<option value='5'>资产总额在8亿元至5000万元之间</option>
							<option value='6'>资产总额5000万元以下</option>
	                    </select>
					 </td>	
		        </tr>  
	            <tr v-else>
					<td class="title">注册资本：</td>
		           	<td class="input">
			          	<input type="text"  name="AppliCapitalauThority" class="common" style="width:35%" maxlength="14" description="注册资本"> 
			             	元
		          	</td>  
			        <td class="title">上一年度营业收入：</td>
		         	<td class="input">
		      	    	<input type=text  class="common" name="doBesinessIncome"   maxlength="14" 
						  v-model="appliInfoVo.doBesinessIncome" description="上一年度营业收入">
		         	</td>
		        </tr>
	             <tr>
					<td class="title" >资产负债率：</td>
		           	<td class="input">
			          	<input type="text"   class="common" name="insuredRemark" ref='insuredRemark' style="width:25%" maxlength="3"
						  v-model='appliInfoVo.insuredRemark' description="资产负债率"
			         	 	@keypress="$uiCommon.pressDecimal($event)" 
			             	@focus="$uiCommon.checkFocusZero($event);"
			             	@blur="$uiCommon.checkDecimal1($event,17,2,'','')"
			             	@change="$uiCommon.numberFormatMoney($event);"> %
		          	</td>  
		        </tr>
			</tbody>
		</table>
</div>
</template>

<script>
let moduel=require(`@/pubJs/${global.path}/MainAppliInsured${global.show}.js`)
let MainAppliInsured=moduel.default
//import MainAppliInsured from '@/pubJs/MainAppliInsured.js'
export default{
	...MainAppliInsured
}
</script>
<style scoped>
  select{
	width: 80%;
  }
</style>