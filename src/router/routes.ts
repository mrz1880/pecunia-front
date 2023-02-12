import RegisterView from "@/views/RegisterView.vue"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"

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
}
