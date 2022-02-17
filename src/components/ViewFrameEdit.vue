<script setup>
  import { ref, reactive, markRaw, onMounted } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  // @ts-ignore
  import TenviCanvas from './TenviCanvas.vue';

  const editAct = ref({
    id: '', cn: '',
  });

  const h1 = () => {
    store.updateResData();
  };
  const h2 = () => {
    console.log(store.resDataMap)
  };
  const h3 = () => {
    console.log(store.getPartResList('a-body', 'mecha'))
  };
  function h4() {
    //partsOrder.value.pop();
    //conf.auto = !conf.auto;
    console.log('conf.auto:', conf.auto);
    axis.value = Boolean(!axis.value);
    console.log('axis:', axis.value);
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
    /*
    'a-arml': {
      "rootName": "a-body",
      "linkSelf": "arml",
      "linkTarget": "",
      "name": "arml_001",
      "code": "00008",
      "imgName": "00008_0",
      size: { x: 31, y: 47 },
      offset: { x: 558, y: 47 },
      center: { x: 15, y: 23 },
      "point": {
          "arml": {
              "name": "arml",
              "x": 23,
              "y": 11
          },
          "hl": {
              "name": "hl",
              "x": 15,
              "y": 36
          }
      }
    },
    'a-armr': {
      "rootName": "a-body",
      "linkSelf": "armr",
      "linkTarget": "",
      "name": "armr_002",
      "code": "00008",
      "imgName": "00008_0",
      size: { x: 31, y: 48 },
      offset: { x: 217, y: 48 },
      center: { x: 15, y: 24 },
      "point": {
          "armr": {
              "name": "armr",
              "x": -3,
              "y": 11
          },
          "hr": {
              "name": "hr",
              "x": 15,
              "y": 38
          }
      }
    },
    'a-legl': {
      "rootName": "a-body",
      "linkSelf": "legl",
      "linkTarget": "",
      "name": "legl_001",
      "code": "00008",
      "imgName": "00008_0",
      size: { x: 25, y: 36 },
      offset: { x: 125, y: 180 },
      center: { x: 12, y: 18 },
      "point": {
          "legl": {
              "name": "legl",
              "x": 13,
              "y": 9
          }
      }
    },
    'a-legr': {
      "rootName": "a-body",
      "linkSelf": "legr",
      "linkTarget": "",
      "name": "legr_002",
      "code": "00008",
      "imgName": "00008_0",
      size: { x: 24, y: 28 },
      offset: { x: 624, y: 224 },
      center: { x: 12, y: 14 },
      "point": {
          "legr": {
              "name": "legr",
              "x": 9,
              "y": 1
          }
      }
    },*/
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
    store.loadImage(store.getResImgURL('00008_0')).then(img => {
      console.log('loadImage', img);
      for(const key in partsData.value) {
        partsData.value[key]['img'] = img;
      }
    });
  });
</script>

<template>
  <div class="frame-edit">
    <!-- 预览轮播 -->
    <TenviCanvas :data="partsData" :order="partsOrder" :auto="false" :axis="axis"></TenviCanvas>
    <!-- 编辑栏 
    <van-button @click="$refs['c1'].draw">draw</van-button>
      <van-button @click="$refs.c1.drawAxis">drawAxis</van-button>
      <van-button @click="$refs.c1.clean">clean</van-button>
    -->
    <div>
      
    </div>
    <!-- 编辑区 -->
    <div>
      <van-button @click="h1">updateResData</van-button>
      <van-button @click="h2">showData</van-button>
      <van-button @click="h3">getPartResList</van-button>
      <br/><van-button @click="h4">TEST</van-button>
    </div>
    <!-- 选项面板 -->
  </div>
</template>

<style scoped>
</style>
