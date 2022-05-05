<template>
    <div></div>
</template>
<script>
class appliInfoVo{
    constructor(){
        this.customerCode='',
        this.customerCName='',
        this.identifyType='74',
        this.identifyNo='',
        this.datevalid='',
        this.insuredType='2',
        this.mobile='',
        this.linkName='',
        this.phoneNumber='',
        this.address1='',
        this.address2='',
        this.address3='',
        this.address1Name='',
        this.address2Name='',
        this.address3Name='',
        this.address4='',
        this.insuredAddress='',
        this.postCode='',
        this.email='',
        this.businessSort='',
        this.businessDetail='',
        this.relationInsured='',
        this.capitalauThority='',
        this.doBesinessIncome='',
        this.customerLevel='',
        this.insuredRemark='',
        this.invoiceMan='',
        this.flag=''
    }  		
}
class  insuredInfoVo{
	constructor(){
			//this.serialNo=''
			this.insuredType='3'
			this.customerCode=''
			this.customerCName=''
			this.identifyType='01'
			this.identifyNo=''
			this.mobile=''
			this.linkName=''
			this.phoneNumber=''
			this.address1=''
			this.address2=''
			this.address3=''
			this.address1Name=''
			this.address2Name=''
			this.address3Name=''
			this.address4=''
			this.insuredAddress=''
			this.postCode=''
			this.urgentPhone=''
			this.flag=''
		}
	}
export default{
     created(){
        this.load()
     },
     methods:{
        load(){
        try {
            let strCustomerFlag = this.$route.query.strCustomerFlag 
            let obj={};
            if(strCustomerFlag==="AppliInsured"){
                obj=new appliInfoVo();
            }else {
                obj=new insuredInfoVo();
            }
            let customerType= typeof(this.$route.query.customerType)=='undefined'?"":this.$route.query.customerType
            obj.insuredType= typeof(this.$route.query.strInsuredType)=='undefined'?"":this.$route.query.strInsuredType
            obj.customerCode = this.$route.query.strCustomerCode
            obj.customerCName = this.$route.query.strCustomerCName
            if(strCustomerFlag==="AppliInsured"){
                obj.email =typeof(this.$route.query.strEMail)=='undefined'?"":this.$route.query.strEMail
                obj.businessSort=typeof(this.$route.query.strBusinessSort)=='undefined'?"":this.$route.query.strBusinessSort
                obj.identifyType=typeof(this.$route.query.strIdentifyType)=='undefined'?"74":this.$route.query.strIdentifyType
                obj.businessDetail=typeof(this.$route.query.strbusinessDetail)=='undefined'?"":this.$route.query.strbusinessDetail
            }else{
                obj.identifyType=typeof(this.$route.query.strIdentifyType)=='undefined'?"01":this.$route.query.strIdentifyType
            }
            if(customerType=='T'){
                obj.identifyNo = this.$route.query.strOrganizeCode 
            }else if(customerType=='P'){
                obj.identifyNo = this.$route.query.strIdentifyNumber
            }
            //let strCustomerKind = this.$route.query.strCustomerKind
            //let strBank = this.$route.query.strBank
            //let strAccount = this.$route.query.strAccount
            //let strGender = this.$route.query.strGender
            //let strBirthDate = this.$route.query.strBirthDate
            //let strMarriage = this.$route.query.strMarriage
            //let strOccupationCode = this.$route.query.strOccupationCode
            //let strOccupationCodeName = this.$route.query.strOccupationCodeName
            //let strEducationCode = this.$route.query.strEducationCode
            //let strEducationCodeName = this.$route.query.strEducationCodeName
            obj.insuredAddress = typeof(this.$route.query.strPostAddress)=='undefined'?"":this.$route.query.strPostAddress
            obj.postCode = typeof(this.$route.query.strPostCode)=='undefined'?"":this.$route.query.strPostCode
            obj.phoneNumber = typeof(this.$route.query.strPhoneNumber)=='undefined'?"":this.$route.query.strPhoneNumber
            // let strNationality = this.$route.query.strNationality
            // let strUnit = this.$route.query.strUnit
            // let strUnitAddress = this.$route.query.strUnitAddress
            // let strUnitPostcode = this.$route.query.strUnitPostcode
            // let strUnitPhoneNumber = this.$route.query.strUnitPhoneNumber
            // let strOccupationFlag = this.$route.query.strOccupationFlag
            //let roomAddress = this.$route.query.strRoomAddress
            obj.mobile =  typeof(this.$route.query.strMobile)=='undefined'?"":this.$route.query.strMobile
            obj.address1 =typeof(this.$route.query.strAddress1)=='undefined'?"":this.$route.query.strAddress1 
            obj.address1Name =typeof(this.$route.query.strAreacname1)=='undefined'?"":this.$route.query.strAreacname1 
            obj.address2 =typeof(this.$route.query.strAddress2)=='undefined'?"":this.$route.query.strAddress2  
            obj.address2Name =typeof(this.$route.query.strAreacname2)=='undefined'?"":this.$route.query.strAreacname2 
            obj.address3 =typeof(this.$route.query.strAddress3)=='undefined'?"":this.$route.query.strAddress3 
            obj.address3Name =typeof(this.$route.query.strAreacname3)=='undefined'?"":this.$route.query.strAreacname3 
            obj.address4 =typeof(this.$route.query.strAddress4)=='undefined'?"":this.$route.query.strAddress4
            obj.linkName =typeof(this.$route.query.strLinkerName)=='undefined'?"":this.$route.query.strLinkerName  
            //let strServiceMark = this.$route.query.strServiceMark
            // let strFaxNumber = this.$route.query.strFaxNumber
            // let strNetAddress = this.$route.query.strNetAddress
            // let strCustomerEName = this.$route.query.strCustomerEName
            // let strOrganizeCode = this.$route.query.strOrganizeCode
            // let strBusinessSource = this.$route.query.strBusinessSource
            // let strBusinessSourceName = this.$route.query.strBusinessSourceName
            // let strBusinessSort = this.$route.query.strBusinessSort
            // let strBusinessSortName = this.$route.query.strBusinessSortName
            // let strSocialSecurityNo = this.$route.query.strSocialSecurityNo
            // let stremployeeSum = this.$route.query.stremployeeSum
            //console.log(obj)
            //console.log(window)
            if(strCustomerFlag==="AppliInsured"){
                window.opener.opener.setAppliData(obj)
            }else {
                window.opener.opener.setInsuredData(obj)
            }
        } catch (e) {
              throw new Error(e);
        } finally {
            window.close();
            window.opener.parent.close();
        }
        }
     }
}
</script>

