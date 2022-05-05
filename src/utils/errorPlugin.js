import router  from '@/router'
function isPromise(ret) {
    return (ret && typeof ret.then === 'function' && typeof ret.catch === "function")
}
const errorHandler = (msg,  trace) => {
    console.log('抛出全局异常')
    router.push( {path: '/UnderwriteSubmit',query: {status:'failure',message:`警告: ${msg}\nTrace: ${trace}`}})
}
function registerActionHandle(actions) {
    Object.keys(actions).forEach(key => {
        let fn = actions[key]
        actions[key] = function (...args) {
            let ret = fn.apply(this, args)
            if (isPromise(ret)) {
                return ret.catch(errorHandler)
            } else { // 默认错误处理
                return ret
            }
        }
    })
}
const registerVuex = (instance) => {
    if (instance.$options['store']) {
        let actions = instance.$options['store']['_actions'] || {}
        if (actions) {
            let tempActions = {}
            Object.keys(actions).forEach(key => {
                tempActions[key] = actions[key][0]
            })
            registerActionHandle(tempActions)
        }
    }
}
const registerVue = (instance) => {
    if (instance.$options.methods) {
        let actions = instance.$options.methods || {}
        if (actions) {
            registerActionHandle(actions)
        }
    }
}

let GlobalError = {
    // eslint-disable-next-line no-unused-vars
    install: (Vue, options) => {
        /**
         * 全局异常处理
         * @param {
         * } error 
         * @param {*} vm 
         */
        Vue.config.errorHandler = errorHandler
        Vue.mixin({
            beforeCreate() {
                registerVue(this)
                registerVuex(this)
            }
        })
        //Vue.prototype.$throw = errorHandler
    }
}

export default GlobalError
