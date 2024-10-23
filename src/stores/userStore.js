import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore';
import { mergeCartAPI } from '@/apis/cart';

export const useUserStore = defineStore('user', 
  () => {
    // 1.定义管理用户数据的state，在 Vue 3 中，使用 defineStore 和 ref 来管理状态时，通常只有通过 ref 创建的响应式数据才会被储存在 state 中。
    const userInfo = ref({})
    const cartStore = useCartStore();
    // 2.定义获取接口数据的action函数
    const getUserInfo = async (user) => {
      const res = await loginAPI(user)
      userInfo.value = res.result
      await mergeCartAPI(cartStore.cartList.map(item=>{
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count
        }
      }))
      
      //刷新购物车列表
      cartStore.updateLoginCartList();
    }
    // 3.退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
    }


    // 4.以对象的格式把state和action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
   {
    persist: true
   })
