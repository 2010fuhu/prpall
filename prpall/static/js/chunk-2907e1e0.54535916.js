(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2907e1e0"],{"17b2":function(e,r,t){"use strict";var a=t("b775");r["a"]={findEndorseWhereTotal:function(e){return Object(a["a"])({url:"/endorse/findlist",method:"post",data:JSON.stringify(e)})},findEndorseWhere:function(e){return Object(a["a"])({url:"/endorse/findlist",method:"post",data:JSON.stringify(e)})},findEndorseInfo:function(e){return Object(a["a"])({url:"/endorse/findinfo3",method:"post",data:JSON.stringify(e)})},endorseDelete:function(e){var r="/endorse/delete";return Object(a["a"])({url:r,method:"post",data:JSON.stringify(e)})},endorseCencel:function(e){var r="/selectbaseinfo/endorseCencel";return Object(a["a"])({url:r,method:"get",params:{endorseNo:e}})},findEndorseText:function(e){var r="/endorse/textfind";return Object(a["a"])({url:r,method:"post",data:JSON.stringify(e)})}}},"255f":function(e){e.exports=JSON.parse('{"reqHeader":{"transNo":"","transDate":"","transTime":"","sysUserCode":"","sysPassWord":"","sign":"1","channelCode":"0"},"prpPmainQueryReq":{"riskCode":"2244","endorseNoSign":"=","endorseNo":"","policyNoSign":"=","policyNo":"","insuredCodeSign":"=","insuredCode":"","insuredNameSign":"=","insuredName":"","endorDateSign":"=","endorDate":"","validDateSign":"=","validDate":"","handlerCodeSign":"=","handlerCode":"","operatorCodeSign":"=","operatorCode":"","printNoSign":"=","printNo":"","inputDateSign":"=","inputDate":"","underWriteCodeSign":"=","underWriteCode":"","underWriteNameSign":"=","underWriteName":"","underWriteFlag":[],"underWriteValidDateSign":"=","underWriteValidDate":"","endorType":[]},"pageInfoVo":{"pageSize":"10","pageNum":"","total":""}}')},c340:function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("form",[t("table",{staticClass:"common",attrs:{cellpadding:"3",cellspacing:"0"}},[t("tr",[t("td",{staticClass:"formtitle",attrs:{colspan:"4"}},[e._v("批单查询 "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.riskCode,expression:"obj.prpPmainQueryReq.riskCode"}],attrs:{type:"hidden",name:"riskCode"},domProps:{value:e.obj.prpPmainQueryReq.riskCode},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"riskCode",r.target.value)}}}),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.policySort,expression:"obj.prpPmainQueryReq.policySort"}],attrs:{type:"hidden",name:"policySort"},domProps:{value:e.obj.prpPmainQueryReq.policySort},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"policySort",r.target.value)}}})])]),t("tr",[t("td",{staticClass:"title"},[e._v("批单号码：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.endorseNoSign,expression:"obj.prpPmainQueryReq.endorseNoSign"}],staticClass:"tag",attrs:{name:"endorseNoSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"endorseNoSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.endorseNo,expression:"obj.prpPmainQueryReq.endorseNo"}],staticClass:"query",attrs:{name:"endorseNo",maxlength:"25"},domProps:{value:e.obj.prpPmainQueryReq.endorseNo},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"endorseNo",r.target.value)}}})]),t("td",{staticClass:"title"},[e._v("保单号：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.policyNoSign,expression:"obj.prpPmainQueryReq.policyNoSign"}],staticClass:"tag",attrs:{name:"policyNoSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"policyNoSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.policyNo,expression:"obj.prpPmainQueryReq.policyNo"}],staticClass:"query",attrs:{name:"policyNo",maxlength:"22"},domProps:{value:e.obj.prpPmainQueryReq.policyNo},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"policyNo",r.target.value)}}})])]),t("tr",[t("td",{staticClass:"title"},[e._v("被保险人代码：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.insuredCodeSign,expression:"obj.prpPmainQueryReq.insuredCodeSign"}],staticClass:"tag",attrs:{name:"insuredCodeSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"insuredCodeSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.insuredCode,expression:"obj.prpPmainQueryReq.insuredCode"}],staticClass:"query",attrs:{name:"insuredCode",maxlength:"16"},domProps:{value:e.obj.prpPmainQueryReq.insuredCode},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"insuredCode",r.target.value)}}})]),t("td",{staticClass:"title"},[e._v("被保险人名称：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.insuredNameSign,expression:"obj.prpPmainQueryReq.insuredNameSign"}],staticClass:"tag",attrs:{name:"insuredNameSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"insuredNameSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.insuredName,expression:"obj.prpPmainQueryReq.insuredName"}],staticClass:"query",attrs:{name:"insuredName",maxlength:"120"},domProps:{value:e.obj.prpPmainQueryReq.insuredName},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"insuredName",r.target.value)}}})])]),t("tr",[t("td",{staticClass:"title"},[e._v("批改日期：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.endorDateSign,expression:"obj.prpPmainQueryReq.endorDateSign"}],staticClass:"tag",attrs:{name:"endorDateSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"endorDateSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:">"}},[e._v("> ")]),t("option",{attrs:{value:"<"}},[e._v("< ")]),t("option",{attrs:{value:">="}},[e._v(">=")]),t("option",{attrs:{value:"<="}},[e._v("<=")]),t("option",{attrs:{value:":"}},[e._v(": ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.endorDate,expression:"obj.prpPmainQueryReq.endorDate"}],staticClass:"query",attrs:{name:"endorDate",maxlength:"10"},domProps:{value:e.obj.prpPmainQueryReq.endorDate},on:{keypress:function(r){return e.$uiCommon.pressDatetime(r)},blur:function(r){return e.$uiCommon.checkBetweenDate(r)},input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"endorDate",r.target.value)}}})]),t("td",{staticClass:"title"},[e._v("批改生效日期：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.validDateSign,expression:"obj.prpPmainQueryReq.validDateSign"}],staticClass:"tag",attrs:{name:"validDateSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"validDateSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:">"}},[e._v("> ")]),t("option",{attrs:{value:"<"}},[e._v("< ")]),t("option",{attrs:{value:">="}},[e._v(">=")]),t("option",{attrs:{value:"<="}},[e._v("<=")]),t("option",{attrs:{value:":"}},[e._v(": ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.validDate,expression:"obj.prpPmainQueryReq.validDate"}],staticClass:"query",attrs:{name:"validDate",maxlength:"10"},domProps:{value:e.obj.prpPmainQueryReq.validDate},on:{keypress:function(r){return e.$uiCommon.pressDatetime(r)},blur:function(r){return e.$uiCommon.checkBetweenDate(r)},input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"validDate",r.target.value)}}})])]),t("tr",[t("td",{staticClass:"title"},[e._v("经办人代码：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.handlerCodeSign,expression:"obj.prpPmainQueryReq.handlerCodeSign"}],staticClass:"tag",attrs:{name:"handlerCodeSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"handlerCodeSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.handlerCode,expression:"obj.prpPmainQueryReq.handlerCode"}],staticClass:"query",attrs:{name:"handlerCode",maxlength:"10"},domProps:{value:e.obj.prpPmainQueryReq.handlerCode},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"handlerCode",r.target.value)}}})]),t("td",{staticClass:"title"},[e._v("操作员代码：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.operatorCodeSign,expression:"obj.prpPmainQueryReq.operatorCodeSign"}],staticClass:"tag",attrs:{name:"operatorCodeSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"operatorCodeSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.operatorCode,expression:"obj.prpPmainQueryReq.operatorCode"}],staticClass:"query",attrs:{name:"operatorCode",maxlength:"10"},domProps:{value:e.obj.prpPmainQueryReq.operatorCode},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"operatorCode",r.target.value)}}})])]),t("tr",[t("td",{staticClass:"title"},[e._v("批单印刷号：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.printNoSign,expression:"obj.prpPmainQueryReq.printNoSign"}],staticClass:"tag",attrs:{name:"printNoSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"printNoSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.printNo,expression:"obj.prpPmainQueryReq.printNo"}],staticClass:"query",attrs:{name:"printNo",maxlength:"25"},domProps:{value:e.obj.prpPmainQueryReq.printNo},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"printNo",r.target.value)}}})]),t("td",{staticClass:"title"},[e._v("输入日期：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.inputDateSign,expression:"obj.prpPmainQueryReq.inputDateSign"}],staticClass:"tag",attrs:{name:"inputDateSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"inputDateSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:">"}},[e._v("> ")]),t("option",{attrs:{value:"<"}},[e._v("< ")]),t("option",{attrs:{value:">="}},[e._v(">=")]),t("option",{attrs:{value:"<="}},[e._v("<=")]),t("option",{attrs:{value:":"}},[e._v(": ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.inputDate,expression:"obj.prpPmainQueryReq.inputDate"}],staticClass:"query",attrs:{name:"inputDate",maxlength:"10"},domProps:{value:e.obj.prpPmainQueryReq.inputDate},on:{keypress:function(r){return e.$uiCommon.pressDatetime(r)},blur:function(r){return e.$uiCommon.checkBetweenDate(r)},input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"inputDate",r.target.value)}}})])]),t("tr",[t("td",{staticClass:"title"},[e._v("核保人代码：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteCodeSign,expression:"obj.prpPmainQueryReq.underWriteCodeSign"}],staticClass:"tag",attrs:{name:"underWriteCodeSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"underWriteCodeSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteCode,expression:"obj.prpPmainQueryReq.underWriteCode"}],staticClass:"query",attrs:{name:"underWriteCode",maxlength:"10"},domProps:{value:e.obj.prpPmainQueryReq.underWriteCode},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"underWriteCode",r.target.value)}}})]),t("td",{staticClass:"title"},[e._v("核保人名称：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteNameSign,expression:"obj.prpPmainQueryReq.underWriteNameSign"}],staticClass:"tag",attrs:{name:"underWriteNameSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"underWriteNameSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:"*"}},[e._v("* ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteName,expression:"obj.prpPmainQueryReq.underWriteName"}],staticClass:"query",attrs:{name:"underWriteName",maxlength:"120"},domProps:{value:e.obj.prpPmainQueryReq.underWriteName},on:{input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"underWriteName",r.target.value)}}})])]),t("tr",[t("td",{staticClass:"title"},[e._v("核保标志：")]),t("td",{staticClass:"input"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteFlag,expression:"obj.prpPmainQueryReq.underWriteFlag"}],attrs:{type:"checkbox",name:"underWriteFlag",value:"0"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.underWriteFlag)?e._i(e.obj.prpPmainQueryReq.underWriteFlag,"0")>-1:e.obj.prpPmainQueryReq.underWriteFlag},on:{change:function(r){var t=e.obj.prpPmainQueryReq.underWriteFlag,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="0",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",n)}}}),e._v("初始值 "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteFlag,expression:"obj.prpPmainQueryReq.underWriteFlag"}],attrs:{type:"checkbox",name:"underWriteFlag",value:"1"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.underWriteFlag)?e._i(e.obj.prpPmainQueryReq.underWriteFlag,"1")>-1:e.obj.prpPmainQueryReq.underWriteFlag},on:{change:function(r){var t=e.obj.prpPmainQueryReq.underWriteFlag,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="1",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",n)}}}),e._v("通过 "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteFlag,expression:"obj.prpPmainQueryReq.underWriteFlag"}],attrs:{type:"checkbox",name:"underWriteFlag",value:"2"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.underWriteFlag)?e._i(e.obj.prpPmainQueryReq.underWriteFlag,"2")>-1:e.obj.prpPmainQueryReq.underWriteFlag},on:{change:function(r){var t=e.obj.prpPmainQueryReq.underWriteFlag,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="2",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",n)}}}),e._v("不通过 "),t("br"),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteFlag,expression:"obj.prpPmainQueryReq.underWriteFlag"}],attrs:{type:"checkbox",name:"underWriteFlag",value:"3"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.underWriteFlag)?e._i(e.obj.prpPmainQueryReq.underWriteFlag,"3")>-1:e.obj.prpPmainQueryReq.underWriteFlag},on:{change:function(r){var t=e.obj.prpPmainQueryReq.underWriteFlag,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="3",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",n)}}}),e._v("无需核保 "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteFlag,expression:"obj.prpPmainQueryReq.underWriteFlag"}],attrs:{type:"checkbox",name:"underWriteFlag",value:"9"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.underWriteFlag)?e._i(e.obj.prpPmainQueryReq.underWriteFlag,"9")>-1:e.obj.prpPmainQueryReq.underWriteFlag},on:{change:function(r){var t=e.obj.prpPmainQueryReq.underWriteFlag,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="9",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",n)}}}),e._v("待核保 "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteFlag,expression:"obj.prpPmainQueryReq.underWriteFlag"}],attrs:{type:"checkbox",name:"underWriteFlag",value:"C"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.underWriteFlag)?e._i(e.obj.prpPmainQueryReq.underWriteFlag,"C")>-1:e.obj.prpPmainQueryReq.underWriteFlag},on:{change:function(r){var t=e.obj.prpPmainQueryReq.underWriteFlag,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="C",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"underWriteFlag",n)}}}),e._v("风险累计中 ")]),t("td",{staticClass:"title"},[e._v("核保通过日期：")]),t("td",{staticClass:"input"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteValidDateSign,expression:"obj.prpPmainQueryReq.underWriteValidDateSign"}],staticClass:"tag",attrs:{name:"underWriteValidDateSign"},on:{change:function(r){var t=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var r="_value"in e?e._value:e.value;return r}));e.$set(e.obj.prpPmainQueryReq,"underWriteValidDateSign",r.target.multiple?t:t[0])}}},[t("option",{attrs:{value:"="}},[e._v("= ")]),t("option",{attrs:{value:">"}},[e._v("> ")]),t("option",{attrs:{value:"<"}},[e._v("< ")]),t("option",{attrs:{value:">="}},[e._v(">=")]),t("option",{attrs:{value:"<="}},[e._v("<=")]),t("option",{attrs:{value:":"}},[e._v(": ")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.underWriteValidDate,expression:"obj.prpPmainQueryReq.underWriteValidDate"}],staticClass:"query",attrs:{name:"underWriteValidDate",maxlength:"10"},domProps:{value:e.obj.prpPmainQueryReq.underWriteValidDate},on:{keypress:function(r){return e.$uiCommon.pressDatetime(r)},blur:function(r){return e.$uiCommon.checkBetweenDate(r)},input:function(r){r.target.composing||e.$set(e.obj.prpPmainQueryReq,"underWriteValidDate",r.target.value)}}})])]),t("tr",[t("td",{staticClass:"title"},[e._v("特殊批改类型：")]),t("td",{staticClass:"input",attrs:{colspan:"3"}},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.endorType,expression:"obj.prpPmainQueryReq.endorType"}],attrs:{type:"checkbox",name:"endorType",value:"21"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.endorType)?e._i(e.obj.prpPmainQueryReq.endorType,"21")>-1:e.obj.prpPmainQueryReq.endorType},on:{change:function(r){var t=e.obj.prpPmainQueryReq.endorType,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="21",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"endorType",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"endorType",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"endorType",n)}}}),e._v("全单退保批改 "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.endorType,expression:"obj.prpPmainQueryReq.endorType"}],attrs:{type:"checkbox",name:"endorType",value:"03"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.endorType)?e._i(e.obj.prpPmainQueryReq.endorType,"03")>-1:e.obj.prpPmainQueryReq.endorType},on:{change:function(r){var t=e.obj.prpPmainQueryReq.endorType,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="03",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"endorType",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"endorType",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"endorType",n)}}}),e._v("保单遗失批改 "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.endorType,expression:"obj.prpPmainQueryReq.endorType"}],attrs:{type:"checkbox",name:"endorType",value:"19"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.endorType)?e._i(e.obj.prpPmainQueryReq.endorType,"19")>-1:e.obj.prpPmainQueryReq.endorType},on:{change:function(r){var t=e.obj.prpPmainQueryReq.endorType,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="19",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"endorType",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"endorType",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"endorType",n)}}}),e._v("保单注销批改 "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.obj.prpPmainQueryReq.endorType,expression:"obj.prpPmainQueryReq.endorType"}],attrs:{type:"checkbox",name:"endorType",value:"14"},domProps:{checked:Array.isArray(e.obj.prpPmainQueryReq.endorType)?e._i(e.obj.prpPmainQueryReq.endorType,"14")>-1:e.obj.prpPmainQueryReq.endorType},on:{change:function(r){var t=e.obj.prpPmainQueryReq.endorType,a=r.target,n=!!a.checked;if(Array.isArray(t)){var i="14",o=e._i(t,i);a.checked?o<0&&e.$set(e.obj.prpPmainQueryReq,"endorType",t.concat([i])):o>-1&&e.$set(e.obj.prpPmainQueryReq,"endorType",t.slice(0,o).concat(t.slice(o+1)))}else e.$set(e.obj.prpPmainQueryReq,"endorType",n)}}}),e._v("赔款后减少保额 ")])]),t("tr",[t("td",{staticClass:"button",attrs:{colspan:"2"}},[t("input",{staticClass:"button",attrs:{name:"buttonSubmit",type:"button",alt:"查询",value:"查 询"},on:{click:function(r){return e.submitForm()}}})]),t("td",{staticClass:"button",attrs:{colspan:"2"}},[t("input",{staticClass:"button",attrs:{name:"buttonCancel",type:"button",alt:"重置",value:"重 置"},on:{click:function(r){return e.resetForm()}}})])])])])])},n=[],i=t("255f"),o=t("17b2"),p={},u={name:"QueryEndorseInput",data:function(){return{obj:i}},mounted:function(){p=JSON.parse(JSON.stringify(i))},methods:{submitForm:function(){var e=this;i.reqHeader.transNo=this.$uiCommon.uuid(16,32),i.reqHeader.transDate=this.$uiCommon.getCurrentDate(),i.reqHeader.transTime=this.$uiCommon.getCurrentTime(),i.reqHeader.sysUserCode=this.$store.state.userCode;var r=JSON.parse(JSON.stringify(i));this.queryData(r).then((function(){e.$router.push({name:"queryEndorseList",params:{Conditionobj:r}})}))["catch"]((function(r){e.$router.push({path:"/UnderwriteSubmit",query:{status:"failure",message:r}})}))},queryData:function(e){return new Promise((function(r,t){o["a"].findEndorseWhereTotal(e).then((function(e){var a=e.data.resHeader;"9998"==a.errCode||"9999"==a.errCode?t(a.errMsg):r()}))}))},resetForm:function(){Object.assign(this.obj,JSON.parse(JSON.stringify(p)))}}},s=u,l=t("2877"),d=Object(l["a"])(s,a,n,!1,null,null,null);r["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2907e1e0.54535916.js.map