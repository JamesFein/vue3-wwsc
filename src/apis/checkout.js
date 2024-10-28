import http from "@/utils/http";

//支付相关的接口

// 获取详情接口
export const getCheckInfoAPI = () => {
    return http.get('/member/order/pre');
}

//创建订单
export const createOrderAPI = (data) => {
    return http.post('/member/order', data);
}