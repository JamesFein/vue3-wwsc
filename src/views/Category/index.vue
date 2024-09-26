<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
          <!-- 如何修复要刷新数据才能变化的问题 -->
        </el-breadcrumb>
      </div>
    </div>
  </div>
    <!-- 轮播图 -->
  <div class="home-banner">
      <el-carousel height="500px" arrow="never" autoplay>
          <el-carousel-item v-for="item in bannerList" :key="item">
              <img :src="item.imgUrl" alt="">
          </el-carousel-item>
      </el-carousel>
  </div>

  <!-- 分类产品图片 -->
  <div class="sub-list">
    <h3>全部分类</h3>
    <ul>
      <!-- categoryData是result的值,result.children是一个列表 -->
      <li v-for="i in categoryData.children" :key="i.id">
        <router-link to="/">
          <img :src="i.picture" alt="">
          <p>{{ i.name }}</p>
        </router-link>
      </li>
    </ul>
  </div>
  <!-- 分类产品列表 -->
  <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
    <div class="head">
      <h3 class="tag">-{{ item.name }}-</h3>
    </div>
    <div class="body">
      <GoodsItem v-for="good in item.goods" :good="good" :key="good.id"></GoodsItem>
    </div>
  </div>

</template>

<script setup>
import { getTopCategoryByIdAPI } from "@/apis/category";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, onUpdated, ref} from "vue";
import { getBannerAPI } from "@/apis/home";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";


const categoryData = ref({});
const route = useRoute();
//调用 useRoute() 会返回当前活跃的路由对象，这个对象包含了当前路由的各种信息，如路径、参数、查询等。
//通过这种方式获取的 route 对象是响应式的，意味着当路由发生变化时，route 对象会自动更新。
const getCategory = async (id) => {
    // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
    //console.log(route.params.id);
    //用户肯定是点击了一个分类进来，所以这里的id就是分类id，不可能也不应该为空
    const res = await getTopCategoryByIdAPI(id);
    categoryData.value = res.result;
};
onMounted(()=>getCategory(route.params.id));

// onBeforeRouteUpdate((to)=>{
//   getCategory(to.params.id);
// })
// 是Vue Router提供的一个组合式API函数。它在当前路由改变，但是该组件被复用时调用。

//轮播图
const bannerList = ref([]);
const getBanner = async () => {
  const res = await getBannerAPI('3');//给的接口就是这样，不论数字是几，做出来就这样
  bannerList.value = res.result;
}
onMounted(()=>getBanner());
</script>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }



  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}

.sub-list {
    margin-top: 20px;
    background-color: #fff;
    padding-top: 20px;

    h3 {
      text-align: center;
      margin-bottom: 20px;
    }

    ul {
      justify-content: space-around;
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
}

.ref-goods {
    padding-top: 20px;
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
}


</style>
