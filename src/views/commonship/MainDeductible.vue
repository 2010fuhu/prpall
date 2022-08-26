<template>
   <div>
  <table  class="common" cellpadding="5" cellspacing="0">
     <tr >
      <td class="formtitle" colspan=2>
        <img name="ItemKindMainImg" style="cursor:hand" src="@/assets/images/butCollapse.gif"
          @click="show"> 免赔约定 
         <img src="@/assets/images/markMustInput.jpg">
      </td>
    </tr>
    <tr  v-show="isShow" >
      <td class="title2" >免赔约定：</td>
      <td class="input2" >
        <input type="hidden" name="DeductibleText_Flag"  v-model="DeductibleText_Flag" description="每次事故绝对免赔文本信息的批改标志">
        <p align="left">
        <!-- class="codecode"-->
        <textarea name="deductibleClauses" class="common" ref="clauses" maxlength="300"  
        v-model="engageInfoVo.clauses"   v-validate="'required'"
        @change="changeDeductibleTextEngage();setRefreshFlagDeductibleTextZero()" >
        </textarea>
        </p>
      </td>
    </tr>
  </table>
   </div>
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainDeductible${global.show}.js`)
//let moduel=import(`@/pubJs/${global.path}/MainDeductible${global.show}.js`)
let MainDeductible=moduel.default
//import MainDeductible from '@/pubJs/MainDeductible.js'
export default{
  ...MainDeductible
}
</script>
<style scoped>
textarea{
  width:90%;
  height:60px
}
</style>