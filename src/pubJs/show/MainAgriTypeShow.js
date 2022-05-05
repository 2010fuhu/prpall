export default{
    data(){
      return { 
           AgriNature:'',
           subSidyInfoVoList:[],

       }
    },
      props:{
      //   接受父组件传的值
        isAgriChildShow:{
            type:Boolean
        },
    },
    created(){},
    methods:{
        okCallback(){
            this.$emit('closeAgri')
        },
        cancelCallback(){
            this.$emit('closeAgri')
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
            this.setReadOnly()
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