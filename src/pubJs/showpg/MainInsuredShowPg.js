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
          methods:{
			show(){ this.isShow =!this.isShow;},
			initOpitons(data){//初始化 select 下拉框options
                this.addressInfoVoList=data.addressInfoVoList;//省份下拉框初始化
			},
			initInsuredData(data){//
				for(let item of data.endorseDataVo.insuredInfoVos){
					this.insuredInfoList.push(item)
				}
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
			checkIdentifyNumber(){}, 
			//checkIdentifyNumber 
       }
    })