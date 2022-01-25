<script setup>
  import { ref, toRef, watch } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  import PartsList from './PartsList.vue';
  import TenviCanvas from './TenviCanvas.vue';

  const sidebarActive = ref(0);
  const sidebarData = {
    pilot: ['bd', 'fc', 'fa', 'hr', 'cp', 'cl', 'wp', 'emo'],
    mecha: ['df', 'do', 'am', 'dc', 'lp', 'pp', 'rh', 'lh'],
    avatar: ['df', 'do', 'am', 'dc', 'lp', 'pp', 'rh', 'lh'],
    dragon: ['df', 'do', 'am', 'dc', 'lp', 'pp', 'rh', 'lh'],
    vehicle: [],
  };

  watch(toRef(store.edit, 'type'), () => {
    //console.log('watch-editTarget:', store.edit.type);
    sidebarActive.value = 0;
    changeResTypeSelected(0);
  });
  const changeResTypeSelected = (index) => {
    store.edit.res = sidebarData[store.edit.type][index];
  };

  changeResTypeSelected(0);
</script>

<template>
  <div class="parts-edit">
    <!-- 左侧菜单 -->
    <van-sidebar v-model="sidebarActive" @change="changeResTypeSelected">
      <van-sidebar-item
        v-for="(item, index) in sidebarData[store.edit.type]"
        :key="index"
        :title="$t(`${store.edit.type}.res.${item}`)"
      >
      </van-sidebar-item>
    </van-sidebar>
    <!-- 右侧列表 -->
    <div>
      <PartsList></PartsList>
    </div>
  </div>
</template>

<style scoped>
</style>
