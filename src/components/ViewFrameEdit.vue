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
    console.log(store.getPartResList('a-body', 'mecha'))
  };
  function h4() {
    store.getPartFrameData('a_body', 'body_stand1_0', '00008');
  };

  const conf = markRaw({
    auto: true,
    axis: false
  });

  const axis = ref(Boolean(false));

  const partsData = ref({
    'a-body': {
      "rootName": "",
      "linkSelf": "center",
      "linkTarget": "",
      "name": "body_stand1_0",
      "code": "00008",
      "imgName": "00008_0",
      size: { x: 53, y: 21 },
      offset: { x: 636, y: 84 },
      center: { x: 27, y: 44 },
      "point": {
          "mount": {
              "name": "mount",
              "x": 22,
              "y": 10
          },
          "arml": {
              "name": "arml",
              "x": 2,
              "y": 6
          },
          "armr": {
              "name": "armr",
              "x": 43,
              "y": 6
          },
          "legl": {
              "name": "legl",
              "x": 16,
              "y": 17
          },
          "legr": {
              "name": "legr",
              "x": 33,
              "y": 17
          },
          "ahead": {
              "name": "ahead",
              "x": 26,
              "y": -10
          },
          "propulsion": {
              "name": "propulsion",
              "x": 24,
              "y": 6
          },
          "rh": {
              "name": "rh",
              "x": 57,
              "y": 33
          },
          "lh": {
              "name": "lh",
              "x": 2,
              "y": 11
          },
          "attack": {
              "name": "attack",
              "x": 27,
              "y": 44
          },
          "hit": {
              "name": "hit",
              "x": 26,
              "y": 10
          },
          "brow": {
              "name": "brow",
              "x": 26,
              "y": -5
          },
          "mask": {
              "name": "mask",
              "x": 26,
              "y": 0
          },
          "c": {
              "name": "c",
              "x": 26,
              "y": 10
          }
      }
    },
  });
  const partsOrder = ref([
    'a-weapon', 'a-arms', 'a-armr1', 'a-armr',  'a-weapon1',
    'a-door',
    'a-skirt', 'a-legr1', 'a-legr',
    'a-armor', 'a-body',
    'a-door1', 
    'a-legl1', 'a-legl', 'a-booster',
    'a-arml1', 'a-arml', 'a-shield',
    'a-propulsion'
  ]);

  onMounted(() => {
  });
</script>

<template>
  <div class="frame-edit">
    <!-- 预览轮播 -->
    <TenviCanvas :data="partsData" :order="partsOrder" :auto="false" :axis="true"></TenviCanvas>
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
