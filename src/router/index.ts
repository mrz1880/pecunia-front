import { createRouter, createWebHistory } from "vue-router"
import { routes } from "@/router/routes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routes).map((route) => {
    return {
      path: route.path,
      name: route.name,
      component: route.component,
    }
  }),
})
export default router
