<script setup>
  import { ref, toRef, watch, onMounted, onBeforeMount, computed } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  // @ts-ignore
  import TenviCanvas from './TenviCanvas.vue';

  /** 部件数据集 */
  const partData = ref({
    a_body: { default: 'body_stand1_0' }, a_armS: { default: '' },
    a_armL: { default: 'arml_001' }, a_armR: { default: 'armr_002' },
    a_legL: { default: 'legl_001' }, a_legR: { default: 'legr_002' },
    a_head: { default: '' }, a_headS: { default: '' },
    a_pp: { default: '' }, a_bodyX: { default: '', sync: 'a_body' },
    a_bodyXS: { default: '' }, a_bodyXB: { default: '' },
    a_armLX: { sync: 'a_armL' }, a_armRX: { sync: 'a_armR' },
    a_legLX: { sync: 'a_legL' }, a_legRX: { sync: 'a_legR' },
    
    a_wp: { default: 'g_stand1_00' }, a_wpGP: { default: 'g_stand1_00_00' },
    a_shield: { default: 'shield00', line: true },
    p_body: { default: '' },
  });
  /** 同步部件数据 */
  const updatePartData = (...partList) => {
    for (const key in partData.value) {
      // 按照手动指定的list进行筛选
      if (partList && partList.length > 0 && !partList.includes(key)) continue;
      //console.log('updatePartData:', key, store.part[key], partData.value[key]['default']);
      // 添加可见状态
      partData.value[key].show = store.isPartEnable(key);
      // 从store同步帧名称
      if (!store.part[key]) store.part[key] = partData.value[key]['default'] || '';
    }
    //console.log('updatePartData:', store.part);
  };
  /** 部件间数据自动模仿 */
  const syncPartData = (force) => {
    for (const key in partData.value) {
      // 跳过未设置模仿对象的部件
      if (!partData.value[key].sync) continue;
      // 跳过非强制状态下，已经指定了帧数据的部件
      if (!force || store.part[key]) continue;
      store.part[key] = store.part[partData.value[key].sync] || '';
      console.log('syncPartData:', key, store.part[key]);
    }
  }
  /** 部件分组数据 */
  const partGroup = ref({
    a_base: ['a_body', 'a_armS', 'a_armL', 'a_armR', 'a_legL', 'a_legR'],
    a_equip: ['a_head', 'a_headS', 'a_pp', 'a_bodyX', 'a_bodyXS', 'a_bodyXB', 'a_armLX', 'a_armRX', 'a_legLX', 'a_legRX'],
    a_weapon: ['a_wp', 'a_wpGP', 'a_shield'],
    p_base: ['p_body'],
    p_equip: [],
  });
  /** 当前编辑分组数据，用于生成编辑区域内容 */
  const partGroupList = ref([]);
  /** 更新当前编辑分组数据 */
  const updatePartGroupList = () => {
    let list = [];
    let typeCode = store.getTypeCode();
    for (const key in partGroup.value) {
      //console.log('getPartGroupList:', key, typeCode)
      if (key.startsWith(typeCode + '_') || 
        (store.edit.pilot && key.startsWith('p_'))) {
        list.push({
          name: key,
          item: partGroup.value[key]
        });
      }
    }
    //console.log('getPartGroupList:', list)
    partGroupList.value = list;
  };

  /** 标记展开的部件分类面板 */
  const activeNames = ref([]);
  /** 部件帧选取面板的开启状态 */
  const sheetActived = ref(false);
  /** 选取部件的名称 */
  const sheetPartName = ref('');
  /** 部件帧名称列表 */
  const sheetList = ref([]);
  /** 部件帧名称文本过滤 */
  const sheetFilter = ref('');
  /** 部件帧名称正则过滤 */
  const sheetRegex = ref('');
  /** 部件帧名称过滤模式 */
  const sheetFilterMode = ref(true);
  /** 部件点击事件 */
  const onPartClick = (partName) => {
    // 重置类别、过滤器
    sheetPartName.value = partName;
    sheetFilter.value = '';
    sheetRegex.value = store.partRegex2String(partName);
    sheetFilterMode.value = true;
    // 更新数据
    sheetList.value = store.getPartFrameList(partName);
    // 打开选取面板
    sheetActived.value = true; 
  };
  /** 部件帧选取事件 */
  const onSheetSelect = (frameName) => {
    store.part[sheetPartName.value] = frameName; // 更新选取数据
    updateDrawData(); // 更新绘制数据，触发绘制
  }
  
  /** 绑定的动作帧数据 */
  const frameData = ref({});
  /** 获取绘制所需数据 */
  const updateDrawData = () => {
    let payload = {};
    for(const key in partData.value) {
      //console.log('frameData:', key, store.part[key])
      if (!store.part[key]) continue;
      //if (!store.isPartEnable(key)) continue;
      payload[key] = store.part[key];
    }
    let data = store.getFrameData(payload);
    console.log('frameData:', payload, data)
    frameData.value = data;
  };

  /* 初始化视图 */
  const initView = () => {
    updatePartData();
    updatePartGroupList();
    // 轮询资源加载状态，完成后更新绘制数据
    let timerId = setInterval(() => {
      if (store.app.loading.size === 0) {
        updateDrawData();
        clearInterval(timerId);
      }
    }, 100);
    //activeNames.value = [0]; // 重置面板展开状态
  };
  watch(toRef(store.edit, 'view'), (newValue) => {
    if (newValue === 'frame') initView();
  }, { immediate: false, flush: 'post' });
  watch(toRef(store.edit, 'type'), (newValue) => {
    if (store.edit.view === 'frame') initView();
  }, { immediate: false, flush: 'post' });
  watch(toRef(store.edit, 'pilot'), (newValue) => {
    if (store.edit.view === 'frame') initView();
  }, { immediate: false, flush: 'post' });
  onBeforeMount(() => {});
  onMounted(() => {
    initView();
  });
</script>

<template>
  <div class="frame-edit">
    <!-- 动作帧画布 -->
    <div class="canvas">
      <TenviCanvas 
        :data="frameData" 
        :order="store.getOrder()" 
        :hide="[]"
        :auto="store.edit.autoDraw" 
        :axis="store.edit.showAxis"
      ></TenviCanvas>
    </div>
    <!-- 快捷功能 -->
    <div class="fn">
      <van-button plain type="primary" v-on:click="syncPartData">Auto Sync</van-button>
    </div>
    <!-- 编辑区 -->
    <div class="edit">
      <van-collapse v-model="activeNames">
        <van-collapse-item title-class="bold"
          :title="$t(`group.${group.name}`)" :name="index"
          v-for="(group, index) in partGroupList" :key="group.name" >
          <van-cell :key="partName" 
            v-for="partName in group.item"
            :title="$t(`part.${partName}`)"
            :value="store.part[partName]"
            :class="{ line: partData[partName]['line'] }"
            v-on:click="onPartClick(partName)"/>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 选项面板 -->
    <van-action-sheet
      v-model:show="sheetActived"
      @select="onSheetSelect"
      :cancel-text="$t('app.close')"
      overlay-class="sheet-overlay"
      class="sheet" >
      <!-- 面板搜索区 -->
      <template #description>
        <van-field clearable
          v-model="sheetFilter"
          v-show="sheetFilterMode"
          v-on:click-right-icon="() => {sheetFilterMode = !sheetFilterMode}"
          :label="$t('view.filter')"
          :placeholder="$t('view.typeHere')"
          left-icon="search"
          right-icon="exchange"
          class="sheet-search"
        >
        </van-field>
        <van-field clearable
          v-model="sheetRegex"
          v-show="!sheetFilterMode"
          v-on:click-right-icon="() => {sheetFilterMode = !sheetFilterMode}"
          :label="$t('view.regex')"
          :placeholder="$t('view.typeHere')"
          left-icon="search"
          right-icon="exchange"
          class="sheet-search"
        >
        </van-field>
      </template>
      <!-- 面板选项区 -->
      <button type="button"
        v-on:click="onSheetSelect('')"
        :class="{ 'selected': store.part[sheetPartName] === '', 'van-action-sheet__item': true }"
      >
        <span class="van-action-sheet__name">{{ $t('app.none') }}</span>
      </button>
      <button type="button"
        v-for="frameName in sheetList" :key="frameName"
        v-show="frameName.indexOf(sheetFilter) >= 0 && new RegExp(sheetRegex).test(frameName)"
        v-on:click="onSheetSelect(frameName)"
        :class="{ 'selected': store.part[sheetPartName] === frameName, 'van-action-sheet__item': true }"
      >
        <span class="van-action-sheet__name">{{ frameName }}</span>
      </button>
    </van-action-sheet>
  </div>
</template>

<style scoped>
.tenvi-canvas { margin: 0 auto; }
.selected { color: #ee0a24; }
</style>
