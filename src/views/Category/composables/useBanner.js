//轮播图
import { getBannerAPI } from "@/apis/home";

export function useBanner() {
    const bannerList = ref([]);
    const getBanner = async () => {
    const res = await getBannerAPI('3');//给的接口就是这样，不论数字是几，做出来就这样
    bannerList.value = res.result;
    }
    onMounted(()=>getBanner());
    return {
        bannerList
    }
    // return { bannerList: bannerList }
    // 可用结构函数获取值： const {bannerList} = useBanner()

}
