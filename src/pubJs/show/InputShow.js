import initBaseData  from '@/api/initBaseData' 
import Order  from '@/api/queryOrderList' 
import MainHead from '@/views/commonship/MainHead.vue'
import AppliInsured from '@/views/commonship/MainAppliInsured.vue'
import MainInsured from '@/views/commonship/MainInsured.vue'
import MainPeriod   from '@/views/commonship/MainPeriod.vue'
import MainConstruct from '@/views/commonship/MainConstruct.vue'
import MainLoan from '@/views/2244/MainLoan.vue'
import MainPerformance from '@/views/commonship/MainPerformanceObligor.vue'
import MainItemkind    from '@/views/2244/MainItemkind.vue'
import MainDeductible  from '@/views/commonship/MainDeductible.vue'
import MainFee  from '@/views/commonship/MainFee.vue'
import MainPlan from '@/views/commonship/MainPlan.vue'
import MainEngage from '@/views/commonship/MainEngage.vue'
import MainExpernses from '@/views/commonship/MainExpenses.vue'
import MainCoins from '@/views/commonship/MainCoins.vue'
import MainReins from '@/views/commonship/MainReins.vue'
import MainAgriType from '@/views/commonship/MainAgriType.vue'

export default {
  name: 'proposalno',
  components: {
    MainHead,
    AppliInsured,
    MainInsured,
    MainPeriod,
    MainConstruct,
    MainLoan,
    MainPerformance,
    MainItemkind,
    MainDeductible,
    MainFee,
    MainPlan,
    MainEngage,
    MainExpernses,
    MainCoins,
    MainReins,
    MainAgriType,
  },
  data(){
          return{
            isShow:false,
            isloading:false,
            isCoinsShow:false,
            isCoinschildShow:false,
            isReinsShow:false,
            isReinsChildShow:false,
            isAgriShow:false,
            isAgriChildShow:false,
            editType:'NEW',//编辑类型 时投保单 还是批单
            binNo:'',
            MainRemark_Show:'',
            judicalScope:"中华人民共和国管辖",
            argueSolution:'1',
            arbitraryBoardList:[],
            argueShow:false,
            //arbitBoardName:'A01',
            obj:{}
          }
        },
         created(){
            //1
            //2 从承保系统进去该系统时 获取地址栏后参数 判断时投保单录入还是普通批改录入
            //this.editType= this.$route.query.editType
            this.loaded();//这个是父组件的加载罩
            //this.$nextTick(() => {//拿到后端数据
            this.initData()
            //});
          },
        methods:{
          show(){
           this.isShow=!this.isShow;
          },
          loaded(){
              this.isloading=!this.isloading
          },
          coinsReinsAgriShow(e){
              if(e.target.name=='btCoins'){
                this.isCoinschildShow = true
              }else if(e.target.name=='btReins'){
                this.isReinsChildShow =true
              }else{
                  this.isAgriChildShow=true
              }
          },
          closeCoins(){
              this.isCoinschildShow=false;
           },
          closeReins(){ 
              this.isReinsChildShow=false;
          },
          closeAgri(){ 
            this.isAgriChildShow=false;
          },
          async initData(){
            let orderData=await this.initOrderData()
            this.binNo=this.$route.query.businessNo
            let comCode=orderData.mainInfoVo.comCode
            let data =await this.fetchData(comCode)
            console.log("接口调用成功开始初始化工作")
            this.$refs.MainHead.initOpitons(data);
            this.$refs.AppliInsured.initOpitons(data);
            this.$refs.Insured.initOpitons(data);
            this.$refs.MainItemkind.initSelected(data);
            this.$refs.MainFee.initSelected(data);
            this.$refs.MainEngage.initSelected(data); 
            this.arbitraryBoardList=data.arbitraryBoardList//仲裁方式
            await  this.$refs.MainHead.initMainHeadData(orderData)
            await  this.$refs.AppliInsured.initAppliInsuredData(orderData)
            this.$refs.Insured.initInsuredData(orderData)
            this.$refs.MainPeriod.initPeriodData(orderData)
            this.$refs.MainConstruct.initMainConstructData(orderData)
            this.$refs.MainLoan.initMainLoanData(orderData)
            this.$refs.MainPerformance.initPerFormanceData(orderData)
            this.$refs.MainItemkind.initMainItemkindData(orderData)
            this.$refs.MainFee.initMainFeeData(orderData)
            this.$refs.MainDeductible.initMainDeductibleData(orderData)
            this.$refs.MainPlan.initMainPlanData(orderData)
            this.$refs.MainEngage.initEngageData(orderData)
            this.$refs.MainExpernses.initExpernsesData(orderData)
            this.obj=orderData.mainInfoVo
            if(this.obj.argueSolution=='2'){
               this.argueShow=true
            }
            if(this.$store.state.agriType=='1'){
              //this.isAgriShow=true;
              this.$refs.MainAgri.initMainAgriData(orderData)
            }
             if(this.$store.state.coinsFlag!='0'){
              //this.isCoinsShow=true;
              //console.log(this.isCoinschildShow)
              this.$refs.MainCoins.initMainCoinsData(orderData)
            }
            if(this.$store.state.channelType1=='h'){
              //this.isReinsShow=true
              this.$refs.MainReins.initMainReinsData(orderData)
            }
            this.$nextTick(() => {//拿到后端数据
            this.setOnly()
            //设置只读
            this.loaded();
            })
          },
          fetchData(comCode){
                return  new Promise((resolve,reject)=>{
                    initBaseData.getSelsetData(this.$store.state.riskCode, 
                      comCode, this.$store.state.userCode).then(res => {
                    let data=res.data.data;
                    if(res.status==200){
                        resolve(data)
                    }else{
                        reject('错误')
                    }
                    })
                }).catch(msg=>{
                  console.log(msg)
                })
          },
          initOrderData(){
              return  new Promise((resolve,reject)=>{
                console.log("投保单查询单号----")
                console.log(this.$route.query.businessNo)
                console.log("投保单查询单号----")
                if(this.$route.query.bizType=='proposal'){
                    Order.findProposalInfo(this.$route.query.businessNo).then(res => {
                      let data=res.data;
                      if(res.status==200){
                          resolve(data)
                      }else{
                          reject("调用投保单号查询报错")
                      }
                    }).catch((err)=>{
                          console.log(err)
                    })
                  }else if(this.$route.query.bizType=='policy'){
                    Order.findPolicyInfo(this.$route.query.businessNo).then(res => {
                      let data=res.data;
                      if(res.status==200){
                          resolve(data)
                      }else{
                          reject("调用投保单号查询报错")
                      }
                    }).catch((err)=>{
                          console.log(err)
                    })
                  }    
            })
          },
          setOnly(){
            this.$uiCommon.setContainerReadonly(this.$el,true)
            this.$store.state.onlyStatus=true;
          },
          cancelForm(){}
  }
}
  