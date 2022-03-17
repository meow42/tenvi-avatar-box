<script setup>
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { locale, t } = useI18n();
  // @ts-ignore
  import { useStore } from '../store.js';
  const store = useStore();
  // @ts-ignore
  import { Notify } from 'vant';

  // 文件操作 //
  const fileOptions = [ 'new', 'save' ];

  /** 编辑参数选项菜单的对象引用 */
  const optionMenu = ref(null);

  /** 编辑对象类型列表 */
  const typeList = ref(Object.keys(store.app.typeCode));
  /** 编辑对象类型，本地状态 */
  const typeSelected = ref(store.edit.type);
  /** 是否附带驾驶员，本地状态 */
  const pilotEnable = ref(true);
  /** 编辑对象类型菜单的对象引用 */
  const typeMenu = ref(null);
  /** 打开编辑参数菜单事件 */
  const onTypeMenuOpen = () => {
    typeSelected.value = store.edit.type;
    pilotEnable.value = store.edit.pilotEnable;
  };
  /** 确认变更编辑参数事件 */
  const onEditTypeConfirm = () => {
    store.edit.type = typeSelected.value;
    store.edit.pilotEnable = (typeSelected.value == 'pilot') ? true : pilotEnable.value;
    store.saveEditConfig();
    typeMenu.value.toggle();
  };

  /** 语言选项数据 */
  const langOptions = [
    { value: 'cn', text: '简体中文', icon: 'imgs/flag-cn.png', emoji: '🇨🇳' },
    { value: 'hk', text: '繁體中文(港)', icon: 'imgs/flag-hk.png', emoji: '🇭🇰' },
    { value: 'jp', text: '日本語', icon: 'imgs/flag-jp.png', emoji: '🇯🇵' },
    { value: 'kr', text: '한국어', icon: 'imgs/flag-kr.png', emoji: '🇰🇷' },
    { value: 'us', text: 'English(US)', icon: 'imgs/flag-us.png', emoji: '🇺🇸' },
  ];
  /** 语言切换事件监听 */
  const onLangChange = (newValue) => {
    locale.value = newValue;
    // 更新本地缓存
    if (localStorage) localStorage.setItem('lang', newValue);
  };

  onMounted(() => {
  });
</script>

<template>
  <van-dropdown-menu class="menu-top">
    <!-- 设置选项 -->
    <van-dropdown-item ref="optionMenu" class="menu-option" v-on:close="store.saveEditConfig">
      <template #title>
        <van-icon name="setting-o" size="18" />
      </template>
      <!-- 选取部件资源时，是否展示原始图像 -->
      <van-field :label="$t('menu.showRawImg')">
        <template #input>
          <van-switch v-model="store.edit.showRawImg" size="20" />
        </template>
      </van-field>
      <!-- 是否显示坐标轴线 -->
      <van-field :label="$t('menu.showAxis')">
        <template #input>
          <van-switch v-model="store.edit.showAxis" size="20" />
        </template>
      </van-field>
      <!-- 是否自动绘制 -->
      <van-field :label="$t('menu.autoDraw')">
        <template #input>
          <van-switch v-model="store.edit.autoDraw" size="20" />
        </template>
      </van-field>
    </van-dropdown-item>
    
    <!-- 编辑对象选择 -->
    <van-dropdown-item ref="typeMenu" @open="onTypeMenuOpen">
      <template #title>
        {{ $t(`noun.${store.edit.type}`) }}
      </template>
      <van-radio-group v-model="typeSelected">
        <van-cell-group :title="$t(`menu.editTarget`)" inset>
          <van-cell clickable
            :title="$t(`noun.${item}`)" 
            @click="typeSelected = item"
            v-for="item in typeList" :key="item"
          >
            <template #right-icon>
              <van-radio :name="item" />
            </template>
          </van-cell>
          <van-cell :title="$t(`menu.displayPilot`)">
            <template #right-icon>
              <van-switch :model-value="true" size="18px" disabled v-if="typeSelected == 'pilot'" />
              <van-switch v-model="pilotEnable" size="18px" v-else />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-cell style="margin-top: 32px;">
        <van-button type="primary" block @click="onEditTypeConfirm">
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
