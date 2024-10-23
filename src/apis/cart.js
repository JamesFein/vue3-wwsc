import http from "@/utils/http";

/**
 * @description: 登录后, 合并清空本地后, 再从服务器获取此用户最新购物车列表
 * @param {*}
 * @return {*}
 */

export function findNewCartListAPI(){
    return http.get('/member/cart');
}

/**
 * @description: 根据sku对象进行新增购物车
 * @param {goods} 这是一个商品对象，其中主要包含{"skuId": "300283140", "count": 100}
 * @return {*}
 */
export function insertCartAPI(goods){
    return http.post('/member/cart', goods);
}

export const delCartAPI = (ids) => {
    return http.delete('/member/cart', {data:{ids}})
    //这里的data是axios的配置项.
}

export function mergeCartAPI(data){
    return http.post('/member/cart/merge', data);
}

//修改购物项
export function updateCartItem(skuId, data){
    return http.put(`/member/cart/${skuId}`, data);
}