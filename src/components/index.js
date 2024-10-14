import ImageView from '@/components/ImageView/index.vue';
import Sku from '@/components/sku/index.vue';
export const componentPlugin = {
    install(app) { //理解为"为app安装以下东西"当使用 app.use(componentPlugin) 安装插件时，Vue 会自动调用这个 install 方法。参数 app 是 Vue 应用实例，通过它我们可以访问全局 API。
        app.component('ImageView', ImageView);
        app.component('Sku', Sku);
    }
}
