<script setup>
  import { ref, toRef, watch, onMounted, computed } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  // @ts-ignore
  import TenviCanvas from './TenviCanvas.vue';

  /** 绑定的动作帧数据 */
  const frameData = ref({});
  /** 部件数据集 */
  const part = ref({
    a_body: { frame: 'body_stand1_0', line: true},
    a_armL: { frame: 'arml_001', },
    a_armR: { frame: 'armr_002', },
    a_legL: { frame: 'legl_001', },
    a_legR: { frame: 'legr_002', },
  });
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

  /** 标记展开的部件分类面板 */
  const activeNames = ref([]);
  /* 监听数据变更 */
  watch(toRef(store.edit, 'type'), (newType) => {
    activeNames.value = ['1']; // 重置面板展开状态
    //console.log('watch:', newType, activeNames.value);
  }, { immediate: true, flush: 'post' });
  
  /** 部件帧选取面板的开启状态 */
  const sheetActived = ref(false);
  /** 部件帧数据 */
  const sheetList = ref([]);
  const sheetFilter = ref('');
  const sheetUseRegex = ref(true);
  /** 部件点击事件 */
  const onPartClick = (partName) => {
    sheetActived.value = true; // 打开选取面板
    updateSheetList(partName); // 更新数据
  };
  /** 部件帧选取事件 */
  const onSheetSelect = (item) => {
    let partName = item['partName'];
    if (!partName || !part.value[partName]) return;
    part.value[partName]['frame'] = item['name'];
    frameData.value = getGrawData();
    console.log('onSheetSelect:', item);
  }
  /** 更新部件帧数据 */
  const updateSheetList = (partName) => {
    console.log(partName);
    // 清空结果，放置加载效果选项
    sheetList.value = [{ name: 'none', loading: true }];
    // 加载原始数据列表
    let list = store.getPartFrameList(partName, sheetUseRegex.value) || [];
    list.map(name => {
      if (sheetFilter && name.indexOf(sheetFilter.value) == -1) return;
      let item = {};
      item.name = name;
      item.partName = partName;
      //TODO 标记当前选项
      //item.color = '#ee0a24'; 
      sheetList.value.push(item);
    });
    // 加载完成
    sheetList.value[0]['loading'] = false;
  } 
  
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
    <TenviCanvas :data="frameData" :order="store.order.default" :auto="true" :axis="true"></TenviCanvas>
    <!-- 编辑栏 -->
    <div v-show="true">
      <van-button @click="h1">updateResData</van-button>
      <van-button @click="h2">showData</van-button>
      <van-button @click="h3">TEST</van-button>
    </div>
    <!-- 编辑区 -->
    <div>
      <van-collapse v-model="activeNames">
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
      </van-collapse>
    </div>
    <!-- 选项面板 -->
    <van-action-sheet
      v-model:show="sheetActived"
      @select="onSheetSelect"
      :actions="sheetList" 
      :cancel-text="$t('app.cancel')"
      overlay-class="sheet-overlay"
      class="sheet" >
      <template #description>
        <van-field 
          v-model="sheetFilter" 
          :label="'search'"
          :placeholder="'tips-search'"
          left-icon="search"
          clearable
          class="sheet-search"
        >
          <template #button>
            <van-checkbox v-model="sheetUseRegex">{{ 'regex' }}</van-checkbox>
          </template>
        </van-field>
      </template>
    </van-action-sheet>
  </div>
</template>

<style scoped>
.tenvi-canvas { margin: 0 auto; }
</style>
