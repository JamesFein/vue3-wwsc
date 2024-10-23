// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Detail from "@/views/Detail/index.vue";
import CartList from "@/views/CartList/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: "/",
      component: Layout,//http://localhost:5173/访问到这里
      children: [
        // 现在vuerouter的运行机制已经改了，“/空字符串”和“/”是等价的

        {
          path: "",
          component: Home,  //http://localhost:5173/home访问到homecomponent, 父级组件也会出现
        },
        {
          path: "category/:id", //:id 是一个动态路径参数。它会匹配 "detail/" 后面的任何内容，并将其作为 id 参数的值。在匹配的组件中，你可以通过 $route.params.id 来访问这个动态参数的值。
          component: Category,
        },
        {
          path: "category/sub/:id",
          component: SubCategory, //这个路由在apifox里面根本没有
        },
        {
          path: "detail/:id",
          component: Detail,
        },
        {
          path: 'cartlist',
          component: CartList,
        }
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
  //定制路由滚动行为
  scrollBehavior(){
    return{
      top:0
    }
  }
});

export default router;
