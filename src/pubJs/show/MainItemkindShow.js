export default { 
     name:'ItemKindMain',
     data(){
       return{
         isShow:false,
         isShortRate:false,
         imgUrl:require('@/assets/images/markMustInput.jpg'),
         currencyInfoVoList:[],//币别select option
         itemKindInfoVoList:[
             {
               serialNo:'1',
               calculateFlag:'Y',
               mainsubFlg:'1',
               shortRateFlag:'0',
               ShortRateClassShow:false,
               shortRate:'100',
               kindCode:'2244001',
               kindName:'农民工工资支付履约保证保险',
               itemCode:'',
               itemName:'',
               amount:'',
               premium:'',
               currency:'CNY',
               rate:'',
               flag:''
             }
             ]
       }
     },
     created(){},
     methods:{
       show(){
         this.isShow=this.$uiCommon.showPage(this.isShow);  
       },
        ShortRateShow(index){//点击星号 展示主险对应的短期费率方式
           this.itemKindInfoVoList[index].ShortRateClassShow=!this.itemKindInfoVoList[index].ShortRateClassShow;
       },

       initSelected(data){
          this.currencyInfoVoList=data.currencyInfoVoList;
       },
       //查询业务下，初始化主险信息
       // eslint-disable-next-line no-unused-vars
       initMainItemkindData(orderData){
         console.log("进入MainItemkind.js")
         console.log(orderData.itemKindInfoVos)
         if(orderData.itemKindInfoVos){
           orderData.itemKindInfoVos.forEach((item,index) => {
                 for(let key in item){
                     if(key in this.itemKindInfoVoList[index]){
                       this.itemKindInfoVoList[index][key]=item[key]
                     }
                 }

           });
         }
       },
       // eslint-disable-next-line no-unused-vars
       calShortRate(index){//选择短期费率方式，计算短期系数
       },
     
     },

}
