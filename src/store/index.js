import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
var Store =  new Vuex.Store({
  state:{
      //存放组件之间共享的数据
      initStatus:0,//用来控制初始化数据是否成功状态
      onlyStatus:false,//用来控制element ui日期控件是否只读
      proposalNo:'',//投保单单号
      policyNo:'',//保单单号
      certiType:'',//操作类型
      bizType:'',//业务类型
      businessKind:'00', //业务种类
      userCode:'0000049',
      comCode:'',//机构代码
      riskCode:'2244',//险种代码
      editType:"NEW",//批改类型
      endorType:'P',//P投保单，E批单
      coinsFlag:'0',//联共保标志
      agriType:'0',
      channelType1:'',              //一级业务来源
      refreshFlagReins:'0',         //刷新分入业务标志
      refreshFlagFee:'0',           //刷新币别标志
      refreshFlagAgri:'0',          //刷新涉农标志
      refreshFlagAgent:'0',         //刷新代理标志
      refreshFlagCoins:'0',         //刷新联共保标志
      refreshFlagPerformance:'0',   //刷新绩效费用标志
      startDate:'',
      endDate:'',
      startHour:'0',
      endHour:'24',
      validDate:'',        //批改生效日期
      validHour:'',        //批改生效小时
      sumAmount:'10000.00',//原币保额
      sumPremium:'500.00', // 原币保费
      sumPremium1:'0',     //支付币别保费
      sumAmount1:'0',      //支付币别保额
      sumPremium2:'0',     //汇总币别保费
      sumAmount2:'0',     //汇总币别保额
      currency1Fee:'',     //支付币别
      currency2Fee:'',     //汇总币别
      nonCarJfeeflag:'0',  //见费标志
      test:'',
      underWriteFlag:'',//核保标志
      othFlag:'',//其他标志
      endroseContent:'',//批文内容
      originalPolicy:{
        mainInfoVo:{},
        appliInfoVo:{},
        itemKindInfoVos:[],
        handlerInfoVos:[],
        insuredInfoVos:[],
        constructInfoVo:{},
        guaranteeInfoVo:{},
        guaranteeSubInfoVos:[],
        performanceObligorInfoVos:[],
        feeInfoVos:[],
        planInfoVos:[],
        engageInfoVos:[],
        agentInfoVos:[],
        subSidyInfoVos:[],
        coinsInfoVos:[],
        coinsDetailInfoVos:[],
        reinsCededInfoVo:{},
        reinsBrokerInfoVos:[]
      }
  },
   mutations:{
      //显式的更改state里的数据
      modify(state,val){
        state.editType= val;
      },
      modifyCoinsFlag(state,val){
        state.coinsFlag= val;
      },
      modRefreshFlagCoins(state,val){
        state.refreshFlagCoins= val;
      },
      modifyStartDate(state,val){
        state.startDate= val;
      },
      modifyEndDate(state,val){
        state.endDate= val;
      },
      modifyStartHour(state,val){
        state.startHour= val;
      },
      modifyEndHour(state,val){
        state.endHour= val;
      }
   },
   getters:{
       getEditType(){return state => state.editType}
   },
   actions:{
       //
   }
});
export default Store