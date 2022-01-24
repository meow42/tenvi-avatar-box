<script setup>
  import { ref } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();

  const itemClick = (item) => {
    console.log('itemSelect:', item.id);
    store.setPartRes(item.id);
  };
</script>

<template>
  <van-list>
    <div v-for="(item, index) in store.getPartItemData()" :key="index" @click="itemClick(item)"
      class="item" :class="{ 'item-selected': item.id == store.getSelectedPartItemCode(), 'newline': item.id.includes('|')}">
      <div v-if="!item.id.includes('|')">
        <van-image width="36" height="36" radius="3" fit="none" :src="store.getIconURL(item.id)" :alt="item.id">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <span>{{ item.id }}</span>
      </div>
    </div>
  </van-list>
</template>

<style scoped>
</style>
