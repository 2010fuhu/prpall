import underwrt from '@/json/underwrt.json'
import underwrApi from '@/api/underwrtAndGenerate.js'
class undwrtInfoVo{
    constructor(){
        this.businessID=0,
        this.businessNo='',
        this.businessTable='prptmain',
        this.businessType="T",
        this.comCode="",
        this.curName="UnderwriteOne",
        this.flag='1',
        this.inKey='',
        this.makeCom=''
        this.riskCode='',
        this.userCode='',
        this.valid='1'

    }
}

export default ({
    data(){
        return {
              
        }
    },
	methods:{
		submitFormProposal(){
			this.$router.go(-1);
		},
        
		submitApproveNew(arg){
            underwrt.undwrtMainInfoReq.undwrtInfoReqList=[];
            if(arg=='1'){
                let undwrtinfo=new undwrtInfoVo()
                undwrtinfo.businessNo=this.$store.state.bizType=='ENDORSE'?this.$route.query.endorseNo:this.$route.query.proposalNo
                undwrtinfo.businessTable=this.$store.state.bizType=='ENDORSE'?'prppmain':'prptmain'
                undwrtinfo.businessType=this.$store.state.bizType=='ENDORSE'?'E':'T'
                undwrtinfo.comCode=this.$store.state.comCode
                undwrtinfo.inKey=this.$store.state.bizType=='ENDORSE'?this.$route.query.endorseNo:this.$route.query.proposalNo
                undwrtinfo.makeCom=this.$store.state.comCode
                undwrtinfo.riskCode=this.$store.state.riskCode
                undwrtinfo.userCode=this.$store.state.userCode
                underwrt.undwrtMainInfoReq.undwrtInfoReqList.push(undwrtinfo)
             }else{
                underwrt.undwrtMainInfoReq.undwrtInfoReqList=[]
             }
            //组织reqHeader
            let day = new Date();
            day.setTime(day.getTime());
            underwrt.reqHeader.transDate=this.$uiCommon.getCurrentDate()
            underwrt.reqHeader.transTime=this.$uiCommon.getCurrentTime()
            underwrt.reqHeader.transNo=this.$uiCommon.uuid()
            this.underwrtF(underwrt)
		},
        underwrtF(obj){
            return new Promise((resolve,reject)=>{
                underwrApi.underwrt(obj).then((res)=>{
                        if(res.data.resHeader.errCode=='000'){
                            resolve(res.data.underWritingResponseMainVo.message)
                        }else{
                            reject(res.data.underWritingResponseMainVo.message)
                        }
                })
            }).then((message)=>{
                this.$router.push( {path: '/UnderwriteSubmit',query: {status:'success',message:message }})
            }).catch((err)=>{
                this.$router.push( {path: '/UnderwriteSubmit',query: {status:'failure',message:err}})
            })
        }
	}
	
})