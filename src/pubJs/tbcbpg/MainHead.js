import  PubSub from 'pubsub-js'
import  getselectbusinessinfo from '@/api/getselectbusinessinfo.js'
import  initBaseData from '@/api/initBaseData.js'
   export default { 
        name:'polibisinfo1',
        data(){
          return{
            isShow:true,
            riskName:'农民工工资支付履约保证保险',
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
        created(){
             PubSub.subscribe('searchAppiInsured', (event, data) => {
              this.riskName=data
          })
        },
        computed:{
          tdRiskNameFormTitle(){
              let iskNameFormTitle='';
              if(this.$store.state.editType=="NEW"){
                    iskNameFormTitle= "投保单（新保，录入）";
              }else if(this.$store.state.editType=="COPY_PROPOSAL"){
                     iskNameFormTitle= "投保单（复制，录入)";
              }else if(this.$store.state.editType=="COPY_POLICY"){
                     iskNameFormTitle= "保单（复制，录入）";
              }else if(this.$store.state.editType=="RENEWAL"){
                     iskNameFormTitle= "保单（续保，录入）";
              }   
              return iskNameFormTitle;
          },
          
        }, 
        watch: {
            channelType1: {//当一级业务来源 为92时
                handler(newVal) {
                  this.$store.state.channelType1=newVal
                },
                immediate: true
            },
            agriType: {//监听涉农标志
                handler(newVal) {
                  this.$store.state.agriType=newVal
                },
                immediate: true
            },
             handlerCode:{
                 handler(newVal) {
                  this.Handler1CodeVoList.forEach((item)=>{
                     if(item.handlerCode==newVal){ this.handlerName=item.handlerName}
                  })
                },
                immediate: true
             },
             businessKind:{
              handler(newVal) {
                 this.$store.state.businessKind=newVal
              },
              immediate: true
             }
	      }, 
        methods:{
          show(){
              this.isShow=!this.isShow
          },
           addHandlerData() {
            if(this.handlerInfoVo.length==0&&this.comCode!=''&&this.handlerCode!=''){
               this.handlerInfoVo.push({comCode:this.comCode,handlerCode:this.handlerCode,
               professionalNo:'',perforPercentage:'100',Handler1CodeVoList:this.Handler1CodeVoList});
            }else{
               this.handlerInfoVo.push({comCode:'',handlerCode:'',professionalNo:'',perforPercentage:'',Handler1CodeVoList:[]});
            }
          },
          //移除表格  参数为表格索引
          delHandlerData(index) {
               this.handlerInfoVo.splice(index,1);
          },
          initOpitons(data){
            this.policySortInfoVoList=data.policySortInfoVoList;
            this.businessKindInfoVoList=data.businessKindInfoVoList;
            this.departmentInfoVoList=data.departmentInfoVoList;
            if(this.$store.state.comCode.substring(0,2)=='31'){
              this.roadBranchInfoVoList=data.roadBranchInfoVoList
            }
            if(this.$route.path=='/reinsMain'){
                for(let item of data.businessNatureInfoVoList){
                    if(item.businessnature=='h'){
                      this.businessNatureInfoVoList.push(item)
                    }
                }
            }else{
              for(let item of data.businessNatureInfoVoList){
                if(item.businessnature!='h'){
                  this.businessNatureInfoVoList.push(item)
                }
              }
            }
            //this.businessNatureInfoVoList=data.businessNatureInfoVoList
          },
          async initMainHeadData(obj){//投保单保单查询 时候调用的方法
            try{
              this.handlerInfoVo=[]
              if(this.$store.state.certiType=='U'){
                  for(let item of obj.handlerInfoVos){
                    this.handlerInfoVo.push({
                      comCode:item.comCode,
                      handlerCode:item.handlerCode,
                      professionalNo:item.professionalNo,
                      perforPercentage:item.perforPercentage,
                      Handler1CodeVoList:[]});
                  }
                  for(let i=0;i<this.handlerInfoVo.length;i++){
                    let item=this.handlerInfoVo[i]
                    await this.getselecthandlerinfoU(item.comCode,i)
                  }
              }   
              this.policySort=obj.mainInfoVo.policySort;
              this.language=obj.mainInfoVo.language;
              this.businesskind=obj.mainInfoVo.businessKind;
              this.coinsFlag=obj.mainInfoVo.coinsFlag;
              this.changeCoinsFlag();
              this.agriType=obj.mainInfoVo.agriType;
              this.shareHolderFlag=obj.mainInfoVo.shareHolderFlag;
              //this.businessModeCode=obj.mainInfoVo.businessModeCode
              this.channelType1=obj.mainInfoVo.channelType1;
              this.channelType2=obj.mainInfoVo.channelType2;
              this.agentCode=obj.mainInfoVo.agentCode==null?'':obj.mainInfoVo.agentCode;
              this.comCode=obj.mainInfoVo.comCode;
              this.roadBranchCode=obj.mainInfoVo.roadBranchCode;
              this.$store.state.underWriteFlag=obj.mainInfoVo.underWriteFlag;
              this.$store.state.othFlag=obj.mainInfoVo.othFlag;
              if(this.$store.state.editType=='RENEWAL'){
                  this.oldPolicyNo=obj.mainInfoVo.policyNo
                  this.renewal='续保'
              }else{
                  this.oldPolicyNo=''
                  this.renewal='非续保'
              }
              await this.getselectbusinessinfo("1",true);
              await this.getselectbusinessinfo("2",true);
              this.channelType3=obj.mainInfoVo.channelType3;
              if((this.channelType1=='91'&&this.channelType3.substring(0,2)!='05')||this.channelType1=='h'){
                  this.agentCode=''; 
                  this.agreementNo=''; 
                  this.businessAgentInfoVoList=[];
                  this.businessAgentagreementNoList=[];
                  this.AgentCodeShow=false;
                  this.AgreementNoShow=false;
              }else{
                  await this.getselectagentinfo1()
                  if(this.channelType1=='92'||this.channelType1=='93'){
                    this.getselectagentAgreementNo(1)
                  }
              }
              await this.getselecthandlerinfo(this.comCode,-1)
              this.handlerCode=obj.mainInfoVo.handlerCode
            }catch(error) {
                 console.log(error.message)
            }
          },
 
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
          getselectbusinessinfo(codeLevel,flag){
            let code='';
            if(codeLevel=='1'){
              code=this.channelType1
              if(typeof(flag) == "undefined"){
                this.channelType2='';
                this.businessChannelInfoVoList=[];
                this.channelType3='';
                this.businessAgentTypeInfoVoList=[];
                //同时判断选择的是否直销渠道，判断是否需要隐藏代理人下拉框 和代理协议
                if(this.channelType1!='91'&&this.channelType1!='h'){
                  this.AgentCodeShow=true;
                  this.AgreementNoShow=true;
                }else{
                  this.AgentCodeShow=false;
                  this.AgreementNoShow=false;
                }
                  this.businessAgentInfoVoList=[];
                  this.businessAgentagreementNoList=[];
                  this.agentCode='';
                  this.agreementNo='';
              } 
            }else{
              code=this.channelType2
              if(typeof(flag) == "undefined"){
                this.channelType3=''   
                this.businessAgentTypeInfoVoList=[];
                this.agentCode=''; 
                this.agreementNo=''; 
                this.businessAgentInfoVoList=[];
                this.businessAgentagreementNoList=[];
              }
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
          getselectagentinfo1(){ //获取代理人以及代理人对应的协议 选择三级业务来源
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
                  }
            }).catch(()=>{})
            },
            async  getselectagentinfo(){ //获取代理人以及代理人对应的协议 选择三级业务来源
                 if((this.channelType1=='91'&&this.channelType3.substring(0,2)!='05')||this.channelType1=='h'){
                      console.log("");
                 } else {
                  if(this.comCode==""){
                      this.$alert('请选择经办部门!!!.','保单业务信息',{ type:'warning'});
                      this.channelType3=''
                      return false;
                  }else{
                  await  getselectbusinessinfo.getselectagentinfo(this.comCode, this.$store.state.riskCode,this.channelType3).then(response => {
                      let data = response.data.data 
                      if(response.status==200){
                            this.agentCode='';
                            this.agreementNo='';
                            this.businessAgentInfoVoList=[];
                            this.AgentagreementNoList=[];
                            //this.businessAgentInfoVoList=data;
                            let map = new Map();
                            for (let item of data) {
                                if (!map.has(item.agentCode)) {
                                    map.set(item.agentCode, item);
                                }
                            } 
                            console.log([...map.values()])
                            this.businessAgentInfoVoList=[...map.values()]
                            this.AgentagreementNoList=data;
                      }
                    }).then(()=>{
                        if(this.channelType1=='91'&&this.channelType3.substring(0,2)=='05'){
                          this.AgentCodeShow=true;
                          this.AgreementNoShow=false;
                        }else if(this.channelType1=='92'||this.channelType1=='93'){
                          this.AgentCodeShow=this.AgreementNoShow=true;
                        }else{
                          this.AgentCodeShow=this.AgreementNoShow=false;
                        }

                    })
                  }
                 }
            },
          //选择代理人 获取代理对应的代理协议
          getselectagentAgreementNo(flag){
            //1判断是否录入经办部门
              if(this.comCode==''&&typeof(flag) == "undefined"){
                this.$alert('请选择经办部门!!!.','保单业务信息',{ type:'warning'});
                return false;
              }
              this.businessAgentagreementNoList=[]
              this.agreementNo='';
              this.AgentagreementNoList.forEach((element)=>{ 
                  if(element.agentCode==this.agentCode){
                        this.businessAgentagreementNoList.push(element.agreementNo);
                  }
                }) 
          },
          getselecthandlerinfo(comCode,index){//获取机构对应的经办人员
            console.log(comCode)
            return new Promise((resolve,reject)=>{
               if(index==-1){
                 this.Handler1CodeVoList=[];
                 this.handlerCode='';
               }else{
                 
                 this.handlerInfoVo[index].Handler1CodeVoList=[]
                 this.handlerInfoVo[index].handlerCode=''
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
       getselecthandlerinfoU(comCode,index){//获取机构对应的经办人员 在进行投保单修改得时候
          return new Promise((resolve,reject)=>{
            initBaseData.getselecthandlerinfo(comCode).then(res=>{
              let data = res.data.data 
              if(res.status==200){
                  resolve(data)
              }else{
                  reject()
              }
            }) 
          }).then((data)=>{
              this.handlerInfoVo[index].Handler1CodeVoList=data
          }).catch(()=>{ return false })  
        } ,
          //校验mainHead 数据是否录入
          checkMainHead(){
            return new Promise((resolve)=>{
                if(this.checkPerforPercentage()){
                    this.$validator.validate().then(result => {
                      if (!result) {
                        this.$alert(this.errors.all()[0],'保单业务信息',{type:'warning'});  // ui框架的提示弹窗         
                        resolve(false);
                      }else{
                        resolve(true)
                      }
                    })
                }else{
                  resolve(false);
                }
             })
          },
          checkPerforPercentage(){
               if(this.handlerInfoVo.length<=0){
                  this.$alert("请录入归属业务员业绩分成比例!!!.",'保单业务信息',{ type:'warning'})
                  return false;
               }else{
                 let sumPerforPercentage=0;
                 for(let Handleritem of this.handlerInfoVo){
                       if(Handleritem.comCode==""){
                           this.$alert("请录入归属机构!!!.",'保单业务信息',{ type:'warning'})
                           return false;
                        }
                        if(Handleritem.handlerCode==''){
                           this.$alert("请录入归属业务员!!!.",'保单业务信息',{ type:'warning'})
                           return false;
                        }
                        if(Handleritem.perforPercentage==''){
                           this.$alert("业绩分成比例有空的数据!!!.",'保单业务信息',{ type:'warning'})
                           return false;   
                        }else{
                          if(parseFloat(Handleritem.perforPercentage)>100||parseFloat(Handleritem.perforPercentage)<1){
                            this.$alert("业绩分成比例应当在1-100之间!!!.",'保单业务信息',{ type:'warning'})
                            return false;       
                          }
                        }
                           sumPerforPercentage+=parseFloat(Handleritem.perforPercentage);
                 }
               
                if(sumPerforPercentage!=100){
                    this.$alert("业绩分成比例合计应为100!!!.",'保单业务信息',{ type:'warning'})
                    return false;
                }
               }
               return true;
          },
          //选择协议的时候需要重新计算手续费 删除之前计算好的手续费
          clearOfdeleteAllRows(){},
          changeComCode(){},
          changeShareHolderFlag(){},//是否是股东业务
        }
  }