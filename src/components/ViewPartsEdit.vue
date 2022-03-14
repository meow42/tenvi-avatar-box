<script setup> 
  import { ref, toRef, watch, computed, onMounted } from 'vue';
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
  /** 选定分类下的资源列表 */
  const resList = ref([]);
  /** 更新资源列表 */
  const updateResList = () => {
    console.log('updateResList:', selectedResName.value);
    resList.value = store.getResList(selectedResName.value);
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
  /** 菜单项变更事件 */
  const onSidebarChange = (index) => {
    updateResList();
    updateGroupData();
  }

  /** 是否显示分组选项选取面板 */
  const showGroupSheet = ref(false);
  /** 分组对象 */
  const groupSheetRef = ref(null);
  /** 分组数据 */
  const groupData = ref(new Set());
  /** 已选择的分组 */
  const groupSelected = ref([]);
  /** 更新分组类型 */
  const updateGroupData = () => {
    groupData.value.clear();
    groupSelected.value = [];
    resList.value.map(item => {
      if (item['group']) groupData.value.add(item['group']);
    });
    groupSelected.value.push([...groupData.value][0]);
    //groupData.value.forEach((groupName) => groupSelected.value.push(groupName));
  };

  /** 监控类别变化 */
  watch(toRef(store.edit, 'type'), () => {
    sidebarActive.value = 0; // 类别变化时重置菜单序号
  });

  onMounted(() => {
    updateResList();
    updateGroupData();
  });
</script>

<template>
  <div class="parts-edit">
    <!-- 左侧菜单 -->
    <van-sidebar v-model="sidebarActive" v-on:change="onSidebarChange">
      <van-sidebar-item :key="index" :title="$t(`res.${item}`)"
        v-for="(item, index) in sidebarData[store.edit.type]">
      </van-sidebar-item>
    </van-sidebar>
    <!-- 右侧列表 -->
    <div class="list">
      <van-list>
        <div v-for="(item, index) in resList" :key="index" @click="itemClick(item)"
          v-show="groupSelected.includes(item.group)"
          class="item" :class="{ 'item-selected': item.id == getSavedResCode(), 'newline': item.id.includes('#')}">
          <div v-if="item.id.startsWith('#')">
            <van-divider v-if="item.id.length > 1" content-position="left" style="margin: 0;">
              {{ $t(`group.${item.id.split('-')[0]}`) }}{{ (item.id.split('-')[1]) ? ` - ${item.id.split('-')[1]}` : '' }}
            </van-divider>
          </div>
          <div v-else>
            <van-image width="36" height="36" radius="3" fit="none" 
              :src="store.getIconURL(item.id)" :alt="item.id">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            <span>{{ item.id }}</span>
          </div>
        </div>
      </van-list>
      <div>
        <van-field readonly is-link left-icon="filter-o"
          v-show="groupData.size > 1" v-on:click="showGroupSheet = true">
          <template #input>{{ `Selected: ${groupSelected.length}, Total: ${groupData.size}` }}</template>
        </van-field>
      </div>
    </div>
    <!-- 分类筛选 -->
    <van-action-sheet
      v-model:show="showGroupSheet"
      :title="$t('view.groupSelect')"
      :cancel-text="$t('app.close')"
      @cancel="showGroupSheet = false"
      class="group-sheet"
    >
      <template #default>
        <van-checkbox v-on:click="groupSheetRef.toggleAll(true)" class="btn">
          <van-icon name="certificate" size="24" /> {{ $t('view.checkAll') }}
          <template #icon></template>
        </van-checkbox>
        <van-checkbox v-on:click="groupSheetRef.toggleAll()" class="btn">
          <van-icon name="exchange" size="24" /> {{ $t('view.toggleAll') }}
          <template #icon></template>
        </van-checkbox>
        <van-checkbox-group v-model="groupSelected" ref="groupSheetRef">
          <van-checkbox shape="square" icon-size="20px"
            v-for="key in groupData.values()" :key="key" :name="key">
            {{ $t(`group.${key.split('-')[0]}`) }}{{ (key.split('-')[1]) ? ` - ${key.split('-')[1]}` : '' }}
          </van-checkbox>
        </van-checkbox-group>
      </template>
    </van-action-sheet>
  </div>
</template>

<style scoped>
</style>
