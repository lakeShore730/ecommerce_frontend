import { lazy } from "react";

const Login = lazy(() => import("../../pages/auth/login"));

const authRoutes = [
  {
    id: "login",
    path: "/login",
    exact: true,
    component: Login,
    meta: {
      appLayout: true,
      privateRoute: false,
    },
  },
];

export default authRoutes;
