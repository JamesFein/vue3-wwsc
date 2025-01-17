// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install  (app) {
        // 懒加载指令逻辑
       app.directive('img-lazy',{
        mounted(el, binding){ 
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        const { stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                if (isIntersecting) {
                    el.src = binding.value
                    stop() // 停止监听
                }
            },
            // { threshold: 0.1 } // 添加阈值，当元素 10% 可见时触发
        )
        }
       }
    ) 
    }
}