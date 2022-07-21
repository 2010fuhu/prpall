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
import  check from '@/api/checkPolicy.js'
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
              let obj={
                  reqHeader: {
                      transNo: this.$uiCommon.uuid(), 
                      transDate: this.$uiCommon.getCurrentDate(),
                      transTime: this.$uiCommon.getCurrentDate(),
                      sysUserCode: this.$store.state.userCode,
                      sysPassWord: "",
                      sign: "1",
                      channelCode: "0"
                  },
                  policyNo: this.policyNo
              }
              this.checkPolicyData(obj).then(data=>{
                  //判断分入数据
                  let businessNature=data.mainDTO.businessNature
                  if(businessNature=='h'&&this.$route.path=='/endorseCommonInput'){
                    this.$alert(`保单${this.policyNo}为分入业务数据,请使用分入普通批单录入菜单！`,'普通批改录入',{type:'warning'})
                     return  false  
                  }else if(businessNature!='h'&&this.$route.path=='/endorseCommonInputReins'){
                     this.$alert(`保单${this.policyNo}为非分入业务,请使用普通批单录入菜单！`,'普通批改录入',{type:'warning'})
                     return  false  
                  }
                  let  startDate = data.mainDTO.startDate; //起保日期
                  var  compareResult =this.$uiCommon.compareFullDate(this.validDate,startDate);
                  if(compareResult==-1){
                    this.$alert(`批改生效日期${this.validDate}不能小于起保日期${startDate}！`,'普通批改录入',{type:'warning'})
                    return  false
                  }
                  let endDate =  data.mainDTO.endDate; //终保日期
                  compareResult = this.$uiCommon.compareFullDate(endDate,this.validDate);
                  if(compareResult==-1){
                    this.$alert(`批改生效日期${this.validDate}不能大于终保日期${endDate}！`,'普通批改录入',{type:'warning'})
                    return  false
                  }
                  //该保单是否已经核保通过
                  if(data.mainDTO.underWriteFlag!='1'&&data.mainDTO.underWriteFlag!='3'){
                     this.$alert(`保单${this.policyNo}没有审批通过！`,'普通批改录入',{type:'warning'})
                    return  false
                  }
                  //该保单是否已经退保
                  if(data.mainDTO.othFlag.length>=3&&data.mainDTO.othFlag.charAt(2)=='1'){
                    this.$alert(`保单${this.policyNo}已经退保！`,'普通批改录入',{type:'warning'})
                    return  false
                  }
                  //该保单是否已经注销
                  if(data.mainDTO.othFlag.length>=4&&data.mainDTO.othFlag.charAt(3)=='1'){
                    this.$alert(`保单${this.policyNo}已经注销！`,'普通批改录入',{type:'warning'})
                    return  false
                  }
                  // 该保单是否已经终止合同
                  if(data.mainDTO.othFlag.length>=6&&data.mainDTO.othFlag.charAt(5)=='1'){
                     this.$alert(`保单${this.policyNo}已经终止合同！`,'普通批改录入',{type:'warning'})
                    return  false
                  }
                  //该保单是否存在没有审批完的批单
                  if(data.headDTO){
                    if(data.headDTO.underwriteflag==null||(data.headDTO.underwriteflag!='1'&&data.headDTO.underwriteflag!='3')){
                      this.$alert(`保单${this.policyNo}还存在没审批完毕的批单,无法再次进行批改！！`,'普通批改录入',{type:'warning'})
                      return  false
                    }
          
                    //该保单在用户输入的批单生效日期后是否存在已经生效的批单
                    compareResult=this.$uiCommon.compareFullDate(data.headDTO.validdate,this.validDate);
                    if(compareResult==1){
                      this.$alert(`输入的批单生效日期不能小于已经生效的批单日期！`,'普通批改录入',{type:'warning'})
                      return  false
                    }
                  }
                  //2.调用接口传递参数
                  this.$store.state.validDate=this.validDate
                  this.$store.state.validHour=this.validHour
                  // if(businessNature=='h'){
                  //   this.$router.push({path:'/reinsPgMain',query: { 'businessNo': this.policyNo,'bizType':'ENDORSE','comCode':this.comCode }})

                  // }else if(businessNature!='h'){
                     this.$router.push({path:'/pgMain',query: { 'businessNo': this.policyNo,'bizType':'ENDORSE','comCode':this.comCode }})
                  //}
              }).catch(err=>{
                 this.$alert(err,'普通批改录入',{type:'warning'})
                 return  false
              })
      
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
        },
          checkPolicyData(jsonObj){
               return   new Promise((resolve,reject)=>{
                  check.checkdata(jsonObj).then(res=>{
                    if(res.data.resHeader.errCode=='0000'){
                        resolve(res.data)
                    }else{
                        reject(res.data.resHeader.errMsg)
                    }

                })
              })
           },
    }
   
})
</script>
