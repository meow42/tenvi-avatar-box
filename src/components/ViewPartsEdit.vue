<script setup> 
  import { ref, toRef, watch, computed, onMounted } from 'vue';
  import { ImagePreview } from 'vant';
  import { useStore } from '../store.js';
  const store = useStore();

  const sidebarData = {
    pilot: ['p_hd', 'p_fc', 'p_fa', 'p_hr', 'p_cp', 'p_cl', 'p_wp'],
    mecha: ['a_df', 'a_do', 'a_am', 'a_dc', 'a_lp', 'a_pp', 'a_rh', 'a_lh'],
    avatar: ['t_df', 't_do', 't_am', 't_dc', 't_lp', 't_pp', 't_rh', 't_lh'],
    dragon: ['s_df', 's_do', 's_am', 's_dc', 's_lp', 's_pp', 's_rh', 's_lh'],
    vehicle: ['v_res'],
  };
  /** 选定资源的名称 */
  const selectedResName = computed(() => sidebarData[store.edit.type][store.edit.partSidebarActive]);
  /** 选定分类下的资源列表 */
  const resList = ref([]);
  /** 更新资源列表 */
  const updateResList = () => {
    //console.log('updateResList:', selectedResName.value);
    resList.value = store.getResList(selectedResName.value); //console.log('updateResList:', resList.value);
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
    // 处理肤色同步
    let bodyId = '';
    if (selectedResName.value == 'p_hd') {
      let index = [
        '00004', '00176', '00177',
        '00178', '00005', '00179',
        '00180', '00181', '00006',
        ].indexOf(item.id);
      if (index >= 0) bodyId = ['00001', '00002', '00003'][index % 3];
      store.res['p_bd'] = bodyId;
    }
    showRawPopup(item.id, bodyId);
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
  const showRawPopup = (...codes) => {
    if (!store.edit.showRawImg) return;
    rawPopupImgs.value = [];
    codes.map(code => {
      if (!code) return;
      rawPopupImgs.value.push(
        store.getResImgURL(code + '_0'),
        store.getResImgURL(code + '_1'),
      );
    });
    rawPopup.value = true;
  };

  /** 快捷设置：确保最低配置 */
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
  const groupSelected = ref(new Array());
  /** 更新分组类型 */
  const updateGroupData = () => {
    groupData.value.clear();
    groupSelected.value = [];
    // 装填分组，并默认选取当前item所属分类
    resList.value.map(item => {
      if (item['group'] && item['group'].length > 1) groupData.value.add(item['group']);
      if (item['id'] === getSavedResCode()) groupSelected.value.push(item['group']);
    });
    groupData.value.delete('#');
    // 如果不需要折叠分组
    if(groupData.value.has('#NoFold')) {
      groupData.value.delete('#NoFold');
      groupSelected.value = [...groupData.value];
    }
    // 如无所属，则选取第一个分类
    else if (groupSelected.value.length < 1) groupSelected.value.push([...groupData.value][0]);
    // 选择全部分组
    //groupData.value.forEach((groupName) => groupSelected.value.push(groupName));
  };
  /** 选取所有分组 */
  const groupCheckAll = () => {
    // @ts-ignore
    groupSheetRef?.value.toggleAll(true);
  }
  /** 反选 */
  const groupToggleAll = () => {
    // @ts-ignore
    groupSheetRef?.value.toggleAll();
  }

  /* 监听视图变更 */
  watch(toRef(store.edit, 'view'), (newView) => {
    // 如果离开本视图，则更新资源数据
    if (newView !== 'parts') store.updateResData();
    else updateResList();
  }, { immediate: true, flush: 'post' });
  /** 监控类别变化 */
  watch(toRef(store.edit, 'type'), (newValue) => {
    //console.log('watch - store.edit.type', newValue);
    store.edit.partSidebarActive = 0; // 类别变化时重置菜单序号
    updateResList();
  });
  onMounted(() => {
    store.edit.partSidebarActive = 0;
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
          v-show="groupData.size < 1 || groupSelected.includes(item.group)"
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
        <!-- 特殊功能区域 暂时隐藏-->
        <div v-show="store.edit.partSidebarActive === -1" class="options">
          <van-divider content-position="left">Quick Options</van-divider>
          <div v-if="store.edit.type === 'mecha'">
            <van-cell is-link title="Base Only" v-on:click="setBaseOnly" />
            <van-cell title="Model 1" />
            <van-cell title="Model 2" />
            <van-cell title="Model 3" />
            <van-cell title="Random" />
          </div>
        </div>
      </van-list>
      <!-- 分类筛选入口 -->
      <div>
        <van-field readonly is-link left-icon="filter-o"
          v-show="groupData.size > 1" v-on:click="groupSheet = true">
          <template #input>{{ $t('view.group') + `: ${groupSelected.length} / ${groupData.size}` }}</template>
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
        <van-checkbox v-on:click="groupCheckAll" class="btn">
          <van-icon name="certificate" size="24" /> {{ $t('view.checkAll') }}
          <template #icon></template>
        </van-checkbox>
        <van-checkbox v-on:click="groupToggleAll" class="btn">
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
        <template v-slot:error></template>
      </van-image>
    </van-popup>
  </div>
</template>

<style scoped>
</style>
