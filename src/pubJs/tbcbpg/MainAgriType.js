export default{
    data(){
      return { 
           AgriNature:'',
           subSidyInfoVoList:[],

       }
    },
      props:{
        isAgriChildShow:{
            type:Boolean
        }
    },
    watch:{
        subSidyInfoVoList:{
          handler(){
            for(let index in this.subSidyInfoVoList){
              this.subSidyInfoVoList[index].serialNo=parseInt(index)+1;
            }
          }
        }
    },
    methods:{
        okCallback(){
          this.$validator.validate().then((result) => {
            if(!result){
              this.$alert(this.errors.all()[0],'涉农信息',{ type:'warning'});  // ui框架的提示弹窗
              return false;
            }else{
              if(this.checkSubSidy()){
                  this.$store.state.refreshFlagAgri='1';//刷新涉农标志
                  this.$emit('closeAgri','ok')
              }
            }
          })
        },
        cancelCallback(){
          this.$store.state.refreshFlagAgri='1';
          this.$emit('closeAgri','cancel')
        },
        initMainAgriData(orderData){
          
          this.subSidyInfoVoList=orderData.subSidyInfoVos
          let s =new Set();
          this.subSidyInfoVoList.forEach((item)=> s.add(item.subSidySort))
          if(s.has("1")){
            this.AgriNature='中央财政性'
          }else if(s.has("2")||s.has("3")){
            this.AgriNature='地方财政性'
          }else{
            this.AgriNature='商业性'
          }
      },
         insertSubSidy() {//新政一行数据
            let obj={
              serialNo:'', 
              subSidySort:'',
              subSidyRate:'',
              subSidyPremium:'',
              currency:this.$store.state.currency2Fee,
              flag:'',
              
            }
            this.subSidyInfoVoList.push(obj);
        },
        deleteSubSidy(index){
             this.subSidyInfoVoList.splice(index,1);

        },
        checkSubSidySort(index){
          let  j=0;
          if(this.subSidyInfoVoList[index].subSidySort=="1"||this.subSidyInfoVoList[index].subSidySort=="2"||this.subSidyInfoVoList[index].subSidySort=="3"){
            for(let i=0;i<this.subSidyInfoVoList.length;i++){
              if(this.subSidyInfoVoList[i].subSidySort=="1"
              ||this.subSidyInfoVoList[i].subSidySort=="2"
              ||this.subSidyInfoVoList[i].subSidySort=="3"){
                j++;
              }
            }
            if(j>1){
              this.$alert("保费来源只能选择中央财政、地方财政、地市县财政之一！！！。",'涉农信息',{ type:'warning'})
              this.subSidyInfoVoList[index].subSidySort='';
              return false;
            }	
          }
          let s =new Set();
          let array1=this.subSidyInfoVoList.filter(item => (item.subSidySort)!='')
          array1.forEach((item)=> s.add(item.subSidySort))
          if(s.size<array1.length){
            this.$alert("不能重复选择保费来源！！！。",'涉农信息',{ type:'warning'})
            this.subSidyInfoVoList[index].subSidySort=''
            return false;

          }
          s.clear();
          this.subSidyInfoVoList.forEach((item)=> s.add(item.subSidySort))
          if(s.has("1")){
            this.AgriNature='中央财政性'
          }else if(s.has("2")||s.has("3")){
            this.AgriNature='地方财政性'
          }else{
            this.AgriNature='商业性'
          }
        },
        countSubSidyPremium(index){
          //涉农业务取得保费是 汇总币别对应得保费
          let sumPremium = this.$uiCommon.replaced(this.$store.state.sumPremium2,",");//modify by liufei 20081018 : 更换去掉千分位方法
            let  subSidyRate = this.subSidyInfoVoList[index].subSidyRate;
          if(subSidyRate>100){
              this.$alert("保费比例只能等于100！！！。",'涉农信息',{ type:'warning'})
              this.subSidyInfoVoList[index].subSidyRate="";
              return false;
          } else if (subSidyRate==""||subSidyRate==null) {
              this.subSidyInfoVoList[index].subSidyPremium = "";
          } else {
              var sPremium = parseFloat((parseFloat(sumPremium)*parseFloat(subSidyRate))/100);
              sPremium = sPremium.toFixed(2)//对小数点后第三位四舍五入 ----20080822 liuboyu
              sPremium = this.$uiCommon.pointTwo(sPremium); //按0.00格式化数字
              this.subSidyInfoVoList[index].subSidyPremium = sPremium; 
          }
        },
        checkSubSidy(){
          var dbSumSubSidyRate = 0;//保费比例
          var dbSumSubSidyPremium = 0;//保费金额
          for(let item of this.subSidyInfoVoList){
            dbSumSubSidyRate += parseFloat(item.subSidyRate)
            dbSumSubSidyPremium += parseFloat(item.subSidyPremium)
          }
           //2校验 保险比例合计是否为100
          if(parseFloat(dbSumSubSidyRate)!=100) {
              this.$alert('涉农险业务保费比例合计应该等于100%！！！。','涉农信息',{ type:'warning'});
              return false;
          }
              //3 格式化 保险金额
               dbSumSubSidyPremium = this.$uiCommon.pointTwo(dbSumSubSidyPremium.toFixed(2)); //按0.00格式化数字      
              //4保险金额尾插处理
               let sumCal=this.$uiCommon.replaced(dbSumSubSidyPremium)
               let index =this.subSidyInfoVoList.length-1
               let sumPremium = this.$uiCommon.replaced(this.$store.state.sumPremium2,",");
               if(this.$uiCommon.replaced(dbSumSubSidyPremium)!=parseFloat(sumPremium)){
                    let  sPremium = (sumPremium-sumCal+parseFloat(this.subSidyInfoVoList[index].subSidyPremium)).toFixed(2); 
                    sPremium = this.$uiCommon.pointTwo(sPremium);
                    this.subSidyInfoVoList[index].subSidyPremium=sPremium
                 
               }
            return true;
        },
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