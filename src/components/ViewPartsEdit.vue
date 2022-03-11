<script setup> 
  import { ref, toRef, watch, computed } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  // @ts-ignore
  import TenviCanvas from './TenviCanvas.vue';

  const sidebarActive = ref(0);
  const sidebarData = {
    pilot: ['bd', 'fc', 'fa', 'hr', 'cp', 'cl', 'wp', 'emo'],
    mecha: ['a_df', 'a_do', 'a_am', 'a_dc', 'a_lp', 'a_pp', 'a_rh', 'a_lh'],
    avatar: ['t_df', 't_do', 't_am', 't_dc', 't_lp', 't_pp', 't_rh', 't_lh'],
    dragon: ['s_df', 's_do', 's_am', 's_dc', 's_lp', 's_pp', 's_rh', 's_lh'],
    vehicle: [],
  };
  /** 选定资源的名称 */
  const selectedResName = computed(() => sidebarData[store.edit.type][sidebarActive.value]);
  /** 获取选定分类下的资源列表 */
  const getResList = () => {
    return store.getResList(selectedResName.value);
  };
  /** 获取选定资源已记录的编号 */
  const getSavedResCode = (partName) => {
    return store.res[selectedResName.value];
  };
  /** 部件资源item点击 */
  const itemClick = (item) => {
    console.log('itemSelect:', item.id);
    store.res[selectedResName.value] = item.id;
  };
  /** 监控类别变化 */
  watch(toRef(store.edit, 'type'), () => {
    sidebarActive.value = 0; // 类别变化时重置菜单序号
  });

</script>

<template>
  <div class="parts-edit">
    <!-- 左侧菜单 -->
    <van-sidebar v-model="sidebarActive">
      <van-sidebar-item
        v-for="(item, index) in sidebarData[store.edit.type]"
        :key="index"
        :title="$t(`res.${item}`)"
      >
      </van-sidebar-item>
    </van-sidebar>
    <!-- 右侧列表 -->
    <div>
      <van-list>
        <div v-for="(item, index) in getResList()" :key="index" @click="itemClick(item)"
          class="item" :class="{ 'item-selected': item.id == getSavedResCode(), 'newline': item.id.includes('|')}">
          <div v-if="!item.id.includes('|')">
            <van-image lazy-load
              width="36" height="36" radius="3" fit="none" 
              :src="store.getIconURL(item.id)" :alt="item.id"
            >
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <span>{{ item.id }}</span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<style scoped>
</style>
