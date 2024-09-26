<script setup>
import HomePanel from './HomePanel.vue'
import GoodsItem from './GoodsItem.vue'
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
                    <img v-img-lazy="cate.picture" />
                    <strong class="lable">
                        <span>{{ cate.name }}馆</span>
                        <span>{{ cate.saleInfo }}</span>
                    </strong>
                </router-link>
                <ul class="goods-list">
                    <li v-for="good in cate.goods" :key="good.id">
                        <GoodsItem :good="good"></GoodsItem>
                    </li>
                </ul>
            </div>
        </HomePanel>
    </div>
</template>

<style scoped lang='scss'>
.home-product {
  background: #fff;
  margin-top: 20px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: auto; /* 保持宽度自动调整 */
        height: 100%; /* 高度占满父级元素 */
        object-fit: cover; /* 保持比例，自动裁剪部分内容 */
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

  }
}
</style>