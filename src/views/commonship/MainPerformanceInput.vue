<template>
  <div  class="dialog" v-if="PerformanceArgs.isPerformanceChildShow">
    <div class="content" >
    <div class="mainContent" v-show="fullscreenLoading" >加载中... </div>
    <div  class="mainContent" v-show="!fullscreenLoading"> 
			<table class=common align="center">
				<tr>
					<td class="centertitle" style="width:15%">序号</td>
					<td class="centertitle" style="width:15%">业务员代码 </td>
					<td class="centertitle" style="width:15%">业务员名称</td>
					<td class="centertitle" style="width:15%">绩效协议号</td>
					<td class="centertitle" style="width:15%">绩效费率%</td>
					<td class="centertitle" style="width:15%">币别</td>
					<td class="centertitle" style="width:15%">绩效金额 </td>
				</tr>
				<tr align="center" v-for="(PerAgreeMentDet,index) in PerAgreeMentDetData" :key="index">
				    <input type="hidden" name="MinPerCent" :value="PerAgreeMentDet.minPerCent">
				    <input type="hidden" name="MaxPerCent" :value="PerAgreeMentDet.maxPerCent">
					<td><input type="text"  name="No" :value="PerAgreeMentDet.no" class="common3" readonly style="width:100%;"  description="序号"></td>
					<td><input type="text"  name="HandlerCode" :value="PerAgreeMentDet.handlerCode" class="common3" readonly style="width:100%;"  description="业务员代码"></td>
					<td><input type="text"  name="HandlerName" :value="PerAgreeMentDet.handlerName" class="common3" readonly style="width:100%;"  description="业务员名称"></td>
					<td><input type="text"  name="PerformanceNo" :value="PerAgreeMentDet.performanceNo" class="common3" readonly style="width:100%" description="绩效协议号"></td>
					<td><input type="text"  class="common3" name="PerformancePercent" v-model="PerAgreeMentDet.performancePercent" style="width:100%" description="绩效费率%" @change="PerformanceChange(index)"></td>
					<td><input type="text"  name="Currency" value="CNY" class="common3" readonly style="width:100%;"  description="币别"></td>
					<td><input type="text"  name="PerformanceFee" :value="PerAgreeMentDet.performanceFee" class="common3" readonly style="width:100%;"  description="绩效金额"></td>
				</tr>

			</table>
			<table class=common align="center">
				<tr align=center>
					<td>
						<input type="button" name="buttonSubmit" class="button" alt="确定" value="确定" @click="addDetail()">
					</td>
					<td>
						<input type="button" name="buttonCancel" class="button" alt="取消" value="取消" @click="ChncelDetail()">
					</td>
				</tr>
			</table>
     </div>
    </div> 
</div>  
</template>
<script>
let moduel=require(`@/pubJs/${global.path}/MainPerformanceInput${global.show}.js`)
let MainPerformance=moduel.default
export default{ ...MainPerformance}
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
        background-size: auto;
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
        top:60%;
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