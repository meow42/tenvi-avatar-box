import { defineStore, acceptHMRUpdate } from 'pinia'

const useStore = defineStore('main', {
  state: ()=> ({
    app: {
      view: 'overview',
      editTarget: 'mecha',
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
    guard: {
      type: 'mecha',
    }
  }),
  getters: {
    /** 当前编辑对象的部件名称列表 */
    resNameList() {
      return this.getResNameList();
    },
  },
  actions: {
    /** 获取指定的部件名称列表 */
    getResNameList(targetName) {
      if (!targetName) targetName = this.app.editTarget;
      if (this[targetName]) return Object.keys(this[targetName]['res']);
      else return [];
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