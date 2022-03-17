<script setup>
  import { ref, toRef, watch, onMounted, onBeforeMount, computed } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  // @ts-ignore
  import TenviCanvas from './TenviCanvas.vue';

  /** 部件数据集 */
  const partData = ref({
    a_body: { frame: 'body_stand1_0' }, a_armS: { frame: '' },
    a_armL: { frame: 'arml_001' }, a_armR: { frame: 'armr_002' },
    a_legL: { frame: 'legl_001' }, a_legR: { frame: 'legr_002' },
    a_head: { frame: '' }, a_headS: { frame: '' },
    a_pp: { frame: '' }, a_bodyX: { frame: '', sync: 'a_body' },
    a_bodyXS: { frame: '' }, a_bodyXB: { frame: '' },
    a_armLX: { frame: '', sync: 'a_armL' }, a_armRX: { frame: '', sync: 'a_armR' },
    a_legLX: { frame: '', sync: 'a_legL' }, a_legRX: { frame: '', sync: 'a_legR' },
    
    a_wp: { frame: 'g_stand1_00' }, a_wpGP: { frame: 'g_stand1_00_00' },
    a_shield: { frame: 'shield00', line: true },
    p_body: { frame: '' },
  });
  /** 同步部件数据 */
  const updatePartData = () => {
    for (const key in partData.value) {
      if(store.isPartEnable()) {}
    }
  };
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
      console.log('getPartGroupList:', key, typeCode)
      if (key.startsWith(typeCode + '_') || 
        (store.edit.pilotEnable && key.startsWith('p_'))) {
        list.push({
          name: key,
          item: partGroup.value[key]
        });
      }
      
    }
    console.log('getPartGroupList:', list)
    partGroupList.value = list;
  };

  /** 标记展开的部件分类面板 */
  const activeNames = ref([]);
  /* 监听数据变更 */
  watch(store.edit, (newObj) => {
    console.log('watch:', newObj);
    activeNames.value = [0]; // 重置面板展开状态
    updatePartGroupList(); // 更新编辑区域的定义数据
    updateDrawData(); // 更新绘制用数据
  }, { immediate: false, flush: 'post' });
  
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
    partData.value[sheetPartName.value]['frame'] = frameName; // 更新选取数据
    updateDrawData(); // 更新绘制数据，触发绘制
  }
  
  /** 绑定的动作帧数据 */
  const frameData = ref({});
  /** 获取绘制所需数据 */
  const updateDrawData = () => {
    let payload = {};
    for(const key in partData.value) {
      if (!partData.value[key]['frame']) continue;
      if (!store.isPartEnable(key)) continue;
      payload[key] = partData.value[key]['frame'];
    }
    let data = store.getFrameData(payload);
    console.log('frameData:', payload, data)
    frameData.value = data;
  };

  onBeforeMount(() => {
    store.updateResData();
    updatePartData();
    updatePartGroupList();
    // 设定面板展开状态
    activeNames.value = [0];
  });
  onMounted(() => {
    // 轮询资源加载状态，完成后更新绘制数据
    let timerId = setInterval(() => {
      if (store.app.loading.size === 0) {
        updateDrawData();
        clearInterval(timerId);
      }
    }, 100);
  });
</script>

<template>
  <div class="frame-edit">
    <!-- 动作帧画布 -->
    <div class="canvas">
      <TenviCanvas :data="frameData" :order="store.getOrder()" :auto="store.edit.autoDraw" :axis="store.edit.showAxis"></TenviCanvas>
    </div>
    <!-- 快捷功能 -->
    <div class="fn">
    </div>
    <!-- 编辑区 -->
    <div class="edit">
      <van-collapse v-model="activeNames">
        <van-collapse-item :key="group.name" :title="$t(`group.${group.name}`)" :name="index"
          v-for="(group, index) in partGroupList">
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
