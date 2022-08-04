<script setup>// @ts-nocheck
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { ref, watch, onMounted, onBeforeMount, getCurrentInstance } from 'vue';
  import { useStore } from './store.js';
  const store = useStore();
  import { useI18n } from 'vue-i18n';
  const { t, locale } = useI18n();
  import { Toast, Notify, NoticeBar } from 'vant';
  import '@vant/touch-emulator';
  import MenuTop from './components/MenuTop.vue';
  import ViewActionEdit from './components/ViewActionEdit.vue';
  import ViewFrameEdit from './components/ViewFrameEdit.vue';
  import ViewOrderEdit from './components/ViewOrderEdit.vue';
  import ViewPartsEdit from './components/ViewPartsEdit.vue';
  import ViewFiles from './components/ViewFiles.vue';

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
  /* 监听资源加载状态变更 */
  watch([store.app.loading, store.app.loadingErr], ([loadingSet, errSet]) => {
    //console.log('watch loading:', loadingSet);
    let message = '';
    let duration = 0;
    if (loadingSet.size > 0 && errSet.size == 0) {
      loadingNotifyType.value = 'primary';
      message = t('tip.resLoading', { n: loadingSet.size});
    }
    else if (loadingSet.size > 0 && errSet.size > 0) {
      loadingNotifyType.value = 'warning';
      message = t('tip.resLoadingWithErr', { n: loadingSet.size, e: errSet.size }); //`资源加载中，剩余 ${loadingSet.size} 个，失败 ${errSet.size} 个`;
    }
    else if (loadingSet.size == 0 && errSet.size > 0) {
      loadingNotifyType.value = 'danger';
      message = t('tip.resLoadedWithErr', { e: errSet.size }); //`资源载入失败 ${errSet.size} 个`;
    }
    else if (loadingSet.size == 0 && errSet.size == 0) {
      loadingNotifyType.value = 'success';
      duration = 2000;
      message = '√ ' + t('tip.resLoadSuccess');
    }
    Notify({
      type: loadingNotifyType.value,
      duration: duration,
      message: message,
      onClick: notifyClick,
    });
  });
  /** 初始化参数 */
  onBeforeMount(() => {
    // 读取浏览器缓存
    if (localStorage) {
      // 从缓存中获取并更新语言选项
      let lang = localStorage.getItem('lang');
      if (lang) locale.value = lang;
      // 从缓存中获取并更新编辑相关参数
      store.loadEditConfig();
    }
    // 读取URL参数
    store.initByURL();
  });
  /** 状态检测与提示 */
  onMounted(() => {
    if (!localStorage) {
      Notify({ type: 'warning', message: t('error.useLocalStorage') });
    }
  });
  
</script>

<template>
  <MenuTop></MenuTop>
  <div class="views">
    <ViewPartsEdit v-show="store.edit.view == 'parts'"></ViewPartsEdit>
    <ViewFrameEdit v-show="store.edit.view == 'frame'"></ViewFrameEdit>
    <ViewActionEdit v-show="store.edit.view == 'action'"></ViewActionEdit>
    <ViewOrderEdit v-show="store.edit.view == 'order'"></ViewOrderEdit>
    <ViewFiles v-show="store.edit.view == 'files'"></ViewFiles>
  </div>
  <!-- 底部视图切换菜单 -->
  <van-tabbar v-model="store.edit.view">
    <van-tabbar-item name="parts" icon="user-circle-o">{{ $t('view.parts') }}</van-tabbar-item>
    <van-tabbar-item name="frame" icon="fire-o">{{ $t('view.frame') }}</van-tabbar-item>
    <van-tabbar-item name="action" icon="video-o">{{ $t('view.action') }}</van-tabbar-item>
    <van-tabbar-item name="order" icon="points">{{ $t('view.order') }}</van-tabbar-item>
    <van-tabbar-item name="files" icon="other-pay">{{ $t('view.files') }}</van-tabbar-item>
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
