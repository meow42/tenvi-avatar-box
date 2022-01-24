import { defineStore, acceptHMRUpdate } from 'pinia';
import Parts from './data/parts.js';

const useStore = defineStore('main', {
  state: ()=> ({
    app: {
      view: 'overview',
      editTarget: 'mecha',
      partSelected: '',
      resDomain: 'https://tenvix.meow42.cn/',
    },
    pilot: {
      display: true, 
      skin: 'yellow',
      res: {
        bd: '',
        hd: '',
        fc: '',
        fa: '',
        hr: '',
        cp: '',
        cl: '',
        wp: '',
        emo: '',
      },
      order: [],
    },
    mecha: {
      res: {
        df: '',
        do: '',
        am: '',
        dc: '',
        lp: '',
        pp: '',
        rh: '',
        lh: '',
      },
      order: [],
    },
    avatar: {
      res: {
        df: '',
        do: '',
        am: '',
        dc: '',
        lp: '',
        pp: '',
        rh: '',
        lh: '',
      },
      order: [],
    },
    dragon: {
      res: {
        df: '',
        do: '',
        am: '',
        dc: '',
        lp: '',
        pp: '',
        rh: '',
        lh: '',
      },
      order: [],
    },
    vehicle: {
      res: {},
      order: [],
    },
  }),
  getters: {
    /** 图标URL */
    getIconURL: (state) => {
      return (code) => state.app.resDomain + 'item/' + code + '_icon.png';
    },
    /** 当前选取部件Item的数据 */
    getPartItemData(state) {
      return (partName) => Parts[state.app.editTarget][partName || state.app.partSelected];
    },
    /** 当前选取部件的code */
    getSelectedPartItemCode(state) {
      return (partName) => state[state.app.editTarget]['res'][partName || state.app.partSelected];
    },
  },
  actions: {
    /** 设置部件Item的资源编号 */
    setPartRes(code, partName, targetName) {
      if (typeof targetName !== 'string') targetName = this.app.editTarget;
      if (typeof partName !== 'string') partName = this.app.partSelected;
      this[targetName]['res'][partName] = code || '';
    },
    /** 变更对象值并缓存到浏览器 */
    save(key, obj) {
      if (!localStorage) return undefined;
      obj = Object.assign({}, obj);
      this.$patch(obj);
      let value = JSON.stringify(obj);
      localStorage.setItem(key, value);
      console.log('store.save:', obj);
      return value;
    },
    /** 读取浏览器本地缓存 */
    load(key) {
      if (!localStorage) return undefined;
      let value = localStorage.getItem(key);
      if (!value) return undefined;
      let obj = JSON.parse(value);
      this.$patch(obj);
      console.log('store.load:', obj);
      return value;
    },
  }
})

/** 注册热模块更新功能 
 *  https://pinia.vuejs.org/cookbook/hot-module-replacement.html#hmr-hot-module-replacement
 *  https://cn.vitejs.dev/guide/api-hmr.html
*/
// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}

export {
  useStore
}