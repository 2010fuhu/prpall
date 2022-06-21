<template>
        <div >
			<table class="list" cellpadding="3" cellspacing="1">
				<tr>
					<td class=centertitle>选择</td>
			        <td class=centertitle>投保单号</td>
			        <td class=centertitle>合同号</td>
			        <td class=centertitle>被保险人名称</td>
			        <td class=centertitle>投保人名称</td>
			        <td class=centertitle>保险起期</td>
			        <td class=centertitle>操作员</td>
			        <td class=centertitle>输入时间</td>
			        <td class=centertitle>状态</td>
			        <td class=centertitle>核保信息</td> 
			        <td class=centertitle>撤单</td>
			        <td class=centertitle>修改</td>
					<td class=centertitle>删除</td>	
				</tr>
				<tr :class="index%2==0?'listodd':'listeven'" v-for="(item, index) in dataShow" :key="index" >
				<td  rowspan='1' cowspan='1' >
				    <input type="checkbox" name="checkboxAssess" v-if="(item.underWriteFlag.trim()=='0' && item.othFlag.charAt(3)!='2')"  :value="item.strBizNo"  v-model="checked" >
					<input type="checkbox" name="checkboxAssess" v-else  value="none"  onclick="return false" >
				</td>
				<td  rowspan='1' cowspan='1' ><router-link :to="{path: '/proposalShow', query: { 'businessNo': item.strBizNo,'bizType':'proposal' }}"> {{item.strBizNo}}</router-link></td>
		        <td  rowspan='1' cowspan='1' >{{item.contractNo}}</td>
		        <td  rowspan='1' cowspan='1' >{{item.insuredName}}</td>
				<td  rowspan='1' cowspan='1' >{{item.appliName}}</td>
		        <td  rowspan='1' cowspan='1' >{{item.startDate}}</td>
		        <td  rowspan='1' cowspan='1' >{{item.operatorCode}}</td>
		        <td  rowspan='1' cowspan='1' >{{item.inputDate}}</td>
				<td  rowspan='1' cowspan='1' >{{ item.status }}</td>
				<td  rowspan='1' cowspan='1' >
				<span v-if="item.underWriteFlag.trim()=='1'">
					<a class="check" href="javascript:void(0);" @click="$uiCommon.viewTraceForUndwrt(item.strBizNo)">核保信息</a>
				</span>
				</td> 
				<td  rowspan='1' cowspan='1' >
			        <a class="check"  v-if="item.cancelFlag" href="javascript:void(0);" @click="cancelOrder(item.strBizNo)">撤单</a>
				</td>
				<td  rowspan='1' cowspan='1' >
					<a class="check"  v-if="item.delormodFlag" href="javascript:void(0);" @click="modOrder(item.strBizNo,item.businessNature)">修改</a>
				</td>
				<td  rowspan='1' cowspan='1' >
				    <a class="check"  v-if="item.delormodFlag" href="javascript:void(0);" @click="delOrder(item.strBizNo)">删除</a>
				</td>
				</tr>
				<tr>
					<td class=mei colspan=13 >
						<input type="checkbox" name="selectedAll" :checked="isCheckedAll"  @click="selectAll();">全部选择
					</td>
				</tr>
				<tr>
					<td class=no colspan=14 align=center v-if="pageNum>1">本页共{{pageSize}} 条记录 第 {{currentPage+1}} 页 / 共 {{pageNum}} 页</td>
					<td class=no colspan=14 align=center v-else>本页共{{total}} 条记录 第 {{currentPage+1}} 页 / 共 {{pageNum}} 页</td>
				</tr>
			</table>
			<table class=common cellpadding="3" cellspacing="0" v-show="isShow">
				<tr>
					<td align=center>
							<input name="FirstPage" class="button" type="button" alt="首页" value="首页" @click="gotoPage('first')"/>
                            <input name="PreviousPage" class="button" type="button" alt="上一页" value="上一页" @click="prePage();"/>
                            <input name="NextPage" class="button" type="button" alt="下一页" value="下一页" @click="nextPage();"/>
                            <input name="FinalPage" class="button" type="button" alt="最后一页" value="最后一页" @click="gotoPage('Final');"/>
                            转到第 <input class=small style="width:20px"  type="text" name="Personal" size="2" v-model="goPage" />页
							<input name="PersonalPage" class="smallbutton" type="button" alt="GO" value="GO" @click="go();"/>
					</td>
				</tr>
			</table>
			<table class="common" align="center">
				<tr>
					<td class="button" type="button" >
						<input  name="buttonEditReport" class=button style="display:none" type=button alt=" 编辑保单抄件 " value="编辑保单抄件" @click="doEditPrintPage();">
						<input  name="buttonUnderwrite" class=button  type=button alt=" 提交核保 " value="提交核保" @click="submitForm();">
					</td>
			</tr>
			</table>
        </div>
</template>
<script>
import OrderList  from '@/api/queryOrderList.js'
import proposal from '@/api/proposalOperation.js'
import underwrt from '@/json/underwrt.json'
import underwrApi from '@/api/underwrtAndGenerate.js'
class undwrtInfoVo{
    constructor(){
        this.businessID=0,
        this.businessNo='',
        this.businessTable='prptmain',
        this.businessType="T",
        this.comCode="",
        this.curName="UnderwriteOne",
        this.flag='1',
        this.inKey='',
        this.makeCom=''
        this.riskCode='',
        this.userCode='',
        this.valid='1'

    }
}
export default({
	props: ['Conditionobj'],
	data(){
		return{
			isShow:false,
            checked:[],
			// 每页显示数量
			pageSize: 10,
			// 共几页
			pageNum: 1,
			//设置页数
			setPageNum:false,
			// 当前显示的数据
			dataShow: "",
			// 默认当前显示第一页
			currentPage: 0,
			goPage:'1',
			isCheckedAll: false,
			total:0
		}
	},
	created(){
		if(typeof this.Conditionobj!='undefined'){
				this.queryList(0)
		}
	},

	computed:{},
	methods:{
		    stylechange(){},
			cancelOrderFlag(item){//是否撤单
				let underWriteFlag=item.underWriteFlag
				let othFlag=item.othFlag
				let ifbankPrpall=item.ifbankPrpall
				if ((underWriteFlag.trim()=='0'||underWriteFlag.trim()=='2') && (othFlag.charAt(3)!='2'&&othFlag.charAt(3)!='3')){
				return true;
				}else if(underWriteFlag.trim()=='9'){
				if(ifbankPrpall!= null && ifbankPrpall=='60'|| ifbankPrpall!= null && ifbankPrpall=='39'){ 
					return false;
				}else{
					return  true;
				}
				}else {
				return false;
				}	 
		},
		UnderWriteStatus(item) {//
			let arg1=item.othFlag;
			let arg2=item.underWriteFlag
			let  Status;
			if(arg1.charAt(3)!='2'){
                  if (arg2.trim()=="0" && arg1.charAt(0)=='0') {
						Status = "普通新保";
					} else if (arg2.trim()=="0" && (arg1.charAt(0)=='1'||arg1.charAt(0)=='2')) {
						Status = "续保新保";
					} else if (arg2.trim()=="1") {
						Status = "核保通过";
					}else if (arg2.trim()=="2") {
						Status = "下发修改";
					} else if (arg2.trim()=="3") {
						Status = "自动核保";
					} else if (arg2.trim()=="9") {
						Status = "待核保";
					} else if (arg2.trim()=="5") {
						Status = "预核保通过";
					}/**else if(strUnderWriteFlag.trim().equals("4")) {// 20070724 添加主动撤回状态的判断
			      		strStatus = "主动撤回";
					}*/else if(arg2.trim()=="C") {
						Status = "风险累计中";
					}else if(arg2.trim()=="4") {//20081105 添加拒保状态的判断
						Status = "拒保";
					}
				} else {
				      if(arg2.trim()=="7"){
						Status = "已注销";
						}else{
						Status = "已撤单";
						}
				}
             return Status
		},
		delORmod(item){
			     let underWriteFlag=item.underWriteFlag
				 let othFlag=item.othFlag
				 let ifbankPrpall=item.ifbankPrpall
				 if ((underWriteFlag.trim()=='0'||underWriteFlag.trim()=='2') && (othFlag.charAt(3)!='2'&&othFlag.charAt(3)!='3')){
					if (ifbankPrpall!="60"&& ifbankPrpall!="39"){
					   return true;
					}else{ 
					   return false;
					}
				 }else{
					   return  false;
				 }
		},
		queryList(pageNum){
			this.Conditionobj.pageInfoVo.pageNum=pageNum
            OrderList.findProposalWhere(this.Conditionobj).then((res)=>{
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
				   for(let key in this.dataShow ){
                       this.dataShow[key].status=this.UnderWriteStatus(this.dataShow[key])
					   this.dataShow[key].cancelFlag=this.cancelOrderFlag(this.dataShow[key])
					   this.dataShow[key].delormodFlag=this.delORmod(this.dataShow[key])
				   }
			   }else{
                    if(!this.setPageNum){
                  		this.$router.push({name:'UnderwriteSubmit',query: {status:'failure',message:res.data.msg }})
					}
			   }
			})
		},
		submitForm(){//提交核保功能方法
		    if(this.checked.length>0){
                underwrt.undwrtMainInfoReq.undwrtInfoReqList=[];
				this.checked.forEach((item)=>{
					let undwrtinfo=new undwrtInfoVo()
					undwrtinfo.businessNo=item
					undwrtinfo.comCode=this.$store.state.comCode
					undwrtinfo.inKey=item
					undwrtinfo.makeCom=this.$store.state.comCode
					undwrtinfo.riskCode=this.$store.state.riskCode
					undwrtinfo.userCode=this.$store.state.userCode
					underwrt.undwrtMainInfoReq.undwrtInfoReqList.push(undwrtinfo)
				})
				//组织reqHeader
				let day = new Date();
				day.setTime(day.getTime());
				underwrt.reqHeader.transDate=this.$uiCommon.getCurrentDate()
				underwrt.reqHeader.transTime=this.$uiCommon.getCurrentTime()
				underwrt.reqHeader.transNo=this.$uiCommon.uuid()
				this.underwrtF(underwrt)
			}else{
				this.$alert('没有勾选投保单号或投保单非普通新保状态!!!','提交核保',{ type:'warning'})
				return false;
			}

			//this.$router.push({path:''})
		},
		 underwrtF(obj){
            return new Promise((resolve,reject)=>{
                underwrApi.underwrt(obj).then((res)=>{
                    let data=res.data
					if(data.resHeader.errCode=='000'){
						resolve()
					}else{
						reject()
					}
                })
            }).then(()=>{
				this.$alert('提交核保成功!!!','提交核保',{ type:'success'})
				
			}).catch(()=>{
				 this.$alert('提交核保失败!!!','提交核保',{ type:'error'})
			})
        },
		// 上一页和下一页
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
		async go(){
             let page=this.goPage;
			 this.currentPage=page-1;
			 await this.queryList(this.currentPage)
			 //this.dataShow =this.totalPage[page-1];
			 this.isCheckedAll=false;
		},
		cancelOrder(businessNo){//撤销方法
		    let userCode=this.$store.state.userCode
            proposal.proposalCencel(businessNo,userCode).then((res)=>{
                 if(res.data.code=='0000'){
                    this.$alert('撤销成功！！！','投保单信息',{type:'success' })
				 }else{
					this.$alert('撤销失败！！！','投保单信息',{type:'error' })
				 }
			}).catch(()=>{})
		},
		modOrder(businessNo,businessNature){//修改方法
			this.$store.state.certiType='U';
			this.$store.state.proposalNo=businessNo;
			if(businessNature=='h'){
				this.$router.push({path:'/reinsMain',query: {businessNo,}})
			}else{
				this.$router.push({path:'/main',query: {businessNo,}})
			}	
		},
		delOrder(businessNo){//删除投保单方法
		     proposal.proposalDelete(businessNo).then((res)=>{
                 if(res.data.code=='0000'){
                    this.$alert('删除成功！！！','投保单信息',{type:'success' })
				 }else{
					this.$alert('删除失败！！！','投保单信息',{type:'error' })
				 }
			}).catch(()=>{})  
		},
		selectAll(){
			 this.isCheckedAll=!this.isCheckedAll;
			 if(this.isCheckedAll){
				this.dataShow.forEach(element => {
					if(element.underWriteFlag.trim()=='0' && element.othFlag.charAt(3)!='2'){
						if(!this.checked.includes(element.strBizNo)){
							this.checked.push(element.strBizNo)
						}
					}
				})
			}else{
				this.checked=[]
			} 
		},
	}
})
</script>
<style></style>