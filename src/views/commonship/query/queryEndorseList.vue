<template>
<div>
    <table class="list" cellpadding="3" cellspacing="1">
        <tr>
            <td width="5%" class=centertitle>选择</td>
            <td width="15%" class=centertitle>批单号</td>
            <td width="15%" class=centertitle>保单号</td>
            <!-- 添加了一个批改申请人 -->
            <!-- <td class=centertitle>批改申请人</td> -->
            <td width="10%" class=centertitle>被保险人</td>
            <!-- add by ligang 20110811 添加流水号显示-->
            <td class=centertitle width="15%">流水号</td>
            <!-- add by ligang 20110811 添加流水号显示end-->
            <td width="5%" class=centertitle>投保人</td>
            <td width="5%" class=centertitle>操作员</td>
            <td width="10%" class=centertitle>输入时间</td>
            <td width="10%" class=centertitle>核批状态</td>
            <td width="5%" class=centertitle>撤单</td>
            <td width="5%" class=centertitle>删除</td>
        </tr>
        <tr :class="index%2==0?'listodd':'listeven'" v-for="(item, index) in dataShow" :key="index">
            <!-- 选择 -->
            <td width="5%">
                <input type="checkbox" name="checkboxAssess" v-if="(item.underWriteFlag.trim()=='0'||item.underWriteFlag.trim()=='2'||item.underWriteFlag.trim()=='4'||item.underWriteFlag.trim()=='C')"
							:value="item.endorseNo"   v-model="checked" >
				<input type="checkbox" name="checkboxAssess" value="none" v-else onclick="return false;">
                
            </td>
            <!-- 批单号 -->
            <td width="15%">
               <router-link :to="{path:'/endorseShow',query:{'endorseNo': item.endorseNo }}">{{item.endorseNo}}</router-link>
            </td>
            <!-- 保单号 -->
            <td width="15%">{{item.policyNo}}</td>
            <!-- 批改申请人 -->
            <!-- <td width="<%=strWidth4%>%"></td> -->
            <!-- 被保险人名称 -->
            <td width="10%">{{item.insuredName}}</td>
            <!-- 流水号 -->
            <!-- <td width="<%=strWidth3%>%"></td> -->
            <td width="15%">{{item.printNo}}</td>
            <!-- 投保人 -->
            <td width="5%">{{item.appliName}}</td>
            <!-- 操作员  OperatorCode => operatorCName-->
            <td width="5%">{{item.operatorCName}}</td>
            <!-- 输入时间 -->
            <td width="10%">{{item.inputDate}}</td>
            <!-- 核批状态 -->
            <td width="10%">{{'1'|UnderWriteStatus(item.underWriteFlag)}}</td>
            <!-- 撤单 -->
            <td width="5%">
                <a class="check" href="#" v-if="item.underWriteFlag.trim()=='9'" @click="checkRecoil(item.endorseNo)">撤单</a>
            </td>
            <!-- 删除 -->
            <td width="5%">
                <a class="check" href="javascript:void(0);" @click="deleteEndorse(item.endorseNo)"  
					v-if="item.underWriteFlag=='0'||item.underWriteFlag=='2'||item.underWriteFlag=='4'">删除</a>
            </td>
        </tr>
        <tr>
            <td colspan="11" class=mei style="text-align: left">
                <input type="checkbox" name="selectedAll" @click="selectAll()">
                全部选择
            </td>
        </tr>
        <!-- <input name="RecoilAll" type="hidden" value="<%=recoilindex%>" /> -->
        <tr>
            <td class=no align="center" colspan="11" v-if="sumPageNum>1">
                本页共{{pageSize}}条记录 第{{currentPage+1}}页 / 共{{sumPageNum}}页
            </td>
            <td class=no align="center" colspan="11" v-else>
                本页共{{total}}条记录 第{{currentPage+1}}页 / 共{{sumPageNum}}页
            </td>
        </tr>
    </table>
    <!-- v-if="isShow" -->
    <table class="common" cellpadding="3" cellspacing="0" v-if="isShow">
        <tr>
            <td align="center">
                <input name="FirstPage" class="button" type="button" alt="首页" value="首页" @click="gotoPage('first')"/>
                <input name="PreviousPage" class="button" type="button" alt="上一页" value="上一页" @click="prePage();"/>
                <input name="NextPage" class="button" type="button" alt="下一页" value="下一页" @click="nextPage();"/>
                <input name="FinalPage" class="button" type="button" alt="最后一页" value="最后一页" @click="gotoPage('Final');"/>
                转到第<input class=small style="width:20px"  type="text" name="Personal" size="2" v-model="goPage" />页
                <input name="PersonalPage" class="smallbutton" type="button" alt="GO" value="GO" @click="go();"/>
            </td>
        </tr>
    </table>
    <table class="common" align="center">
        <tr>
            <td class="button" type="button">
                <input type="button" name="buttonUnderwrite" class=button
                    alt=" 提交核批 " value="提交核批" @click="submitForm()">
            </td>
        </tr>
    </table>
</div>
</template>

<script>
import OrderList  from '@/api/endorseOperation.js'
import underwrApi from '@/api/underwrtAndGenerate.js'
import underwrt from '@/json/underwrt.json'
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


export default {
    props: ['Conditionobj'],
    data(){
        return{
            isShow:false,//当页码数为1时，不展示上一页 下一页等按钮
		    checked:[],
            // endorseListData:[],// 后台传过来的 所有页面的数据
            totalPage: [],
		    pageSize: 10,// 每页显示数量
            sumPageNum: 1,// 共几页 总页数
            dataShow: [],// 当前显示的数据
            currentPage: 0,// 默认当前显示第一页
            goPage:'1',
            setPageNum:false,//当如果数据大于一页是不需要重新计算页码
            total:0,
			isCheckedAll:false //是否全部选中
        }
    },
    created(){
		if(typeof this.Conditionobj!='undefined'){
			this.queryList(0)
		}
    },
    filters:{
        UnderWriteStatus:function(value,arg){
                    let  Status;
					 if (arg.trim()=="0") {
							Status = "新批改";
						} else if (arg.trim()=="1") {
							Status = "通过";
						} else if (arg.trim()=="2") {
							Status = "不通过";
						} else if (arg.trim()=="3") {
							Status = "无需核批";
						} else if (arg.trim()=="9") {
							Status = "待核批";
						} else if (arg.trim()=="4") {//add by dongcun 20070724 添加主动撤回状态的判断
							Status = "主动撤回";
						} else if (arg.trim()=="5") {
							Status = "预核批通过";
						} else if (arg.trim()=="C") {
							Status = "风险累计中";
						}
            return Status
        }
    },
    methods:{
        checkRecoil(endorseNo){
            console.log("撤销批改"+endorseNo)
            // let userCode=this.$store.state.userCode
            OrderList.endorseCencel(endorseNo).then((res)=>{
                // debugger
                 if(res.data.resHeader.errCode=='0000'){
                    //  debugger
                    this.$alert('撤销成功！！！','批单信息',{type:'success' })
				 }else{
                    //  debugger
					this.$alert('撤销失败！！！','批单信息',{type:'error' })
				 }
			}).catch(()=>{})
            console.log(endorseNo+"批改已撤销")
        },
        deleteEndorse(endorseNo){
            console.log('删除本条批改'+endorseNo)
            let obj=new deleteObj()
            obj.reqHeader.transNo=this.$uiCommon.uuid();        
            obj.reqHeader.transDate=this.$uiCommon.getCurrentDate();
            obj.reqHeader.transTime=this.$uiCommon.getCurrentDate();
            obj.reqHeader.sysUserCode=this.$store.state.userCode;
            obj.reqHeader.sign="0";
            obj.endorseNo=endorseNo;
            OrderList.endorseDelete(obj).then((res)=>{
                 if(res.data.errCode=='0000'){
                    this.$alert('删除成功！！！','批单信息',{type:'success' })
				 }else{
					this.$alert('删除失败！！！','批单信息',{type:'error' })
				 }
			}).catch(()=>{})  
        },
        selectAll(){
            this.isCheckedAll = !this.isCheckedAll;
			if(this.isCheckedAll){
				this.dataShow.forEach(element => {
					if(!this.checked.includes(element.endorseNo)){
						this.checked.push(element.endorseNo)
					}
				})
			}else{
				this.dataShow.forEach(element => {
                    var index = this.checked.indexOf(element.endorseNo);
					if (index > -1) {
						this.checked.splice(index, 1);
					}
					//this.checked.slice(this.checked.findIndex(item => item === element.Proposalno), 1)
					// if(this.checked.includes(element.Proposalno)){
					// 	this.checked.remove(element.Proposalno)
					// }
				})
			} 
        },
		// 下一页
	    async nextPage() {
			if (this.currentPage === this.sumPageNum - 1) return ;
			let page = ++this.currentPage
			await this.queryList(page)
			this.isCheckedAll=false;
		},
		// 上一页
		async prePage() {
			if (this.currentPage === 0) return ;
			let page=--this.currentPage
			await this.queryList(page)
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
			this.Conditionobj.pageInfoVo.pageNum=pageNum// 初始化时传的页码是1 点击上一条下一条 或者输入页码跳转时，查询条件时一样的，只不过查询的页码数不一样，需要更改页码数。
            OrderList.findEndorseWhere(this.Conditionobj).then((res)=>{//向接口发送请求信息，并拿到返回数据
               if(res.data.resHeader.errCode=='0000'){
				   if(!this.setPageNum){
						//this.pageNum = Math.ceil(res.data.pageInfoVo.total / this.pageSize) || 1;
                        //console.log('================',this.pageNum)
                        if(res.data){
                            if(res.data.pageInfoVo){
                                 this.total=res.data.pageInfoVo.total
						         this.sumPageNum = Math.ceil(res.data.pageInfoVo.total / this.pageSize) || 1;
                            }
                            this.setPageNum=true;
                        }
						if(this.sumPageNum>1){							 
						   this.isShow=true;
						}
                         this.setPageNum=true//这个是用来判断第几次进来的 如果第一次就计算页数和总条数，第二次及以后就不需要再次计算
				   }
				   this.dataShow=res.data.listDatas
                   console.log('this.dataShow',this.dataShow)
			   }else{
                    if(!this.setPageNum){
                  		this.$router.push({name:'UnderwriteSubmit',query: {status:'failure',message:res.data.msg}})
					}
			   }
			})
		},
        submitForm(){//提交核批功能方法
		    if(this.checked.length>0){
                underwrt.undwrtMainInfoReq.undwrtInfoReqList=[];
                debugger
				this.checked.forEach((item)=>{
                    debugger
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
				this.underwrtF().then((data)=>{
                    debugger
					if(data.resHeader.errCode=='000'){
                        debugger
						this.$alert('提交核保成功!!!','提交核保',{ type:'success'})
						return true
					}else{
                        debugger
						this.$alert('提交核保失败!!!','提交核保',{ type:'error'})
						return false
					}
				})
			}else{
                debugger
				this.$alert('没有勾选投保单号或投保单非普通新保状态!!!','提交核保',{ type:'warning'})
				return false;
			}

			//this.$router.push({path:''})
		},
        underwrtF(){
            return new Promise((resolve)=>{
                underwrApi.underwrt(underwrt).then((res)=>{
                        resolve(res.data)
                })
            }) 
        },
	}
}
</script>

<style scoped>
.endorsedata{
    text-align: center;
}
</style>