import React from "react";

const RawPosts = React.lazy(() => import("./views/Post/RawPosts"));
const AcceptedPosts = React.lazy(() => import("./views/Post/AcceptedPosts"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const BrandNew = React.lazy(() => import("./views/Brand/BrandNew"));
const BrandList = React.lazy(() => import("./views/Brand/BrandList"));
const MerchantNew = React.lazy(() => import("./views/Merchant/MerchantNew"));
const MerchantList = React.lazy(() => import("./views/Merchant/MerchantList"));
const CategoryNew = React.lazy(() => import("./views/Category/CategoryNew"));
const CategoryList = React.lazy(() => import("./views/Category/CategoryList"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/posts", exact: true, name: "Posts", component: RawPosts },
  { path: "/posts/rawposts", name: "Raw Posts", component: RawPosts },
  {
    path: "/posts/acceptedposts",
    name: " Accepted Posts",
    component: AcceptedPosts,
  },
  { path: "/brand/new", exact: true, name: "brand new", component: BrandNew },
  {
    path: "/brand/list",
    exact: true,
    name: "brand list",
    component: BrandList,
  },
  {
    path: "/merchant/new",
    exact: true,
    name: "merchant new",
    component: MerchantNew,
  },
  {
    path: "/merchant/list",
    exact: true,
    name: "merchant list",
    component: MerchantList,
  },
  {
    path: "/category/new",
    exact: true,
    name: "category new",
    component: CategoryNew,
  },
  {
    path: "/category/list",
    exact: true,
    name: "category list",
    component: CategoryList,
  },
];

export default routes;
