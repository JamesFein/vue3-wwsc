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