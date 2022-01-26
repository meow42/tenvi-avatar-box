<script setup>
  import { ref } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  const onChange = () => {
    // TODO
  };
</script>

<template>
  <van-tabbar v-model="store.edit.view" @change="onChange">
    <van-tabbar-item name="overview" icon="eye-o" v-if="false">{{ $t('menu.overview') }}</van-tabbar-item>
    <van-tabbar-item name="parts" icon="brush-o">{{ $t('menu.parts') }}</van-tabbar-item>
    <van-tabbar-item name="frame" icon="apps-o">{{ $t('menu.frame') }}</van-tabbar-item>
    <van-tabbar-item name="action" icon="video-o" v-if="false">{{ $t('menu.action') }}</van-tabbar-item>
    <van-tabbar-item name="option" icon="setting-o" v-if="false">{{ $t('menu.option') }}</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
</style>
