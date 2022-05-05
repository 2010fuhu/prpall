<template >
    <div>
  <table class=common cellpadding="3" cellspacing="0" >
    <tr>
      <td class="formtitle" >
       <img style="cursor:hand;"  src="@/assets/images/butCollapse.gif"
             name="ItemKindMainImg" @click="show();">
        主险<img :src="imgUrl"><br>
      </td>
    </tr>  
    </table>  
        <table id="ItemKindMain" class=list cellpadding="3" cellspacing="1" v-show="isShow">
          <thead>
            <tr>
              <td class="centertitle" style="width:5%">*</td>
              <td class="centertitle" style="width:20%">主险名称</td>
              <td class="centertitle" style="width:20%">保额</td>
              <td class="centertitle" style="width:10%">币别</td>
              <td class="centertitle" style="width:15%">年费率%</td>
              <td class="centertitle" style="width:20%">保费</td>
              <td class="centertitle" style="width:20%"></td>
            </tr>
          </thead>
            <tbody v-show="isShow" >
            <tr class=common  ref="itemkindData"  v-for="(kindMain, index) in itemKindInfoVoList" :key="index">
				    <td width="12px" >
                <img type="button" name="button_ItemKindMain_Open" class="button" alt="显示子页面" :src="imgUrl"
                  @click="ShortRateShow(index)">
                <input type="hidden" name="serialNo"      ref="serialNo"       description="标的序号"      v-model="kindMain.serialNo" >
                <input type="hidden" name="calculateFlag" ref="calculateFlag"  description="是否计入保额"   v-model="kindMain.calculateFlag" >
                <span id="span_ItemKindMain_SubPage" class="ShortRateClass" style="position:absolute;background-color:ffffff" 
                v-show="kindMain.ShortRateClassShow" >
                  <table class="common" style="width:270" cellpadding="3" cellspacing="1" >
                    <tr>
                      <td class="title">短期费率方式：</td>
                      <td class="input">
                        <select name="shortRateFlag" class="common3"  ref="shortRateFlag" description="短期费率方式"  v-model='kindMain.shortRateFlag'
                          @change="calShortRate(index);$route.path=='/pgMain'&&calculatepremium()">
                          <option value="0">不计</option>
                          <option value="1">按短期费率表</option>
                          <option value="4">按月计算</option>
                          <option value="2">按日计算</option>
                          <option value="5" >按约定比例</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td class="title">短期系数%：</td>
                      <td class="input">
                        <input type="text" name="shortRate" class="common3"  ref="shortRate" maxlength="9" value="100" description="短期系数%"
                         v-model="kindMain.shortRate" @keyup="$uiCommon.pressDecimals($event);" @blur="$uiCommon.checkDecimal($event,8,4,'','');" @change="$route.path=='/pgMain'&&calculatepremium()">
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" align="center" >
                        <input type="button" name="button_ItemKindMain_Close" class="button" alt="确定" value="确 定"
                          @click="ShortRateShow(index)">
                      </td>
                    </tr>
                  </table>
                </span>
              </td>
              <td>
                    <select class="common" name="kindCode"   ref="kindCode" v-model="kindMain.kindCode">
                      <!--<option :value="kindInfoVoData.kindcode" v-for=" kindInfoVoData,i in kindInfoVoList" :key="i"  >{{kindInfoVoData.kindcname}}</option>-->
                        <option value="2244001">农民工工资支付履约保证保险</option>
                    </select>
              </td>
              <td>
                <input type="text" name="amount" ref="amount" class="common"
                  maxlength="18" style="width:130px" description="保险金额" readonly  v-model.number="kindMain.amount" >
                
              </td>
              <td>
                 <select class="common" name="currency"  ref="currency" maxlength="3" description="币别代码" style="width:50%" v-model="kindMain.currency">
                      <option :value="currencyInfoVoData.currency" v-for=" currencyInfoVoData,i in currencyInfoVoList" :key="i"  >{{currencyInfoVoData.currencyname}}</option>
                    </select>
              </td>         
              <td>
                <input type="text" name="rate" class="common" ref="rate"
                  maxlength="9" style="width:60%" description="年费率"  v-model="kindMain.rate"
                  @keypress="$uiCommon.pressDecimal($event)"  
                  @blur="$uiCommon.checkDecimal($event,8,5,'','');"
                  @change="$route.path=='/pgMain'&&calculatepremium()">
              </td>
              
              <td>
                <input type="text" name="premium" class="common" ref="premium" description="保险费"  readonly
                  maxlength="18" style="width:60%" v-model="kindMain.premium"/>
              </td>
              <td >
                <input class="button" type="button" name='button_ItemKindMain_Delete' 
                @click="del(index);" alt="删除" value="删 除"   ref="Del" v-show="false">
              </td>
            </tr>
          </tbody>
          <tfoot> 
            <tr class=common>
              <td colspan="6"></td>
              <td>
                <input style="float:center" name="button_ItemKindMain_Insert" @click="add();" 
                class="button" type="button"  alt="新增" value="新 增"  ref="insert" v-show="false">
              </td>
            </tr>
          </tfoot>
        </table>
    </div>
</template>
<script type="text/script">
  let moduel=require(`@/pubJs/${global.path}/MainItemkind${global.show}.js`)
  let MainItemkind=moduel.default
  export default{
    ...MainItemkind
  }
</script>
