import RegisterView from "@/views/RegisterView.vue"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/LoginView.vue"

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  { path: "/register", component: RegisterView },
  { path: "/login", component: LoginView },
]
