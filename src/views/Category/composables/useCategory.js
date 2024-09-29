import { getTopCategoryByIdAPI } from "@/apis/category";
import {onBeforeRouteUpdate, useRoute} from "vue-router";

export function useCategory() {
    const categoryData = ref({});
    const route = useRoute();
    //调用 useRoute() 会返回当前活跃的路由对象，这个对象包含了当前路由的各种信息，如路径、参数、查询等。
    //通过这种方式获取的 route 对象是响应式的，意味着当路由发生变化时，route 对象会自动更新。
    const getCategory = async (id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        //console.log(route.params.id);
        //在实际的也为逻辑中用户肯定是点击了一个分类进来，所以这里的id就是分类id，不可能也不应该为空
        const res = await getTopCategoryByIdAPI(id);
        categoryData.value = res.result;
    };
    onMounted(()=>getCategory(route.params.id));

    onBeforeRouteUpdate((to)=>{
    getCategory(to.params.id);
    })
    // 是Vue Router提供的一个组合式API函数。它在当前路由改变，但是该组件被复用时调用。
    return{
        categoryData
    }
}