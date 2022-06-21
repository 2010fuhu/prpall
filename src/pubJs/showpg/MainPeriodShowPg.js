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
        signDate:'',
      }
    },
    methods:{
      show(){this.isShow =!this.isShow;
      },
      initPeriodData(orderData){
        this.startDate=this.$uiCommon.replace(orderData.endorseDataVo.mainInfoVo.startDate,"/","-")
        this.endDate=this.$uiCommon.replace(orderData.endorseDataVo.mainInfoVo.endDate,"/","-")
        this.startHour=orderData.endorseDataVo.mainInfoVo.startHour
        this.endHour=orderData.endorseDataVo.mainInfoVo.endHour
        this.operateDate=orderData.endorseDataVo.mainInfoVo.operateDate
        this.signDate=orderData.endorseDataVo.mainInfoVo.signDate
        this.intervalmonth1()
      },
        intervalmonth1(){
            var strStartDate = "";
            let strEndDate = "";
            let dStartDate = "";
            let dEndDate = "";
            let IntervelYear = "";
            let IntervelMonth = "";
            let IntervelDate = "";
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
            }else{ 
                this.IntervalMonth="";
            }
        },
        intervalmonth(){},
        checkStartDateForCermical(){ },
        checkEndDateForCermical(){},
        setEndHour(){},
        parseTime() {},
        changetime(){},
    }
}