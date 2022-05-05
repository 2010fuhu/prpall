<template>
    <div>
		<table border="0" cellpadding="0" cellspacing="0" class="common">
			<tr>
                <td colspan="4" class="formtitle">
				     新增查询页面
			    </td>
			</tr>
			</table>
			<table class="common" colspan="3">
				<tr >
					<td class=title>&nbsp;</td>
					<td class=input>
						<input type="radio" name="radiobutton" value="radiobutton" checked="checked"
							@click="submitFormRadio('s')" />
						个人客户
						<input type="radio" name="radiobutton" value="radiobutton"
							@click="submitFormRadio('t')" />
						团体客户
						<input type="radio" name="radiobutton" value="radiobutton"
							@click="submitFormRadio('v')" />
						虚拟客户
					</td>
					<td class=title>&nbsp;</td>
				</tr>
			</table>
			<table class="common"  colspan="4">
				<tr >
					<td class=title>
						客户代码：
					</td>
					<td class=input>
						<input id="CustomerCode" class="common" type="text" name="CustomerCode" v-model='CustomerCode'>
					</td>
					<td class=title>
						客户名称：
					</td>
					<td class=input>					
						<input id="CustomerCName" class="common" type="text" name="CustomerCName" value="">
					</td>
				</tr>

				<tr>
					<td class=title >
						<span id="idCodeName" v-if="Customertype=='s'">证件号码：</span>
					</td>
					<td class=input>
						<input id="idCodeCode" class="common" type="text" v-if="Customertype=='s'"
							name="prpDcustomerPersonIdentifyNumber" value="">
					</td>
					<td class="title">有效状态：</td>
		            <td class="input"> 
		             <select name="Status" class=one>
					    <option value="0">0-无效</option>
						<option value="1" selected>1-有效</option>
		             </select>
		            </td>
                    </tr>
			</table>
			<table class="common">
				<tr class="common">
					<td class="common">
						<input class="button" type="button" value="查询" @click="submitForm()">
					</td>
					<td class="common">
						<input class="button" type="button" value="新增" @click="insertMethod()">
					</td>
				</tr>
			</table>
			<keep-alive include="ab">
			<router-view ></router-view>
			</keep-alive>
    </div>
</template>
<script >
export default({
     data(){
         return{
             Customertype:"s",
			 CustomerCode:''
         }
     },
	 created(){
	 },
     methods:{
        submitFormRadio:function(val){
                this.Customertype=val
        },
        submitForm(){
			alert(this.CustomerCode+"this.CustomerCode")
            // this.$router.push({ name:"a",params:{id:CustomerCode}});
			  //this.$router.push('/collection/'+CustomerCode);

      //对象的拷贝
			  this.$router.push({ name:'collection',params:{id:this.CustomerCode}});
        },
		insertMethod(){
          if(this.Customertype=="s"){
			 this.$router.push({ path:'/receive/EditPrpDcustomerperson'})
			}else if(this.Customertype=="t"){
               this.$router.push({ path:'/receive/EditPrpDcustomerGroup'})

			}else{
				this.$router.push({name:'Virtual'})
			}
		}

     },
})
</script>