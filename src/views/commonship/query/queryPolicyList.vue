<template>
    <div>
			<table class=list cellpadding="3" cellspacing="1">
				<tr>
					<td class=centertitle width="20%">保单号</td>
					<td class=centertitle width="13%">合同号</td>
					<td class=centertitle width="10%">被保险人</td>
					<td class=centertitle width="15%">流水号</td>
					<td class=centertitle width="10%">投保人</td>
					<td class=centertitle width="10%">操作员</td>
					<td class=centertitle width="10%">输入时间</td>
					<td class=centertitle width="13%">状态</td>
				</tr>
				<tr :class="index%2==0?'listeven':'listodd'"  v-for="(item, index) in dataShow" :key="index" >
					<td>
                        <router-link :to="{path: '/policyShow', query: { 'businessNo': item.strBizNo,'bizType':'policy' }}" >{{item.strBizNo}}</router-link>
					</td>
					<td>{{item.contractNo}}</td>
					<td>{{item.insuredName}}</td>
					<td>{{item.printNo}}</td>
					<td>{{item.appliName}}</td>
					<td>{{item.peratorCode}}</td>
					<td>{{item.inputDate}}</td>
					<td>{{item.underWriteCode|UnderWriteStatus(item.othFlag, item.underWriteFlag) }}</td>
				</tr>
				<tr>
					<td class=no colspan=8 align=center v-if="pageNum>1">本页共{{pageSize}} 条记录 第 {{currentPage+1}} 页 / 共 {{pageNum}} 页</td>
					<td class=no colspan=8 align=center v-else>本页共{{total}} 条记录 第 {{currentPage+1}} 页 / 共 {{pageNum}} 页</td>
				</tr>
			</table>
			<table class=common cellpadding="3" cellspacing="1" v-show="isShow" >
				<tr>
					<td align=center>
						<input name="FirstPage" class="button" type="button" alt="首页"
							value="首 页" @click="gotoPage('first');">
						<input name="PreviousPage" class="button" type="button" alt="上一页"
							value="上一页" @click="prePage();">
						
						<input name="NextPage" class="button" type="button" alt="下一页"
							value="下一页" @click="nextPage();">
						<input name="FinalPage" class="button" type="button" alt="最后一页"
							value="最后一页"  @click="gotoPage('Final');">
					
						转到第
						<input type="text" class=small name="Personal" style="width: 5%" v-model="goPage">
						页
						<input name="PersonalPage" class="smallbutton" type="button"
							alt="GO" value="GO" @click="go();">
						<input  name="buttonRollBack" class="longbutton" type="button"  alt="Excel当前页面导出" value="Excel当前页面导出" @click="Output();">
					</td>
				</tr>
			</table>
    </div>
</template>
<script>
import OrderList  from '@/api/queryOrderList.js'
export default {
	props: ['Conditionobj'],
    data(){
      return{
		isShow:false,//当页码数为1时，不展示上一页 下一页等按钮
		checked:[],
		policyListData:[],
		// 所有页面的数据
		totalPage: [],
		// 每页显示数量
		pageSize: 10,
		// 共几页
		pageNum: 1,
		// 当前显示的数据
		dataShow: "",
		// 默认当前显示第一页
		currentPage: 0,
		goPage:'1',
		setPageNum:false,//当如果数据大于一页是不需要重新计算页码
		total:0
      }
    },
    created(){
		
		if(typeof this.Conditionobj!='undefined'){
				this.queryList(0)
		}
    },
    filters:{
         UnderWriteStatus:function(val,arg1,arg2){   
                    var Status;
                    if(arg1.charAt(0)=='0'&&arg2.trim()=='0'){
                            Status = "普通新保";
						} else if (arg2.trim()=="0" && arg1.charAt(0) == '1') {
							Status = "续保新保";
						} else if (arg2.trim()=="1") {
							//strStatus = "核保通过";
							if ("AUTO"==val.trim()) {
								Status = "自动核保通过";
							} else {
								Status = "人工核保通过";
							}
						} else if (arg2.trim()=="2"&& arg1.charAt(3) != '3') {
							Status = "核保打回";
						} else if (arg2.trim()=="2" && arg1.charAt(3) == '3') {
							Status = "拒保";
						} else if (arg2.trim()=="3") {
							Status = "自动核保";
						} else if (arg2.trim()=="3") {
							Status = "待核保";
						}
						if (arg1.charAt(3) == '2') {
							Status = "已撤单";
						}
						if (arg1.trim().substring(4, 5)=="1") {
							Status = "已遗失";
						}
						if (arg1.trim().substring(3, 4)=="1") {
							Status = "已注销";
						} else if (arg1.trim().substring(2, 3)=="1") {
							Status = "全单退保";
						}
            return Status
         }

    },
    methods:{
		// 下一页
	    async nextPage() {
			if (this.currentPage === this.pageNum - 1) return ;
			let page=++this.currentPage
			await	this.queryList(page)
			this.isCheckedAll=false;
		},
		// 上一页
		async prePage() {
			if (this.currentPage === 0) return ;
			let page=--this.currentPage
			await	this.queryList(page)
			this.isCheckedAll=false;
		},
		// 最后一页
		async gotoPage(val){
			if(val=="first"){
				this.currentPage=0
				await this.queryList(0)
			}else{
				this.currentPage=this.pageNum-1;
				await this.queryList(this.currentPage)
                
			}
			this.isCheckedAll=false;
		},
	    //去往某一页
		async go(){
             let page=this.goPage;
			 this.currentPage=page-1;
			 await this.queryList(this.currentPage)
			 //this.dataShow =this.totalPage[page-1];
			 this.isCheckedAll=false;
		},
		queryList(pageNum){//每次点击页数都需要调用这个方法
			this.Conditionobj.pageInfoVo.pageNum=pageNum
            OrderList.findPolicyWhere(this.Conditionobj).then((res)=>{
               if(res.data.code=='0000'){
				   if(!this.setPageNum){
						this.pageNum = Math.ceil(res.data.total / this.pageSize) || 1;
						this.total=res.data.total
						this.setPageNum=true;
						if(this.pageNum>1){							 
						   this.isShow=true;
						}
				   }
				   this.dataShow=res.data.prpCmainQueryRes
			   }else{
                    if(!this.setPageNum){
                  		this.$router.push({name:'UnderwriteSubmit',query: {status:'failure',message:res.data.msg }})
					}
			   }
			})
		},
	}
}
</script>
