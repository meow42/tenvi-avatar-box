<script setup>
  import { ref } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
</script>

<template>
  <div class="order-edit">
    <div style="padding: 42% 0; text-align: center;">{{ $t('tip.nothingHere') }}</div>
  </div>
</template>

<style scoped>
</style>
