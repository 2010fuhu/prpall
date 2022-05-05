<template>
<div>
   <div v-html="concent" id="concent"> 
   </div>  
   <table class="common" align="center">
    <tr>
     <td class="button">
        <input class="longbutton" type="button" alt="返 回" value="返 回" onclick="parent.window.close();"/>
      </td>
    </tr>
  </table>
</div>
</template>
<script>
import proposal from '@/api/proposalOperation.js'
export default{
    props:['businessNo'],
    data(){
        return{
            concent:''
        }
    },
    created(){
        this.$nextTick(() => {
            this.loadForm().then((val)=>{
                this.setStyle(val)

            }).catch(err=>{
                console.log(err)
            })
        });
    },
    methods:{
        loadForm(){
          return new Promise((reslove,reject)=>{
            let businessNo=this.$route.query.businessNo
            proposal.showOpinion(businessNo).then((res)=>{
                if(res.data.code=='0000'){
                    reslove(res.data.value)
                }else{
                    reject(res.data.msg)
                }
            })
          }) 
        },
        setStyle(val){
            document.getElementById("concent").innerHTML=val
            let tabList=["showOpinoin_tab","showNotPassReasonOpinoin_tab"];
            for(let k=0;k<tabList.length;k++){
                let elements;
                    let node;
                    let rowsCount = 0;
                    let i = 0;
                    document.getElementById(tabList[k]).className = "common";
                    document.getElementById(tabList[k]).cellpadding = "3";
                    document.getElementById(tabList[k]).cellspacing = "0";
                    elements = document.all(tabList[k]).tBodies.item(0).rows;
                    rowsCount = elements.length;
                    if(rowsCount==1){
                        console.log(document.all(tabList[k]).tBodies.item(0).rows[i].cells)
                    node = document.all(tabList[k]).tBodies.item(0).rows[i].cells;
                    node.item(0).className = "formtitle";
                    node.item(0).colspan="2";
                    }
        
            }
            let tableList=["showOpinoin","showNotPassReasonOpinoin"];
                for(let k=0;k<tableList.length;k++){
                        let elements;
                        let node;
                        let rowsCount = 0;
                        let i = 0;
                        let j = 0;
                        document.getElementById(tableList[k]).className = "list";
                        document.getElementById(tableList[k]).border = "1";
                        document.getElementById(tableList[k]).cellpadding = "3";
                        document.getElementById(tableList[k]).cellspacing = "1";
                        elements = document.all(tableList[k]).tBodies.item(0).rows;
                        rowsCount = elements.length;
                for(i=0;i<rowsCount;i++)
                    {
                            elements = document.all(tableList[k]).tBodies.item(0).rows[i];
                            node = elements.cells;
                            if(i == 0){
                                for(j=0;j<node.length;j++)
                                {
                                        node.item(j).className = "centertitle";
                                }
                            }else{
                                if(i%2!=0){
                                        elements.className = "listodd";
                                }else{
                                        elements.className = "listeven";
                                }  
                            }
                    }
		        }
        }
    }
}
</script>
