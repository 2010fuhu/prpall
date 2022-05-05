export default { 
    name:'period',
    data(){
      return{
        imgUrl:require('@/assets/images/markMustInput.jpg'),
        isShow:false,
        endDate: "",
        startDate:"",
        IntervalMonth:'12',
        startHour:'0',
        endHour:'24',
        operateDate:'',
        endorDate:'',
        signDate:''
      }
    },
    methods:{
      show(){
       this.isShow =!this.isShow;           
      },
      initPeriod(obj){
        let data=obj.mainInfoVo;
        this.startDate=data.startDate;
        this.endDate=data.endDate;
        this.operateDate=data.operateDate;
        this.signDate=data.signDate;
        this.startHour=data.startHour;
        this.endHour=data.endHour;
        this.endorDate=this.$uiCommon.convertFullDateToString(new Date());
        this.intervalmonth();
        this.changetime();
        this.$nextTick(()=>{
             this.$uiCommon.setContainerReadonly(this.$refs.Period);
             this.$refs.operateDate.readOnly=true;
        })
      },
      intervalmonth(){
            var strStartDate = "";
            var strEndDate = "";
            var dStartDate = "";
            var dEndDate = "";
            var IntervelYear = "";
            var IntervelMonth = "";
            var IntervelDate = "";
            strEndDate = this.endDate
            strStartDate = this.startDate
            if(!this.$uiCommon.isEmpty(this.endDate)&&!this.$uiCommon.isEmpty(this.startDate)){
                dStartDate = new Date(this.$uiCommon.replace(strStartDate,"-","/"));
                dEndDate = new Date(this.$uiCommon.replace(strEndDate,"-","/"));
                IntervelYear = dEndDate.getYear()-dStartDate.getYear();
                IntervelMonth =  dEndDate.getMonth()+12*IntervelYear -dStartDate.getMonth();
                IntervelDate = dEndDate.getDate()-dStartDate.getDate();
                if (IntervelDate>=0){
                    IntervelMonth = IntervelMonth+1;
                }
                this.IntervalMonth=IntervelMonth;
            }
            if ( this.IntervalMonth == "NaN") this.IntervalMonth="";
        },
         checkStartDateForCermical() {
             
            if(this.startDate==null||this.startDate==''){
                this.endDate = ''
                this.$alert('投保日期不能为空!!!','保险期间',{ type:'warning'})
                return false;
            }else{
                this.endDate = this.$uiCommon.getNextDateFullDate(this.$uiCommon.getNextYearFullDate(this.startDate,1),-1);    
            }
        },
        checkEndDateForCermical() {
            if(this.$uiCommon.isEmpty(this.endDate)||this.$uiCommon.isEmpty( this.startDate))return true;
            if(this.$uiCommon.compareFullDate(this.endDate,this.startDate)<0)
            {
              this.$alert("终保日期不能早于起保日期!!!",'保险期间',{type:'warning'});
              this.endDate=''
              return false;
            }
        },
         setEndHour()
        {
            if(this.$uiCommon.isInteger(this.startHour))
            {
                if(parseInt(this.startHour,10)==0){
                    this.endHour = "24";
                }else{
                    this.endHour = parseInt(this.startHour,10)%24;
                }
            }
        },
        parseTime(date,a) {
            var Month;
            if(date.getMonth() + 1<10){
               Month="0"+(date.getMonth() + 1)

            }else{
               Month=(date.getMonth() + 1)+"";
            }   
            const newDate = date.getFullYear() + '-' +Month + '-' + date.getDate();
                if(a=="startDate"){
                     this.startDate=newDate
                }else{
                      this.endDate=newDate
                }
        },
        changetime(){
                this.$store.state.startDate=this.startDate;
                this.$store.state.endDate=this.endDate;
                this.$store.state.startHour=this.startHour;
                this.$store.state.endHour=this.endHour;
        },
        checkOperateDate(){
            // if(this.$uiCommon.compareFullDate(this.operateDate,this.signDate)>0)
            // {
            //     this.$alert('投保日期不能晚于制单日期!!!','保险期间',{ type:'warning'})
            //     return false;

            // }
        }
    }
}