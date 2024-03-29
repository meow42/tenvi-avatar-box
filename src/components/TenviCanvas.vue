<script setup>
  import { onMounted, ref, watch, computed } from 'vue';

  /** 组件接收的参数 */
  const props = defineProps({
    width: { type: Number, default: 256 },
    height: { type: Number, default: 256 },
    bottom: { type: Number, default: 56 },
    auto: { type: Boolean, default: true },
    axis: { type: Boolean, default: false },
    data: { type: Object, default: {} }, // 部件数据
    order: { type: Array, default: [] }, // 部件叠放顺序
    hide: { type: Array, default: [] }, // 需要隐藏的部件列表
    drawCallBack: undefined,
  });
  /* 画布属性 */
  const canvasNode = ref(null);
  const canvasAPI = ref(null);
  const width = computed(() => props.width);
  const height = computed(() => props.height);
  //const bottom = computed(() => props.bottom);
  const originX = computed(() => width.value / 2);
  const originY = computed(() => height.value - props.bottom);
  
  /* 监听数据变更 */
  watch(props, (_props) => {
    //console.log('watch props:', _props);
    // 自动重绘
    if (props.auto) draw();
  }, { immediate: false, flush: 'post' });

  /** 获取绘制数据 */
  function getData() {
    let data = {};
    Object.assign(data, props.data);
    // 增加根节点对象，不存在则赋值为 undefined
    for (const key in data) {
      let part = data[key];
      part.root = data[part['rootName']];
    }
    // 增加绘制坐标数据
    for (const key in data) {
      let part = data[key];
      part.draw = gainDarwPoint(part);
    }
    return data;
  };
  /** 计算并设置部件的绘制坐标 */
  function gainDarwPoint(part) {
    // 已存在绘制坐标数据，则直接返回
    if (part['draw']) return part.draw;
    // 如果不存在根节点，则使用中心点坐标
    if (!part['root'] || part.root === 'none') {
      return { x: -part.center.x || 0, y: part.center.y || 0};
    }
    // 确保根部件都有绘制坐标数据，
    if (!part.root.draw) part.root.draw = gainDarwPoint(part.root);
    // 根部件绘制坐标
    let rootPoint = part.root.draw;
    // 根部件上的连接点数据
    let rootLink = part.root.point[part['linkTarget']] || part.root.point[part['linkSelf']] || { x: 0, y: 0 };
    // 本部件的连接点数据
    let selfLink;
    if (part.point) selfLink = part.point[part['linkSelf']];
    if (!selfLink) {
      selfLink = part['center'] || { x: 0, y: 0 };
      console.info('gainDarwPoint - point not found:', part['linkSelf'], part);
    }
    // 计算绘制坐标数据
    let draw = {};
    draw.x = rootPoint.x + rootLink.x - selfLink.x;
    draw.y = rootPoint.y - rootLink.y + selfLink.y;
    // 处理坐标的特殊情况
    if (part['offsetX']) draw.x += part['offsetX'];
    if (part['offsetY']) draw.y += part['offsetY'];
    return draw;
  };
  
  /* 初始化 */
  onMounted(() => {
    // 初始化绘制对象
    canvasAPI.value = canvasNode.value.getContext('2d');
    canvasAPI.value.imageSmoothingEnabled = false; // 关闭抗锯齿
    // 绘制
    if (props.auto) draw();
  });

  /** 清空画布 */
  function clean() {
    canvasAPI.value.clearRect(0, 0, width.value, height.value);
  };
  /** 绘制坐标轴线 */
  function drawAxis() {
    let c = canvasAPI.value;
    // 设置轴线参数
    c.beginPath();
    c.lineWidth = 1;
    c.strokeStyle = '#999';
    // 定义X轴
    let _oy = Math.floor(originY.value) + 0.5;
    c.moveTo(0, _oy);
    c.lineTo(width.value, _oy);
    // 定义Y轴
    let _ox = Math.floor(originX.value) + 0.5;
    c.moveTo(_ox, 0);
    c.lineTo(_ox, height.value);
    // 绘制
    c.stroke();
    //console.log('drawAxis:', _ox, _oy);
  };
  /** 绘制单个部件 */
  function drawPart(data, scaleX, scaleY) {
    if (!data || !data['img']) return;
    scaleX = scaleX || 1;
    scaleY = scaleY || 1;
    //console.log('drawPart:', data);
    canvasAPI.value.drawImage(
      data.img, // 图像资源
      data.offset.x, // 图像裁剪偏移x
      data.offset.y, // 图像裁剪偏移y
      data.size.x, // 图像宽度
      data.size.y, // 图像高度
      originX.value + data.draw.x * scaleX, // 绘制位置x
      originY.value - data.draw.y * scaleY, // 绘制位置y
      data.size.x * scaleX, // 绘制的图像宽度
      data.size.y * scaleY // 绘制的图像高度
    );
  };
  /** 绘制完整图像 */
  function draw() {
    // 清空画布
    clean();
    // 绘制坐标轴线
    if (props.axis) drawAxis();
    // 按照层级顺序绘制
    let parts = getData();
    let order = [...props.order].reverse();
    order.map(partName => {
      // 跳过无数据/隐藏状态部件
      if (!parts[partName] || props.hide.includes(partName)) return;
      drawPart(parts[partName]);
    });
    // 执行绘制完成时的回调
    if (props.drawCallBack && canvasNode.value) {
      let url = canvasNode.value.toDataURL("image/png");
      props.drawCallBack(url);
    }
    //console.log('---> TenviCanvas.draw()', order, parts);
  };
</script>

<template>
  <div class="tenvi-canvas">
    <canvas
      ref="canvasNode"
      :width="props.width"
      :height="props.height"
      @click="draw"
      @dblclick="clean"
    ></canvas>
  </div>
</template>

<style scoped>
.tenvi-canvas {
  width: fit-content;
  height: fit-content;
}
</style>
