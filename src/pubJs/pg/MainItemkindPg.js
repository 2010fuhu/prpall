   //import {EventBus} from '@/utils/event-bus.js'
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
                  shortRateFlag:'1',
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
    
        methods:{
          show(){
            this.isShow=this.$uiCommon.showPage(this.isShow);  
          },
           ShortRateShow(index){//点击星号 展示主险对应的短期费率方式
              this.itemKindInfoVoList[index].ShortRateClassShow=!this.itemKindInfoVoList[index].ShortRateClassShow;
          },
          setAmount(value){
             this.itemKindInfoVoList[0].amount=value
             this.calculatepremium()
          },
          calculatepremium(){
              let vPremium = 0;
              let vAmount    = parseFloat(this.$uiCommon.replaced(this.itemKindInfoVoList[0].amount)); //保额
              let vRate      = parseFloat(this.itemKindInfoVoList[0].rate); //费率
              let vShortRate = parseFloat(this.itemKindInfoVoList[0].shortRate); //短期费率
            if(isNaN(vAmount)){
              vAmount= 0;
              }
            if(isNaN(vRate)){
              vRate= 0;
              }
            if(isNaN(vShortRate)){
              vShortRate = 0;
              }
            vPremium = this.$uiCommon.point((vAmount * vRate/100 * vShortRate/100).toFixed(2),2);
            this.itemKindInfoVoList[0].premium= vPremium;
            this.$store.state.refreshFlagFee='0'
            this.$nextTick(()=>{
              this.$uiCommon.setColor(this.$refs.premium[0])
              this.$uiCommon.setColor(this.$refs.amount[0])
            })
          },

          initMainItemkindData(orderData){//普通批单录入 初始化数据 将保单数据带到页面上
            if(orderData.itemKindInfoVos){
              orderData.itemKindInfoVos.forEach((item,index) => {
                  for(let key in item){
                      if(key in this.itemKindInfoVoList[index]){
                        this.itemKindInfoVoList[index][key]=item[key]
                      }
                  }
              });
            }
           this.$nextTick(()=>{
            this.$uiCommon.setTitle(this.$refs.itemkindData)
            this.$uiCommon.addevent(this,'itemKindInfoVoList')
           })
          
          },
          add() {
            this.itemKindInfoVoList.push({});
          },
          //移除表格  参数为表格索引
          del(index) {
               this.itemKindInfoVoList.splice(index,1);    
          },
          setItemkindAmount(val){
             this.itemKindInfoVoList[0].amount= val
           
          },
          initSelected(data){
             this.currencyInfoVoList=data.currencyInfoVoList;
             
          },
          calShortRate(index){//选择短期费率方式，计算短期系数
             this.itemKindInfoVoList[index].shortRate = 
             this.$uiCommon.pointFour((this.$uiCommon.getShortRate(
             this.itemKindInfoVoList[index].shortRateFlag,
             this.$store.state.startDate,this.$store.state.StartHour,this.$store.state.endDate,this.$store.state.EndHour,'2244')).toFixed(4));
       

          },//计算短期费率
          //计算手续费时，生成险别LISTJSON
          kindInfoListGenerate(){
               return this.itemKindInfoVoList;

          },
        },
  
}
