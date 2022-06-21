export default { 
    name:'DeductibleText',
    data(){
      return{
        isShow:false,
        isOnly:true,
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
       changeDeductibleTextEngage(){},
       setRefreshFlagDeductibleTextZero(){},
       initMainDeductibleData(orderData){
       let data =orderData.endorseDataVo.engageInfoVos.filter(item=>{
                return item.clauseCode=='TX001'
            })
        let orgin =orderData.originDataVo.engageInfoVos.filter(item=>{
          return item.clauseCode=='TX001'
      })   
        this.engageInfoVo=data[0]
        if(orgin.length){
          console.log( this.$refs)
          this.$refs.clauses.title=orgin[0].clauses
          if(orgin[0].flag&&orgin[0].flag.indexOf('U')>=0){
            this.$refs.clauses.className=`${this.$refs.clauses.className}u`
          }
        }
       }
    }
}