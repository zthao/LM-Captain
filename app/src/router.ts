import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Captain from './pages/Captain.vue';
import CaptainList from './pages/CaptainList.vue';
import CaptainSummary from './pages/CaptainSummary.vue';
import Now from './pages/Now.vue';
import Now_cloudflare from './pages/Now_cloudflare.vue';
import Now_tampermonkey from './pages/Now_tampermonkey.vue';
import Now_phpproxy from './pages/Now_phpproxy.vue';

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
      component: Now
    },
    {
      path: '/pages/now/cloudflare',
      name: 'Now_cloudflare',
      component: Now_cloudflare
    },
    {
      path: '/pages/now/tampermonkey',
      name: 'Now_tampermonkey',
      component: Now_tampermonkey
    },
    {
      path: '/pages/now/phpproxy',
      name: 'Now_phpproxy',
      component: Now_phpproxy
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
