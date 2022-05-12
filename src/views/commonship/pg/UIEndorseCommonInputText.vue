<template>
 <div>
        <textarea name="newPtext" class="inputtext" style="display:none" rows="15" cols="100"></textarea>
        <table class="common" cellpadding="3" cellspacing="0">
        <tr class="common">
            <td class="formtitle">
            批 文
            </td>
        </tr> 
        
        <tr> 
            <td align="right">
            <router-link tag="a" target="_blank" :to="{name:'UIEndorseCommonInputText'}">
            <input type="button" name="help" class="longbutton" alt="批文措词" value="批文措词" src="@/assets/images/butGenDefaultText.gif">
            </router-link>
            </td>
        </tr>
        <tr class="common">
            <td class="input" align="center">
            <textarea name="oldPtext" class="inputtext" rows="15" cols="100" v-model="endorseContent"></textarea>
            </td>
        </tr>
        <tr>     
        </tr>
        <tr class="common">
            <td align="center">
            <input type="button" name="buttonDefaultText" class="longbutton" alt="生成默认批文" value="生成默认批文" src="@/assets/images/butGenDefaultText.gif"
                @click="setDefaultText()">
            </td>
        </tr>
        </table>
        <br><br>
    <table class="common" cellpadding="3" cellspacing="0">
        <tr>
            <td class="button" type="button" width="33%">
                <input type="button" name="buttonPrevious" class="button" alt="上一步" value="上一步" src="@/assets/images/butPreviousStep.gif" @click="previousForm();">
            </td>
            <td class="button" type="button" width="33%">
                <input type="button" name="buttonSubmit" class="button" alt="保存" value="保存" src="@/assets/images/butSave.gif" @click="submitForm();">
            </td>
            <td type="button" class="button" width="33%">
                <input type="button" name="buttonCancel" class="button" alt="取消" value="取消" src="@/assets/images/butCancel.gif" @click="previousForm();">
            </td>
        </tr>
    </table>
 </div>
</template>

<script >
import OrderList  from '@/api/endorseOperation.js'
class deleteObj{
    constructor(){
       this.reqHeader={
           transNo:"",
           transDate:"",
           transTime:"",
           sysUserCode:"",
           sysPassWord:"",
           sign:"",
           channelCode:""
       },
       this.endorseNo=""
    }
}
export default ({
      data(){
        return{
            endorseContent:''
        }

      },
      methods:{
          submitForm(){
              //1 调用接口
               this.$router.push({path: '/Save'})
          },
          previousForm(){//上一步 和取消方法
            let obj=new deleteObj()
            obj.reqHeader.transNo=this.$uiCommon.uuid();        
            obj.reqHeader.transDate=this.$uiCommon.getCurrentDate();
            obj.reqHeader.transTime=this.$uiCommon.getCurrentDate();
            obj.reqHeader.sysUserCode=this.$store.state.userCode;
            obj.reqHeader.sign="0";
            obj.endorseNo=this.$route.query.endorseNo;
            OrderList.endorseDelete(obj).then((res)=>{
                 if(res.data.errCode=='0000'){
                     this.$router.go(-1)
				 }else{
					this.$alert('删除批单号失败，请联系管理员！！！','普通批单录入',{type:'error' })
				 }
			}).catch(()=>{})  
          },
          setDefaultText(){
              this.endorseContent=this.$route.query.endorseText
          }
          
      }
    
})
</script>