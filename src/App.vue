<script setup>// @ts-nocheck
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { ref, getCurrentInstance } from 'vue';
  import { useStore } from './store.js';
  const store = useStore();
  import '@vant/touch-emulator';
  import MenuTop from './components/MenuTop.vue';
  import ViewActionEdit from './components/ViewActionEdit.vue';
  import ViewFrameEdit from './components/ViewFrameEdit.vue';
  import ViewOrderEdit from './components/ViewOrderEdit.vue';
  import ViewPartsEdit from './components/ViewPartsEdit.vue';

  const onChange = () => {
    // TODO
  };
</script>

<template>
  <MenuTop></MenuTop>
  <div class="views">
    <ViewActionEdit v-if="store.edit.view == 'action'"></ViewActionEdit>
    <ViewFrameEdit v-if="store.edit.view == 'frame'"></ViewFrameEdit>
    <ViewOrderEdit v-if="store.edit.view == 'order'"></ViewOrderEdit>
    <ViewPartsEdit v-if="store.edit.view == 'parts'"></ViewPartsEdit>
    <div v-else style="text-align: center; padding-top: 50%;">{{ $t(`menu.${store.edit.view}`) || store.edit.view }}</div>
  </div>
  <!-- 底部视图切换菜单 -->
  <van-tabbar v-model="store.edit.view" @change="onChange">
    <van-tabbar-item name="overview" icon="eye-o" v-if="false">{{ $t('menu.overview') }}</van-tabbar-item>
    <van-tabbar-item name="parts" icon="apps-o">{{ $t('menu.parts') }}</van-tabbar-item>
    <van-tabbar-item name="frame" icon="fire-o">{{ $t('menu.frame') }}</van-tabbar-item>
    <van-tabbar-item name="action" icon="video-o">{{ $t('menu.action') }}</van-tabbar-item>
    <van-tabbar-item name="order" icon="points">{{ $t('menu.order') }}</van-tabbar-item>
    <van-tabbar-item name="option" icon="setting-o" v-if="false">{{ $t('menu.option') }}</van-tabbar-item>
  </van-tabbar>
</template>

<style>
</style>
