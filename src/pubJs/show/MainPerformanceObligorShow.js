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
        console.log(orderData.performanceObligorInfoVos);
        if(orderData.performanceObligorInfoVos.length>0){ 
          data=orderData.performanceObligorInfoVos[0]
        }
        this.obligorCode=data.obligorCode
        this.obligorName=data.obligorName
        this.obligorAddress=data.obligorAddress
        this.businessCode=data.businessCode
        this.limitAmount=data.limitAmount
      }
     }
   
}