import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from 'element-plus';
import router from '@/router';
// 创建axios实例
// axios就是一个网络请求管理员
const http = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 10000,
});

// axios请求拦截器
// 一般会进行token身份验证等
http.interceptors.request.use(
  config => {
  const userStore = useUserStore();
  const token = userStore.userInfo.token;
  if (token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
},
  e => Promise.reject(e)
)

// axios响应式拦截器
// 一般进行错误的统一提示，token失效的处理等
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    //统一的错误提示
    ElMessage({
      type: 'error',
      message: e.response.data.message
    })
    //401token失效处理
    const userStore = useUserStore();
    if (e.response?.status === 401){
      userStore.clearUserInfo()
      router.push('/login')
    }

    return Promise.reject(e);
  }
);

export default http;
