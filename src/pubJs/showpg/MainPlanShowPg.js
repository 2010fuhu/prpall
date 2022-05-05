    // eslint-disable-next-line no-unused-vars
    class palnObject  {
        constructor() {
            this.flag=''
            this.payReason=''
            this.payNo=''
            this.serialNo=''
            this.planStartDate=''
            this.planEndDate=''
            this.currency=''
            this.planFee=''
            this.delinquentFee=''
            this.payRefFee=''
        }
    }
   export default { 
        name:'plan',
        data(){
          return{
            isShow:false,
            PayType:'1',//缴别
            PlanOneTimes:'',//
            payTimes:'1',//缴费次数
            payMode:'1',//缴费方式
            planInfoVoList:[],//
            PrpPlanCurrencyName:'',//币别名称
          }
        },
      
        methods:{
          show:function() {
              this.isShow=!this.isShow;
           },
          initMainPlanData(orderData){
              this.payTimes=orderData.mainInfoVo.payTimes
              this.payMode=orderData.mainInfoVo.payMode
              let strName=''
              if(this.payTimes=="1")
                strName = "1";
              else if(this.payTimes=="12")
                strName = "2";
              else if(this.payTimes=="4")
                strName = "3";
              else
                strName = "5";
              this.PayType=  strName
              let plandata=orderData.planInfoVos
              for(let data of plandata){
               let obj= new palnObject()
               for(let key in data){
                if(key in obj){ 
                  obj[key]=data[key]
                }
                obj.payRefFee=data.planFee-data.delinquentFee
               }

               
               this.planInfoVoList.push(obj)
            }
             
    
            // <v-for='(item,index ) in list'>  [{id:1}，{id:2},{id:3}]
            // <input  ref='id' :value="item.id"/>、
            // </>
            //  this.$refs.id[index].value=item[]

          //   item[0]
          //      this.$refs.id[0]
          //   //  [{id:1 }，{id:2},{id:3}]

          //     for(let i=0;i<this.planInfoVoList.length;i++){
          //       oldData.forEach((item ) => {
          //         if(item.serialNo==itemnew.serialNo){
          //             for(let key in item){
          //                 if(this.$refs[key][i]){
          //                   this.$refs[key][i].title=item[key]
          //                 }
          //             }
          //         }
          //       });
          //     }





          // //   for(let itemnew  of  this.planInfoVoList){
          // //     oldData.forEach((item,index ) => {
          // //           if(item.serialNo==itemnew.serialNo){
          // //           for(let key in item){
          // //               if(this.$refs[key][index]){
          // //                 this.$refs[key][index].title=item[key]
          // //               }
          // //           }

          // //           }
          // //     });
          // // }

            
          //   this.$nextTick(()=>{
          //         // for(let item of this.planInfoVoList){
          //         //        if(item.flag=='U'){
          //         //             for(let data of  newData){
          //         //                if(data.serialNo==item.serialNo){
          //         //                 for(let key in item ){
          //         //                    if(key in data){
          //         //                       if(item[key]!=data[key]){
          //         //                         this.$refs[key].className=`${this.$refs[key].className}u`
          //         //                       }
          //         //                    }
          //         //                 }
          //         //                }
          //         //             }
          //         //        }
          //         // }\
          //         this.planInfoVoList.forEach((item,index)=>{
          //            if(item.flag=='U'){}
          //             for(let key in item){
          //             // this.planInfoVoList[0].id
          //             //   this.planInfoVoList[0]['id']
          //             //    this.planInfoVoList[0][key]
          //                 if(item[key]!=this.$refs[key][index].title){
          //                   this.$refs[key][index].className=`${this.$refs[key][index]}u`
          //                 }
          //            }

          //         })
                
          //   })
          },
          changePayType(){},
           // eslint-disable-next-line no-unused-vars
          refreshPlan(val){},
          checkPayType(){},
          generatePlanEngage(){},
          checkPlanFlag(){},
          //修改应缴金额后触发
           // eslint-disable-next-line no-unused-vars
          changePlanFee(index){},
          // eslint-disable-next-line no-unused-vars
          setOldValue(index){},
          // eslint-disable-next-line no-unused-vars
          getPlanDate(index){},
          // eslint-disable-next-line no-unused-vars
          getPlanStartDate(index){},
        }
        
  }