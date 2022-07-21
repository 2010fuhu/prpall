import {showPage} from '@/pubJs/UICommon.js'
  // eslint-disable-next-line no-unused-vars
  class engageInfoVo {
          constructor() {
            this.serialNo=''
            this.clauseCode=''
            this.clauses=''
            this.titleName=''
            this.lineNo=''
			      this.titleFlag=''
			      this.flag=''
        }
  }
   export default { 
        name:'Engage',
        data(){
          return{
            isShow:true,
            engageInfoVoList:[],//特别约定数据
            clauseInfoVoList:[],//特别约定代码option
            clauses:'',
			      ClausesContextMap:new Map()
          }
        },
        methods:{
          engageShow(index){ 
              if(this.$refs.ClausesContextSpan[index].style.display==''){
                this.$refs.ClausesContextSpan[index].style.display='none'
              }else{ 
                      this.$refs.ClausesContextSpan[index].style.display='';
              }
          },
          showPage() {
              this.isShow=showPage(this.isShow);
           },
		        initSelected(data){
              this.clauseInfoVoList=data.clauseInfoVoList;
              this.clauseInfoVoList.forEach(item=>{
                 this.ClausesContextMap.set(item.clausecode, item.context)

			        })
		        },
            initEngageData(orderData){
              let list=[];
              let obj={};
              let originMap=new Map()
              let endorseMap=new Map()
              let endorseData=orderData.endorseDataVo.engageInfoVos.filter(ele=>{
                return  ele.clauseCode!='TX001'
              }) 
              let originData=orderData.originDataVo.engageInfoVos.filter(ele=>{
                return  ele.clauseCode!='TX001'
              })
              endorseMap.forEach((item)=>{
                endorseMap.set(item.clauseCode,item)
              })
              originData.forEach((item)=>{
                originMap.set(item.clauseCode,item.flag)
              }) 
              list.push(...endorseData,...originData)
              list=list.reduce((newArr, next)=>{
                obj[next.clauseCode] ? "" : (obj[next.clauseCode] = true && newArr.push(next))
                return newArr
              },[])
              list.forEach((item,index)=>{
                if(originMap.get(item.clauseCode)){
                  list[index].flag=originMap.get(item.clauseCode).flag=='U'?'U':originMap.get(item.clauseCode).flag=='D'&&!endorseMap.get(item.clauseCode)?'D':''
                }else{
                  list[index].flag='I'
                }
              })
              this.engageInfoVoList=list.sort(this.$uiCommon.compare("serialNo")) 
              this.$nextTick(()=>{
                this.engageInfoVoList.forEach((item,index)=>{
                  if(item.flag!='I'&&item.flag!='D'){
                    let historyData=originMap.get(item.clauseCode)
                    for(let engageKey in historyData){
                        if(this.$refs[engageKey]){
                            if(this.$refs[engageKey][index]){
                                this.$refs[engageKey][index].title=historyData[engageKey]
                                if(this.$refs[engageKey][index].title!=this.$refs[engageKey][index].value){
                                  this.$refs[engageKey][index].className='commonu'
                                }    
                            }
                        }
                    }
                  }
                })
              })
            },
            selectClauseCode(){}	   
        }
  }