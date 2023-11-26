import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Captain from './pages/Captain.vue';
import CaptainList from './pages/CaptainList.vue';
import CaptainSummary from './pages/CaptainSummary.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          alias: '/',
          name: 'Record',
          component: CaptainList
        },
        {
          path: '/summary',
          name: 'Summary',
          component: CaptainSummary,
          meta: {
            pos: '#summary'
          }
        },
        {
          path: '/roll',
          name: 'Roll',
          component: () => import('./pages/Roll.vue'),
          meta: {
            pos: '#roll'
          }
        },
        {
          path: '/:year/:month/:day',
          name: 'RecordDay',
          component: CaptainList,
          meta: {
            pos: '#vup-info'
          }
        }
      ]
    },
    {
      path: '/captain/:user',
      name: 'Captain',
      component: Captain
    },
    {
      path: '/pages/now',
      name: 'Now',
      component: () => import('./pages/Now.vue'),
    },
    {
      path: '/pages/nowmoblie',
      name: 'NowMoblie',
      component: () => import('./pages/NowMoblie.vue'),
    }
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.pos) {
      return {
        el: to.meta.pos
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});
