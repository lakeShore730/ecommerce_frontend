import { lazy } from "react";

const Home = lazy(() => import("../../pages/index"));
const Search = lazy(() => import("../../pages/search"));
const Product = lazy(() => import("../../pages/product"));
const ProductsByCategory = lazy(() =>
  import("../../pages/products-by-category")
);
const Register = lazy(() => import("../../pages/auth/register"));
const VerifyRegisterOtp = lazy(() =>
  import("../../pages/auth/verify-register-otp")
);
const Account = lazy(() => import("../../pages/account"));
const Cart = lazy(() => import("../../pages/cart"));
const Orders = lazy(() => import("../../pages/order"));
const OrderItems = lazy(() => import("../../pages/order/order-items"));

const appRoutes = [
  {
    id: "home",
    path: "/",
    exact: true,
    component: Home,
    meta: {
      appLayout: true,
      privateRoute: false,
    },
  },

  {
    id: "search",
    path: "/Search",
    exact: true,
    component: Search,
    meta: {
      appLayout: true,
      privateRoute: false,
    },
  },

  {
    id: "product",
    path: "/product/:id",
    exact: true,
    component: Product,
    meta: {
      appLayout: true,
      privateRoute: false,
    },
  },

  {
    id: "productsByCategory",
    path: "/products/category/:id",
    exact: true,
    component: ProductsByCategory,
    meta: {
      appLayout: true,
      privateRoute: false,
    },
  },

  {
    id: "register",
    path: "/register",
    exact: true,
    component: Register,
    meta: {
      appLayout: true,
      privateRoute: false,
    },
  },

  {
    id: "verify-register-otp",
    path: "/register/verify-otp",
    exact: true,
    component: VerifyRegisterOtp,
    meta: {
      appLayout: true,
      privateRoute: false,
    },
  },

  {
    id: "account",
    path: "/account",
    exact: true,
    component: Account,
    meta: {
      appLayout: true,
      privateRoute: true,
    },
  },

  {
    id: "cart",
    path: "/cart",
    exact: true,
    component: Cart,
    meta: {
      appLayout: true,
      privateRoute: true,
    },
  },

  {
    id: "orders",
    path: "/orders",
    exact: true,
    component: Orders,
    meta: {
      appLayout: true,
      privateRoute: true,
    },
  },

  {
    id: "orderItems",
    path: "/orders/:orderId",
    exact: true,
    component: OrderItems,
    meta: {
      appLayout: true,
      privateRoute: true,
    },
  },
];

export default appRoutes;
