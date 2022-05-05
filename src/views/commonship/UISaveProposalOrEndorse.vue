<template>
  <div>
		<tr>
		    <td>投保单保存成功，投保单号是{{$route.query.proposalNo}}</td>
		</tr>
		<tr>
		    <td>
		     	<input name="butContinueInput" class="button" type="button"  alt="继续录入" value="继续录入" @click="submitFormProposal()">
				<input type="button" name="buttonUnderwrite" class=button  alt=" 提交核保 " value="提交核保" @click="submitApproveNew('1')">
            </td>
		</tr>
		
  </div>
</template>
<script>
import underWrite from  '@/pubJs/underWrite.js'
export default ({
	 ...underWrite
})
</script>
