import { defineStore } from 'pinia';
import {ref, computed} from "vue";
import { useUserStore } from '@/stores/userStore';
import {findNewCartListAPI, insertCartAPI, delCartAPI, updateCartItem} from "@/apis/cart";

export const useCartStore = defineStore (
    'cart', 
    () => {
        const cartList = ref([]);
        //当前代码的逻辑是，一旦登录之后，只会获取从服务器拉取回来的最新购物车列表，原来的购物车列表就清空了。

        const userStore = useUserStore();
        const isLogin = computed(() => userStore.userInfo.token);

        //获取登录后最新的购物车列表action
        const updateLoginCartList = async () => {
            const res = await findNewCartListAPI();
            cartList.value = res.result;
        }

        const addCart = async (goods) => {
            if(isLogin.value){
                //登录之后将当前购物车加入到用户已有的购物车
                await insertCartAPI(goods);
                updateLoginCartList();
            }else {
                //判断商品是否在未登录用户的购物车中
                const item = cartList.value.find(item => goods.skuId === item.skuId);
                if(item){
                    item.count += goods.count;
                } else {
                    cartList.value.push(goods);
                }
            }

        }
        
        //计算属性
        //1. 总的数量 所有项的count之和
        const allCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0));
        //2. 总价格 所有项的count*price之和
        const allPrice = computed(() => cartList.value.reduce((total, item) => total + item.count * item.price, 0));

        // // 单选功能
        // const singleCheck = (skuId, selected) => {
        //     // 通过skuId找到要修改的那一项，把sku的selected的值修改为传过来的selected
        //     const item = cartList.value.find((item) => item.skuId === skuId)
        //     item.selected = selected //从语法讲，没有上下文的情况下item.selected可以是已有的属性，也可以是新增的属性
        // }

        const checkAll = (selected) => {
            cartList.value.forEach(item => item.selected = selected)
        }

        // 3.是否全选计算属性
        const isAll = computed(() => cartList.value.every((item) => item.selected))

        // 4. 已选择数量
        const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((totalCount, item) => totalCount + item.count, 0))

        // 5. 已经选择商品的价钱合计
        const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((totalPrice, item) => totalPrice + item.count * item.price, 0))

        // 6. 删除购物项
        const delCart = async (skuId) => {
            if(isLogin.value){
                //登录之后删除
                console.log([skuId])
                await delCartAPI([skuId])
                updateLoginCartList()
            }else {
                //思路：
                // 1.找到要删除项的下标值 - splice
                // 2.使用splice删除找到的项，原数组改变
                const idx = cartList.value.findIndex((item) => skuId === item.skuId)
                cartList.value.spice(idx,1)
            }
        }

        const clearCart = () => {
            cartList.value = []
        }

        //修改单个购物项
        const updateCartItemStore = async (goods) => {
            const {skuId, count, selected} = goods
            if (isLogin.value){
                await updateCartItem(skuId, {count, selected})
            }
        }

        return {
            allCount,
            allPrice,
            cartList,
            isAll,
            selectedCount,
            selectedPrice,
            addCart,
            delCart,
            checkAll,
            updateLoginCartList,
            clearCart,
            updateCartItemStore
            // singleCheck
        }

    },
    {
        persist: true
    }
)