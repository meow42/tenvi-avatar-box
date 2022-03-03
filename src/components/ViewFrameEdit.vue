<script setup>
  import { ref, reactive, markRaw, onMounted } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  // @ts-ignore
  import TenviCanvas from './TenviCanvas.vue';

  const activeNames = ref(['1', '2']);

  const editAct = ref({
    id: '', cn: '',
  });

  const h1 = () => {
    //store.updateResData();
    store.reloadResData();
  };
  const h2 = () => {
    console.log('resDataMap:', store.resDataMap);
    console.log('resImgMap:', store.resImgMap);
  };
  const h3 = () => {
    console.log()
  };
  function h4() {
    let data = store.getFrameData({
      a_body: 'body_stand1_0',
      a_armL: 'arml_001',
      a_armR: 'armr_002',
      a_legL: 'legl_001',
      a_legR: 'legr_002',
    });
    frameData.value = data;
    console.log(data);
  };

  const frameData = ref({});

  onMounted(() => {
    store.updateResData(); // 更新资源
  });
</script>

<template>
  <div class="frame-edit">
    <!-- 预览轮播 -->
    <TenviCanvas :data="frameData" :order="store.mecha.order" :auto="false" :axis="true"></TenviCanvas>
    <!-- 编辑栏 -->
    <div v-show="true">
      <van-button @click="h1">updateResData</van-button>
      <van-button @click="h2">showData</van-button>
      <van-button @click="h3">getPartResList</van-button>
      <van-button @click="h4">TEST</van-button>
    </div>
    <!-- 编辑区 -->
    <div>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="Base" name="1">
          <van-cell title="Body" value="内容" />
        </van-collapse-item>
        <van-collapse-item title="标题2" name="2">
          
        </van-collapse-item>
        <van-collapse-item title="标题3" name="3">
          
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 选项面板 -->
  </div>
</template>

<style scoped>
</style>
