import  getselectbusinessinfo from '@/api/getselectbusinessinfo.js'
import  initBaseData from '@/api/initBaseData.js'
   export default { 
        name:'polibisinfo1',
        data(){
          return{
            isShow:true,
            riskName:'农民工工资履约保证保险',
            imgUrl:require('@/assets/images/markMustInput.jpg'),
            comCode:'',
            policySort:'1',//保单种类
            businessKind:'00',//业务种类
            businessModeCode:'G',//业务模式
            shareHolderFlag:'0',//是否股东业务标识
            coinsFlag:'0',//联保保标志
            agriType:'0',//涉农标志
            oldPolicyNo:'',//续保单号
            language:'C',
            renewal:'非续保',
            AgentCodeShow:false,//代理人、协议是否展示
            AgreementNoShow:false,
            handlerInfoVo:[],
            policySortInfoVoList:[],//保单种类select
            businessKindInfoVoList:[],//业务种类select
            departmentInfoVoList:[],// 归属机构select
            handlerCode:'',//经办人员\
            handlerName:'',//经办人员名称
            Handler1CodeVoList:[],//经办人员
            channelType1:'',//业务来源代码
            channelType2:'',//二级业务来源 
            channelType3:'',//三级业务来源
            agentCode:'',//代理人代码
            agreementNo:'',//代理人协议
            businessNatureInfoVoList:[],//业务来源select
            businessChannelInfoVoList:[],//二级业务来源select
            businessAgentTypeInfoVoList:[],//三级业务来源select
            businessAgentInfoVoList:[],//代理人 select
            businessAgentagreementNoList:[],//代理协议数组  select
            AgentagreementNoList:[],
            roadBranchCode:'',//路支行名称
            roadBranchInfoVoList:[],//路支行集合 
            comcodeDisable:'',
            comName1Disable:false,

          }
        },
        created(){},
        mounted(){},
        computed:{
          tdRiskNameFormTitle(){
              let bieTypeConcent=''
              let iskNameFormTitle='显示';
              let strStateName=''
              if(this.$route.query.bizType=="proposal")
                bieTypeConcent="投保单"
              else if(this.$route.query.bizType=="policy")
                bieTypeConcent="保单"
              else if(this.$route.query.bizType=="endorse")
                bieTypeConcent="批单"  
              if(this.$store.state.underWriteFlag=="1")
                strStateName = "核保通过";
              else if(this.$store.state.underWriteFlag=="2")
                strStateName = "核保不通过";
              else if(this.$store.state.underWriteFlag=="3")
                strStateName = "自动核保";
              else if(this.$store.state.underWriteFlag=="9")
                strStateName = "正待核保";
              if(this.$store.state.othFlag.length>0 &&
               (this.$store.state.othFlag.charAt(0)=='1'||this.$store.state.othFlag.charAt(0)=='2'))
                strStateName += "续保";
              else
                strStateName += "新保";
              if(this.$store.state.othFlag.length>1 &&this.$store.state.othFlag.charAt(1)=='1')
                strStateName += "被续保";
              if(this.$store.state.othFlag.length>2 &&this.$store.state.othFlag.charAt(2)=='1')
                strStateName += "已退保";
              if(this.$store.state.othFlag.length>3 && this.$store.state.othFlag.charAt(3)=='1')
                strStateName += "已注销";
              if(this.$store.state.othFlag.length>4 && this.$store.state.othFlag.charAt(4)=='1')
                strStateName += "已遗失";
              if(this.$store.state.othFlag.length>5 && this.$store.state.othFlag.charAt(5)=='1')
                strStateName += "已终止";
              if(this.policySort=="8")
                strStateName += "台帐";
              iskNameFormTitle+=`${bieTypeConcent}${strStateName}`  
              return iskNameFormTitle;
          }
        }, 
        methods:{
          show(){
              this.isShow=this.$uiCommon.showPage(this.isShow);
          },
          async initMainHeadData(obj){//投保单保单查询 时候调用的方法

            this.policySort=obj.endorseDataVo.mainInfoVo.policySort
            this.language=obj.endorseDataVo.mainInfoVo.language
            this.businesskind=obj.endorseDataVo.mainInfoVo.businessKind
            this.coinsFlag=this.$store.state.coinsFlag=obj.endorseDataVo.mainInfoVo.coinsFlag
            this.agriType=  this.$store.state.agriType=obj.endorseDataVo.mainInfoVo.agriType
            this.shareHolderFlag=obj.endorseDataVo.mainInfoVo.shareHolderFlag
            this.$store.state.proposalNo=obj.endorseDataVo.mainInfoVo.proposalNo
            this.$store.state.policyNo=obj.endorseDataVo.mainInfoVo.policyNo
            //this.businessModeCode=obj.mainInfoVo.businessModeCode
            this.channelType1=this.$store.state.channelType1=obj.endorseDataVo.mainInfoVo.channelType1
            this.channelType2=obj.endorseDataVo.mainInfoVo.channelType2
            this.agentCode=obj.endorseDataVo.mainInfoVo.agentCode
            this.comCode=obj.endorseDataVo.mainInfoVo.comCode
            this.roadBranchCode=obj.endorseDataVo.mainInfoVo.roadBranchCode
            this.$store.state.underWriteFlag=obj.endorseDataVo.mainInfoVo.underWriteFlag
            this.$store.state.othFlag=obj.endorseDataVo.mainInfoVo.othFlag
            this.renewal=this.$store.state.othFlag.substring(0,1)=='2'?'续保':'非续保'
            this.oldPolicyNo=obj.endorseDataVo.mainInfoVo.oldPolicyNo
            await this.getselectbusinessinfo("1")
            await this.getselectbusinessinfo("2")
            this.channelType3=obj.endorseDataVo.mainInfoVo.channelType3
            if((this.channelType1=='91'&&this.channelType3.substring(0,2)!='05')||this.channelType1=='h'){
              console.log("")
            }else{
              await this.getselectagentinfo()
              if(this.channelType1=='92'||this.channelType1=='93'){
                this.getselectagentAgreementNo()
                this.agreementNo=obj.endorseDataVo.mainInfoVo.agreementNo
              }
            }
            await this.getselecthandlerinfo(this.comCode,-1)
            this.handlerCode=obj.endorseDataVo.mainInfoVo.handlerCode
            this.handlerInfoVo=obj.endorseDataVo.handlerInfoVos
          },
    
          initOpitons(data){//初始化SELECTED 下拉框
            this.policySortInfoVoList=data.policySortInfoVoList;
            this.businessKindInfoVoList=data.businessKindInfoVoList;
            this.departmentInfoVoList=data.departmentInfoVoList;
            this.businessNatureInfoVoList=data.businessNatureInfoVoList
            if(this.$store.state.comCode.substring(0,2)=='31'){
              this.roadBranchInfoVoList=data.roadBranchInfoVoList
            }
          },
          changeComCode(){},
          changeShareHolderFlag(){},//是否是股东业务
          changeCoinsFlag()
          {
            if(this.coinsFlag!='0'){
              this.$store.commit('modRefreshFlagCoins',1)
            }else{
              this.$store.commit('modRefreshFlagCoins',0)

            }
            this.$store.commit('modifyCoinsFlag',this.coinsFlag)
          },
          //获取业务来源 二级来源和三级来源
          getselectbusinessinfo(codeLevel){
              let code='';
              if(codeLevel=='1'){
                  code=this.channelType1
              }else{
                  code=this.channelType2
              }
              return new Promise((resolve,reject)=>{
                  getselectbusinessinfo.getselectbusinessinfo(code, codeLevel).then(response => {
                    let data = response.data.data 
                    if(response.status==200){
                        if(codeLevel=='1'){
                          resolve(data.businessChannelInfoVoList)
                        }else if(codeLevel=='2'){
                          resolve(data.businessAgentTypeInfoVoList)
                        } 
                    }else{
                        reject()
                    }
                  })
              }).then((data)=>{
                  if(codeLevel=='1'){
                    this.businessChannelInfoVoList=data
                  }else if(codeLevel=='2'){
                    this.businessAgentTypeInfoVoList=data;
                  } 
              }).catch(()=>{})
          },
          getselectagentinfo(){ //获取代理人以及代理人对应的协议 选择三级业务来源
                return new Promise((resolve,reject)=>{
                     getselectbusinessinfo.getselectagentinfo(this.comCode, this.$store.state.riskCode,this.channelType3).then(response => {
                        let data = response.data.data 
                        if(response.status==200){
                          resolve(data)
                        }else{ 
                          reject()
                        }
                    })
                    }).then((data)=>{
                      this.businessAgentInfoVoList=data;
                      this.AgentagreementNoList=data;
                      if(this.channelType1=='91'&&this.channelType3.substring(0,2)=='05'){
                        this.AgentCodeShow=true;
                        this.AgreementNoShow=false;
                      }else if(this.channelType1=='92'||this.channelType1=='93'){
                        this.AgentCodeShow=true;
                        this.AgreementNoShow=true;
                      }else{
                        this.AgentCodeShow=false;
                        this.AgreementNoShow=false;
                      }
                }).catch(()=>{})
          },
          //选择代理人 获取代理对应的代理协议
          getselectagentAgreementNo(){
              this.businessAgentagreementNoList=[]
              this.AgentagreementNoList.forEach((element)=>{ 
                  if(element.agentCode==this.agentCode){
                        this.businessAgentagreementNoList.push(element.agreementNo);
                  }
                }) 
          },
          getselecthandlerinfo(comCode,index){//获取机构对应的经办人员
               return new Promise((resolve,reject)=>{
                  if(index==-1){
                    this.Handler1CodeVoList=[];
                    this.handlerCode='';
                  }else{
                    this.handlerInfoVo[index].Handler1CodeVoList=[]
                    this.handlerInfoVo[index].handlerCode1=''
                  }
                  initBaseData.getselecthandlerinfo(comCode).then(res=>{
                    let data = res.data.data 
                    if(res.status==200){
                        resolve(data)
                    }else{
                       reject()
                    }
                  }) 
               }).then((data)=>{
                      if(index==-1){
                          this.Handler1CodeVoList=data;
                      }else{
                          this.handlerInfoVo[index].Handler1CodeVoList=data
                      }
               }).catch(()=>{ return false })  
          } ,
          //校验mainHead 数据是否录入
          checkMainHead(){},
          checkPerforPercentage(){
          },
          //选择协议的时候需要重新计算手续费 删除之前计算好的手续费
          clearOfdeleteAllRows(){ 
          }
        }
  }