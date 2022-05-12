import Vue from "vue";
import Router from "vue-router";
Vue.use(Router)

//懒加载路由 
const routes = [ 

      {   
        name: 'policy',
        path: '/main',
        component: () => import('@/views/2244/input.vue'),
      },
      {   
        path: '/reinsMain',
        component: () => import('@/views/2244/input.vue'),
      },
      {   
        path: '/pgMain',
        component: () => import('@/views/2244/input.vue'),
      },
      {   
        path: '/proposalShow',
        component: () => import('@/views/2244/inputShow.vue'),
      },
      {   
        path: '/endorseShow',
        component: () => import('@/views/2244/inputShow.vue'),
      },
      {   
        path: '/policyShow',
        component: () => import('@/views/2244/inputShow.vue'),
      },
      {   
        
        path: '/endorseCommonInput',
        component: () => import('@/views/commonship/pg/UIEndorseCommonInput.vue'),
      
      },
      {   
        
        path: '/endorseCommonInputReins',
        component: () => import('@/views/commonship/pg/UIEndorseCommonInput.vue'),
      
      },
      {   
        
        path: '/endorseText',
        component: () => import('@/views/commonship/pg/UIEndorseCommonInputText.vue'),
      
      },
    {
      path: '/AgriType',
      component: () => import('@/views/commonship/MainAgriType.vue'),
    },
    {
      path: '/Save',
      component: () => import('@/views/commonship/UISaveProposalOrEndorse.vue'),
    },
    {
      path: '/excel',
      component: () => import('@/views/commonship/test/MainExceltest.vue'),
    },
    {
      path: '/UnderwriteSubmit',
      name:'UnderwriteSubmit',
      component: () => import('@/views/commonship/UnderwriteSubmit.vue'),
    },
    {
      path: '/Personnel',
      component: () => import('@/views/commonship/Personnel.vue'),
    },
    //这里require组件路径根据自己的配置引入 
     {
      path:'/UIEndorseCommonInputText',
      name:'UIEndorseCommonInputText',
      component:  () => import('@/views/commonship/help/PT001.vue'),
     },//批文措辞
     {
      path:'/queryProposal',
      name:'queryOrder',
      component:  () => import('@/views/commonship/query/queryProposalOrder.vue'),
     },
     {
      path:'/queryProposalList',
      name:'queryProposalList',
      component:  () => import('@/views/commonship/query/queryProposalList.vue'),
      props: true
     },
     {
      path:'/queryPolicy',
      name:'queryPolicyOrder',
      component:  () => import('@/views/commonship/query/queryPolicyOrder.vue'),
     },
     {
      path:'/queryPolicyList',
      name:'queryPolicyList',
      component:  () => import('@/views/commonship/query/queryPolicyList.vue'),
      props: true
    },
     {
      path:'/queryEndorse',
      name:'queryEndorseInput',
      component:  () => import('@/views/commonship/query/queryEndorseOrder.vue'),
     },
     {
      path:'/queryEndorseList',
      name:'queryEndorseList',
      component:  () => import('@/views/commonship/query/queryEndorseList.vue'),
      props: true
     },
     //核保信息
     {
      path:'/viewTraceForUndwrt',
      name:'viewTraceForUndwrt',
      component:  () => import('@/views/commonship/query/viewTraceForUndwrt.vue'),
     },

] 

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

//最后创建router 对路由进行管理，它是由构造函数 new vueRouter() 创建，接受routes 参数。 
 const router = new Router({ 
     mode:'history',
     base:'/prpall/',
     routes: routes,
     scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }
}) 
  
export default router; 