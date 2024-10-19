import http from "@/utils/http";

/**
 * @description: 根据user对象进行登录
 * @param {Number} id 分类id
 * @return {*}
 */

export function loginAPI(user) {
  return http.post('/login', user);
}

/**
user是出现在请求的body中的对象
长成这个样：
{
    "account": "heima290",
    "password": "hm#qd@23!"
}
 */