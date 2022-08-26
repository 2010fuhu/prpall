import  Address from '@/api/getselectaddressinfo.js'
class  insuredInfoVo{
	constructor(){
			this.serialNo=''
			this.insuredType='3'
			this.customerCode=''
			this.customerCName=''
			this.identifyType='01'
			this.identifyNo=''
			this.mobile=''
			this.linkName=''
			this.phoneNumber=''
			this.address1=''
			this.address2=''
			this.address3=''
			this.address1Name=''
			this.address2Name=''
			this.address3Name=''
			this.address4=''
			this.insuredAddress=''
			this.postCode=''
			this.urgentPhone=''
			this.flag=''//
		}
	}
  const IdentifyTypeArray=[
		{id:'',name:'请选择'},
		{id:'01',name:'居民身份证'},
		{id:'02',name:'居民户口薄'},
		{id:'04',name:'中国人民解放军军人身份证件'},
		{id:'05',name:'中国人民武装警察身份证件'},
		{id:'07',name:'中国护照'},
		{id:'09',name:'港澳居民来往内地通行证或港澳同胞回乡证'},
		{id:'10',name:'台湾通行证'},
		{id:'51',name:'外籍人员护照及中华人民共和国外国人居留证'},
		{id:'54',name:'外国人永久居留身份证'},
		{id:'55',name:'港澳台居民居住证'},
		{id:'71',name:'组织机构代码证'},
		{id:'73',name:'营业执照'},
		{id:'74',name:'统一社会信用代码'},
		{id:'99',name:'其他证件'},
	]
     export default  ({
          name:'Insured',
          data(){
            return{
			  imgUrl:require('@/assets/images/markMustInput.jpg'),
              insuredInfoList:[],//被保人的数组
              //totalPage : [], 
              pageNum : 1,    
              insuredShow:new insuredInfoVo(), 
              currentPage : 0,
              isShow:false,
			  GoPage:1,
			  IdentifyTypeList:IdentifyTypeArray,//证件类型数组
			  addressInfoVoList:[],//省
			  address2InfoVoList:[],//市
			  address3InfoVoList:[],//区县
              } 
          },
          created(){
			  this.Add()
          },
		  mounted(){
			window['setInsuredData']=(val)=>{

				console.log(val)
				this.setCurrentPage(val)
				
			}	
		  },
		  watch:{
			   insuredInfoList:{
				  handler(){
					for(let i=0; i<this.insuredInfoList.length;i++){
						this.insuredInfoList[i].serialNo=i+1;
					}
				  },
				   immediate: true
			  }

		  },
          methods:{
			show(){ this.isShow =!this.isShow;},
			initOpitons(data){//初始化 select 下拉框options
                this.addressInfoVoList=data.addressInfoVoList;//省份下拉框初始化
			},
			initInsuredData(data){
				
				this.insuredInfoList=[];
				for(let item of data.insuredInfoVos){
					this.insuredInfoList.push(item)
				}
				this.currentPage=0
				this.insuredShow=this.insuredInfoList[this.currentPage]
				this.pageNum=this.insuredInfoList.length
				console.log(`this.pagenum${this.pageNum}`)
			},
            // 下一页
            nextPage() {
              if (this.currentPage === this.pageNum - 1) return ;
              this.insuredShow = this.insuredInfoList[++this.currentPage];
            },
            // 上一页
            prePage() {
              if (this.currentPage === 0) return ;
              this.insuredShow = this.insuredInfoList[--this.currentPage];
            },
            // 点击页码
            page(i){
				if(i=="0"||i>this.pageNum){
					return false;
				}
                this.insuredShow = this.insuredInfoList[i-1];
				this.currentPage = --i
            },
			setCurrentPage(value){//根据平台带回的数据设置当前页被保险人数据
				let i=this.currentPage;
				if(value.customerCode){
					let person=this.insuredInfoList.find(item=>item.customerCode==value.customerCode)
					if(person){
						this.$alert("被保人数据中有相同的数据!",'被保险人信息',{type:'warning'});
						return true;
					}else{
						for (let key in this.insuredInfoList[i]){
							if(key in value){
								this.insuredInfoList[i][key]=value[key];
							}
						}
						this.insuredShow=this.insuredInfoList[i]
					}	
				}
			},
             //新增表格
			Add() {
				let insurdeObj=new insuredInfoVo()
				this.insuredInfoList.push(insurdeObj);
				// 循环页面
				this.pageNum = Math.ceil(this.insuredInfoList.length ) || 1;//计算有多少页数据，默认为1  
				// 获取到数据后默认显示第一页内容
				let  pageNum01=this.pageNum;
				this.insuredShow = this.insuredInfoList[--pageNum01]; 
				this.currentPage=pageNum01;
			},
			Remove(currentPage) {
				var currentPage01=currentPage;
				if (this.pageNum === 1) {
					this.$alert("只有一条被保人数据无法删除!",'被保险人信息',{type:'warning'});
					return false;
				}
				if(currentPage01===0||currentPage01===this.pageNum-1){//等于最后一条情况(或者删除的是第一条数据)
					if(currentPage01===0){
						this.currentPage=0;
					}else{
						this.currentPage=--currentPage01;
					}
				}
				this.insuredInfoList.splice(currentPage, 1);
				//从第 currentPage 行删除，删除 1 行
				this.pageNum = Math.ceil(this.insuredInfoList.length) || 1;
				if(this.currentPage===0){
					this.insuredShow = this.insuredInfoList[0];
				}else{
					this.insuredShow = this.insuredInfoList[this.currentPage];
				}
			},
			checkIdentifyNumber(){}, 
			changeAddress(value){
				let upperCode=''
				 if(value=="address1"){
					 this.address2=''
					 this.address3=''
					 upperCode=this.address1
				 }else if(value=="address2"){
					  this.address3=''
					  upperCode=this.address2
				 }
              //调用后端接口方法
				Address.getselectaddressinfo(upperCode).then((res)=>{
					if(res.status==200){
						let data=res.data.data
						if(value=="address1"){
							this.address2InfoVoList=data
						}else if(value=="address2"){
							this.address3InfoVoList=data
						}
					}  
			   }).then(()=>{
				   this.getInsuredAddress();
			   })
			},
			getInsuredAddress(){
				let index1=''
				let index2=''
				let index3=''
				let Address1=''
				let Address2=''
				let Address3=''
				index1=this.$refs.address1.selectedIndex
				if(index1!=0){
					 Address1=this.$refs.address1.options[index1].text
				}
				index2=this.$refs.address2.selectedIndex
				if(index2!=0){
					Address2=this.$refs.address2.options[index2].text
				}
				index3=this.$refs.address3.selectedIndex
				if(index3!=0){
					Address3=this.$refs.address3.options[index3].text
				}
				this.insuredAddress=`${Address1+Address2+Address3+this.address4}`
			},
			addInsuredCustomer(val){
				var strURL = `${process.env.VUE_APP_personUrl}/prpall/commonship/pub/forwardToPlatform.jsp?CurrentCustomer=${val}&riskcode=${this.$store.state.riskCode}`;
				window.open(strURL,'','top=0,left=0,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,status=0');
			},
			checkInsured(){
				let list =this.insuredInfoList
				for(let index in list){
                       if(list[index].customerCode==''){
						  this.$alert(`第${parseInt(index)+1}条客户代码不能为空！！！`,'被保人信息',{type:'warning'}); 
						  return false
					   }
					   if(list[index].customerCName==''){
						  this.$alert(`第${parseInt(index)+1}条客户名称不能为空！！！`,'被保人信息',{type:'warning'}); 
						  return false
					   }
					//    if(list[index].identifyNo==''){
					// 	  this.$alert(`第${parseInt(index)+1}条客户证件号码不能为空！！！`,'被保人信息',{type:'warning'}); 
					// 	  return false
					//    }

				}
			},
			addInsured(){},//与投保人同步
			getinsuredd(){
				console.log(this.insuredInfoList)
				console.log(this.insuredShow)
			}
       }
    })