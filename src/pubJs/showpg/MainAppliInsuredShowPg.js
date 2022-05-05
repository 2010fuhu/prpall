import  Address from '@/api/getselectaddressinfo.js'
   export default {
        name:'AppliInsured',
        data(){
          return{
            isShow:false,
            riskCode:this.$store.state.riskCode==''?'2244':this.$store.state.riskCode,
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
				businessDetail:'',
				qualification:'',
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
		created(){},
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
			async initAppliInsuredData(data){
				//this.appliInfoVo.customerCName=data.appliInfoVo.customerCName
				for(let key in data.appliInfoVo){//这个是JSON 对象 投保人对象的属性遍历
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
        },
  }
  