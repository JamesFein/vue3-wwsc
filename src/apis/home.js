import http from "@/utils/http";

/**
 * @description: 获取轮播图
 * @param distributionSite='1' 首页 '2'表示分类页面
 * @return {*}
 */
export function getBannerAPI(distributionSite='1'){
    return http.get('/home/banner',{params:{distributionSite}});
}

export const getNewAPI = () => {
    return http.get('/home/new')
}

export const getHotAPI = () => {
    return http.get('/home/hot')
}

export const getGoodsAPI = () => {
    return http.get('/home/goods')
}