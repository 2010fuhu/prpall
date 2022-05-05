import    coinscodeinfo   from '@/api/getselectcoinscodeinfo.js';
export default{
    name :"coinsReins",
    data(){
          return{
            CoinsReinsShow:false,
            imgUrl:require('@/assets/images/markMustInput.jpg'),
            //coinsInfoVoList:[], 
          }
    },
    props:{
        coinsCodeInfoVoList:{
            type:Array
        },
        coinsInfoVoList:{
            type:Array
        }
    },
    methods:{
        showPage(){
            this.CoinsReinsShow=!this.CoinsReinsShow;
        },
        changeReinsCoinsFlag(){},
        getMainAddedTaxRate(index){
           if(this.coinsInfoVoList[index].coinsFlag=='1'){
                    let coinsCode=this.coinsInfoVoList[index].coinsCode
                    return  new Promise((resolve,reject)=>{
                    coinscodeinfo.getreinstaxrate(coinsCode,'MainTaxRate').then(res=>{
                    let data=res.data.data;
                    if(res.status==200){
                        resolve(data)
                    }else{
                        reject(data)
                    }
                    })
                }).then((val)=>{
                    if(val!=''){
                        this.$parent.reinsCededInfoVo.addedTaxRate=val;
                    }else{
                        this.$parent.reinsCededInfoVo.addedTaxRate='0.0000'
                    }
                })
            }
        
        },//获取主承保人得税率 对应得服务端得税率
       async calculateAddexTax(index){
         await   this.getMainAddedTaxRate(index);
           this.$parent.$refs.mainReinsRef.calculateAddexTaxFee();   
           this.$parent.$refs.mainReinsRef.taxFeeRate();   
           this.$parent.$refs.mainReinsRef.agentSignedFeeRate();  
           this.$parent.$refs.mainReinsRef.operateFeeRate(); 
           this.$parent.$refs.mainReinsRef.inDisPremium1(); 
        },
        calculateInAmount(index){
            console.log(index);
        },
        deleteCoinsReinsCi(index){ 
            this.coinsInfoVoList.splice(index,1);
        },
        insertCoinsReinsCi(){
            if(this.coinsInfoVoList.length<=0){
                this.coinsInfoVoList.push({
                    serialNo:'',
                    mainPolicyNo:'',
                    mainProposalNo:'',
                    coinsType:'1',
                    chiefFlag:'',
                    coinsCode:'',
                    coinsName:'',
                    coinsRate:'',
                    coinsFlag:'1',
                    reinscifFlag:'',
                    proportionFlag:'',
                    billType:'',
                    flag:''
                });
            }else{
                this.coinsInfoVoList.push({
                    serialNo:'',
                    mainPolicyNo:'',
                    mainProposalNo:'',
                    coinsType:'2',
                    chiefFlag:'',
                    coinsCode:'',
                    coinsName:'',
                    coinsRate:'',
                    coinsFlag:'0',
                    reinscifFlag:'',
                    proportionFlag:'',
                    billType:'',
                    flag:''
                });


            }
        },   
        addCoinsReinsInfo(){}


    }
}