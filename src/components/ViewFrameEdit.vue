<script setup>
  import { ref, toRef, watch, onMounted, computed } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  // @ts-ignore
  import TenviCanvas from './TenviCanvas.vue';

  /** 部件数据集 */
  const part = ref({
    a_body: { frame: 'body_stand1_0', line: true},
    a_armL: { frame: 'arml_001', }, a_armR: { frame: 'armr_002', },
    a_legL: { frame: 'legl_001', }, a_legR: { frame: 'legr_002', },
    a_wp: { frame: '', }, a_wpGP: { frame: '', },
    a_shield: { frame: '', line: true},
    a_pp: { frame: '', line: true},
    p_body: { frame: '' },
  });
  /** 部件分组数据 */
  const partGroup = ref({
    a_base: ['a_body', 'a_armL', 'a_armR', 'a_legL', 'a_legR'],
    a_base1: ['a_wp', 'a_wpGP', 'a_shield', 'a_pp'],
    a_base2: [],
    p_base: ['p_body'],
    p_base1: [],
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
        (store.edit.pilotDisplay && key.startsWith('p_'))) {
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
    activeNames.value = ['0']; // 重置面板展开状态
    updatePartGroupList(); // 更新编辑区域的定义数据
  }, { immediate: true, flush: 'post' });
  
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
    sheetList.value = ['none', ...store.getPartFrameList(partName)];
    // 打开选取面板
    sheetActived.value = true; 
  };
  /** 部件帧选取事件 */
  const onSheetSelect = (frameName) => {
    part.value[sheetPartName.value]['frame'] = frameName; // 更新选取数据
    frameData.value = getGrawData(); // 更新绘制数据，触发绘制
  }
  
  /** 绑定的动作帧数据 */
  const frameData = ref({});
  /** 获取绘制所需数据 */
  const getGrawData = () => {
    let payload = {};
    for(const key in part.value) {
      if (store.isPartDisplay(key)) {
        payload[key] = part.value[key]['frame'];
      }
    }
    //console.log('getGrawData:', payload, store.getFrameData(payload))
    return store.getFrameData(payload);
  };

  onMounted(() => {
    store.updateResData(); // 更新资源
    let timerId = setInterval(() => {
      if (store.app.loading.size === 0) {
        frameData.value = getGrawData();
        clearInterval(timerId);
      }
    }, 100);
    
  });

  // 测试用 //
  const h1 = () => {
    //store.updateResData();
    store.reloadResData();
  };
  const h2 = () => {
    console.log('resDataMap:', store.resDataMap);
    console.log('resImgMap:', store.resImgMap);
  };
  const h3 = () => {
    let data = store.getPartsData('mecha');
    frameData.value = store.getFrameData(data);
    console.log('---h3--->', data, frameData.value);
  };
</script>

<template>
  <div class="frame-edit">
    <!-- 动作帧画布 -->
    <TenviCanvas :data="frameData" :order="store.order.default" :auto="false" :axis="true"></TenviCanvas>
    <!-- 编辑栏 -->
    <div v-show="true">
      <van-button @click="h1">updateResData</van-button>
      <van-button @click="h2">showData</van-button>
      <van-button @click="h3">TEST</van-button>
    </div>
    <!-- 编辑区 -->
    <div class="part-area">
      <van-collapse v-model="activeNames">
        <van-collapse-item :key="group.name" :title="group.name" :name="index"
          v-for="(group, index) in partGroupList">
          <van-cell :key="partName" 
            v-for="partName in group.item"
            :title="$t(`part.${partName}`)"
            :value="part[partName]['frame']"
            :class="{ line: part[partName]['line'] }"
            v-on:click="onPartClick(partName)"/>
        </van-collapse-item>
      </van-collapse>
      <!-- Mecha 
      <van-collapse v-model="activeNames" v-if="store.edit.type === 'mecha'">
        <van-collapse-item title="Base" name="1">
          <van-cell v-for="key in ['a_body', 'a_armL', 'a_armR', 'a_legL', 'a_legR']"
            v-bind:key="key"
            :title="$t(`part.${key}`)"
            :value="part[key]['frame']"
            :class="{ line: part[key]['line'] }"
            v-on:click="onPartClick(key)"/>
        </van-collapse-item>
        <van-collapse-item title="foo" name="2">
          
        </van-collapse-item>
        <van-collapse-item title="bar" name="3" value="auto" disabled></van-collapse-item>
      </van-collapse>-->
      <!-- Avatar -->
      <van-collapse v-model="activeNames" v-if="store.edit.type === 'avatar'">
      </van-collapse>
      <!-- Dragon -->
      <van-collapse v-model="activeNames" v-if="store.edit.type === 'dragon'">
      </van-collapse>
      <!-- Vehicle -->
      <van-collapse v-model="activeNames" v-if="store.edit.type === 'vehicle'">
      </van-collapse>
      <!-- Pilot -->
      <van-collapse v-model="activeNames" v-if="store.edit.pilotDisplay">
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
        v-show="!(['a_body'].includes(sheetPartName))"
        v-on:click="onSheetSelect('')"
        :class="{ 'selected': part[sheetPartName]['frame'] === '', 'van-action-sheet__item': true }"
      >
        <span class="van-action-sheet__name">{{ $t('app.none') }}</span>
      </button>
      <button type="button"
        v-for="frameName in sheetList" :key="frameName"
        v-show="frameName.indexOf(sheetFilter) >= 0 && new RegExp(sheetRegex).test(frameName)"
        v-on:click="onSheetSelect(frameName)"
        :class="{ 'selected': part[sheetPartName]['frame'] === frameName, 'van-action-sheet__item': true }"
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
