import RegisterForm from "@/components/RegisterForm.vue"
import LoginForm from "@/components/LoginForm.vue"

export const routes = [
  {
    path: "/",
    name: "home",
    component: RegisterForm,
  },
  { path: "/register", component: RegisterForm },
  { path: "/login", component: LoginForm },
]
