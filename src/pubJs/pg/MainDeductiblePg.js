export default { 
    name:'DeductibleText',
    data(){
      return{
        isShow:false,
        engageInfoVo:{
           serialNo:"1",
           clauseCode:'TX001',
           clauses:'',
           lineNo:'1',
           titleName:'',
           titleFlag:'',
           flag:''
        },
        DeductibleText_Flag:''
      
      }
    },
    methods:{
      show() {
          this.isShow=!this.isShow
       },
       changeDeductibleTextEngage(){

       },
       setRefreshFlagDeductibleTextZero(){

       },
       initMainDeductibleData(orderData){
          let data =orderData.engageInfoVos.filter(item=>{
                  return item.clauseCode=='TX001'
              })
        
          this.engageInfoVo=data[0]
          for(let key in this.engageInfoVo){
                if(this.$refs[key]){
                  this.$refs[key].title=this.engageInfoVo[key]
                }
          }
          this.$uiCommon.addevent(this,'engageInfoVo')
        },
       checkDeductibleInfo(){
          return new Promise((reslove)=>{
            this.$validator.validate().then(result => {
              if (!result) {
                this.$alert(this.errors.all()[0],'免赔约定信息',{type:'warning'});  // ui框架的提示弹窗         
                reslove(false);
              }else{
                reslove(true);
              }
            })
          })
       }
    },

}