<script setup>
  import { ref } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  const onChange = () => {
    // TODO
  };
</script>

<template>
  <van-tabbar v-model="store.menu.view" active-color="#ee0a24" @change="onChange">
    <van-tabbar-item name="overview" icon="eye-o">{{ $t('menu.overview') }}</van-tabbar-item>
    <van-tabbar-item name="parts" icon="apps-o">{{ $t('menu.parts') }}</van-tabbar-item>
    <van-tabbar-item name="action" icon="video-o">{{ $t('menu.action') }}</van-tabbar-item>
    <van-tabbar-item name="option" icon="setting-o">{{ $t('menu.option') }}</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
  .van-tabbar {
    left: auto !important;
    bottom: auto !important;
    box-shadow: 0 -1px 2px #ddd;
  }
</style>
