import RegisterForm from "@/views/RegisterForm.vue"
import LoginForm from "@/views/LoginForm.vue"

export const routes = [
  {
    path: "/",
    name: "home",
    component: RegisterForm,
  },
  { path: "/register", component: RegisterForm },
  { path: "/login", component: LoginForm },
]
