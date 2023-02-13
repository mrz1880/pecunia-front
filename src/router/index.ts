import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import RegisterView from "@/views/RegisterView.vue"
import LoginView from "@/views/LoginView.vue"
import BankAccountView from "@/views/BankAccountView.vue"

export const routes = {
  home: {
    path: "/",
    name: "home",
    component: HomeView,
  },
  register: {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  login: {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  addBankAccount: {
    path: "/add-bank-account",
    name: "add-bank-account",
    component: BankAccountView,
  },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home.path,
      name: routes.home.name,
      component: routes.home.component,
    },
    {
      path: routes.register.path,
      name: routes.register.name,
      component: routes.register.component,
    },
    {
      path: routes.login.path,
      name: routes.login.name,
      component: routes.login.component,
    },
    {
      path: routes.addBankAccount.path,
      name: routes.addBankAccount.name,
      component: routes.addBankAccount.component,
    },
  ],
})
export default router
