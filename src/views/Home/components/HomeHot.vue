<script setup>
import HomePanel from './HomePanel.vue';
import { getHotAPI } from '@/apis/home';
const hotList = ref([]);
const getHotList = async () => {
    const res = await getHotAPI();
    hotList.value = res.result;
    console.log('hotList', hotList.value) //这一行其实是后执行的，能够正常打印出来数据

}
onMounted(()=>getHotList()) 
console.log('hotList', hotList.value)//这一行其实是先执行的，那时hostList.Value是空的


</script>

<template>
<HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
            <router-link to="/">
                <img v-img-lazy="item.picture">
                <p class="name">{{item.name}}</p>
                <p class="desc">{{item.desc}}</p>
            </router-link>
        </li>
    </ul>
</HomePanel>
</template>

<style scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}

</style>