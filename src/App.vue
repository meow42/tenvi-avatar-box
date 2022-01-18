<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { useStore } from './store.js'
  const store = useStore();
  import MenuTop from './components/MenuTop.vue'
</script>

<template>
  <MenuTop></MenuTop>
  <br/> {{ $t('app.title') }} <br/>
  <van-button type="primary" @click="store.countPlusOne()">计数：{{ store.count }}</van-button> <br/>
  countPow2: {{ store.countPow2 }}
</template>

<style>

</style>
