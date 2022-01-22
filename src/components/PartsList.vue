<script setup>
  import { ref } from 'vue';
  import { useStore } from '../store.js';
  const store = useStore();
  import parts from '../data/parts.js';

  const props = defineProps({
    partName: String,
  });
  const emit = defineEmits(['itemChanged']);
  const getItemList = () => {
    let typeName = store.app.editTarget;
    if (!parts[typeName] || !parts[typeName][props.partName]) return [];
    return parts[typeName][props.partName];
  };
  const itemSelect = (item) => {
    console.log('itemSelect:', item.id);
  };
</script>

<template>
  <van-list>
    <div v-for="(item, index) in store.partItemData" :key="index" @click="itemSelect(item)"
      class="item" :class="{ 'item-selected': item.id == '', 'newline': item.id.includes('|')}">
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
  <van-button @click="$emit('itemChanged', '00001')">{{ props.typeName }} - {{ props.partName }}</van-button>
</template>

<style scoped>
</style>
