import http from "@/utils/http";
/**
 * @description: 根据id获得商品详情
 * @param {*} id 分类id
 * @return {*}
 */
export function getDetail(id) {
    return http.get('/goods', {params:{id}}) //太万恶了，这个api也没有写在那个api网址里面
}

export const getHotGoodsAPI = ({ id, type, limit = 3}) => {
    return http.get('/goods/hot', {
        params: {
            id,
            type,
            limit,
        }
    }

    )
}