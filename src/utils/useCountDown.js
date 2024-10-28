//倒计时逻辑函数
import dayjs from 'dayjs'
import { ref, computed, onUnmounted } from 'vue'
//这个思路有点意思，可以学一下


export const useCountDown = () => {
    // 1.响应式的数据
    let timer = null
    const time = ref(0)
    // 格式化时间 为 XX分XX秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    
    //2. 开启倒计时的函数
    const start = (currentTime) => {
        // 清除可能存在的旧定时器
        timer && clearInterval(timer)
        //开始倒计时的逻辑
        time.value = currentTime
        timer = setInterval(() => {
            time.value--
            // 添加判断，当时间小于等于0时停止计时
            if (time.value <= 0) {
                clearInterval(timer)
                timer = null
            }
        }, 1000)
    }

    // 组件销毁时清除定时器
    onUnmounted(() => {
        timer && clearInterval(timer)
    })

    return {
        formatTime,
        start
    }
}
