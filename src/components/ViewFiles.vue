<script setup>
  import { ref } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
</script>

<template>
  <div class="view-file">
    <div style="padding: 42% 0; text-align: center;">{{ $t('tip.nothingHere') }}</div>
  </div>
  <!-- 文件操作 
    <van-dropdown-item class="menu-file">
      <template #title>
        <van-icon name="wap-nav" size="14" />
        {{ $t('menu.file') }}
      </template>
      <van-cell clickable :title="$t('menu.save')" :value="$t('tip.unavailable')" icon="completed"></van-cell>
      <van-cell is-link :title="$t('menu.saveAs')" :value="$t('tip.unavailable')" icon="records"></van-cell>
      <van-cell is-link :title="$t('menu.import')" :value="$t('tip.unavailable')" icon="description"></van-cell>
      <van-cell is-link :title="$t('menu.export')" :value="$t('tip.unavailable')" icon="down"></van-cell>
      <van-cell is-link :title="$t('menu.new')" :value="$t('tip.unavailable')" icon="add-o" ></van-cell>
    </van-dropdown-item>
    -->
</template>

<style scoped>
</style>
