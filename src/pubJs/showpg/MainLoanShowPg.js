
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
          }]
      }
    },
    methods:{
      show() {this.isShow=!this.isShow },
      checkStartDateForCermical(){},
      checkEndDateForCermical(){},
      addassuremonth(){},
      checkDateMainConstruct(){},
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
        //2.组织反担保方式子信息，如果serialNo 在c表中有 在P表中没有 证明 
        let list=[];
        let obj={};
        let endorseData =orderData.endorseDataVo.guaranteeSubInfoVos;
        let originData  =orderData.originDataVo.guaranteeSubInfoVos;
        let originMap=new Map();
        let originMap1=new Map();
        let endorseMap=new Map();
        endorseMap.forEach((item)=>{
          endorseMap.set(item.serialNo,item.flag)
        })
        originData.forEach((item)=>{
          originMap.set(item.serialNo,item.flag)
          originMap1.set(item.serialNo,item)
        })
        list.push(...endorseData,...originData)
        list=list.reduce((newArr, next)=>{
          obj[next.serialNo] ? "" : (obj[next.serialNo] = true && newArr.push(next))
          return newArr
        },[])
        list.forEach((item,index)=>{
          if(originMap.get(item.serialNo)){
            list[index].flag=originMap.get(item.serialNo)=='U'?'U':originMap.get(item.serialNo)=='D'&&!endorseMap.get(item.serialNo)?'D':''
          }else{
            list[index].flag='I'
          }
        })
        
        //针对List进行排序 
        this.guaranteeSubInfoVoList= list.sort(this.$uiCommon.compare("serialNo")) 
        this.$nextTick(()=>{
           this.guaranteeSubInfoVoList.forEach((item,index)=>{
               if(item.flag!='I'&&item.flag!='D'){
                  let historyData=originMap1.get(item.serialNo)
                  this.$refs.guaranteeType[index].title=historyData.guaranteeType
                  this.$refs.guaranteeDesc[index].title=historyData.guaranteeDesc
                  this.$refs.guaranteeRate[index].title=historyData.guaranteeRate
                  if(historyData.guaranteeType!=this.guaranteeSubInfoVoList[index].guaranteeType){
                    this.$refs.guaranteeType[index].className='commonu'
                  }
                  if(historyData.guaranteeDesc!=this.guaranteeSubInfoVoList[index].guaranteeDesc){
                    this.$refs.guaranteeDesc[index].className='commonu' 
                  }
                  if(historyData.guaranteeRate!=this.guaranteeSubInfoVoList[index].guaranteeRate){
                    this.$refs.guaranteeRate[index].className='commonu' 
                  }
               }
           })
        })
      }
    }     
}