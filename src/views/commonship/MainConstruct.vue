<template>
  <div>
  <table   class="common" cellpadding="3" cellspacing="0" >
    <tr>
    <td class="formtitle" >
      <img style="cursor:hand" src="@/assets/images/butCollapse.gif" @click="show();"> 建设工程
      </td>
    </tr>
  </table>
  <table ref="Construct" class="common" cellpadding="3" cellspacing="0" v-show="isShow">
  	<tr v-show="elementShow">
          <td class="title">招标文件编号：</td>
          <td class="input">
            <input type="text"  name="ConstructArea" maxlength="120" class="common">
          </td>
           <td class="title" >工程合同编号：</td>
          <td class="input">
            <input type="text"  name="ConstructPostCode" maxlength="120" class="common" >
          
          </td> 
          
     </tr>

    <tr>
      <td class="title" >工程名称：</td>
      <td class="input">
        <input type="hidden" name="Construct_Flag">
        <input type="text" name="constructName" class="common" maxlength="120"  ref="constructName"  v-validate="'required'"  
          v-model="constructInfoVo.constructName">
        <img :src="imgUrl" >
      </td>
      <td class="title"  v-show="elementShow" >工程类型：</td>
      <td class="input" v-show="elementShow">
         <select name="ConstructTypeName" class="common" description="工程类型"  v-show="elementShow"> </select>
      </td>
    </tr>
    <tr v-show="elementShow">
         <td class="title" >工程预计合同造价：</td>
         <td class="input" >
        <input type="text" name="CurrencyCost" class="codecode" style="width:10%;" maxlength="3" >			
        <input type="hidden" name="ConstructCostName"  value="人民币"   description="币别名称">
        <input type="hidden" name="CurrencyCostMain" value="CNY"  description="币别">
        <input name="ConstructCost" type="text" maxlength="50" class="common" onchange="getAdjustRate();calAmount()" style="width:75%"/><img :src="imgUrl"> 	
        </td>
         <td class="title" >保证金：</td>
         <td class="input" >
         	<input name="FullDecorationRatio" type="text" maxlength="50" class="common"/>
         	 元
         	</td>
        </tr>  
       <tr>
			<td class="title"  >工程计划期限：</td>
			<td class="input" >
		      	<label>自</label>
            <div ref="startFixDateDiv" >
            <el-date-picker  ref="startFixDate"  v-model="constructInfoVo.startFixDate" type="date"  :readonly='$route.path!="/main"&&$route.path!="/pgMain"' format="yyyy-MM-dd" name="startFixDate" v-validate="'required'" 
                value-format="yyyy-MM-dd" placeholder="工程起期" size="mini" 
                @blur="checkStartDateForCermical();addassuremonth();" @change="$route.path=='/pgMain'&&changeCorlor()">
            </el-date-picker> 日起&nbsp;至
            </div>
            <!-- <input type='text' name='startFixDate' class='common4' ref="startFixDate"  placeholder="工程起期"  v-model="constructInfoVo.startFixDate"
              :readonly='$store.state.onlyStatus' v-validate="'required'"   @click="SelectDate($event,'yyyy-MM-dd');"  />
            日起&nbsp;至 -->
      </td>
          <td class="input">
          <div ref="endFixDateDiv">
          <el-date-picker  ref="endFixDate" v-model="constructInfoVo.endFixDate" type="date"  :readonly='$route.path!="/main"&&$route.path!="/pgMain"' format="yyyy-MM-dd" name="endFixDate" v-validate="'required'" 
                value-format="yyyy-MM-dd" placeholder="工程终期" size="mini" 
                @blur="addassuremonth();checkDateMainConstruct('endFixDate');"  @change="$route.path=='/pgMain'&&changeCorlorEnd()">
            </el-date-picker>&nbsp;日&nbsp;止
          </div>
            <!-- <input type='text' name='endFixDate' class='common4' ref="endFixDate"  placeholder="工程起期"  v-model="constructInfoVo.endFixDate"  
             :readonly='$store.state.onlyStatus'  v-validate="'required'"   @click="SelectDate($event,'yyyy-MM-dd')" />&nbsp;日&nbsp;止 -->
          </td>
				<td class="input" style="width:20%">
					<label>共</label>
					<input type="text" name="addAssureMonth" ref="addAssureMonth"  v-model="constructInfoVo.addAssureMonth" class="common" style="width:10%" maxlength="10"  readonly>个月
				  <img :src="imgUrl">
        </td>
		</tr>
    <tr  v-show="elementShow">
      <td class="title" style="width:20%">工程所有人：</td>
      <td class="input" style="width:80%" colspan="3">
        <input type="text" name="constructAddress" class="common" style="width:458px" maxlength="60" description="工程所有人："
          onblur="return checkLength(this);">
      </td>
    </tr>
    <tr id="trRemark" v-show="elementShow">
      <td class="title" style="width:20%">工程承包商：</td>
      <td class="input" style="width:80%" colspan="3">
        <input type="text" name="Remark" class="common" style="width:458px" maxlength="60" description="工程承包商：" >
      </td>
    </tr>
      
    
    <tr style="display:">
      <td class="title" style="width:20%">工程地址：</td>
      <td class="input" style="width:80%" colspan="3">
        <input type="text" name="constructAddress"   ref="constructAddress"  v-validate="'required'"   v-model="constructInfoVo.constructAddress" class="common" style="width:458px" maxlength="60"  >
        <img :src="imgUrl">
      </td>
    </tr>
  </table>
  </div> 
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainConstruct${global.show}.js`)
let MainConstruct=moduel.default
//import MainConstruct from '@/pubJs/MainConstruct.js'
 export default{
   ...MainConstruct
 }
</script>