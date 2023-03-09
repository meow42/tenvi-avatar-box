<script setup>
import { ref, readonly, watch, onMounted, onBeforeMount } from 'vue';
import { useStore } from '../store.js';
const store = useStore();
// @ts-ignore
import TenviCanvas from './TenviCanvas.vue';

/** 当前的动作定义数据 */
const actionData = ref([]);
/** 当前的动作帧数据 */
const frameData = ref({});
/** 当前的动作帧部件顺序 */
const partOrder = ref([]);

/** 当前的动作帧图片URL */
const frameURL = ref(['1', '2', '3']);
/** 绘制操作后的回调 */
const drawCallBack = ref(undefined);

const load = () => {
  // 获取配置中的数据
  frameData.value = testData.value['frame'];
  actionData.value = testData.value['action']['default'];
  partOrder.value = testData.value['order']['default'];
  
  let frame = actionData.value['frame'];
  let action = actionData.value['action']['default'];
  
  frameURL.value = [];
  drawCallBack.value = (url) => {
    console.log('drawCallBack', frameURL.value);
    frameURL.value.push(url);
  };
  action.map(item => {
    let payload = {};
    let _f = frame[item['f']];
    Object.keys(_f).map(key => {
      payload[key] = _f[key];
    });
    frameData.value = store.getFrameData(payload);
  });
  //drawCallBack.value = undefined;

  console.log('-------------->load:', frameURL.value);
  return;

console.log('drawCallBack:', imgUrl);
  let payload = {};
  payload.v_body = 'chair00';
  frameData.value = store.getFrameData(payload);

  
}

const toImg = () => {
  let canvas = document.getElementById('action-canvas').getElementsByTagName('canvas')[0];
  let url = canvas.toDataURL("image/png");
  //console.log('toImg:', canvas, url); return;
  frameURL.value[0] = url;
}


// 测试数据
const testData = {
  "res": {
    "v_res": "v0018"
  },
  "order": {
    "default": ["v_body"]
  },
  "frame": {
    "f0": { "v_body": "chair00" },
    "f1": { "v_body": "chair01" },
    "f2": { "v_body": "chair02" },
    "f3": { "v_body": "chair03" },
    "f4": { "v_body": "chair04" },
    "f5": { "v_body": "chair05" },
    "f6": { "v_body": "chair06" },
    "f7": { "v_body": "chair07" },
    "f8": { "v_body": "chair08" },
    "f9": { "v_body": "chair09" },
    "f10": { "v_body": "chair10" }
  },
  "action": {
    "default": [
      { "f": "f0", "d": 200 },
      { "f": "f1", "d": 100 },
      { "f": "f2", "d": 100 },
      { "f": "f3", "d": 100 },
      { "f": "f4", "d": 100 },
      { "f": "f5", "d": 100 },
      { "f": "f6", "d": 100 },
      { "f": "f7", "d": 100 },
      { "f": "f8", "d": 100 },
      { "f": "f9", "d": 100 },
      { "f": "f10", "d": 100 }
    ]
  },
  "note": ""
};

onBeforeMount(() => {
  //store.res.v_res = 'v0018';
});
onMounted(() => {
});
</script>

<template>
  <div class="action-edit">
    <!-- 动作预览 -->
    <div class="preview">
      <van-swipe class="my-swipe" :duration="0" indicator-color="white">
        <van-swipe-item v-for="(url, index) in frameURL" :key="index">
          <van-image :src="url" />
        </van-swipe-item>
      </van-swipe>
      <van-grid>
        <van-grid-item icon="photo-o" text="load" @click="load" />
        <van-grid-item icon="photo-o" text="toImg" @click="toImg" />
        <van-grid-item icon="photo-o" text="loop" @click="loop"/>
        <van-grid-item icon="photo-o" text="stop" @click="stop"/>
      </van-grid>
    </div>
    <!-- 动作帧画布 -->
    <div class="canvas">
      <TenviCanvas id="action-canvas"
        :data="frameData"
        :order="partOrder"
        :drawCallBack="drawCallBack"
      ></TenviCanvas>
    </div>

    <div style="padding: 42% 0; text-align: center; display: none;">{{ $t('tip.nothingHere') }}</div>
  </div>
</template>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
