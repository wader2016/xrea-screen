import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Screen from '@/components/screen/index'
import Home from '@/components/home/home'
import Application from '@/components/home/application/application'
import AppRank from '@/components/home/appRank/appRank'
import Devices from '@/components/deviceLink/devices'
import DeviceLink from '@/components/deviceLink/deviceLink'
import DevDetail from '@/components/deviceLink/devDetail/devDetail'
import DevMap from '@/components/deviceLink/devMap/devMap'
import IntelligentFactory from '@/components/intelligentFactory/intelligentFactory'
import IntelligentLogistics from '@/components/intelligentLogistics/intelligentLogistics'
import IntelligentService from '@/components/intelligentService/intelligentService'
import DataMarket from '@/components/dataMarket/dataMarket'
import Macroeconomic from '@/components/macroeconomic/macroeconomic'
import Inventory from '@/components/macroeconomic/inventory/inventory'
import WorkTime from '@/components/macroeconomic/workTime/workTime'
import Finance from '@/components/finance/finance'
import OBOR from '@/components/OBOR/OBOR'
import Analyze from '@/components/analyze/analyze'
import IdResolution from '@/components/idResolution/idResolution'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/screen',
      name: 'Screen',
      component: Screen,
      children: [
        {
          path: '/screen',
          redirect: '/screen/home'
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'application/:Id',
          name: 'application',
          component: Application
        },
        {
          path: 'appRank/:Id',
          name: 'appRank',
          component: AppRank
        },
        {
          path: 'devices',
          name: 'Devices',
          component: Devices
        },
        {
          path: 'deviceLink/:id',
          name: 'DeviceLink/:id',
          component: DeviceLink,
          children: [
            {
              path: '/screen/deviceLink/:id',
              redirect: '/screen/deviceLink/:id/devDetail'
            },
            {
              path: 'devDetail',
              name: 'DevDetail',
              component: DevDetail
            },
            {
              path: 'devMap',
              name: 'DevMap',
              component: DevMap
            }
          ]
        },
        {
          path: 'intelligentFactory',
          name: 'IntelligentFactory',
          component: IntelligentFactory
        },
        {
          path: 'intelligentLogistics',
          name: 'IntelligentLogistics',
          component: IntelligentLogistics
        },
        {
          path: 'intelligentService',
          name: 'IntelligentService',
          component: IntelligentService
        },
        {
          path: 'dataMarket',
          name: 'DataMarket',
          component: DataMarket
        },
        {
          path: 'macroeconomic',
          name: 'Macroeconomic',
          component: Macroeconomic,
          children: [
            {
              path: '/screen/macroeconomic',
              redirect: '/screen/macroeconomic/inventory'
            },
            {
              path: 'inventory',
              name: 'Inventory',
              component: Inventory
            },
            {
              path: 'workTime',
              name: 'WorkTime',
              component: WorkTime
            }
          ]
        },
        {
          path: 'finance',
          name: 'Finance',
          component: Finance
        },
        {
          path: 'OBOR',
          name: 'OBOR',
          component: OBOR
        },
        {
          path: 'Analyze',
          name: 'Analyze',
          component: Analyze
        },
        {
          path: 'idResolution',
          name: 'idResolution',
          component: IdResolution
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    const token = localStorage.getItem('token') || ''
    if (token !== '') {
      next()
    } else {
      next({path: '/login', replace: true})
    }
  } else {
    next()
  }
})

export default router
