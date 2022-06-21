export default { 
     name:'ItemKindMain',
     data(){
       return{
         originMap: new Map(),
         isShow:false,
         isShortRate:false,
         imgUrl:require('@/assets/images/markMustInput.jpg'),
         currencyInfoVoList:[],//币别select option
         itemKindInfoVoList:[]
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
       initMainItemkindData(orderData){
         if(orderData.originDataVo.itemKindInfoVos){
            for(let item  of orderData.originDataVo.itemKindInfoVos){
              this.originMap.set(item.serialNo+item.kindCode,item)
            }
         }
         if(orderData.endorseDataVo.itemKindInfoVos){
           orderData.endorseDataVo.itemKindInfoVos.forEach((item) => {
                 let obj={
                  serialNo:item.serialNo,
                  calculateFlag:item.calculateFlag,
                  mainsubFlg:item.mainsubFlg,
                  shortRateFlag:item.shortRateFlag,
                  ShortRateClassShow:false,
                  shortRate:item.shortRate,
                  kindCode:item.kindCode,
                  kindName:item.kindName,
                  itemCode:item.itemCode,
                  itemName:item.itemName,
                  amount:item.amount,
                  premium:item.premium,
                  currency:item.currency,
                  rate:item.rate,
                  flag: this.originMap.get(item.serialNo+item.kindCode)?this.originMap.get(item.serialNo+item.kindCode).flag:''
                 }
                 this.itemKindInfoVoList.push(obj)
           });
         }
         this.$nextTick(()=>{
            this.itemKindInfoVoList.forEach((item,index)=>{
                if(item.flag!=''){
                  for(let key in item){
                        if(this.$refs[key]){
                          if(this.$refs[key][index]){
                            this.$refs[key][index].title= this.originMap.get(item.serialNo+item.kindCode)[key]
                          }
                          if(this.$refs[key][index].title&&item.flag.charAt(0)=='U'&&this.$refs[key][index].title!=item[key]){
                            this.$refs[key][index].className=`${this.$refs[key][index].className}u`
                          }
                        }
                  }
                }
            })
        })
       },
       // eslint-disable-next-line no-unused-vars
       calShortRate(index){//选择短期费率方式，计算短期系数
       },
     
     },

}
