<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { ref } from 'vue';
  import { useStore } from './store.js';
  const store = useStore();
  import '@vant/touch-emulator';
  import MenuTop from './components/MenuTop.vue';
  import MenuBottom from './components/MenuBottom.vue';
  import ViewPartsEdit from './components/ViewPartsEdit.vue';
  import ViewFrameEdit from './components/ViewFrameEdit.vue';
  import ViewActionEdit from './components/ViewActionEdit.vue';
</script>

<template>
  <MenuTop></MenuTop>
  <div class="views">
    <ViewPartsEdit v-if="store.edit.view == 'parts'"></ViewPartsEdit>
    <ViewFrameEdit v-if="store.edit.view == 'frame'"></ViewFrameEdit>
    <ViewActionEdit v-if="store.edit.view == 'action'"></ViewActionEdit>
    <div v-else style="text-align: center; padding-top: 50%;">{{ store.edit.view }}</div>
  </div>
  <MenuBottom></MenuBottom>
</template>

<style>

</style>
