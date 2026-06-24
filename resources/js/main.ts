import '../css/app.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import ui from '@nuxt/ui/vue-plugin'

import App from './App.vue'

const app = createApp(App)

const head = createHead()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./pages/index.vue')
    }
  ]
})

app.use(head)
app.use(router)
app.use(ui)

app.mount('#app')
