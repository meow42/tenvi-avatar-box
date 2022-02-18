import { defineStore, acceptHMRUpdate } from 'pinia';
import { Res, Part, Order, Frame, Action } from './data.js';

const useStore = defineStore('main', {
  state: ()=> ({
    app: {
      resDomain: 'https://tenvix.meow42.cn/',
      typeList: ['pilot', 'mecha', 'avatar', 'dragon', 'vehicle'],
    },
    edit: {
      view: 'frame', // 激活的视图
      type: 'mecha', // 选定的编辑对象类型
      res: '', // 选定的数据资源类型
    },
    resDataMap: new Map(), // 存放已载入的资源Json数据
    resImgMap: new Map(), // 存放已载入的资源图片
    pilot: {
      display: true, 
      race: '', // andras, silva, talli
      res: { bd: '', hd: '', fc: '', fa: '', hr: '', cp: '', cl: '', wp: '', emo: '' },
      order: [],
    },
    mecha: {
      res: { df: '00008', do: '', am: '', dc: '', lp: '', pp: '', rh: '', lh: '' },
      frm: {},
      act: {},
      order: [],
    },
    avatar: {
      res: { df: '', do: '', am: '', dc: '', lp: '', pp: '', rh: '', lh: '' },
      order: [],
    },
    dragon: {
      res: { df: '', do: '', am: '', dc: '', lp: '', pp: '', rh: '', lh: '' },
      order: [],
    },
    vehicle: {
      res: {},
      order: [],
    },
  }),
  getters: {
    order: (state) => Order.all,
    /** 获取图标URL */
    getIconURL: (state) => (code) => state.app.resDomain + 'item/' + code + '_icon.png',
    /** 获取资源图片URL */
    getResImgURL: (state) => (name) => state.app.resDomain + 'item/' + name + '.png',
    /** 获取部件资源列表 */
    getResList: (state) => (partName, typeName) => Res[typeName || state.edit.type][partName || state.edit.res],
    /** 获取部件记录的资源code 此处需要 */
    getPartResCode: (state) => (partName, typeName) => state[typeName || state.edit.type]['res'][partName || state.edit.res],
    /** 获取部件资源数据列表 */
    getPartResList: (state) => {
      return (partName, typeName) => {
        let part = state[typeName]['part'][partName];
        let res = state[typeName]['res'];
        // 如果有部件级别的配置，则优先使用
        let code = res[partName] ? res[partName] : res[part.res];
        let data = state.resDataMap.get(code);
        return state.resDataMap.get(code);
      };
    },
    /** 获取指定动作帧数据 */
    getFrameData: (state) => {
      return (frameName, resCode) => state.resDataMap.get(resCode)[frameName];
    },
  },
  actions: {
    /** 设置部件Item的资源编号 */
    setPartRes(code, partName, targetName) {
      if (typeof targetName !== 'string') targetName = this.edit.type;
      if (typeof partName !== 'string') partName = this.edit.res;
      this[targetName]['res'][partName] = code || '';
    },
    /** 清空资源数据 */
    deleteResData() {
      this.resDataMap = new Map();
    },
    /** 更新资源数据 */
    updateResData(...typeList) {
      if (typeList.length < 1) typeList = this.app.typeList;
      let that = this;
      let resList = [];
      // 加载所需资源
      typeList.map(typeName => {
        for (const resName in that[typeName]['res']) {
          let resCode = that[typeName]['res'][resName];
          // 跳过空记录
          if (resCode.length < 1) continue;
          // 记录正在使用的资源编号
          resList.push(resCode);
          // 加载缺少的资源
          if (!that.resDataMap.has(resCode)) {
            that.loadXML2JSON(resCode).then(json => {
              that.resDataMap.set(resCode, json.frame);
            });
          }
        }
      });
      // 清理无用资源
      that.resDataMap.forEach((value, key) => {
        if (!resList.includes(key)) that.resDataMap.delete(key);
      });
    },
    /** 加载xml并转换为json */
    async loadXML2JSON(code) {
      if (!code) return {};
      let url = this.app.resDomain + 'item/' + code + '.xml';
      let xml = await this.loadFile(url, 'xml');
      return this.xml2json(xml);
    },
    /** 将XML对象转换为json对象 */
    xml2json(xml) {
      let json = {};
      // 填装frame节点
      let frameNode = xml.getElementsByTagName('frame');
      let frames = frameNode[0] ? frameNode[0].children : [];
      if (frames.length > 0) json.frame = {};
      for (let i = 0; i < frames.length; i++) {
        let f = frames[i];
        let item = {};
        item.name = f.tagName;
        let dds = f.getAttribute('name');
        item.code = dds.replace(/.*\\/, '').replace(/_.*/, '');
        item.imgName = dds.replace(/.*\\/, '').replace('.dds', '');
        item.size = { x: Number(f.getAttribute('sx')), y: Number(f.getAttribute('sy')) };
        item.offset = { x: Number(f.getAttribute('x')), y: Number(f.getAttribute('y')) };
        item.center = { x: Number(f.getAttribute('cx')), y: Number(f.getAttribute('cy')) };
        /*
        item.imgURL = this.app.resDomain + item.imgName + '.png';
        item.sizeX = Number(f.getAttribute('sx'));
        item.sizeY = Number(f.getAttribute('sy'));
        item.offsetX = Number(f.getAttribute('x'));
        item.offsetY = Number(f.getAttribute('y'));
        item.centerX = Number(f.getAttribute('cx'));
        item.centerY = Number(f.getAttribute('cy'));
        */
        // 载入连接点数据
        let pointNode = f.getElementsByTagName('point');
        let points = pointNode[0] ? pointNode[0].children : [];
        if (points.length > 0) item.point = {};
        for (let j = 0; j < points.length; j++) {
          let p = points[j];
          let itemp = {};
          itemp.name = p.getAttribute('name');
          itemp.x = Number(p.getAttribute('x'));
          itemp.y = Number(p.getAttribute('y'));
          item.point[p.getAttribute('name')] = itemp;
        }
        json.frame[f.tagName] = item;
      }
      // 填装action节点
      json.action = {};
      return json;
    },
    /** 加载远程文件 */
    async loadFile(url, type) {
      return new Promise((resolve, reject) => {
        if (typeof url !== 'string') reject();
        const xhr = new XMLHttpRequest();
        // 请求成功
        xhr.onload = e => {
          //console.log('request success:', xhr);
          if (type === 'xml') resolve(xhr.responseXML);
          else if (type === 'json') resolve(JSON.parse(xhr.response));
          else resolve(xhr.response);
        };
        // 请求失败
        xhr.onerror = e => {
          console.error('request error:', e);
          reject();
        };
        // 请求超时
        xhr.ontimeout = e => {
          console.info('request timeout:', e);
          reject();
        };
        xhr.timeout = 42000;
        xhr.open('GET', url, true);
        xhr.send();
     });
    },
    /** 加载图片image对象 */
    async loadImage(url) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.setAttribute('crossOrigin', 'Anonymous'); // 设置允许跨域，避免污染canvas导致无法输出
        img.onload = () => {
          //console.log(img.src, "is loaded");
          resolve(img);
        };
        img.src = url;
      });
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