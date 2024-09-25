<script setup>
import HomePanel from './HomePanel.vue'
import { getGoodsAPI } from '@/apis/home'

const goodsProduct = ref([])
const getGoods = async () => {
    const { result } = await getGoodsAPI()
    goodsProduct.value = result
    console.log('result', result)
}
onMounted( () => getGoods() )


</script>

<template>
    <div class="home-product">
        <HomePanel v-for="cate in goodsProduct" :title="cate.name" subTitle="好物" :key="cate.id" >
            <div class="box">
                <router-link class="cover" to="/">
                    <img :src="cate.picture" />
                    <strong class="lable">
                        <span>{{ cate.name }}馆</span>
                        <span>{{ cate.saleInfo }}</span>
                    </strong>
                </router-link>
                <ul class="goods-list">
                    <li v-for="good in cate.goods" :key="good.id">
                        <router-link to="/" class="goods-item">
                            <img :src="good.picture" alt="">
                            <p class="name ellipsis">{{ good.name }}</p>
                            <p class="desc ellipsis">{{ good.desc }}</p>
                            <p class="price">&yen;{{ good.price }}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </HomePanel>
    </div>
</template>

<style scoped>

</style>