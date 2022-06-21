<template>
   <div  class="dialog" v-show="isAgriChildShow">
    <div class="content">
    <div  class="mainContent"> 
    <table id="SidyMainHead"  class="common"> 
      <tr>
      <td>
          <table  ref="SubSidy" class="common" border="0">
            <thead>
              <tr>
                <td class="centertitle" width="10%">序列</td>
                <td class="centertitle" width="27%">保费来源</td>
                <td class="centertitle" width="20%">保费比例(%)</td>
                <td class="centertitle" width="25%">保费金额</td>
                <td class="centertitle" width="13%"   v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'" >&nbsp;</td>
              </tr>
            </thead>
            <tbody>
             <tr ref="subSidyData"  v-for="(SubSidyInfoVo, index) in subSidyInfoVoList" :key="index" >
              <td>
                <input type="hidden" name="flag" description="涉农险信息批改标志" :value='SubSidyInfoVo.flag'>
                <input type="text" name="serialNo" ref="serialNo" class="readonly" style="width:100%" description="涉农险信息页面显示序号" v-model="SubSidyInfoVo.c">
              </td>
              <td>
                <select name="subSidySort"  ref="subSidySort" class="common" style="width:100%" description="保费来源"   v-validate="'required'" v-model="SubSidyInfoVo.subSidySort" @change="checkSubSidySort(index)">
                  <option value="" disabled>请选择</option>
                  <option value="1">中央财政</option>
                  <option value="2">地方财政</option>
                  <option value="3">地市县财政</option>
                  <option value="4">农民缴纳</option>
                  <option value="5">其他来源</option>
              </select>
              </td>
              <td>
                <input type="text" name="subSidyRate"  ref="subSidyRate"  class="common3" style="width:100%" description="保费比例"  maxlength="3"   v-validate="'required'"  v-model="SubSidyInfoVo.subSidyRate"
                  @keypress="$uiCommon.pressDecimal($event);"
                  @blur="countSubSidyPremium(index)">
              </td>
              <td>
                <input type="hidden" name="SubSidyCurrency" class="common3" value="CNY"
                    maxlength="3" description="币别" style="width:30px;display:none"
                    querytype="always" codetype="Currency1" coderelation="0,1" codelimit="must">
                <input type="hidden" name="SubSidyCurrencyName" value="人民币" style="display:none" description="币别">
                <input type="text" name="subSidyPremium"  ref="subSidyPremium"  :class="SubSidyInfoVo.flag=='U'?'common3u':'common3'" style="width:99%" description="保费金额"  v-validate="'required'"   v-model="SubSidyInfoVo.subSidyPremium"
                @keypress="$uiCommon.pressDecimal($event)">
              </td>
              <td  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'" >
                <p align="right"><input type="button" name="button_SubSidy_Delete" class="button" alt="删除" value="删 除" @click="deleteSubSidy(index)"></p>
              </td>
            </tr>
            
            </tbody>
            <tfoot>
              <tr  v-if="$route.path!='/proposalShow'&&$route.path!='/policyShow'&&$route.path!='/endorseShow'"  >
                <td colspan="6">
                  <p align="right"><input type="button" name="button_SubSidy_Insert" class="button" alt="新增" value="新 增"
                    @click="insertSubSidy()"></p>
                </td>
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>
    <table>
      <tr id="trAgriNature">
        <td>
          政策/商业标志：{{AgriNature}}
        </td>
      </tr>
    </table>
      <table class="common" border="0">
          <tr>
          <td width="50%">
              <p align="center"><input type="button" name="buttonSubmit" class="button" alt="确定" value="确 定"
               @click="okCallback()"></p>
          </td>
          <td width="50%">
              <p align="center"><input type="button" name="buttonCancel" class="button" alt="取消" value="取 消"
              @click="cancelCallback()"></p>
          </td>
          </tr>
      </table>
      </table>
        </div>
    </div> 
</div>  
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainAgriType${global.show}.js`)
let MainAgriType=moduel.default
//import  MainAgriType from '@/pubJs/MainAgriType.js'
export default{
    ...MainAgriType
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
        right:0;
        bottom:0;
        width: 100%;
        height: 100%;
        padding:20px;
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