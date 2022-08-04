<script setup>
  import { ref, readonly } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
</script>

<template>
  <div class="action-edit">
    <div style="padding: 42% 0; text-align: center;">{{ $t('tip.nothingHere') }}</div>
  </div>
</template>

<style scoped>
</style>
