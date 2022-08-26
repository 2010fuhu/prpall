<template>
    <span id="bdwid">
  <!-- 保单尾信息 -->
  <table id="Tail" class="common" cellpadding="3" cellspacing="0">
    <tr>
      <input type="hidden" name="Tail_Flag" description="保单尾模块批改标志">
      <td id="tdJudicalScopeTitle" class="page" colspan=4>
        
        <label id="trJudicalScope">司法管辖：       
               <select  name="judicalCode" ref="judicalCode" class="common3" style="width:27%"   v-model="judicalCode" >
                  <option value="01" selected>中国境内(港、澳、台除外)</option>
                  <option value="02">中国境内(包含港、澳、台)</option>
                  <option value="03">世界范围(美、加除外)</option>
                  <option value="04">世界范围(包含美、加地区)</option>
               </select>

        </label>
        <label id="trArgueSolution">
          <input type="hidden" name="flag" description="合同争议解决方式批改标志" :value='flag'>
          <select name="argueSolution"  ref='argueSolution' class="common3" style="width:8%" description="合同争议解决方式" v-model="argueSolution"
            @change="changeArgueSolution();">
            <option value="1" selected>诉讼</option>
            <option value="2">仲裁</option>
            <option value="3">协商</option>
          </select>
          <span id="spanArbitBoardName" v-show="argueShow">
            <select  class='common3'  name="arbitBoardName" ref="arbitBoardName" v-model='arbitBoardName'>
              <option :value="arbitraryBoard.codeCode"  v-for=" arbitraryBoard,i in arbitraryBoardList" :key="i" >
              {{arbitraryBoard.codeName}}</option>
            </select>&nbsp;仲裁<img :src="imgUrl">
          </span>
          <span id="spanOther" style="display:none">
            <input type="text" name="OtherText" style="width:25%" class="common3" maxlength="60" description="其它">&nbsp;其它
            <img  :src="imgUrl">
          </span>
        </label>    
      </td>
    </tr>
    <tr>
    <td colspan=4>
      <label id="tdArbitBoardAddress" style="display:none" >仲裁地点：
        <input type="text" name="ArbitBoardAddress" class="common3" style="width:28%" description="仲裁地点">
        <img :src="imgUrl">
     </label>
     </td>
    </tr>
    <tr id="trOperatorCode" style="display:none">
      <td id="tdOperatorCodeTitle" class="title">操作员：</td>
      <td id="tdOperatorCodeInput" class="input">
        <input type="text" name="OperatorCode" class="readonly3" readonly style="width:28%" description="录单人代码">
        <input type="text" name="OperatorName" class="readonly3" readonly style="width:56%" description="录单人名称">
      </td>
      <td  class="title">操作日期：</td>
      <td id="tdOperateDateInput" class="input">
        <input type="text" name="InputDate" class="readonly3" readonly description="操作日期">
        <input type="hidden" name="InputHour" description="操作小时">
      </td>
    </tr>
    <tr id="trUpdaterCode" style="display:none">
      <td id="tdUpdaterCodeTitle" class="title">最近修改人：</td>
      <td id="tdUpdaterCodeInput" class="input">
        <input type="text" name="UpdaterCode" class="readonly3" readonly style="width:28%" description="最近修改人代码">
        <input type="text" name="UpdaterName" class="readonly3" readonly style="width:56%" description="最近修改人名称">
      </td>
      <td id="tdUpdateDateTitle" class="title">最近修改日期：</td>
      <td id="tdUpdateDateInput" class="input">
        <input type="text" name="UpdateDate" class="readonly3" readonly description="最近修改日期">
        <input type="hidden" name="UpdateHour" description="最近修改小时">
      </td>
    </tr>
    <tr id="trUnderWriteCode" style="display:none">
      <td id="tdUnderWriteTitle" class="title">核保人：</td>
      <td id="tdUnderWriteInput" class="input">
        <input type="text" name="UnderWriteCode" class="readonly3" readonly style="width:28%" description="核保人代码">
        <input type="text" name="UnderWriteName" class="readonly3" readonly style="width:56%" description="核保人名称">
      </td>
      <td id="tdUnderWriteEndDateTitle" class="title">核保通过日期：</td>
      <td id="tdUnderWriteEndDateInput" class="input">
        <input type="text" name="UnderWriteEndDate" class="readonly3" readonly description="核保通过日期">
      </td>
    </tr>
    <tr id="trEndorseOperator" style="display:none">
      <td id="tdOperatorCodePTitle" class="title">批单操作员：</td>
      <td id="tdOperatorCodePInput" class="input">
        <input type="text" name="OperatorCodeP" class="readonly3" readonly style="width:28%" description="批单操作员代码">
        <input type="text" name="OperatorNameP" class="readonly3" readonly style="width:56%" description="批单操作员名称">
      </td>
      <td class="title">&nbsp;</td>
      <td class="input">&nbsp;</td>
    </tr>
    <tr id="trMainRemark">
      <td id="tdMainRemarkTitle" class="title" >出单员意见：
        <input  name="button_MainRemark_Open_Context" class="button" type="button" v-model="RemarkButton" alt="录入" src="@/assets/images/butInputCoins.gif"
          @click="dialogFormVisible = true" >
        <span id="span_MainRemark_Context" style="width:520;display:none;position:absolute;background-color:C0C0C0;" v-show="dialogFormVisible">
          <table class=list cellpadding="3" cellspacing="1">
            <tr class=common>
              <td >
                <textarea class='common' name='remark' ref='remark' v-model="remark" rows="3" cols="80" maxLength="1000" description="备注"></textarea>
              </td>
            </tr>
            <tr class=common>
              <td>
                <input class="button" type="button" name="button_LadingNo_Close_Context" alt="确定" value="确 定" 
                src="@/assets/images/butOk.gif" @click="submitRemark()">
              </td>
            </tr>
          </table>
        </span>
      </td>
      <td class=input colspan=3>
        <input name="MainRemark_Show" class="readonly" readonly description="出单员意见" v-model="MainRemark_Show">
      </td>
    </tr>
    <tr id="trArgueSolutionArbitBoardName"></tr>
  </table>
 
</span>
</template>

<script>
export default{
   name:'bdwid',
    data() {
      return {
        imgUrl:require('@/assets/images/markMustInput.jpg'),
        dialogFormVisible: false,
        RemarkButton:'录入',
        remark:'',
        flag:'',//批改过程的标志 普通批改录入 批改main表中的数据时，需要用到这个
        MainRemark_Show:'',
        judicalCode:"01",
        judicalScope:"",
        argueSolution:'1',
        arbitraryBoardList:[],
        argueShow:false,
        arbitBoardName:'A01'
      };
    },
  
   methods:{
      getUrl(){ },
      submitRemark(){
          this.dialogFormVisible=!this.dialogFormVisible;
          this.RemarkButton='修改';
          this.MainRemark_Show=this.remark;
      },
      changeArgueSolution(){
        this.argueSolution=='2'?this.argueShow=true:this.argueShow=false
      },
      initSelected(data){
          this.arbitraryBoardList=data.arbitraryBoardList
      },
      initMainTailData(obj){
        this.judicalCode=obj.mainInfoVo.judicalCode
        //this.judicalScope=obj.mainInfoVo.judicalScope
        this.argueSolution=obj.mainInfoVo.argueSolution
        if(obj.mainInfoVo.remark!=null){
           this.remark=obj.mainInfoVo.remark
        }
        if(obj.mainInfoVo.arbitboardName!=null){
          this.arbitBoardName=obj.mainInfoVo.arbitboardName

        }
        if(this.$store.state.bizType=='ENDORSE'){
          this.$nextTick(()=>{
            this.$refs.judicalCode.title=this.judicalCode
            //this.$refs.judicalScope.title=this.judicalScope
            this.$refs.argueSolution.title=this.argueSolution
            this.$refs.arbitBoardName.title=this.arbitBoardName
            this.$refs.remark.title=this.remark
            this.$uiCommon.addevent(this,'remark')
            this.$uiCommon.addevent(this,'judicalCode')
            this.$uiCommon.addevent(this,'argueSolution')
            this.$uiCommon.addevent(this,'arbitBoardName')
          })
        }
      }
   }
}
</script>

