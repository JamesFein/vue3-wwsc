<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <!-- <RouterView :key="$route.path"></RouterView> -->
  <RouterView></RouterView>
  <LayoutFooter></LayoutFooter>
</template>

<script setup>
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue';
import LayoutNav from '@/views/Layout/components/LayoutNav.vue';
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue';
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue';

</script>

<style scoped>

</style>
