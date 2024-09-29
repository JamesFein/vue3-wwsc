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

import GoodsItem from "@/views/Home/components/GoodsItem.vue";
import { useCategory } from "./composables/useCategory";
import {useBanner } from "./composables/useBanner";

//面包屑及一级分类数据
const {categoryData} = useCategory();
//轮播图
const {bannerList} = useBanner();
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
