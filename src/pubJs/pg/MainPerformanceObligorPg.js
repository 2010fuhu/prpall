import performerQuery from '@/api/performerQuery.js'
import XBCustomerLimitqueryReq from '@/json/XBCustomerLimitqueryReq.json'
//import {EventBus} from '@/utils/event-bus.js'
export default { 
     name:'commonMainLoan',
     data(){
       return{
         isShow:false,
         imgUrl:require('@/assets/images/markMustInput.jpg'),
         serialNo:'1',//序号
         Mainloan_New_Flag:'',
         MainLoanImgNumber:'1',
         MainLoanImgNumberFlag:'0',
         obligorCode:'',//原履约义务人代码，现在为业务编号
         obligorName:'',//履约义务人名称
         obligorAddress:'',//履约义务人代码
         businessCode:'',//统一社会信用代码 
         limitAmount:'',//保险金额
     
       }
     },
   directives:{
         'changeFlag':{
             update:function(el,binding,vnode){//组件更新
        if(binding.value!=binding.oldValue){
         let that = vnode.context  
         that.MainLoanImgNumberFlag='1';
        }
             },
         }		
       },
     methods:{
       show() {this.isShow=!this.isShow},
       initPerFormanceData(orderData){
          let data='';
          if(orderData.performanceObligorInfoVos.length>0){ 
            data=orderData.performanceObligorInfoVos[0]
          }
          this.obligorCode=data.obligorCode
          this.obligorName=data.obligorName
          this.obligorAddress=data.obligorAddress
          this.businessCode=data.businessCode
          this.limitAmount=this.$refs.limitAmount.title=data.limitAmount
          this.$refs.button_MainLoanImg_Query.disabled=true
          this.$refs.obligorCode.readonly=true
          this.$refs.obligorName.readonly=true
          this.$refs.obligorAddress.readonly=true
          this.$refs.businessCode.readonly=true

      },
        mainLoanImgLimitMoney(){
             if(this.limitAmount!=this.$refs.limitAmount.title){
              this.$refs.limitAmount.className='commonu'
             }else{
              this.$refs.limitAmount.className='common'
             }
             this.limitAmount= this.$uiCommon.number_format(this.limitAmount,2)
             this.calAllPremium();

        },
        calAllPremium(){//将履约义务人的保险金额赋值给主线的保额
           debugger
           this.$parent.$refs.MainItemkind.setAmount(this.limitAmount)
        },
       async addQueryMainLoanImg(){//查询履约义务人信息
         if(this.obligorCode!=''&&(this.obligorName!=''||this.businessCode!='')){
              let XBCustomerJson=this.GenerateXBCustomerJson()
             await performerQuery.performerQuery(XBCustomerJson).then(res => {
               let data = res.data;
               if(data.resHeader.errCode=='0000'){
                     this.obligorCode=data.xbCustomerLimitqueryResMVo.businessId
                     this.businessCode=data.xbCustomerLimitqueryResMVo.businesscode;
                     this.obligorName=data.xbCustomerLimitqueryResMVo.customerCname;
                     this.obligorAddress=data.xbCustomerLimitqueryResMVo.addressCname;
               }else{
                   this.$alert(`${data.resHeader.errMsg}`,'履约义务人',{type:'warning'})
                   return false
               }
             })
         }else{
           if(this.obligorCode==''){
              this.$alert('请录入业务编码','履约义务人',{type:'warning'})
              return false;
           }
             if(this.obligorName==''&&this.businessCode==''){
              this.$alert("请录入'履约义务人名称'或'统一社会信用代码'",'履约义务人',{type:'warning'})
              return false;
           }
         }

        },
        GenerateXBCustomerJson(){
           let obj=XBCustomerLimitqueryReq
           //组织主体数据  
           obj.businessId=this.obligorCode;
           obj.riskcode=this.$store.state.riskCode;
           obj.businesscode=this.businessCode;
           obj.customerCname=this.obligorName;
           return obj;
        },
        checkPerformanceObligor(){
            return new Promise((resolve)=>{
              this.$validator.validate().then(result => {
                if (!result) {
                  this.$alert(this.errors.all()[0],'履约义务人信息',{type:'warning'});  // ui框架的提示弹窗         
                  resolve(false);
                }else{
                  resolve(true);
                } 
              })
            })
        }
       
     }
}