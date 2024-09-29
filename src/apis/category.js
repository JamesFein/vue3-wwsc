import http from "@/utils/http";

/**
 * @description: 根据id获得一级分类对象信息
 * @param {*} id 分类id
 * @return {*}
 */

export function getTopCategoryByIdAPI(id) {
  //return http.get(`/category/${id}`); //结果的 URL 格式会是类似 /category/123（假设 id 是 123）。
  return http.get('/category', {params: {id}}); //结果的 URL 格式会是类似 /category有id=1005000作为参数。参数不写在url里面
}

export function getSubCategoryFilterAPI(id) {
  return http.get('/category/sub/filter', {params: {id}});
}

/**
 * @description: 获取二级分类商品列表
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */

export const getSubCategoryGoodsAPI = (data) => {
  return http.post('/category/goods/temporary', {params: data}); //太万恶了，这个在api的网页里面竟然没有
}