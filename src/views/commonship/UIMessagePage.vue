<template>
   <table class=three align=center cellpadding="3" cellspacing="0">
     <tr>
       <td class=formtitle colspan="2">系统提示</td>
     </tr>
    <tr>
      <td  align=center>  
        <img  v-if="$route.query.status=='success'"  src='@/assets/images/success.gif'>
        <img  v-else src='@/assets/images/failure.gif'>
      </td>
  </tr>
  <tr> 
      <td align=center class="common">
        <font color="#FF0000"> {{$route.query.message}}</font> 
       <br>
      </td>

    </tr>

  </table>
</template>

<script>
export default{
    data(){
        return{
        }
    }
}
</script>
