<template>
    <div name="MainLoan">
    <table class=common cellpadding="3" cellspacing="0">
			<tr>
				<input type="hidden" name="Mainloan_Flag">   
				<td class=formtitle  style="text-align:left">
					<img name="MainLoanImg" style="cursor:hand" :src="imgUrl"
					@click="show"> 反担保方式<br>
				</td> 
			</tr> 
	</table>
    <table class=common cellpadding="3" cellspacing="0" ref="mainLoan"  v-show="isShow">
	       <tr>
			<td class="title"> 反担保期限：</td>
			<td class="input" >
		      	<label>自</label>
				 <input  type='text' class="common4" ref="guaranteeStartDate" v-if="$route.path=='/proposalShow'||$route.path=='/endorseShow'||$route.path=='/policyShow'"  :value='guaranteeInfoVo.guaranteeStartDate'/>
				<el-date-picker v-else v-model="guaranteeInfoVo.guaranteeStartDate" type="date"  format="yyyy-MM-dd"   name="guaranteeStartDate" ref="guaranteeStartDate"
					value-format="yyyy-MM-dd" placeholder="反担保起期" size="mini" @change="checkStartDateForCermical();addassuremonth();($route.path=='/pgMain'||$route.path=='/reinsPgMain')&&changeCorlor()"></el-date-picker>日起&nbsp;至
				<!-- <input class='common4'  name="guaranteeStartDate"  ref="guaranteeStartDate" v-model="guaranteeInfoVo.guaranteeStartDate" type="text" :readonly='$store.state.onlyStatus' 
					placeholder="反担保起期"    @click="SelectDate($event,'yyyy-MM-dd');">日起&nbsp;至 -->
			</td>
			<td class="input"> 
			    <input  type='text' class="common4" ref="guaranteeEndDate" v-if="$route.path=='/proposalShow'||$route.path=='/endorseShow'||$route.path=='/policyShow'"  :value='guaranteeInfoVo.guaranteeEndDate'/>
				<el-date-picker v-else v-model="guaranteeInfoVo.guaranteeEndDate" type="date"  format="yyyy-MM-dd" name="guaranteeEndDate" ref="guaranteeEndDate"
					value-format="yyyy-MM-dd" placeholder="反担保终期" size="mini" 
					@blur="addassuremonth();checkDateMainConstruct('guaranteeEndDate');" @change="($route.path=='/pgMain'||$route.path=='/reinsPgMain')&&changeCorlorEnd()">
				</el-date-picker>&nbsp;日&nbsp;止	
				<!-- <input class='common4' name="guaranteeEndDate" ref="guaranteeEndDate" v-model="guaranteeInfoVo.guaranteeEndDate" type="text" :readonly='$store.state.onlyStatus'  
					value-format="yyyy-MM-dd" placeholder="反担保终期"    @click="SelectDate($event,'yyyy-MM-dd');">&nbsp;日&nbsp;止					 -->
        	</td>
			<td class="input" >
				共
				<input type="text" name="guaranteeMonth"  ref="guaranteeMonth" v-model="guaranteeInfoVo.guaranteeMonth" class="common" style="width:10%"   readonly>个月
			</td>
		</tr> 
        <tr>
          <td class="title" >反担保协议编号：</td>
          <td class="input">
            <input type="text"  name="mortgageNo" ref="mortgageNo" maxlength="50" class="common" v-model="guaranteeInfoVo.mortgageNo" >
          </td>
			<td class="title">反担保金额(元)：</td>
	          <td class="input">
	            <input name="guaranteeAmount"   ref="guaranteeAmount"   type="text" maxlength="50" class="common"  v-model="guaranteeInfoVo.guaranteeAmount"
				@change="$uiCommon.checkDecimal($event,17,2,'','');"/>
			</td>
         </tr>
         <tr ref='guaranteeSubData' v-for="(Guarantee, index) in guaranteeSubInfoVoList" :key="index">
		     <td class="title"  >反担保方式、种类及覆盖率：</td>
	          <td colspan="3">
				<select   :class="Guarantee.flag=='I'?'commoni':Guarantee.flag=='D'?'commond':'common'"   name="guaranteeType"   ref="guaranteeType"  v-model="Guarantee.guaranteeType" style="width:20%" >
					<option  value="" disabled>请选择</option>
					<option  value="1">保证金</option>
					<option  value="2">抵押</option>
					<option  value="3">质押</option>
					<option  value="4">保证</option>
					<option  value="5">其他</option>
				</select>
				说明：
				  <input  :class="Guarantee.flag=='I'?'commoni':Guarantee.flag=='D'?'commond':'common'"   name="guaranteeDesc"   ref="guaranteeDesc"   v-model="Guarantee.guaranteeDesc" maxlength="200"  style="width:40%"/>
				<label>比率%</label>
				 <input  :class="Guarantee.flag=='I'?'commoni':Guarantee.flag=='D'?'commond':'common'"    name="guaranteeRate"   ref="guaranteeRate" v-model="Guarantee.guaranteeRate"  maxlength="50" style="width:20%" description="比率%"
			       @keypress="$uiCommon.pressDecimal($event);"
                  @blur="$uiCommon.checkDecimal($event,8,4,'','')"/>
	             <input class="button" type="button" name='buttionGuaranteeDelete'  style="float:right" 
                  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'"	@click="delGuarantee(index);" alt="删除" value="删 除"   ref="Del">
			  </td>
         </tr>
		 <tr>
              <td colspan="4">
                <input  id="buttionGuaranteeInsert" class="button"  type="button" style="float:right" name="buttionGuaranteeInsert"
				v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'"  @click="addGuarantee();"   alt="新增" value="新 增"
                 ref="insert">
              </td>
		  </tr>
      </table> 
    </div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainLoan${global.show}.js`)
let MainLoan=moduel.default
 export default{
   ...MainLoan
 }
</script>
<style  scoped>
    #buttionGuaranteeInsert{
		float:right;
	}
</style>