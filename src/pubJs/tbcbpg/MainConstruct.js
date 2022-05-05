import  date from '@/utils/date.js'
export default { 
    name:'Construct',
    data(){
      return{
        imgUrl:require('@/assets/images/markMustInput.jpg'),
        isShow:false,
        elementShow:false,
        riskcode:this.$store.state.comCode,
        constructInfoVo:{
          constructAddress:'',
          constructName:'',
          endFixDate:'',
          startFixDate:'',
          addAssureMonth:'',
          flag:''
        }
      }
    },


    created(){
      if(this.riskcode=="2244"){
        this.elementShow=false
      }
    },
    watch:{
        // 'constructInfoVo.startFixDate':{
        //   handler:function (newVal,oldValue) {
        //       if(newVal!=oldValue){
        //         this.checkStartDateForCermical()
        //         this.addassuremonth()
        //       }
        //  },
        //  immediate:false
        // },
        // 'constructInfoVo.endFixDate':{
        //   handler:function (newVal,oldValue) {
        //       if(newVal!=oldValue){
        //         this.addassuremonth();
        //         this.checkDateMainConstruct('endFixDate');
        //       }
        //  },
        //  immediate:false
        // }
    },

    methods:{
      show() {
          this.isShow=!this.isShow;
       },
       initMainConstructData(obj){
        this.constructInfoVo=obj.constructInfoVo 
      }, 
      SelectDate(e,str){
        date.SelectDate(e.target,str)
      
      },
      get1(){
        console.log(this.constructInfoVo.endFixDate)
        console.log(this.constructInfoVo.startFixDate)
      },
      addassuremonth()
      {
        var strStartDate = "";
        var strEndDate = "";
        var dStartDate = "";
        var dEndDate = "";
        var IntervelYear = "";
        var IntervelMonth = "";
        var IntervelDate = "";
        strEndDate = this.constructInfoVo.endFixDate
        strStartDate = this.constructInfoVo.startFixDate
        if(!this.$uiCommon.isEmpty(strEndDate)&&!this.$uiCommon.isEmpty(strStartDate)){
        dStartDate = new Date(this.$uiCommon.replace(strStartDate,"-","/"));
        dEndDate = new Date(this.$uiCommon.replace(strEndDate,"-","/"));
        IntervelYear = dEndDate.getYear()-dStartDate.getYear();
        IntervelMonth =  dEndDate.getMonth()+12*IntervelYear -dStartDate.getMonth();
        IntervelDate = dEndDate.getDate()-dStartDate.getDate();
        //setNewCreditDate();
        if (IntervelDate>=0)
        {
          IntervelMonth = IntervelMonth+1;
        }
        
        if(IntervelMonth > 60) 
          this.$alert("保险期限已经超过60个月！",'建设工程信息',{type:'warning'});
          this.constructInfoVo.addAssureMonth=IntervelMonth;
        }else{
          this.constructInfoVo.addAssureMonth="";
        }
      if ( this.constructInfoVo.addAssureMonth == "NaN") this.constructInfoVo.addAssureMonth="";
      
      },
      checkStartDateForCermical(){
        if(this.constructInfoVo.startFixDate==null||this.constructInfoVo.startFixDate==''){
          this.constructInfoVo.endFixDate =''
        }else{
          this.constructInfoVo.endFixDate = this.$uiCommon.getNextDateFullDate(this.$uiCommon.getNextYearFullDate(this.constructInfoVo.startFixDate,1),-1);    
        }
      },
      checkDateMainConstruct(val){
      //保证期起始日期、终止日期触发
      if(val=="endFixDate") {
        if(this.$uiCommon.isEmpty(this.constructInfoVo.endFixDate)||this.$uiCommon.isEmpty(this.constructInfoVo.startFixDate))
          return true;
        if(this.$uiCommon.compareFullDate(this.constructInfoVo.endFixDate,this.constructInfoVo.startFixDate)<0)
        {
          this.$alert("工程计划终止日期不能早于起始日期！",'建设工程信息',{type:'warning'});
          this.constructInfoVo.endFixDate=''
          this.constructInfoVo.addAssureMonth=''
          return false;
        }
      }
      return true;
    },
    checkConstructInfo (){
      return new Promise((resolve)=>{
        this.$validator.validate().then(result => {
            if (!result) {
              this.$alert(this.errors.all()[0],'建设工程信息',{type:'warning'});  // ui框架的提示弹窗         
              resolve(false);
            }else{
              resolve(true);
            }
        })
      })
    }

  }
}