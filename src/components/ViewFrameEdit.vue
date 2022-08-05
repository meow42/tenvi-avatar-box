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
    a_head: { default: 'door01' }, a_headS: { default: '' },
    a_bodyX: { default: 'bodyarmor02' }, a_pp: { default: 'pp00' }, 
    a_bodyXS: { default: '' }, a_bodyXB: { default: '' },
    a_armLX: { default: 'arml_001', sync: 'a_armL' }, a_armRX: { default: 'armr_002', sync: 'a_armR' },
    a_legLX: { default: 'legl_001', sync: 'a_legL' }, a_legRX: { default: 'legr_002', sync: 'a_legR' },
    a_wpR: { default: 'g_stand1_00' }, a_wpRS: { default: 'g_stand1_00_00' },
    a_wpL: { default: 'shield00', line: true },
    
    t_body: { default: 'g_stand_00_bd' }, t_head: { default: 'head00' },
    t_armR: { default: 'armr00' }, t_armL: { default: 'arml00' },
    t_legR: { default: 'leg00' }, 
    t_bodyX: { default: 'g_stand_00_bd' }, t_headX: { default: 'head00' },
    t_armRX: { default: 'armr00' }, t_armLX: { default: 'arml00' },
    t_armRT: { default: 'armr00' }, t_armLT: { default: 'arml00' }, 
    t_legRX: { default: 'leg00', line: true  },
    t_legRT: { default: 'g_stand_00_bdl' }, t_legLT: { default: 'g_stand_00_bdr' }, 
    t_pp: { default: 'g_stand_01', line: true  },
    t_wpRF: { default: 'rf_gstand1_00' }, t_wpRB: { default: 'rb_gstand1_00' },
    t_wpLF: { default: 'lf_stand1_00' }, t_wpLB: { default: 'lb_stand1_00' },

    s_body: { default: 'body_gstand1_00', line: true }, 
    s_head: { default: 'head00' }, s_eye: { default: 'eye00' },
    s_legF: { default: 'g_fleg00' }, s_legB: { default: 'g_bleg00' },
    s_legT: { default: '' },

    s_bodyX: { default: 'body_gstand1_00' }, s_headX: { default: 'head00' },
    s_legFX: { default: 'g_fleg00' }, s_legBX: { default: 'g_bleg00' },
    s_tailX: { default: '', line: true},
    s_ppR: { default: '' }, s_ppL: { default: '' },
    s_wpR: { default: '' }, s_wpL: { default: '' },

    p_body: { default: '' },

    v_car_body: { default: 'body0' }, v_car_bodyB: { default: 'bodyback' }, 
    v_car_wheel0: { default: 'wheel00_0' }, v_car_wheel1: { default: 'wheel01_0' }, 
    v_car_wheel2: { default: 'wheel02_0' }, v_car_wheel3: { default: 'wheel02_0' }, 
    v_car_gun: { default: '' }, v_car_gunB: { default: '' }, 
    v_car_mouse: { default: '' },
    v_chair: { default: 'chair00' }, v_chair_dog: { default: 'dog00' },
    v_chair_ring: { default: 'ring00' }, v_chair_parasol: { default: 'parasol' },
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
    //p_base: ['p_body'],
    //p_equip: [],

    a_base: ['a_body', 'a_armS', 'a_armL', 'a_armR', 'a_legL', 'a_legR'],
    a_weapon: ['a_wpR', 'a_wpRS', 'a_wpL'],
    a_equip: ['a_head', 'a_headS', 'a_bodyX', 'a_pp', 'a_bodyXS', 'a_bodyXB', 'a_armLX', 'a_armRX', 'a_legLX', 'a_legRX'],
    
    t_base: ['t_body', 't_head', 't_armR', 't_armL', 't_legR'],
    t_weapon: ['t_wpRF', 't_wpRB', 't_wpLF', 't_wpLB'],
    t_equip: ['t_headX', 't_bodyX', 't_armLX', 't_armRX', 't_armLT', 't_armRT', 't_legRX', 't_legLT', 't_legRT', 't_pp'],
    
    s_base: ['s_body', 's_head', 's_eye', 's_legF', 's_legB', 's_legT',],
    s_weapon: ['s_wpR', 's_wpL'],
    s_equip: ['s_bodyX', 's_headX', 's_legFX', 's_legBX', 's_tailX', 's_ppR', 's_ppL'], 
    
    v_car: ['v_car_body', 'v_car_bodyB', 'v_car_wheel0', 'v_car_wheel1', 'v_car_wheel2', 'v_car_wheel3', 'v_car_gun', 'v_car_gunB', 'v_car_mouse'],
    v_chair: ['v_chair', 'v_chair_dog', 'v_chair_ring', 'v_chair_parasol'],
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
  const activeNames = ref([0, 1, 2]);
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
  
  /** 当前的动作帧数据 */
  const frameData = ref({});
  /** 当前的动作帧部件顺序 */
  const partOrder = ref([]);
  /** 获取绘制所需数据 */
  const updateDrawData = () => {
    let payload = {};
    // 遍历部件，处理数据
    for(const key in partData.value) {
      // 只获取需要的部件数据
      if (!store.isPartEnable(key)) continue;
      payload[key] = store.part[key];
    }
    frameData.value = store.getFrameData(payload);
    // 设置默认层级数据
    if (!partOrder || partOrder.value.length < 1) partOrder.value = store.getOrder();
    console.log('updateDrawData:', payload, frameData.value, partOrder.value);
  };
  /** 处理需要强制同步的数据，主要用于固定帧的载具 */
  const setFixedData = () => {
    if (store.edit.type == 'vehicle') {
      let fixed = store.getFixedFrameByResCode(store.res.v_res);
      // console.log('setFixedFrameData:', fixed);
      partOrder.value = fixed.order || [];
      for(let key in fixed.frame) {
        if (store.isPartEnable(key)) store.part[key] = fixed.frame[key];
        console.log('setFixedFrameData:', key, partData.value[key]);
      }
    }
  }

  /** 导出数据 */
  const exportJson = () => {};

  /* 初始化视图 */
  const initView = () => {
    // 加载资源
    updatePartData();
    updatePartGroupList();
    // 轮询资源加载状态，完成后更新绘制数据
    let timerId = setInterval(() => {
      if (store.app.loading.size === 0) {
        setFixedData();
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
        :order="partOrder" 
        :hide="[]"
        :auto="store.edit.autoDraw" 
        :axis="store.edit.showAxis"
        :bottom="store.edit.type == 'vehicle' ? 16 : 56"
      ></TenviCanvas>
    </div>
    <!-- 快捷功能 -->
    <div class="fn">
      <van-button plain size="small" icon="" v-on:click="syncPartData" v-show="false">{{ $t('menu.autoSync') }}</van-button>
      <van-button plain size="small" icon="" v-on:click="exportJson" v-show="false">{{ $t('menu.export') }}</van-button>
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
