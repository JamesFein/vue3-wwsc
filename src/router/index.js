// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";

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
          path: "category/:id", //冒号表示获取参数值，id是参数名，要获取id就用route.params.id
          component: Category,
        },
        {
          path: "category/sub/:id",
          component: SubCategory, //这个路由在apifox里面根本没有
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
