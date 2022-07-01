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
          if(orderData.endorseDataVo.performanceObligorInfoVos.length){
            if(orderData.endorseDataVo.performanceObligorInfoVos.length>0){ 
              data=orderData.endorseDataVo.performanceObligorInfoVos[0]
              this.obligorCode=data.obligorCode
              this.obligorName=data.obligorName
              this.obligorAddress=data.obligorAddress
              this.businessCode=data.businessCode
              this.limitAmount=data.limitAmount
            }
            if(orderData.originDataVo.performanceObligorInfoVos.length>0){ 
              data=orderData.originDataVo.performanceObligorInfoVos[0]
              this.$refs.obligorCode.title=data.obligorCode
              this.$refs.obligorName.title=data.obligorName
              this.$refs.obligorAddress.title=data.obligorAddress
              this.$refs.businessCode.title=data.businessCode
              this.$refs.limitAmount.title=data.limitAmount
            }
            if(orderData.originDataVo.performanceObligorInfoVos[0].flag=="U"){
              for(let key in this.$refs){
                if(this.$refs[key].title!=this[key]){
                  this.$refs[key].className='commonu'
                }
              }
            }
          }
        }
     }
   
}