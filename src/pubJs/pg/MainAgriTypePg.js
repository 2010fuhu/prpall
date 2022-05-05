import obj from '@/json/ProposalGenerateReq.json'
export default{
    data(){
      return { 
           AgriNature:'',
           subSidyInfoVoList:[],
           oldPremium:0

       }
    },
      props:{
        isAgriChildShow:{
            type:Boolean
        },
    },
    created(){},
    mounted(){ 
      this.initMainAgriData(obj.proposalGenerateMainInfoReq.subSidyInfoVoList) 
    },
    computed:{
      sumPremium2(){
         let newPremium= this.$uiCommon.replaced(this.$store.state.sumPremium2,",")
         return  newPremium
      }
    },
    watch:{
        sumPremium2:{
          handler(newVal) {
            debugger
            if(this.$store.state.initStatus==1){
                this.calculateSubSidyPremium(newVal)
            }
          },
          immediate:false
        }
    },
    methods:{
        okCallback(){
           this.cancelCallback()
        },
        cancelCallback(){
          this.$store.state.refreshFlagAgri='1';//刷新涉农标志
          this.$emit('closeAgri','ok')
        },
        initMainAgriData(data){
          this.subSidyInfoVoList=data;
          let s =new Set();
          let sumPremium=0;
          this.subSidyInfoVoList.forEach((item)=> {s.add(item.subSidySort)
            sumPremium+=parseFloat(item.subSidyPremium)
          })
          if(s.has("1")){
            this.AgriNature='中央财政性'
          }else if(s.has("2")||s.has("3")){
            this.AgriNature='地方财政性'
          }else{
            this.AgriNature='商业性'
          }
          this.oldPremium=sumPremium
          if(this.subSidyInfoVoList.length>0){
            this.$nextTick(()=>{
              this.$uiCommon.setContainerReadonly(this.$refs.SubSidy,true)
              this.$uiCommon.setTitle(this.$refs.subSidyData)
            })
          }
      },
        insertSubSidy(){},
        deleteSubSidy(){},
        checkSubSidySort(index){
          console.log(index)
        },
        countSubSidyPremium(){
          //涉农业务取得保费是 汇总币别对应得保费
          // let sumPremium = this.$uiCommon.replaced(this.$store.state.sumPremium2,",");//modify by liufei 20081018 : 更换去掉千分位方法
          // let  subSidyRate = this.subSidyInfoVoList[index].subSidyRate;
          // if(subSidyRate>100){
          //     this.$alert("保费比例只能等于100！！！。",'涉农信息',{ type:'warning'})
          //     this.subSidyInfoVoList[index].subSidyRate="";
          //     return false;
          // } else if (subSidyRate==""||subSidyRate==null) {
          //     this.subSidyInfoVoList[index].subSidyPremium = "";
          // } else {
          //     var sPremium = parseFloat((parseFloat(sumPremium)*parseFloat(subSidyRate))/100);
          //     sPremium = sPremium.toFixed(2)//对小数点后第三位四舍五入 ----20080822 liuboyu
          //     sPremium = this.$uiCommon.pointTwo(sPremium); //按0.00格式化数字
          //     this.subSidyInfoVoList[index].subSidyPremium = sPremium; 
          // }
        },
        calculateSubSidyPremium(newVal){
           //涉农业务取得保费是 汇总币别对应得保费
           let oldPremium=parseFloat(this.oldPremium)
           let sumPremium =parseFloat(newVal);
           let sum=0;
           let subSidyRate=0;
           let sPremium=0.00;
           for(let index=0; index<this.subSidyInfoVoList.length;index++){
            subSidyRate = this.subSidyInfoVoList[index].subSidyRate;
            if(index==this.subSidyInfoVoList.length-1){
              sPremium=sumPremium-sum
            }else{
              sPremium = parseFloat((parseFloat(sumPremium)*parseFloat(subSidyRate))/100);
              //sPremium = sPremium.toFixed(2)//对小数点后第三位四舍五入
              //sPremium = this.$uiCommon.pointTwo(sPremium); //按0.00格式化数字
              sum+=sPremium
            }
            this.subSidyInfoVoList[index].subSidyPremium = sPremium.toFixed(2); 
            if(oldPremium!=sumPremium){
                this.subSidyInfoVoList[index].flag='U'
            }else{
                this.subSidyInfoVoList[index].flag=''
            }  
           }
        },
        // checkSubSidy(){
        //   let dbSumSubSidyPremium = 0;//保费金额
        //   for(let item of this.subSidyInfoVoList){
        //     dbSumSubSidyPremium += parseFloat(this.$uiCommon.replaced(item.subSidyPremium))
        //   }
        //   let sumCal = this.$uiCommon.pointTwo(dbSumSubSidyPremium.toFixed(2)); //按0.00格式化数字      
        //   //处理尾插
        //   let index =this.subSidyInfoVoList.length-1
        //   let sumPremium = this.$uiCommon.replaced(this.$store.state.sumPremium2,",");
        //   if(sumCal!=parseFloat(sumPremium)){
        //       let  sPremium = (sumPremium-sumCal+parseFloat(this.subSidyInfoVoList[index].subSidyPremium)).toFixed(2); 
        //       sPremium = this.$uiCommon.pointTwo(sPremium);
        //       this.subSidyInfoVoList[index].subSidyPremium=sPremium
        //   }
        //     return true;
        // },
        getJsonSubSidyInfoVoList(){
            let list=[]
            for(let subSidyInfoVo of this.subSidyInfoVoList){
                subSidyInfoVo.subSidyRate=this.$uiCommon.replaced(subSidyInfoVo.subSidyRate)
                subSidyInfoVo.subSidyPremium=this.$uiCommon.replaced(subSidyInfoVo.subSidyPremium)
                list.push(subSidyInfoVo)
            }
            return list
        }
      }
 }    