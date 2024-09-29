<template>
    <div class="container">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}`}">{{ filterData.parentName }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div class="sub-container">
        <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
            <!-- v-model用于将元素的值与变量绑定，当用户点击某个tab时，会触发tab-change事件 -->
            <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
            <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
            <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
        </el-tabs>
        <div class="body" v-infinite-scroll="load">
            <!-- infinite-scroll滚动触发load函数 -->
            <!-- load 是一个回调函数，当滚动到底部时，会触发该函数。回调就是代码先执行完了，再回头执行这个作为参数的函数 -->
            <!-- 商品列表 -->
            <GoodsItem v-for="good in goodsList" :good="good" :key="good.id"></GoodsItem>
            
        </div>
    </div>


</template>

<script setup>
import { getSubCategoryFilterAPI, getSubCategoryGoodsAPI } from '@/apis/category';
import { get } from '@vueuse/core';
import { useRoute } from 'vue-router';
import GoodsItem from '@/views/Home/components/GoodsItem.vue';

// 获取面包屑导航数据
const filterData = ref({});
const route = useRoute();
const getFilterData = async (id) => {
    const res = await getSubCategoryFilterAPI(id);
    filterData.value = res.result;
}
onMounted(() => getFilterData(route.params.id)); //函数的复用性很强，可以在多个地方调用，所以在这里使用route.params.id，而不是在上面使用

//获取二级分类商品
const goodsList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const getGoodList = async () => {
    const res = await getSubCategoryGoodsAPI(reqData.value);
    goodsList.value = res.result.items
}
onMounted(() => getGoodList())

// tab切换回调
const tabChange = () => {
    console.log('切换排序tab', reqData.value.sortField)
    // 元素的v-model与sortField绑定，当用户点击某个tab时，会触发tab-change事件，然后sortField就会改变,然后重新获取商品列表。而商品列表是响应式的，所以会自动更新
    reqData.value.page = 1
    getGoodList()
}

// 加载更多
const disabled = ref(false)

const load = async () => {
    console.log('加载更多数据咯')
    //获取下一页数据
    reqData.value.page++
    console.log(reqData.value.page)
    const res = await getSubCategoryGoodsAPI(reqData.value);
    //拼合新老数据
    goodsList.value = [...goodsList.value, ...res.result.items]
    // 加载完毕 停止监听,新的一页获取的项目长度为0
    if (res.result.items.length === 0) {
        disabled.value = true
    }

}

</script>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;
  width: 1240px;
  margin: 0 auto;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>