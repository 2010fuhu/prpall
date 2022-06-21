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
        initMainLoanData(orderData){
            this.guaranteeInfoVo=orderData.endorseDataVo.guaranteeInfoVo
            let  orgGuaranteeInfo=orderData.originDataVo.guaranteeInfoVo
            for(let key in  orgGuaranteeInfo){
                if(this.$refs[key]){
                  this.$refs[key].title=orgGuaranteeInfo[key]
                  if(orgGuaranteeInfo[key]!=this.guaranteeInfoVo[key]&&orgGuaranteeInfo.flag=='U'){
                    this.$uiCommon.setColor(this.$refs[key])
                  }
                }
            }
           
            // this.guaranteeSubInfoVoList=orderData.endorseDataVo.guaranteeSubInfoVos
            // let  orgGuaranteeSubInfo=orderData.originDataVo.guaranteeSubInfoVos
            // orgGuaranteeSubInfo.forEach((item,index)=>{
            //    for(let orgkey in item){
            //      if(this.$refs[orgkey][index]){
            //         this.$refs[orgkey][index].title=item[orgkey]
            //         if()
            //      }

            //    }
            // })
            // this.$nextTick(()=>{
            //   for()
            // })

        }
    }   
   
}