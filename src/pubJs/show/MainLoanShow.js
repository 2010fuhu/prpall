export default { 
    name:'MainLoan',
    data(){
      return{
            isShow:false,
             imgUrl:require('@/assets/images/butCollapse.gif'),
            //担保方式
              guaranteeInfoVo:{
                guaranteeStartDate:'',
                guaranteeEndDate:'',
                guaranteeMonth:'',
                mortgageNo:'',
                guaranteeAmount:'',
                flag:''
            
            },
            guaranteeSubInfoVoList:[
                {   
                    serialNo:'1',
                    guaranteeType:'',
                    guaranteeDesc:'',
                    guaranteeRate:'',
                    flag:''
                }
                ]
      }
    },
    methods:{
      show() {this.isShow=!this.isShow },
       checkStartDateForCermical(){},
       checkEndDateForCermical(){},
       addassuremonth(){},
       // eslint-disable-next-line no-unused-vars
        checkDateMainConstruct(e){},
        // eslint-disable-next-line no-unused-vars
        initMainLoanData(orderData){
            this.guaranteeInfoVo=orderData.guaranteeInfoVo
            this.guaranteeSubInfoVoList=orderData.guaranteeSubInfoVos
        }
    }   
   
}