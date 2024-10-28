import http from "@/utils/http";

//获取支付订单详情
export const getOrderAPI = (orderId) => {
    console.log("orderId",orderId)
    return http.get(`/member/order/${orderId}`);
}