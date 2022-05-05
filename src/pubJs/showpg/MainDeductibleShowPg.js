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
       let data =orderData.engageInfoVos.filter(item=>{
                return item.clauseCode=='TX001'
            })
        console.log("-------------------------------------");    
        console.log(data[0]);
        console.log("-------------------------------------");  
        this.engageInfoVo=data[0]
       }
    }
}