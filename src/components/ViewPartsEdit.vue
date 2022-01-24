<script setup>
  import { ref, toRef, watch } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  import PartsList from './PartsList.vue';

  const sidebarActive = ref(0);
  const sidebarData = {
    pilot: ['bd', 'fc', 'fa', 'hr', 'cp', 'cl', 'wp', 'emo'],
    mecha: ['df', 'do', 'am', 'dc', 'lp', 'pp', 'rh', 'lh'],
    avatar: ['df', 'do', 'am', 'dc', 'lp', 'pp', 'rh', 'lh'],
    dragon: ['df', 'do', 'am', 'dc', 'lp', 'pp', 'rh', 'lh'],
    vehicle: [],
  };

  watch(toRef(store.app, 'editTarget'), () => {
    //console.log('watch-editTarget:', store.app.editTarget);
    sidebarActive.value = 0;
    changePartSelected(0);
  });
  const changePartSelected = (index) => {
    store.app.partSelected = sidebarData[store.app.editTarget][index];
  };

  changePartSelected(0);
</script>

<template>
  <div class="parts-edit">
    <!-- 左侧菜单 -->
    <van-sidebar v-model="sidebarActive" @change="changePartSelected">
      <van-sidebar-item
        v-for="(item, index) in sidebarData[store.app.editTarget]"
        :key="index"
        :title="$t(`${store.app.editTarget}.res.${item}`)"
      >
      </van-sidebar-item>
    </van-sidebar>
    <!-- 右侧列表 -->
    <PartsList></PartsList>
  </div>
</template>

<style scoped>
</style>
