import { defineStore, acceptHMRUpdate } from 'pinia'

const useStore = defineStore('main', {
  state: ()=> ({
    menu: {
      view: 'overview'
    },
    pilot: {
      skin: 'yellow',
    },
    guard: {
      type: 'mecha'
    }
  }),
  getters: {
    countPow2(state) {
      return 1;
    },
  },
  actions: {
    countPlusOne() {
    },
    countPlus(num) {
    }
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