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
              let data=orderData.engageInfoVos.filter(ele=>{
                return  ele.clauseCode!='TX001'
              }) 
              this.engageInfoVoList=data
            },
            selectClauseCode(){}
		   
        }
  }