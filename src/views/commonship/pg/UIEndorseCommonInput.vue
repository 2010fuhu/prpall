<template>
 <div>
    <table class=common cellpadding="5" cellspacing="1">
      <tr>
        <td class="formtitle" colspan="2">
          保单批改
        </td>
      </tr>
      <tr>
        <td class="title" style="width:33%">保单号：</td>
        <td class="input" style="width:67%">
          <input type="text" name="policyNo" class="common" style="width:30%" maxlength="22" v-model='policyNo' description="保单号"
            @blur="$uiCommon.checkLength($event)">
          <img src="@/assets/images/markMustInput.jpg">
          <input type="button" name="buttonQueryFunction" class="button" alt="查询" value="查 询" onclick="queryBizListPg(<%=strRiskCode %>,<%=strPolicySort %>)">
        </td>
      </tr>
      <tr>
        <td class="title" style="width:33%">批改日期：</td>
        <td class="input" style="width:67%">
          <input type="text" name="endorseDate" class="common4" placeholder="批改日期" v-model="endorseDate"  readonly @change="SelectDate($event,'yyyy-MM-dd')" /> 
          &nbsp;日
        </td>
      </tr>
      <tr>
        <td class="title" style="width:33%">批改生效日期：</td>
        <td class="input" style="width:67%">
          <input type="text" name="validDate" class="common4" placeholder="批改生效日期" v-model="validDate"  @click="SelectDate($event,'yyyy-MM-dd')" />&nbsp;日
            <!-- <input type="date" placeholder="批改生效日期" class="common4"   v-model="validDate">&nbsp;日 -->
            <input type="text" name="validHour" class="common" style="width:5%" maxlength="2" v-model="validHour" description="批改生效小时数"
            @keypress="$uiCommon.pressInteger($event)"
            @blur="$uiCommon.checkInteger($event,0,24)">&nbsp;时
          <img src="@/assets/images/markMustInput.jpg">
        </td>
      </tr>
      <tr>
        <td class="title" style="width:33%">归属部门：</td>
        <td class="input" style="width:67%">
           <select class="common" style="width:26%;margin:10px" name="comCode" description="归属机构"  disabled  v-model="comCode" >
              <option value="" disabled>请选择</option>
              <option :value="departmentInfodata.comcode" v-for=" departmentInfodata,i in departmentInfoVoList" :key="i"  >
              {{departmentInfodata.department}}</option>
            </select>
        </td>
      </tr>
    </table>
    <table class="common" cellpadding="3" cellspacing="0">
      <tr>
        <td class="button" type="button">
          <input type="button" name="buttonSave" class="button" alt="下一步" value="下一步"
            @click="submitForm()">
        </td>
        <td class="button" type="button">
          <input type="button" name="buttonCancel" class="button" alt="取消" value="取 消"
            @click="cancelForm()">
        </td>
      </tr>
    </table>
 </div>
</template>
<script>
import  comCodeInfo from '@/api/getusername.js'
import  date from '@/utils/date.js'
export default ({
    data(){
        return{
           policyNo:'',
           endorseDate:'',
           validDate:'',
           validHour:0,
           comCode:'',
           PaymentDate:'',
           departmentInfoVoList:[]//归属机构下拉框
        }
    },
    mounted(){
           this.endorseDate=this.$uiCommon.getCurrentDate()
           this.validDate=this.$uiCommon.getNextDate()
           //需要调用接口获取
           //1 获取归属机构的下拉框
           this.getComCodeName()
    },

    methods:{
        SelectDate(e,str){
           date.SelectDate(e.target,str)

        },
        getComCodeName(){
            let data='';
            let err='';
            return new Promise((resolve,reject)=>{
                 comCodeInfo.getdepartmentInfo(this.$store.state.comCode).then(res=>{
                      if(res.status==200){
                        if(res.data.code=='000000'){
                           data=res.data.data
                           resolve(data)
                        }else{
                           err=res.msg
                           reject(err)
                        }
                      }
                 })
           }).then((data)=>{
                        this.departmentInfoVoList=data
                        this.comCode=this.$store.state.comCode
                 }).catch(err=>{
                     this.$alert( err ,'普通批改录入',{type:'warning'})
                 })

        },
        submitForm(){
           if(this.policyNo==''){
             this.$alert('保单号码不能为空!!!','普通批改录入',{type:'warning'})
              return  false
           }
           if(this.validDate==''){
              this.$alert('批改生效日期不能为空!!!','普通批改录入',{type:'warning'})
              return  false
           }
           let num=this.$uiCommon.compareFullDate(this.validDate,this.endorseDate)
           if(num>=0){
              //1.获取归属机构所对应的文本
              // let  Sel=this.$refs.comCodeRef;
              // let index=Sel.selectedIndex ;             
              // let ComCode= Sel.options[index].text;
              // console.log(ComCode)
              //2.调用接口传递参数
              this.$store.state.validDate=this.validDate
              this.$store.state.validHour=this.validHour
              this.$router.push({path:'/pgMain',query: { 'businessNo': this.policyNo,'bizType':'ENDORSE','comCode':this.comCode }})

           }else{
              this.$alert('批改生效日期应大于批改日期!!!','普通批改录入',{type:'warning'})
              return  false
             //this.$router.push({path:'/',query: {editType: 'endorse'}})
           }
        },
        cancelForm(){//保单号、批改生效日期、批改生效小时、归属机构 都置为空窜
              this.policyNo=''
              this.validDate=''
              this.validHour=''
        }

    }
   
})
</script>
