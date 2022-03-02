<script setup>// @ts-nocheck
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { ref, watch, getCurrentInstance } from 'vue';
  import { useStore } from './store.js';
  const store = useStore();
  import { Toast, Notify } from 'vant';
  import '@vant/touch-emulator';
  import MenuTop from './components/MenuTop.vue';
  import ViewActionEdit from './components/ViewActionEdit.vue';
  import ViewFrameEdit from './components/ViewFrameEdit.vue';
  import ViewOrderEdit from './components/ViewOrderEdit.vue';
  import ViewPartsEdit from './components/ViewPartsEdit.vue';

  const loadingInfoDisplay = ref(false);
  const loadingNotifyType = ref('primary'); // primary success warning danger
  /** 顶部消息点击事件 */
  const notifyClick = (e) => {
    //TODO 显示文件载入详情
    if (loadingNotifyType.value !== 'success') {
      // loadingInfoDisplay.value = true;
    }
    // 临时处理：载入结束，存在错误
    if (loadingNotifyType.value == 'danger') {
      store.resetLoadingFlag();
      Notify.clear();
    }
  };
  /* 监听数据变更 */
  watch([store.app.loading, store.app.loadingErr], ([loadingSet, errSet]) => {
    //console.log('watch loading:', loadingSet);
    let message = '';
    let duration = 0;
    if (loadingSet.size > 0 && errSet.size == 0) {
      loadingNotifyType.value = 'primary';
      message = `资源加载中，剩余 ${loadingSet.size} 个`;
    }
    else if (loadingSet.size > 0 && errSet.size > 0) {
      loadingNotifyType.value = 'warning';
      message = `资源加载中，剩余 ${loadingSet.size} 个，失败 ${errSet.size} 个`;
    }
    else if (loadingSet.size == 0 && errSet.size > 0) {
      loadingNotifyType.value = 'danger';
      message = `资源载入失败 ${errSet.size} 个`;
    }
    else if (loadingSet.size == 0 && errSet.size == 0) {
      loadingNotifyType.value = 'success';
      duration = 2000;
      message = '√ 资源加载完成';
    }
    Notify({
      type: loadingNotifyType.value,
      duration: duration,
      message: message,
      onClick: notifyClick,
    });
  });
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
  <van-tabbar v-model="store.edit.view">
    <van-tabbar-item name="overview" icon="eye-o" v-if="false">{{ $t('menu.overview') }}</van-tabbar-item>
    <van-tabbar-item name="parts" icon="apps-o">{{ $t('menu.parts') }}</van-tabbar-item>
    <van-tabbar-item name="frame" icon="fire-o">{{ $t('menu.frame') }}</van-tabbar-item>
    <van-tabbar-item name="action" icon="video-o">{{ $t('menu.action') }}</van-tabbar-item>
    <van-tabbar-item name="order" icon="points">{{ $t('menu.order') }}</van-tabbar-item>
    <van-tabbar-item name="option" icon="setting-o" v-if="false">{{ $t('menu.option') }}</van-tabbar-item>
  </van-tabbar>
  <!-- 资源载入详情 -->
  <van-popup
    v-model:show="loadingInfoDisplay"
    :close-on-click-overlay="true"
  >
    TODO
  </van-popup>
</template>

<style>
</style>
