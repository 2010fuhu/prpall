export default { 
    name:'MainLoan',
    data(){
      return{
            isShow:false,
             imgUrl:require('@/assets/images/butCollapse.gif'),
            //担保方式
            guaranteeEndDateOrg:'',
            guaranteeStartDateOrg:'',
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
                }
                ]
      }
    },
    mounted(){},
    methods:{
       show() {this.isShow=!this.isShow},
       initMainLoanData(orderData){
        this.guaranteeInfoVo=orderData.guaranteeInfoVo
        console.log(this.guaranteeInfoVo.guaranteeMonth)
        this.guaranteeSubInfoVoList=orderData.guaranteeSubInfoVos
        this.guaranteeEndDateOrg=orderData.guaranteeInfoVo.guaranteeEndDate
        this.guaranteeStartDateOrg=orderData.guaranteeInfoVo.guaranteeStartDate
        this.$nextTick(()=>{
            this.$uiCommon.setTitle(this.$refs.mainLoan.children)
            this.$uiCommon.addevent(this,'guaranteeMonth');
            this.$uiCommon.addevent(this,'mortgageNo');
            this.$uiCommon.addevent(this,'guaranteeAmount');
            this.$uiCommon.addevent(this,'guaranteeSubInfoVoList')
        })
       }, 
       delGuarantee(index){
           this.$uiCommon.deleteRowForPG(this,'guaranteeSubInfoVoList',index)
       },

       addGuarantee(){
          this.$uiCommon.insertRowForPG(this,'guaranteeSubInfoVoList',{   
            serialNo:'',
            guaranteeType:'',
            guaranteeDesc:'',
            guaranteeRate:''
          })
       },
        checkStartDateForCermical(){
          if(this.guaranteeInfoVo.guaranteeStartDate==null||this.guaranteeInfoVo.guaranteeStartDate==''){
              this.guaranteeInfoVo.guaranteeEndDate = null
            }else{
              this.guaranteeInfoVo.guaranteeEndDate = this.$uiCommon.getNextDateFullDate(this.$uiCommon.getNextYearFullDate(this.guaranteeInfoVo.guaranteeStartDate,1),-1);    
            }
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
        strEndDate = this.guaranteeInfoVo.guaranteeEndDate
        strStartDate = this.guaranteeInfoVo.guaranteeStartDate
        if(!this.$uiCommon.isEmpty(this.guaranteeInfoVo.guaranteeEndDate)
        &&!this.$uiCommon.isEmpty(this.guaranteeInfoVo.guaranteeStartDate)){
        dStartDate = new Date(this.$uiCommon.replace(strStartDate,"-","/"));
        dEndDate = new Date(this.$uiCommon.replace(strEndDate,"-","/"));
        IntervelYear = dEndDate.getYear()-dStartDate.getYear();
        IntervelMonth =  dEndDate.getMonth()+12*IntervelYear -dStartDate.getMonth();
        IntervelDate = dEndDate.getDate()-dStartDate.getDate();
        if (IntervelDate>=0)
        {
          IntervelMonth = IntervelMonth+1;
        }
        
        if(IntervelMonth > 60) 
          this.$alert("反担保期限已经超过60个月！",'反担保方式信息',{type:'warning'});
          this.guaranteeInfoVo.guaranteeMonth=IntervelMonth;
        }else{
          this.guaranteeInfoVo.guaranteeMonth="";
        }
        if( this.guaranteeInfoVo.guaranteeMonth == "NaN") this.guaranteeInfoVo.guaranteeMonth="";
        if( this.guaranteeInfoVo.guaranteeMonth!=this.$refs.guaranteeMonth.title){
          this.$refs.guaranteeMonth.style.backgroundColor='#FFFF00'

        }else{
          this.$refs.guaranteeMonth.style.backgroundColor=''

        }
      },
       checkDateMainConstruct(val){
      //保证期起始日期、终止日期触发
      if(val=="guaranteeEndDate")
      {
        if(this.$uiCommon.isEmpty(this.guaranteeInfoVo.guaranteeEndDate)
        ||this.$uiCommon.isEmpty( this.guaranteeInfoVo.guaranteeStartDate))
          return true;
        if(this.$uiCommon.compareFullDate(this.guaranteeInfoVo.guaranteeEndDate,this.guaranteeInfoVo.guaranteeStartDate)<0)
        {
          this.$alert("反担保期限终止日期不能早于起始日期！",'反担保方式信息',{type:'warning'});
          this.guaranteeInfoVo.guaranteeStartDate=''
          return false;
        }
      }
      return true;
    },
    changeCorlor(){
      this.$nextTick(()=>{
        if(this.guaranteeStartDateOrg!=this.guaranteeInfoVo.guaranteeStartDate){
          for(let i=0;i<this.$refs.guaranteeStartDate.$el.children.length;i++){
            this.$refs.guaranteeStartDate.$el.children[i].style.backgroundColor="#FFFF00"
          }
        }else{
          for(let i=0;i<this.$refs.guaranteeStartDate.$el.children.length;i++){
            this.$refs.guaranteeStartDate.$el.children[i].style.backgroundColor=""
          }
        }
        if(this.guaranteeEndDateOrg!=this.guaranteeInfoVo.guaranteeEndDate){
          for(let i=0;i<this.$refs.guaranteeEndDate.$el.children.length;i++){
            this.$refs.guaranteeEndDate.$el.children[i].style.backgroundColor="#FFFF00"
          }
        }else{
          for(let i=0;i<this.$refs.guaranteeEndDate.$el.children.length;i++){
            this.$refs.guaranteeEndDate.$el.children[i].style.backgroundColor=""
          }
        }
      })

    },
    changeCorlorEnd(){
      if(this.guaranteeEndDateOrg!=this.guaranteeInfoVo.guaranteeEndDate){
        for(let i=0;i<this.$refs.guaranteeEndDate.$el.children.length;i++){
          this.$refs.guaranteeEndDate.$el.children[i].style.backgroundColor="#FFFF00"
        }
      }else{
        for(let i=0;i<this.$refs.guaranteeEndDate.$el.children.length;i++){
          this.$refs.guaranteeEndDate.$el.children[i].style.backgroundColor=""
        }
      }
    }

    },     
    //子组件中监听深度监听对象 
    watch: {
    guaranteeSubInfoVoList:{//监听保险期间的变化
        handler:function () {
           for(let i=0;i<this.guaranteeSubInfoVoList.length;i++){
             this.guaranteeSubInfoVoList[i].serialNo=i+1;
          }
        },
        immediate:false
      },

   }
}