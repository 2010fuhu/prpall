<template>
 <div>
  <table class=common cellpadding="5" cellspacing="1">
    <tr>
      <td class="formtitle">
        查看批文
      </td>
    </tr>
    <tr>
      <td class="input">
        <pre>{{endorseText}}</pre>
      </td>
    </tr>
  </table>
  <table class=common cellpadding="5" cellspacing="1">
    <tr>
      <td class=button>
        <input class="longbutton" type="button" alt="关 闭" value="关 闭" onclick="parent.window.close();"/>
      </td>
    </tr>
  </table>
</div>
</template>
<script>
import endorseOperater from '@/api/endorseOperation.js'

  export default{
    data(){
       return{
        endorseText:''
       }
    },
    mounted(){
      if(this.$route.query.businessNo){
        let obj={
             reqHeader:{
               transNo:this.$uiCommon.uuid(16,32),
               transDate:this.$uiCommon.getCurrentDate(),
               transTime:this.$uiCommon.getCurrentTime(),
               sysUserCode:this.$store.state.userCode,
               sign:'0',
               channelCode:''
             },
             endorseNo:this.$route.query.businessNo
        }
        endorseOperater.findEndorseText(obj).then(res=>{
          if(res.data.resHeader.errCode=='0000'){
            this.endorseText=res.data.endorseText
          }else{
            this.$alert('批文查询失败','',{type:'warning'})
          }
        })
      
      }
    }, 
    methods:{
        getEndorseText(endorseNo){
            console.log(endorseNo)
            
        }
    }
  
  }
</script>
