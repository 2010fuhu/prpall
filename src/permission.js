/**
 * 权限校验：
 *  Vue Router中的 前置钩子函数 beforeEach(to, from, next)
 * 当进行路由跳转之前，进行判断 是否已经登录 过，登录过则允许访问非登录页面，否则 回到登录页
 * 
 * to:  即将要进入的目标路由对象
 * from: 即将要离开的路由对象
 * next: 是一个方法，可以指定路由地址，进行路由跳转
 */
 import store from './store'
 import router from './router'
 router.beforeEach((to, from , next) => {
    store.state.userCode=typeof(to.query.userCode)=='undefined'?(store.state.userCode==''?'':store.state.userCode):to.query.userCode
    store.state.riskCode=typeof(to.query.riskcode)=='undefined'?(store.state.riskCode==''?'':store.state.riskCode):to.query.riskcode
    store.state.comCode=typeof(to.query.comCode)=='undefined'?(store.state.comCode==''?'':store.state.comCode):to.query.comCode
    console.log(`${ store.state.userCode} ${store.state.riskCode} ${store.state.comCode}`)
    if(to.path=='/main'&&from.path=='/'){
        global.show=''
        global.path='tbcbpg'
        store.state.certiType='I'
    }else if(to.path=='/pgMain'){
        global.show='Pg'
        global.path='pg'
        //store.state.comCode='41000000'
        //store.state.certiType='I'
    }else if(to.path=='/main'&&from.path=='/queryProposalList'){
        global.show=''
        global.path='tbcbpg'
        //store.state.certiType='U'
    }else if(to.path=='/proposalShow'||to.path=='/policyShow'){
        global.show='Show'
        global.path='show'
    }else if(to.path=='/endorseShow'){
        global.show='ShowPg'
        global.path='showpg'
    }
     next()

 })