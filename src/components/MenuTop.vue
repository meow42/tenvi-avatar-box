<script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { locale, t } = useI18n();
  import { useStore } from '../store.js';
  const store = useStore();
  import { Notify } from 'vant';

  // 文件操作 //
  const fileOptions = [ 'new', 'save' ];

  // 全局类型设置 //
  const targets = ['pilot', 'mecha', 'avatar', 'dragon', 'vehicle'];
  const selected = ref(store.edit.type);
  const pilotDisplay = ref(true);
  const pilotDisplayTrue = ref(true);
  const typeMenuOpened = ref(null);
  const onConfirm = () => {
    let obj = {
      app: {
        editTarget: selected.value
      },
      pilot: {
        display: pilotDisplay.value
      }
    };
    if (selected.value == 'pilot') obj.pilot.display = true;
    store.save('editConfig', obj);
    typeMenuOpened.value.toggle();
  };
  const onOpen = () => {
    selected.value = store.edit.type;
    pilotDisplay.value = store.pilot.display;
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

  /** 获取本地缓存的配置 */
  if (localStorage) {
    // 获取并更新语言
    let lang = localStorage.getItem('lang');
    if (lang) locale.value = lang;
    // 获取并更新编辑类型配置
    store.load('editConfig');
  } else {
    Notify({ type: 'danger', message: t('error.useLocalStorage') });
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
        {{ $t(`noun.${store.edit.type}`) }}
      </template>
      <!-- 编辑对象选择 -->
      <van-radio-group v-model="selected">
        <van-cell-group :title="$t(`menu.editTarget`)" inset>
          <van-cell clickable
            :title="$t(`noun.${item}`)" 
            @click="selected = item"
            v-for="item in targets" :key="item"
          >
            <template #right-icon>
              <van-radio :name="item" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <!-- 显示选项 -->
      <van-cell-group title="Display" inset>
        <van-cell :title="$t(`noun.pilot`)">
          <template #right-icon>
            <van-switch v-model="pilotDisplayTrue" size="18px" disabled v-if="selected == 'pilot'" />
            <van-switch v-model="pilotDisplay" size="18px" v-else />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell style="margin-top: 32px;">
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
