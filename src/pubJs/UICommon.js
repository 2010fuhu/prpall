import { Message } from "element-ui";
import  router  from "@/router.js";

//定义常数
const FIELD_SEPARATOR = "_FIELD_SEPARATOR_";   //字段之间的分割符
const GROUP_SEPARATOR = "_GROUP_SEPARATOR_";     //一组代码之间的分割符
const DATE_DELIMITER="-";       //日期分隔符
const BGCOLORU="#FFFF00";        //修改(颜色)
const BGCOLORI="#00F0F0";       //添加(颜色)
const BGCOLORD="#778899";       //删除(颜色)
// let MAX_SMALLINT = Math.pow(2,15) - 1;
// let MIN_SMALLINT = -MAX_SMALLINT;
const MAX_INTEGER  = Math.pow(2,31) - 1;
const MIN_INTEGER  = -MAX_INTEGER;
// let MIN_HOUR     = 0;
// let MAX_HOUR     = 24;
// let remarks = "";//出单员意见 added by LanNing 20070412
// let remarksFlag = 0;//出单员意见替换标识 added by jiangchenghua 20070412
//let DATEVALUEDELIMITER=":";       //日期分隔符
//let NAMEVALUEDELIMITER=":";       //域名与域值的分隔符
//let SBCCASECOLON="：";
//let FIELDDELIMITER="|";       //域之间的分隔符
//let SBCCASEVERTICAL="｜";
//let RECORDDELIMITER="^";      //记录之间的分隔符
//let CODE_DELIMITER = "-";    //代码和名称之间的显示分隔符

/*添加js中去除首尾空格的通用方法*/
//去掉字符串的前后空格
String.prototype.trim = function(){return this.replace(/^\s*/,"").replace(/\s*$/,"");};

function showPage(isShow)
{
 
  isShow = !isShow;
  return isShow;
}

function pressDecimals(e)
{
  let value = String.fromCharCode(e.keyCode);
  if((value>=0 && value<=9) || value=="."|| value=="/")
    return true;
  else
    return false;
}

function checkDecimal(e,p,s,MinValue,MaxValue)
{

  e.target.value = trim(e.target.value);
  let strValue=e.target.value;
  strValue=strValue.replace(",","");
  if(strValue=="")
    strValue = "0";
  let desc   = e.target.description;
  //如果description属性不存在，则用name属性
  if(desc==null)
    desc = e.target.name;
  if(!isNumeric(strValue))
  {

    errorMessage("请输入合法的数字");
    e.target.focus();
    e.target.select();
    return false;
  }
  p = parseInt(p,10);
  s = parseInt(s,10);
  let pLength;
  let sLength;
  let position = strValue.indexOf(".");
  if(position>-1)
  {
    pLength = position;
    sLength = strValue.length - position - 1;
  }
  else
  {
    pLength = strValue.length;
    sLength = 0;
  }
  if(pLength>(p-s) || sLength>s)
  {
    errorMessage("请输入合法的" + desc +"\n类型为数字,整数位最长为" + (p-s) + ",小数位最长为" + s);
     e.target.focus();
     e.target.select();
    return false;
  }
  let value = parseFloat(strValue);
  if(MaxValue!=null && MinValue!=null && trim(MaxValue)!="" && trim(MinValue)!="")
  {
    MinValue = parseFloat(MinValue);
    MaxValue = parseFloat(MaxValue);
    if(isNaN(value) || value>MaxValue || value<MinValue)
    {
      errorMessage("请输入合法的" + desc +"\n类型为数字,最小值为" + MinValue + ",最大值为" +MaxValue);
      e.target.focus();
      e.target.select();
      return false;
    }
  }
  return true;
}

function isNumeric(strValue)
{
  
  let result = regExpTest(strValue,/[-]?\d*[.]?\d*/g);
  return result;
}

//RegExt Test
function regExpTest(source,re)
{
  let result = false;
  if(source==null || source=="")
    return false;
  if(source==re.exec(source))
    result = true;
  return result;
}

function trim(s)
{
  let strReturn;
  strReturn = leftTrim(s);
  strReturn = rightTrim(strReturn);
  return strReturn;
}


//去掉字符串头空格
function leftTrim(strValue)
{
  let re =/^\s*/;
  if(strValue==null)
    return null;
 strValue= "" + strValue;
  let strReturn = strValue.replace(re,"");
  return strReturn;
}

//去掉字符串尾空格
function rightTrim(strValue)
{
  let re =/\s*$/;
  if(strValue==null)
    return null;
  let strReturn = strValue.replace(re,"");
  return strReturn;
}


function errorMessage(strErrMsg)
{
  let strMsg = "系统信息:\n\n" + strErrMsg;
  Message.error(strMsg);
}

function checkLength(e)
{
  let str;
  e.target
  let count  = 0;
  let value  =  e.target.value;
  let length =  e.target.maxLength;
  let desc   =  e.target.description;
  //let type = "";
  //let name =  e.target.name;
  //如果description属性不存在，则用name属性
 
  if(desc==null)
    desc =  e.target.name;
  if(value=="")
  {
    return true;
  }
  if(value.indexOf("^")>-1 ||
     value.indexOf(FIELD_SEPARATOR)>-1 ||
     value.indexOf(GROUP_SEPARATOR)>-1
    )
  {
    errorMessage("^为系统保留字符，不允许输入！");
    e.target.focus();
    e.target.select();
    return false;
  }
  //如果maxlength属性不存在，则返回
  if(isNaN(parseInt(length,10)))
    return true;
  for(let i=0;i<value.length;i++)
  {
    str = escape(value.charAt(i));
    if(str.substring(0,2)=="%u" && str.length==6)
      count = count + 2;
    else
      count = count + 1;
  }
  if(count>length)
  {
    errorMessage(desc + "输入的内容超长！\n" + desc + "的最大长度为" + length + "个英文字符！\n请重新输入！");
    e.target.focus();
    e.target.select();
    return false;
  }
 
  return true;
}

//获取当前日期 年月日 2021-08-04
function getCurrentDate() {

  let myDate = new Date();

  let seperator1 = "-";
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;
  let strDate = myDate.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  let currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
  
}
function getNextDate() {

  let myDate = new Date();

  let seperator1 = "-";
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;
  let strDate = myDate.getDate()+1;
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  let currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
  
}
function getCurrentTime(){
  let myDate = new Date(); //实例一个时间对象；
  return `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`
}

//对输入域按键时的日期校验
function pressFullDate(e)
{
  let value = String.fromCharCode(e.keyCode);
  if((value>=0 && value<=9) || value=="/" || value=="-")
    return true;
  else
    return false;
}
function pressDatetime(e)
{
  let value = String.fromCharCode(e.keyCode);
  if((value>=0 && value<=9) || value=="/" || value=="-" || value==":" || value==" ")
    return true;
  else
    return false;
}


//检查日期输入域,和checkFullDate的区别是允许输入两个日期,之间以":" 分割,
//例如 20030523:20040312,
//例如 2003/03/04:2004/09/12
function checkBetweenDate(e)
{
  let strValue = trim(e.target.value);
  
  let desc   = e.target.description;
  //如果description属性不存在，则用name属性
  if(desc==null)
    desc = e.target.name;
  if(strValue=="")
  {
    return false;
  }
  //不采用直接返回
  let index = strValue.indexOf(":");
  if (index < 0)
  {
    if(isNumeric(strValue ))
    {
      if(strValue.length>6)
      {
        strValue = strValue.substring(0,4) + DATE_DELIMITER + strValue.substring(4,6) + DATE_DELIMITER + strValue.substring(6);
        e.target.value = strValue;
        let event= document.createEvent("HTMLEvents");
        event.initEvent("input", false, true);
        e.target.dispatchEvent(event);
        //ield.input;
      }
      if(!isDate(strValue,DATE_DELIMITER) && !isDate(strValue))
      {
       errorMessage("请输入合法的" + desc +"\n类型为日期，格式为YYYY-MM-DD 或者YYYYMMDD");
       e.target.value="";
       let event= document.createEvent("HTMLEvents");
       event.initEvent("input", false, true);
       e.target.dispatchEvent(event);
       //e.dispatchEvent(new Event('input'));
       e.target.focus();
       e.target.select();
       return false;
      }
    }
    return true;
  }
  let beginDate = strValue.substring(0,index);
  let endDate  = strValue.substring(index + 1);
  if(isNumeric(beginDate ))
  {
    beginDate = beginDate.substring(0,4) + DATE_DELIMITER + beginDate.substring(4,6) + DATE_DELIMITER + beginDate.substring(6);
  }
  if(isNumeric(endDate ))
  {
    endDate = endDate.substring(0,4) + DATE_DELIMITER + endDate.substring(4,6) + DATE_DELIMITER + endDate.substring(6);
  }
  if(!isDate(beginDate,DATE_DELIMITER))
  {
    errorMessage("输入的日期为非法日期,请重新输入");
    e.target.focus();
    e.target.select();
    return false;
  }
  if(!isDate(endDate,DATE_DELIMITER))
  {
    errorMessage("输入的日期为非法日期,请重新输入");
    e.target.focus();
    e.target.select();
    return false;
  }
  e.target.value = beginDate + ":" + endDate;
  let event= document.createEvent("HTMLEvents");
  event.initEvent("input", false, true);
  e.target.dispatchEvent(event);
  return true;
}
//得到下n天
function getPreDateFullDate(strDate,intCount)
{
  let tempDate = new Date(replace(strDate,"-","/"));
  if(intCount == null)
  {
    intCount =1;
  }
  let nextDateInMS = tempDate.getTime() - (intCount * 24 * 60 * 60 * 1000 );
  let strReturn = convertFullDateToString(new Date(nextDateInMS));
  return strReturn;
}
function getNextDateFullDate(strDate,intCount)
{
  let tempDate = new Date(replace(strDate,"-","/"));
  if(intCount == null||isNaN(intCount))
  {
    intCount =1;
  }
  let nextDateInMS = tempDate.getTime() + (intCount * 24 * 60 * 60 * 1000 );
  let strReturn = convertFullDateToString(new Date(nextDateInMS));
  return strReturn;
}


//得到下n个年
function getNextYearFullDate(strDate,intCount)
{
  let tempDate = new Date(replace(strDate,"-","/"));
  if(intCount == null)
  {
    intCount =1;
  }
  tempDate.setFullYear(tempDate.getFullYear() + intCount );
  let strReturn = convertFullDateToString(tempDate);
  return strReturn;
}

//检查日期输入域
function checkFullDate(e)
{ 
  
  e.target.value = trim(e.target.value);
  let strValue = e.target.value;
  let desc   = e.target.description;
  //如果description属性不存在，则用name属性
  if(desc==null)
    desc = e.target.name;
  if(strValue=="")
  {
    return false;
  }
  if(isNumeric(strValue ))
  {
     if(strValue.length > 6 && strValue.length < 9)
    {
      strValue = strValue.substring(0,4) + DATE_DELIMITER + strValue.substring(4,6) + DATE_DELIMITER + strValue.substring(6);
      e.target.value = strValue;
      let event= document.createEvent("HTMLEvents");
      event.initEvent("input", false, true);
      e.target.dispatchEvent(event);
    }
     else
     {
      errorMessage("请输入合法的" + desc +"\n类型为日期，格式为YYYY-MM-DD 或者YYYYMMDD");
      e.target.value="";
      let event= document.createEvent("HTMLEvents");
      event.initEvent("input", false, true);
      e.target.dispatchEvent(event);
      e.target.focus();
      e.target.select();
        return false;
     }
  }
  if( !isDate(strValue,DATE_DELIMITER) && !isDate(strValue)||strValue.substring(0,1)=="0")
  {
    errorMessage("请输入合法的" + desc +"\n类型为日期，格式为YYYY-MM-DD 或者YYYYMMDD");
    e.target.value="";
    let event= document.createEvent("HTMLEvents");
    event.initEvent("input", false, true);
    e.target.dispatchEvent(event);
    e.target.focus();
    e.target.select();
    return false;
  }
  return true;
}


//对输入域是否是日期的校验，splitChar参数缺省为"-"
function isDate(date,splitChar)
{
  let charSplit = (splitChar==null?"-":splitChar);
  let strValue = date.split(charSplit);
  if(strValue.length!=3) return false;
  if(!isInteger(strValue[0]) || !isInteger(strValue[1]) || !isInteger(strValue[2]) ) return false;
  let intYear  = parseInt(strValue[0],10);
  let intMonth = parseInt(strValue[1],10)-1;
  let intDay   = parseInt(strValue[2],10);
  let dt = new Date(intYear,intMonth,intDay);
  if( dt.getFullYear() != intYear ||
      dt.getMonth() != intMonth ||
      dt.getDate() != intDay
     )
  {
    return false;
  }
  return true;
}

//对输入域是否是整数的校验,即只包含字符0123456789
function isInteger(strValue)
{
  let result = regExpTest(strValue,/\d+/g);
  return result;
}
//对输入域是否是数字的校验
// function isNumeric(strValue)
// {
  
//   let result = regExpTest(strValue,/[-]?\d*[.]?\d*/g);
//   return result;
// }


//替换字符串函数
function replace(strExpression,strFind,strReplaceWith)
{
  let strReturn;
  let re = new RegExp(strFind,"g");
  if(strExpression==null)
    return null;
  strReturn = strExpression.replace(re,strReplaceWith);
  return strReturn;
}

//得到日期的字符串表达形式，传入参数为Date类型
//如果不传，则默认为当天
function convertFullDateToString(date)
{
  if(date==null)
  {
    date = new Date();
  }
  let strDate = "";
  let sdate ="";
  let smonth = "";
  smonth =parseInt(date.getMonth())+1; 
  sdate = parseInt(date.getDate());
  if(0<smonth&&smonth<10){
  smonth = "0"+smonth;
  }
  if(0<sdate&&sdate<10){
  	sdate = "0"+sdate;
  }
  strDate = date.getFullYear() + DATE_DELIMITER +
            smonth + DATE_DELIMITER +
            sdate;
  return strDate;
}

function isEmpty(e)
{
  if(e==null || trim(e)=="")
  {
    return true;
  }
  return false;
}

//离开域时的数字校验
function checkInteger(e,MinValue,MaxValue)
{
  e.target.value = trim(e.target.value);
  let strValue=e.target.value;
  if(strValue=="")
    strValue = "0";
  let desc   = e.target.description;
  //如果description属性不存在，则用name属性
  if(desc==null)
    desc = e.target.name;
  if(!isInteger(strValue))
  {
    errorMessage("请输入合法的数字");
    e.target.focus();
    e.target.select();
    return false;
  }
  MinValue = parseInt(MinValue,10);
  if(isNaN(MinValue))
    MinValue = MIN_INTEGER;
  MaxValue = parseInt(MaxValue,10);
  if(isNaN(MaxValue))
    MaxValue = MAX_INTEGER;
  let value = parseInt(strValue,10);
  if(isNaN(value) || value>MaxValue || value<MinValue)
  {
    errorMessage("请输入合法的" + desc +"\n类型为数字(integer),最小值为" + MinValue + ",最大值为" +MaxValue);
    e.target.focus();
    e.target.select();
    return false;
  }
  return true;
}


//对输入域按键时的整数校验
function pressInteger(e)
{
  let value = String.fromCharCode(e.keyCode);
  if(value>=0 && value<=9)
    return true;
  else
    return false;
}

function compareFullDate(date1,date2)
{
  //获取字符串的分割符号
  let strdate1_split = get_datesplit(date1);
  let strdate2_split = get_datesplit(date2);
  let strValue1=date1.split(strdate1_split);
  let date1Temp=new Date(strValue1[0],parseInt(strValue1[1],10)-1,parseInt(strValue1[2],10));
  let strValue2=date2.split(strdate2_split);
  let date2Temp=new Date(strValue2[0],parseInt(strValue2[1],10)-1,parseInt(strValue2[2],10));
  if(date1Temp.getTime()==date2Temp.getTime())
    return 0;
  else if(date1Temp.getTime()>date2Temp.getTime())
    return 1;
  else
    return -1;
}

//获取日期字符串的分割符
function get_datesplit(strdate)
{
  if (strdate.match("/")) return "/"
  if (strdate.match("-")) return "-"
}
function checkFocusZero(e){
	if (e.target.value == ""){
		return;	
	}
	let isZero = parseFloat(e.target.value);
	
	if(isNaN(isZero)){
		isZero = "";
	}
	
	if(isZero == 0){
		 e.target.value = "";
	}
}

function numberFormatMoney(e)
{
	let num = e.target.value;
	
	if(num == "")
	{
		return num;
	}
	
	num = replaced(num);
  num = pointTwo(num);//add by dongcun 增加小数点两位
  e.target.value = numberFormat(num);
  let event= document.createEvent("HTMLEvents");
        event.initEvent("input", false, true);
        e.target.dispatchEvent(event);
	return;
}
function replaced(strings,delimiterChar){
	strings=strings+"";
	//此处不加空字符串转换为字符串，如果入参为数字类型的0，下面条件会返回true。
	let str=strings;
	if(strings == null || strings == ""){
	    return;	
	}
	
	if(delimiterChar == null || delimiterChar == ""){
	    delimiterChar = ",";	
	}
	
	do{
		strings= '' + str;
		
		str=strings.replace(delimiterChar,"");
		
	}while(strings!=str);	
	return str;	
}



//对数字按0.00格式化
function pointTwo( s )
{
  return point(s,2);
}

//对数字进行格式化,保证precision位
function point(number,precision)
{
  if(isNaN(number))
    number = 0;
  let result = number.toString();
  if(result.indexOf(".")==-1)
    result = result + ".";
  result = result + newString("0",precision);
  result = result.substring(0,precision + result.indexOf(".") + 1);
  return result;
}


/**
 * 将给定字符串复制ｎ遍
 * @param intLength 字符串长度
 * @return 字符串
 */
 function newString(iString, iTimes)
 {
   let str = "";
   for (let i = 0 ; i < iTimes; i++)
      str = str + iString;
   return str;
 }
//对数字格式化，delimiterChar默认为"," precision默认为3
function numberFormat(ivalue,delimiterChar,precision)
{
  if((ivalue==null) || (ivalue==""))
    return "";
  if(delimiterChar==null || delimiterChar=="")
    delimiterChar = ",";
  if(precision==null || precision =="")
    precision = 3;
  let i = 0;
  let ovalue = "";
  let times;
  let avalue = "";
  
  //modify by chengkai;20070423;如果有浮点类型就比较麻烦，还是进行一次转换吧！
  ivalue = String(ivalue);
  if(ivalue.indexOf(".")>-1)
  {
    avalue = "." + ivalue.substring(ivalue.indexOf(".")+1);
    ivalue = ivalue.substring(0,ivalue.indexOf("."));
  }
  times = ivalue.length % precision;
  if(times!=0)
  {
    ovalue = ivalue.substring(0,times);
    ivalue = ivalue.substring(times);
  }
  for(i=0;i<ivalue.length;i++)
  {
    if(i%precision==0)
    {
      ovalue += delimiterChar;
    }
    ovalue += ivalue.substring(i,i+1)
  }
  if(ovalue.substring(0,1) == delimiterChar)
    ovalue = ovalue.substring(1);
  if ((ovalue.substring(0,1) == '-') &&
      (ovalue.substring(1,2) == delimiterChar))
    ovalue = '-'+ ovalue.substring(2);
  return ovalue + avalue;
}



//对输入域按键时的数字校验
function pressDecimal(e)
{
  let value = String.fromCharCode(e.keyCode);
  if((value>=0 && value<=9) || value==".")
    return true;
  else
    return false;
}


function checkDecimal1(e,p,s,MinValue,MaxValue,delimiterChar,delimiterCount)
{
  e.target.value = trim(e.target.value);
	let oldValue=e.target.value;
	
	if(oldValue==""){
	    return;
	}
	
  if(delimiterChar==null || delimiterChar=="")
  {
	    delimiterChar = ",";
	}
	
  if(delimiterCount==null || delimiterCount=="")
  {
	    delimiterCount = 3;
	}
	
	let strValue=replaced(e.target.value,delimiterChar);
	if(strValue=="")
    strValue = "0";
  let desc   = e.target.description;
  //如果description属性不存在，则用name属性
  if(desc==null)
    desc = e.target.name;
  if(!isNumeric(strValue))
  {
    errorMessage("请输入合法的数字");
    e.target.focus();
    e.target.select();
    return false;
  }
  p = parseInt(p,10);
  s = parseInt(s,10);
  let pLength;
  let sLength;
  let position = strValue.indexOf(".");
  if(position>-1)
  {
    pLength = position;
    sLength = strValue.length - position - 1;
  }
  else
  {
    pLength = strValue.length;
    sLength = 0;
  }
	
  if(pLength>(p-s-delimiterCount) || sLength>s)
  {
    errorMessage("请输入合法的" + desc +"\n类型为数字,整数位最长为" + (p-s-delimiterCount) + ",小数位最长为" + s);
    //e.target.value = "";
    //e.target.focus();
    //e.target.select();
    return false;
  }
}

function number_format(number, decimals=2, dec_point='.', thousands_sep=',') {
  //decimals = 2; //这里默认设置保留两位小数，也可以注释这句采用传入的参数
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
  let s = n.toString().split('.');
  let re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  } else {
    s[1] = s[1].substring(0, prec); //小数点位数超出长度时截取前面的位数
  }
  return s.join(dec);
}

function al(){

  window.close()
}
function splitChange(Strings)
{ 
	let strCount     =  Strings;
	let countArray = strCount.split(",");
	let x = 0;
	let intCount    = "";
    for(x=0; x<countArray.length ;x++)
      {
         intCount+= countArray[x];
      }
    Strings = parseFloat(intCount) ;
    return Strings;
}
//对数字四舍五入
//数值,精度
function round(number,precision)
{
	number=Number((""+number).replace(/,/g,""));
	if(isNaN(number))
    number = 0;
  let prec = Math.pow(10,precision);
  let result = Math.round(accMul(number,prec));
  result = result/prec;
  return result;
}
function accMul(arg1,arg2){ //添加精确计算的乘法 add by liqi 20170719
	let m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length}catch(e){ console.log(e)}
	try{m+=s2.split(".")[1].length}catch(e){  console.log(e)}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10, m);
}

/**
 * @desc 计算短期费率函数
 * @desc 注意脚本中的计算短期费率的函数需要和PubTools.java中相应的方法保持一致
 * @param1 strMode 短期费率方式
 * @param2 strStartDate 起始日期
 * @param3 strStartHour 起始小时数
 * @param4 strEndDate 终止日期
 * @param5 strEndHour 终止小时数
 * @return dbShortRate 短期费率
 */
 function getShortRate(strMode,strStartDate,strStartHour,strEndDate,strEndHour,strRiskCode) {
	let dbShortRate = 0;
	//let strRiskCode = "PUB";
	//国寿需求，当开始日期与终止日期同一天时，不计短期费率 add by luyang 2005-11-10 02:51
	if (strStartDate==strEndDate && strStartHour==strEndHour) {
		return 100;
	}
	//国寿需求，当开始日期与终止日期同一天时，不计短期费率 add by luyang 2005-11-10 02:51
	if (parseInt(strMode,10)==1) {//短期费率表方式
		return getShortRateTable(strStartDate,strStartHour,strEndDate,strEndHour,strRiskCode);
	} else if(parseInt(strMode,10)==2) {//日比例
		return getShortRateDay(strStartDate,strStartHour,strEndDate,strEndHour);
	} else if(parseInt(strMode,10)==4) {//月比例
		return getShortRateMonth(strStartDate,strStartHour,strEndDate,strEndHour)
	} else {
		dbShortRate = 100;
	}
	return dbShortRate;
}

function getShortRateTable(strStartDate,strStartHour,strEndDate,strEndHour,strRiskCode)
{
  let arrayTableShortRate;
  let startDate = new Date(replace(strStartDate,"-","/"));
  let endDate = new Date(replace(strEndDate,"-","/"));
  //let intDays = dateDiff(startDate,endDate,"D");
  let intMonthCount = dateDiff(startDate,endDate,"M"); 
  if(isNaN(intMonthCount)){
		intMonthCount = 0;
	}
  let dbTableShortRate = 0;
  strRiskCode = strRiskCode==null?"PUB":strRiskCode;
  startDate = startDate.getDate();
  endDate = endDate.getDate();
  if(startDate==endDate&&parseInt(strStartHour,10)<parseInt(strEndHour,10))
    intMonthCount = intMonthCount+1;
 
  /* modify by xiaojian 20051229 begin reason：去掉未开发险种的费率信息，因为开发新险种需要客户提供，增加1102的费率数据 */
  if(strRiskCode.substring(0,2)=="26"||
     strRiskCode.substring(0,2)=="27"||
     strRiskCode.substring(0,2)=="03"||
     strRiskCode.substring(0,2)=="01"||
     strRiskCode.substring(0,2)=="15"||
     strRiskCode == "0404"||
     strRiskCode == "0405"||
     strRiskCode == "0406"||
     strRiskCode == "0409"||
     strRiskCode == "2901"||//新增2901从数据库中取短期费率功能 wangweili add
     strRiskCode == "2233"|| 
     strRiskCode == "1111"||//add by hangang 20140505 进口保理信用险
     strRiskCode == "2319"||//新增2319从数据库中取短期费率功能 wangweili add
     strRiskCode == "2201"||
     strRiskCode == "1307"|| //1307新增短期系数 add by wufanfan 
	 strRiskCode == "2232"||strRiskCode == "1310"||strRiskCode=="2237")//add by hangang 2232新险种
  {
   	   //arrayTableShortRate = getShortRateFor27(strRiskCode,intMonthCount);
  }
  //add by zhoule end 20070720 给2705增加短期费率表月比列
  else if(strRiskCode=="1804") //物业管理责任
  {
    arrayTableShortRate = new Array(0,20,30,40,50,60,70,75,80,85,90,95,100);
  } //modify by yangkun begin 20060224调整0910短期费率表月比率
  else if(strRiskCode=="1809"||strRiskCode=="0910") //建筑工程设计
  { //modify by yangkun end 20060224
    arrayTableShortRate = new Array(0,15,25,35,45,55,65,75,80,85,90,95,100);
  }
  //add by luyang 2005-10-29 01:00下午 end
  //add by huangyaxu 20110414 OA2495 调整水险费率
  else if(strRiskCode=="1102") //沿海内河船舶保险
  {
    arrayTableShortRate = new Array(0,30,40,50,60,70,80,85,90,95,100,100,100);
  }
  else if(strRiskCode=="1101") //沿海内河船舶保险
  {
    arrayTableShortRate = new Array(0,30,40,50,60,70,80,85,90,95,100,100,100);
  }
  else if(strRiskCode=="1104") //沿海内河船舶保险
  {
    arrayTableShortRate = new Array(0,30,40,50,60,70,80,85,90,95,100,100,100);
  }
  else if(strRiskCode=="1105") //沿海内河船舶保险
  {
    arrayTableShortRate = new Array(0,30,40,50,60,70,80,85,90,95,100,100,100);
  }
  //add by huangyaxu 20110414 OA2495 end
  //add by meihuidong 2006-01-25 begin reason：新险种需要客户提供的短期费率
  else if(strRiskCode=="1106") //沿海内河船舶保险
  {
    arrayTableShortRate = new Array(0,20,30,40,50,60,70,75,80,85,90,95,100);
  }
  else if(strRiskCode=="2219")
  {
	arrayTableShortRate = new Array(0,20,30,40,50,60,70,75,80,85,90,95,100);
  } 
   else if(strRiskCode=="2228")
  {
	arrayTableShortRate = new Array(0,20,30,40,50,60,70,75,80,85,90,95,100);
  } else if(strRiskCode=="2233")//add by hangang 20140505 进口保理信用险
  {
	arrayTableShortRate = new Array(0,20,30,40,50,60,70,75,80,85,90,95,100);
  } 
  
  else
  {//不知道为什么不从数据库里读.
    arrayTableShortRate = new Array(0,10,20,30,40,50,60,70,80,85,90,95,100);
  }
  dbTableShortRate = Math.floor(intMonthCount/12)*100+parseFloat(arrayTableShortRate[intMonthCount%12]);
  return dbTableShortRate;
}
//按日比例计算短期系数
function getShortRateDay(strStartDate,strStartHour,strEndDate,strEndHour)
{
	let startDate = new Date(replace(strStartDate,"-","/"));
	let endDate = new Date(replace(strEndDate,"-","/"));
	let intDays = dateDiff(startDate,endDate,"D");
	let intDaysInYear = 365;
	let dbShortRate = 0;
	if(strStartHour=="0"&&strEndHour=="0")
	    intDays = intDays-1;
	else if(strStartHour=="24"&&strEndHour=="24")
	    intDays = intDays-1;
	else if(strStartHour=="24"&&strEndHour=="0")
	    intDays = intDays-2;
	//撤销闰年计算，根据信科回应，涉及到闰年问题的建议业务使用约定比例，按日计算则统一按照365的老规则计算。 edit by liqi 20200527
	/*	邮件确认内容如下：
	 *  1、如果已投保的短期单，批改时我们要改了计算规则，会影响批改后的最终保费；  
	 *  2、如原因1可以忽略，系统也面临着全险种的调整，动静比较大。
	 *  3、系统提供了约定比例的批改，建议折中方案为短期费率方案采用约定比例。 
	 *  如业务无法接受我们给出的方案，建议请分公司咨询总公司业务部门审批。
	 * 
	 *  如果日后分公司对此抱有疑问，请开发人员参考本处内容回应。
	 * */
	dbShortRate = intDays/intDaysInYear*100;
	return dbShortRate;
}
//短期费率表方式计算（对应原月短期费率）
//xiaojian_leave：是否需要从数据库中读取，还是把数据库中的值放在此脚本文件中
function getShortRateMonth(strStartDate,strStartHour,strEndDate,strEndHour)
{
  let startDate = new Date(replace(strStartDate,"-","/"));
  let endDate = new Date(replace(strEndDate,"-","/"));
  let intMonthCount = dateDiff(startDate,endDate,"M");
  let dbShortRate = 0;
  startDate = startDate.getDate();
  endDate = endDate.getDate();
  if(startDate==endDate&&parseInt(strStartHour,10)<parseInt(strEndHour,10))
    intMonthCount = intMonthCount+1;
  dbShortRate = intMonthCount/12*100;
  return dbShortRate;
}

//计算两个日期的差,返回差的月数(M)或天数(D)
//2003/3/17 改为(其中天数包含2.29这一天)
//xiaojian_leave：计算月份数、天数没有考虑日期的小时数，是在调用此函数的函数中考虑的
function dateDiff(dateStart,dateEnd,MD)
{
  
  if(MD=="D") //按天计算差
  {
    let endTm = dateEnd.getTime();
    let startTm = dateStart.getTime();
    let diffDay = (endTm-startTm)/86400000+1;
    return diffDay;
  }
  else //按月计算差
  {
    let endD = dateEnd.getDate();
    let endM = dateEnd.getMonth();
    let endY = dateEnd.getFullYear();
    let startD = dateStart.getDate();
    let startM = dateStart.getMonth();
    let startY = dateStart.getFullYear();
    
    if(endD>startD) //跟终端版fcalc_month函数统一，endD>startD时才加1
    {
      return (endY-startY)*12+(endM-startM)+1;
    }
    else
    {
      return (endY-startY)*12+(endM-startM);
    }
  }
}
//对数字按0.0000 格式化
function pointFour( s )
{
  return point(s,4);
}
//对数字第三位四舍五入
function mathRound(number)
{
  return round(number,2);
}

function uuid (len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
 let uuid = [], i;
 radix = radix || chars.length;
  
 if (len) {
   for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
 } else {
   let r;
   uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
   uuid[14] = '4';
   for (i = 0; i < 36; i++) {
     if (!uuid[i]) {
       r = 0 | Math.random()*16;
       uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
     }
   }
 }
  
 return uuid.join('');
}
function viewTraceForUndwrt(businessNo)
{
  const{ href } = router.resolve({name:"viewTraceForUndwrt",query:{businessNo}});
  window.open(href,'核保信息','width=640,height=300,top=50,left=80,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1.resizable=1,status=0');
}

function setReadonlyOfElement(iElement)
{ 
  
  if(iElement.type=="select-one")
  {
    let text=''
    let value=''
    for(let j=iElement.options.length-1;j>=0;j--)
    {
      if(iElement.options[j].value==iElement.value)
      {
         text=iElement.options[j].text
         value=iElement.options[j].value
      }else{
         continue;
      }
    }
    iElement.options.length=0;
    iElement.options.add(new Option(text,value));
  }else if ((iElement.type=="hidden") ||(iElement.type=="password") ||(iElement.type=="text") ||(iElement.type=="textarea")){ 
    iElement.readOnly = 'readonly';
  }else if(iElement.type=="button"){
    if(iElement.setReadonlyFlag==true){
      return;
    }else {
      iElement.setReadonlyFlag = true;
    }
    if(iElement.name.indexOf("Delete")>-1 || iElement.name.indexOf("Insert")>-1)
    {
      iElement.disabled = "disabled";
    }
  }else if(iElement.type=="checkbox"){
    setCheckBoxReadonly(iElement,true);
  }
  else if(iElement.type=="radio"){
    setRadioReadonly(iElement,true);
  }
}
//将容器里的元素设置为只读或可读写
function setContainerReadonly(Container,Flag)
{ 
  
  let i = 0;
  let elements;
  //Input域
  elements = Container.getElementsByTagName("input");
  for(i=0;i<elements.length;i++)
  {
    if(Flag){
      setReadonlyOfElement(elements[i]);
    }else{
      undoSetReadonlyOfElement(elements[i]);
    }
  }
  //Select域
  elements = Container.getElementsByTagName("select");
  for(i=0;i<elements.length;i++)
  {
    if(Flag){
      setReadonlyOfElement(elements[i]);
    }else{
      undoSetReadonlyOfElement(elements[i]);
    } 
  }
  //Textarea域
  elements = Container.getElementsByTagName("textarea");
  for(i=0;i<elements.length;i++)
  {
    if(Flag){
      setReadonlyOfElement(elements[i]);
    }else{
      undoSetReadonlyOfElement(elements[i]);
    }
  }
}

//public
//过程部分可逆,select-one所有附加事件被取消 --OK了
function undoSetReadonlyOfElement(iElement)
{
  if(iElement.type=="select-one")
  {
    if(iElement.setReadonlyFlag!=true){
      return;
    }else{
      iElement.setReadonlyFlag = false;
    }
    let optionTags = iElement.optionTags;
    let currentValue = iElement.value;
    for(let i=iElement.options.length-1;i>=0;i--)
    {
      iElement.remove(i);
    }
    for(let j=optionTags.length-1;j>=0;j--)
    {
      let tag = optionTags[j];
      let op = document.createElement("OPTION");
      op.value = tag.value;
      op.text =  tag.text;
      iElement.add(op);
    }
    iElement.value = currentValue;
  }else if ((iElement.type=="hidden") ||(iElement.type=="password") ||(iElement.type=="text") ||(iElement.type=="textarea"))
  {
    if(iElement.setReadonlyFlag!=true){
      return;
    } else{
      iElement.setReadonlyFlag = false;
    }
    
    iElement.onblur = iElement.oldOnblur;
    iElement.ondblclick = iElement.oldOndblclick;
    iElement.onfocus = iElement.oldOnfocus;
    iElement.readOnly = false;
    iElement.className = iElement.oldClassName;
  }else if(iElement.type=="button"){
    if(iElement.setReadonlyFlag!=true){
      return;
    }else{
      iElement.setReadonlyFlag = false;
    }
    if(iElement.name.indexOf("Delete")>-1 || iElement.name.indexOf("Insert")>-1){
      iElement.disabled = false;
    }
  }else if(iElement.type=="checkbox"){
    setCheckBoxReadonly(iElement,false);
  }else if(iElement.type=="radio"){
    setRadioReadonly(iElement,false);
  }
}
function setOnchangeOfTable(TableID)
{
  let elements 
  elements = TableID.getElementsByTagName("input");

  for(let  i=0;i<elements.length;i++)
  {
    elements[i].addEventListener('change',function mainOnchange(){ 
        mainOnchangeChangeColor(this);
      },false)
  }
  //得到Select域的名字
  elements = TableID.getElementsByTagName("select");
  for(let  i=0;i<elements.length;i++)
  {
    elements[i].addEventListener('change',function mainOnchange(){ 
        mainOnchangeChangeColor(this);
      },false)
  }
  //得到textarea域的名字
  elements = TableID.getElementsByTagName("textarea");
  for(let  i=0;i<elements.length;i++)
  {
    elements[i].addEventListener('change',function mainOnchange(){ 
        mainOnchangeChangeColor(this);
      },false)
  }
}
//private
function mainOnchangeChangeColor(field)
{ 
  if(field.style.backgroundColor.toUpperCase()!=BGCOLORI && field.style.backgroundColor.toUpperCase()!=BGCOLORD)
  {
    if(field.type=="select-one")
    {
      let i = 0;
      for(i=0;i<field.options.length;i++)
      {
        if(field.options[i].value==field.title)
        { 
          setBackColor(field.options[i],"");
          }
        else
          setBackColor(field.options[i],BGCOLORU);
      }
    }
    else if(field.type=="checkbox")
    {
      if(trim(""+field.checked)!=trim(""+field.title))
        setBackColor(field,BGCOLORU);
      else
        setBackColor(field,"");
    }
    else if(field.type=="radio")
    {
      let obj;
      let tagElements=document.getElementsByTagName(field.name)
      for(let i=0;i<tagElements;i++)
      {
        obj = tagElements[i]
        if(trim(""+obj.checked)!=trim(""+obj.title))
          setBackColor(obj,BGCOLORU);
        else
          setBackColor(obj,"");
      }
    }
    else
    {
      if(field.value!=field.title )
        setBackColor(field,BGCOLORU);
      else
        setBackColor(field,"");
    }
  }
}
function setBackColor(field,bcolor)
{
  field.style.backgroundColor = bcolor;
}
function setRadioReadonly(field,flag)//
{
  if(flag){
  field.className = "readonlyradio";
  field.onfocus = function(){ 
    errorMessage("只读输入域不能选择！");
    this.blur();
    window.focus();
    return false;
   };
  }else{
    field.className = field.oldClassName;
    field.onfocus = field.oldOnfocus;
  }
}
function  setCheckBoxReadonly(){ return  false;}
//-----------------------------------------------------------------------------------------------------
//新增一行数据的方法
function insertRowForPG(vm,key,obj)
{
  vm[key].push(obj)
  vm.$nextTick(()=>{
    let index =vm[key].length-1
    setRowColor(vm,key,index,'commoni');
    try{
      vm[key][index].flag="I";
    }catch(e){
      errorMessage(key + "_Flag 字段不存在");
    }
  })
}
//删除其中一行 高亮显示function
function deleteRowForPG(vm,str,index){
  let flag = "";
  try{
    flag = vm[str][index].flag;
  } catch(e){
    errorMessage(str + "_Flag 字段不存在");
    return false;
  }
  if(flag=="I"){
    vm[str].splice(index, 1);
  }else if(flag=="D"){
    setRowColor(vm,str,index,'common');
    reset(vm,str,index)
    // let pageFieldsName = getPageFieldsName(PageCode,DataPageCode);
    // for(let i=0;i<pageFieldsName.length;i++)
    // {
    //   //由于修改千分位时，计算所用到的是hidden的内容，因此在这里需要加上 added by LanNing 20070622
    //   if(fm.all(pageFieldsName[i])[index].type=="text" || fm.all(pageFieldsName[i])[index].type=="hidden" || fm.all(pageFieldsName[i])[index].type=="textarea" || fm.all(pageFieldsName[i])[index].type=="password")
    //   {
    //     //恢复原值
    //     fm.all(pageFieldsName[i])[index].value=fm.all(pageFieldsName[i])[index].title;
    //   }
    // }
    vm[str][index].flag="";
  }else{
    vm[str][index].flag="D";
    setRowColor(vm,str,index,'commond');
  }
}
function  setRowColor(vm,arr,index,backgroundColor){
      let refs=vm.$refs
      for(let  key in vm[arr][index]){
          if(refs[key]){
             refs[key][index].className=backgroundColor
          }
      }
}
function reset(vm,arr,index){
    let refs=vm.$refs
    for(let  key in vm[arr][index]){
        if(refs[key]){
          if(refs[key].type=="text"||refs[key].type=="hidden" 
           ||refs[key].type=="textarea"||refs[key].type=="password"){
            refs[key][index].value= refs[key][index].title
          }
        }
    }
}
//-----------------------------------------------------------------------------------------------------
function  setTitle(dom){//dom必须传入一个数组 设置 dom元素中元素节点的title值 初始化数据时
    let d = null;
    let len = dom.length;
    for(let i=0; i<len; i++){
      d = dom[i];
      if(d.children.length&&d.type!='select-one'){
        setTitle(d.children);
      }else if(d.type=="checkbox"||d.type=='radio'){
        //d.title = d.checked;
        continue;
      }else{
        d.title=d.value
      }
    }
}

function  addevent(_that,str){// 传递vue示例 与 字符串(对象名 或者 数组名)
  let refs=_that.$refs
    try{
      if(_that[str]){
        if(_that[str].constructor === Array){
          for(let i=0; i<_that[str].length;i++){
            let item=_that[str][i]
            for(let key in item){
                if(refs[key]){
                    refs[key][i].addEventListener("change", function(){ setColor(this)})
                } 
            } 
          }
        }else if(_that[str].constructor === Object){
          Reflect.ownKeys(_that[str]).forEach((key)=>{
                if(refs[key]){
                    refs[key].addEventListener("change", function(){ setColor(this)})
                } 
          })
        }else if(_that[str].constructor === String){
                refs[str].addEventListener("change", function(){ setColor(this)})
        }
      }else{
            
            refs[str].addEventListener("change", function(){ setColor(this)})
      } 
  }catch{
    console.log(`${str}添加change事件出错！！！`);
  }
}
function  setColor(dom){
 if(dom){
    if(typeof dom.oldClassName==='undefined'){
      dom.oldClassName=dom.className
    }   
    if(dom.className!='commoni'&&dom.className!='commond'){
      if(dom.type=='radio'){
          //for(let i=0;i<dom.length;i++){
          //let obj = dom[i]
            if(trim(dom.checked)!=trim(dom.title)){
              dom.className=`${dom.oldClassName}u`
            }else{
              dom.className=dom.oldClassName
            }  
         // }
      }else{
        if(isNaN(parseFloat(replaced(dom.title,',')))||dom.type=='date'){//非数字 和日期格式数据
          if(dom.title!=dom.value){
            if(dom.oldClassName!='undefined'){
              dom.className=`${dom.oldClassName}u`
            }else{
              dom.className='commonu'
            }
          }else{
            if(dom.oldClassName!='undefined'){
              dom.className=dom.oldClassName
            }else{
              dom.className='common'
            }
          }
        }else{//数字格式
          if(parseFloat(replaced(dom.title,','))!=parseFloat(replaced(dom.value,','))){
            if(dom.oldClassName!='undefined'){
              dom.className=`${dom.oldClassName}u`
            }else{
              dom.className='commonu'
            }   
          }else{
            if(dom.oldClassName!='undefined'){
              dom.className=dom.oldClassName
            }else{
              dom.className='common'
            }
          }
        }
      }
    }  
 } 
}

export {
  showPage,
  pressDecimals,
  checkDecimal,
  checkLength,
  isEmpty,
  getNextDateFullDate,
  getNextYearFullDate,
  checkFullDate,
  pressFullDate,
  pressDatetime,
  checkBetweenDate,
  getCurrentDate,
  getNextDate,
  getCurrentTime,
  replace,
  checkInteger,
  pressInteger,
  isInteger,
  compareFullDate,
  errorMessage,
  checkFocusZero,
  numberFormatMoney,
  pressDecimal,
  checkDecimal1,
  al,
  number_format,
  splitChange,
  round,
  point,
  replaced,
  getShortRate,
  pointFour,
  pointTwo,
  convertFullDateToString,
  numberFormat,
  newString,
  mathRound,
  uuid,
  viewTraceForUndwrt,
  setContainerReadonly,
  setOnchangeOfTable,
  getPreDateFullDate,
  setTitle,//设置元素的title 
  addevent, //设置页面元素,添加事件
  deleteRowForPG,//删除一行数据的方法
  insertRowForPG,//新增一行数据的方法
  setReadonlyOfElement,// 
  trim,
  setColor
}