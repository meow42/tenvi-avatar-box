<script setup> 
  import { ref, toRef, watch, computed, onMounted } from 'vue';
  import { ImagePreview } from 'vant';
  import { useStore } from '../store.js';
  const store = useStore();

  const sidebarData = {
    pilot: ['p_bd', 'p_fc', 'p_fa', 'p_hr', 'p_cp', 'p_cl', 'p_wp', 'p_emo'],
    mecha: ['a_df', 'a_do', 'a_am', 'a_dc', 'a_lp', 'a_pp', 'a_rh', 'a_lh'],
    avatar: ['t_df', 't_do', 't_am', 't_dc', 't_lp', 't_pp', 't_rh', 't_lh'],
    dragon: ['s_df', 's_do', 's_am', 's_dc', 's_lp', 's_pp', 's_rh', 's_lh'],
    vehicle: [],
  };
  /** 选定资源的名称 */
  const selectedResName = computed(() => sidebarData[store.edit.type][store.edit.partSidebarActive]);
  /** 选定分类下的资源列表 */
  const resList = ref([]);
  /** 更新资源列表 */
  const updateResList = () => {
    //console.log('updateResList:', selectedResName.value);
    resList.value = store.getResList(selectedResName.value);
    updateGroupData();
  };
  /** 获取选定资源已记录的编号 */
  const getSavedResCode = (partName) => {
    return store.res[selectedResName.value];
  };
  /** 部件资源item点击 */
  const itemClick = (item) => {
    console.log('itemSelect:', item.id);
    store.res[selectedResName.value] = item.id;
    showRawPopup(item.id);
  };
  /** 菜单项变更事件 */
  const onSidebarChange = (index) => {
    updateResList();
  }
  /** 是否展示原始素材预览弹出层 */
  const rawPopup = ref(false);
  /** 原始素材URL */
  const rawPopupImgs = ref([]);
  /** 显示原始资源预览 */
  const showRawPopup = (code) => {
    if (!store.edit.showRawImg) return;
    rawPopupImgs.value = [store.getResImgURL(code + '_0')];
    // 原始资源单个编号最多2张图，此处以备扩展
    for (let i = 1; i < 2; i++) {
      let imgURL = store.getResImgURL(code + '_' + i);
      fetch(imgURL).then((res) => { 
        if (res.status === 200) rawPopupImgs.value.push(imgURL);
      }).catch((err) => { });
    }
    rawPopup.value = true;
  };

  /** 快捷设置：最低配置 */
  const setBaseOnly = () => {
    if (!sidebarData[store.edit.type]) return;
    sidebarData[store.edit.type].map(resName => {
      if (['p_bd', 'p_fc', 'a_df', 't_df', 's_df'].includes(resName)) return;
      store.res[resName] = '';
    });
  };

  /** 是否显示分组选项选取面板 */
  const groupSheet = ref(false);
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
      // 选取当前item所属分类
      if (item['id'] === getSavedResCode()) groupSelected.value.push(item['group']);
    });
    // 如无所属，则选取第一个分类
    if (groupSelected.value.length < 1) groupSelected.value.push([...groupData.value][0]);
    // 选取所有分类
    //groupData.value.forEach((groupName) => groupSelected.value.push(groupName));
  };

  /* 监听视图变更 */
  watch(toRef(store.edit, 'view'), (newView) => {
    // 如果离开本视图，则更新资源数据
    if (newView !== 'parts') store.updateResData();
  }, { immediate: true, flush: 'post' });
  /** 监控类别变化 */
  watch(toRef(store.edit, 'type'), (newValue) => {
    //console.log('watch - store.edit.type', newValue);
    store.edit.partSidebarActive = 0; // 类别变化时重置菜单序号
    updateResList();
  });

  onMounted(() => {
    updateResList();
  });
</script>

<template>
  <div class="parts-edit">
    <!-- 左侧菜单 -->
    <van-sidebar v-model="store.edit.partSidebarActive" v-on:change="onSidebarChange">
      <van-sidebar-item :key="index" :title="$t(`res.${item}`)"
        v-for="(item, index) in sidebarData[store.edit.type]">
      </van-sidebar-item>
    </van-sidebar>
    <!-- 右侧列表 -->
    <div class="list">
      <van-list>
        <!-- 根据数据生成Items -->
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
        <!-- 特殊功能区域 -->
        <div v-show="store.edit.partSidebarActive === 0" class="options">
          <van-divider content-position="left">Quick Options</van-divider>
          <div v-if="store.edit.type === 'mecha'">
            <van-cell is-link title="Base Only" v-on:click="setBaseOnly" />
            <van-cell title="Model 1" is-link />
            <van-cell title="Model 2" is-link />
            <van-cell title="Model 3" is-link />
            <van-cell title="Random" is-link />
          </div>
        </div>
      </van-list>
      <!-- 分类筛选入口 -->
      <div>
        <van-field readonly is-link left-icon="filter-o"
          v-show="groupData.size > 1" v-on:click="groupSheet = true">
          <template #input>{{ `Selected: ${groupSelected.length}, Total: ${groupData.size}` }}</template>
        </van-field>
      </div>
    </div>
    <!-- 分类筛选面板 -->
    <van-action-sheet
      v-model:show="groupSheet"
      :title="$t('view.groupSelect')"
      :cancel-text="$t('app.close')"
      @cancel="groupSheet = false"
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
    <!-- 素材预览弹出层 -->
    <van-popup v-model:show="rawPopup" position="center" class="raw">
      <van-image v-for="url in rawPopupImgs" :key="url" :src="url" fit="contain">
        <template v-slot:loading> <van-loading type="spinner" size="20" /> </template>
      </van-image>
    </van-popup>
  </div>
</template>

<style scoped>
</style>
