<script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { locale } = useI18n();
  import { useStore } from '../store.js';
  const store = useStore();

  // 文件操作 //
  const fileOptions = [ 'new', 'save' ];

  // 全局类型设置 //
  const guards = ['mecha', 'avatar', 'dragon', 'vehicle'];
  const guardSelected = ref(store.guard.type);
  const typeMenuOpened = ref(null);
  const onConfirm = () => {
    store.guard.type = guardSelected.value;
    typeMenuOpened.value.toggle();
  };
  const onOpen = () => {
    guardSelected.value = store.guard.type;

  };

  // 全局语言设置 //
  const langOptions = [
    { value: 'cn', text: '简体中文', icon: 'imgs/flag-cn.png', emoji: '🇨🇳' },
    { value: 'hk', text: '繁體中文(港)', icon: 'imgs/flag-hk.png', emoji: '🇭🇰' },
    { value: 'jp', text: '日本語', icon: 'imgs/flag-jp.png', emoji: '🇯🇵' },
    { value: 'kr', text: '한국어', icon: 'imgs/flag-kr.png', emoji: '🇰🇷' },
    { value: 'us', text: 'English(US)', icon: 'imgs/flag-us.png', emoji: '🇺🇸' },
  ];
  const onLangChange = (newValue) => {
    locale.value = newValue;
    localStorage.setItem('lang', newValue); // 更新本地缓存
  };
  /** 获取本地缓存的语言设置 */
  if (localStorage.getItem('lang')) {
    locale.value = localStorage.getItem('lang');
  }
</script>

<template>
  <van-dropdown-menu class="menu-top">
    <!-- 文件操作 -->
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
    <!-- 类型切换 -->
    <van-dropdown-item ref="typeMenuOpened" @open="onOpen">
      <template #title>
        <van-icon :name="`imgs/icon-${store.guard.type}.png`" />
        {{ $t(`guard.${store.guard.type}.text`) }}
      </template>
      <van-radio-group v-model="guardSelected">
        <van-cell-group :title="$t(`guard.text`)" inset>
          <van-cell clickable
            :title="$t(`guard.${item}.text`)" 
            :icon="`imgs/icon-${item}.png`"
            @click="guardSelected = item"
            v-for="item in guards" :key="item"
          >
            <template #right-icon>
              <van-radio :name="item" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-cell-group title="Display" inset>
        <van-cell clickable
            :title="$t(`pilot.text`)" 
            :icon="`imgs/icon-pilot.png`"
            @click="void(0)"
          >
            <template #right-icon>
              <van-radio shape="square" name="pilot" />
            </template>
          </van-cell>
      </van-cell-group>
      <van-cell>
        <van-button type="primary" block @click="onConfirm">
          {{ $t('app.confirm') }}
        </van-button>
      </van-cell>
    </van-dropdown-item>
    <!-- 语言切换 -->
    <van-dropdown-item v-model="locale" :options="langOptions" @change="onLangChange">
      <template #title>
        <van-icon :name="`imgs/flag-${locale}.png`" />
        {{ $t('app.lang') }}
      </template>
      <van-cell is-link center
          url="https://github.com/meow42/tenvi-avatar-box"
          icon="warning-o"
          :title="$t('tip.helpTranslation')"
          value="GitHub"
          title-style="color: #333; text-align: left;"
          v-show="false"
        />
    </van-dropdown-item>
  </van-dropdown-menu>
</template>

<style scoped>
</style>
