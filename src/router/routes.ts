import RegisterForm from "@/components/RegisterForm.vue"

export const routes = [
  {
    path: "/",
    name: "home",
    component: RegisterForm,
  },
  { path: "/register", component: RegisterForm },
]
