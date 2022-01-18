import { defineStore, acceptHMRUpdate } from 'pinia'

const useStore = defineStore('main', {
  state: ()=> ({
    pilot: {
      skin: 'yellow',
    },
    guard: {
      type: 'mecha'
    },
    count: 1
  }),
  getters: {
    countPow2(state) {
      return state.count ** 2;
    },
  },
  actions: {
    countPlusOne() {
      this.count++;
    },
    countPlus(num) {
      this.count += num;
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