//import  {proposal} from '@/utils/ProposalGenerateReq.js'
import  Address from '@/api/getselectaddressinfo.js'
   export default {
        name:'AppliInsured',
        data(){
          return{
            isShow:false,
            riskCode:this.$store.state.riskCode==''?'2244':this.$store.state.riskCode,
			//proposal,
			receiveFlag:false,
			appliInfoVo:{
				customerCode:'',
				customerCName:'',
				identifyType:'74',
				identifyNo:'',
				datevalid:'',
				insuredType:'2',
				mobile:'',
				linkName:'',
				phoneNumber:'',
				address1:'',
				address2:'',
				address3:'',
				address1Name:'',
				address2Name:'',
				address3Name:'',
				address4:'',
				insuredAddress:'',
				postCode:'',
				email:'',
				businessSort:'',
				businessDetail:'',//企业类型
                qualification:'',//企业资质
				relationInsured:'',
				capitalauThority:'',
				doBesinessIncome:'',
				customerLevel:'',
				insuredRemark:'',
				invoiceMan:'',
				flag:'',
				
			},
			businessSortList:[],//企业性质集合
            addressInfoVoList:[],//省
			address2InfoVoList:[],//市
			address3InfoVoList:[],//区县
            IdentifyTypeList:[
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
			],
			imgUrl:require('@/assets/images/markMustInput.jpg'),
			showImgUrl:require('@/assets/images/butCollapse.gif'),
          }
        }, 
		created(){
        //   PubSub.subscribe('searchAppiInsured', (event, data) => {
        //       this.AppliInsuredLinkerName=data
        //   })
		},
		mounted(){
			window['setAppliData']=(val)=>{
				this.DatafromPlatform(val)
			}
		},			
		watch:{
            receiveFlag:{
				// eslint-disable-next-line no-unused-vars
				handler(newvalue,oldvuale){
                    this.setAddressByPlatfrom()
				},
				immediate:false	
			}
		},
		directives:{
			'mydirective':{
				// eslint-disable-next-line no-unused-vars
				bind:function (el,binding){
						el.title=binding.value
			   },
			  
				update:function(el){//组件更新
				   if(el.title!=el.value){

                      el.style.backgroundColor="yellow"
				   }else{
					     el.style.backgroundColor=""
				   }
				},
			}
		  },	
        methods:{
			show() {this.isShow=!this.isShow;},
            initOpitons(data){
               this.businessSortList=data.businessSortList;//初始化企业性质
               this.addressInfoVoList=data.addressInfoVoList;//省份下拉框初始化
			},
			changeCustomerFlag(){},
			addAppliInsuredCustomer(val){ 
				let  strURL = `${process.env.VUE_APP_personUrl}/prpall/commonship/pub/forwardToPlatform.jsp?CurrentCustomer=${val}&riskcode=${this.$store.state.riskCode}`;
				window.open(strURL,'','top=0,left=0,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,status=0');
			},
            async initAppliInsuredData(data){
				for(let key in data.appliInfoVo){
					if(key in this.appliInfoVo){
						this.appliInfoVo[key]=data.appliInfoVo[key]||''
					}
				}
				if(this.appliInfoVo.address1!=null&&this.appliInfoVo.address1!=''){
			    	await this.getselectaddressinfo(this.appliInfoVo.address1,'address1')
				}
				if(this.appliInfoVo.address2!=null&&this.appliInfoVo.address2!=''){
			    	await this.getselectaddressinfo(this.appliInfoVo.address2,'address2')
				}
				this.getInsuredAddress()	
			},

			async setAddressByPlatfrom(){
				console.log( "调用的setaddressByPlatfrom 方法")
				if(this.appliInfoVo.address1!=null&&this.appliInfoVo.address1!=''){
					await this.getselectaddressinfo(this.appliInfoVo.address1,'address1')
				}
				if(this.appliInfoVo.address2!=null&&this.appliInfoVo.address2!=''){
					await this.getselectaddressinfo(this.appliInfoVo.address2,'address2')
				}	
				this.getInsuredAddress()
			},
			DatafromPlatform(val){
				//let val=new appliInfoVo1();
				console.log("将平台投保人的数据带回到承保系统")
				console.log(val)
				//遍历val 对象 给投保人页面赋值
				for(let key in val){
					
					if(key in this.appliInfoVo){
						this.appliInfoVo[key]=val[key]
					}
				}
				this.receiveFlag=!this.receiveFlag
			},
	        changeAddress(value){
				let upperCode=''
				 if(value=="address1"){
					 this.appliInfoVo.address2=''
					 this.appliInfoVo.address3=''
					 upperCode=this.appliInfoVo.address1
				 }else if(value=="address2"){
					  this.appliInfoVo.address3=''
					  upperCode=this.appliInfoVo.address2
				 }
              //调用后端接口方法
				this.getselectaddressinfo(upperCode,value).then(()=>{
						this.getInsuredAddress();
				})
			},
			getselectaddressinfo(arg,value){
				// eslint-disable-next-line no-unused-vars
				return new Promise((resolve,reject)=>{
					Address.getselectaddressinfo(arg).then((res)=>{
						if(res.status==200){
							let data=res.data.data
							if(value=="address1"){
								this.address2InfoVoList=data
								resolve()
							}else if(value=="address2"){
								this.address3InfoVoList=data
								resolve()
							}
						}  
					})
				})
			},
			getInsuredAddress(){
				let Address1=''
				let Address2=''
				let Address3=''
                for(let item of this.addressInfoVoList ){
					if(this.appliInfoVo.address1==item.addressCode){
						Address1=item.addressName;
						break
					}
				}
				for(let item of this.address2InfoVoList ){
					if(this.appliInfoVo.address2==item.addressCode){
						Address2=item.addressName;
						break
					}
				}
				for(let item of this.address3InfoVoList ){
					if(this.appliInfoVo.address3==item.addressCode){
						Address3=item.addressName;
						break
					}
				}
				this.appliInfoVo.insuredAddress=`${Address1+Address2+Address3+this.appliInfoVo.address4}`
			},
			 checkAppliInsured(){
				return new Promise((resolve)=>{
					this.$validator.validate().then(result => {
						if (!result) {
							this.$alert(this.errors.all()[0],'投保人信息',{type:'warning'});  // ui框架的提示弹窗         
							resolve(false);
						}else{
							resolve(true)
						}
					})
				})
			}
        },
  }
  