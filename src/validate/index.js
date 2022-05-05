import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import {attributesCh} from './validatorRule.js'
Vue.use(VeeValidate)
Validator.addLocale(zhCN)   
Validator.localize('zh_CN', {
  messages: zhCN.messages,
  attributes: attributesCh
})
export  function setMessage(validName, errMsgZh,errMsgEn, validate) {

  Validator.locale = 'zh_CN'
  Validator.extend(validName, {
    // eslint-disable-next-line no-unused-vars
    getMessage: (field, args) => {
      console.log(args);
      return errMsgZh
    },
    validate: validate
  })
}


