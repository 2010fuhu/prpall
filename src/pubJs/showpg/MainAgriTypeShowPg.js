export default{
    data(){
      return { 
           AgriNature:'',
           subSidyInfoVoList:[],
           orginSubSidy:new Map()
       }
    },
      props:{
      //   接受父组件传的值
        isAgriChildShow:{
            type:Boolean
        },
    },
    created(){},
    updated(){
      if(this.isAgriChildShow){
        this.setReadOnly()
      }
    },
    methods:{
        okCallback(){
            this.$emit('closeAgri')
        },
        cancelCallback(){
            this.$emit('closeAgri')
        },
        initMainAgriData(orderData){
            let orginList=orderData.originDataVo.subSidyInfoVos
            let newList=orderData.endorseDataVo.subSidyInfoVos
            if(orginList.length>0){
              orginList.forEach((item)=>{
                this.orginSubSidy.set(item.serialNo,item)
              })
            }
            if(newList.length>0){
              newList.forEach((item)=>{
                item.flag=this.orginSubSidy.get(item.serialNo)?this.orginSubSidy.get(item.serialNo).flag:''
                this.subSidyInfoVoList.push(item)
              })
            }
            let s =new Set();
            this.subSidyInfoVoList.forEach((item)=> s.add(item.subSidySort))
            if(s.has("1")){
              this.AgriNature='中央财政性'
            }else if(s.has("2")||s.has("3")){
              this.AgriNature='地方财政性'
            }else{
              this.AgriNature='商业性'
            }
            this.$nextTick(()=>{
              this.subSidyInfoVoList.forEach((item,index)=>{
                 if(item.flag){
                     for(let key in item){
                         if(this.$refs[key]){
                           if(this.$refs[key][index]){
                             this.$refs[key][index].title=item[key]
                           }
                         }
                     }
                 }else{
                  for(let key in item){
                    if(this.$refs[key]){
                      if(this.$refs[key][index]){
                        this.$refs[key][index].title=this.orginSubSidy.get(item.serialNo)[key]
                      }
                    }
                  }
                 }
              })
            })
        },
        setReadOnly(){
          this.$uiCommon.setContainerReadonly(this.$refs.SubSidy,true)
        },
        insertSubSidy(){},
        deleteSubSidy(){},
        checkSubSidySort(){},
        countSubSidyPremium(){},
        checkSubSidy(){},
  
      }
 }    