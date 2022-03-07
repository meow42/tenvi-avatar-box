import { defineStore, acceptHMRUpdate } from 'pinia';
import { Res, Part, Order, Frame, Action } from './data.js';

const useStore = defineStore('main', {
  state: ()=> ({
    app: {
      resDomain: 'https://tenvix.meow42.cn/',
      typeList: [ 'pilot', 'mecha', 'avatar', 'dragon', 'vehicle' ],
      loading: new Set(), // 记录载入中的资源名称
      loadingErr: new Set(), // 记录载入失败的资源名称
    },
    edit: {
      view: 'frame', // 激活的视图
      type: 'mecha', // 选定的编辑对象类型
    },
    res: {
      bd: '', hd: '', fc: '', fa: '', hr: '', cp: '', cl: '', wp: '', emo: '',
      a_df: '00008', a_do: '', a_am: '', a_dc: '', a_lp: '', a_pp: '', a_rh: '', a_lh: '',
      t_df: '', t_do: '', t_am: '', t_dc: '', t_lp: '', t_pp: '', t_rh: '', t_lh: '',
      s_df: '', s_do: '', s_am: '', s_dc: '', s_lp: '', s_pp: '', s_rh: '', s_lh: '',
    },
    resDataMap: new Map(), // 存放已载入的资源Json数据
    resImgMap: new Map(), // 存放已载入的资源图片
    pilot: {
      display: true, 
      race: '', // andras, silva, talli
      order: [],
    },
    mecha: {
      frm: {},
      act: {},
      order: [
        'a_armS',
        'a_armR',
        'a_legR',
        'a_body',
        'a_legL',
        'a_armL',
      ],
    },
    avatar: {
      order: [],
    },
    dragon: {
      order: [],
    },
    vehicle: {
      order: [],
    },
  }),
  getters: {
    order: (state) => Order.all,
    /** 获取图标URL */
    getIconURL: (state) => (code) => state.app.resDomain + 'item/' + code + '_icon.png',
    /** 获取资源图片URL */
    getResImgURL: (state) => (name) => state.app.resDomain + 'item/' + name + '.png',
    /** 获取资源XML文件URL */
    getResXmlURL: (state) => (code) => state.app.resDomain + 'item/' + code + '.xml',
    /** 获取资源列表 */
    getResList: (state) => (resName) => Res[resName] || [],
    /** 获取部件记录的资源code */
    getPartResCode: (state) => (partName) => {
      if (state.res[partName]) return state.res[partName];
      if (Part[partName]) {
        let resName = Part[partName]['res'];
        return state.res[resName] || '';
      }
      return '';
    },
    /** 获取部件的动作帧数据 */
    getPartFrameData: (state) => (partName, frameName, resCode) => {
      let data = {};      
      let resData = state.resDataMap.get(resCode);
      let partData = Part[partName];
      // 装填基本数据
      if (resData && partData) {
        data.partName = partName;
        data.FarmeName = frameName;
        data.resCode = resCode;
        data.rootName = partData['root'] || '';
        data.linkSelf = partData['link'] || '';
        data.linkTarget = partData['link'] || '';
        Object.assign(data, resData[frameName]);
      }
      // 装填Image数据
      if (data['imgName']) {
        data.img = state.resImgMap.get(data['imgName']);
      }
      //console.log('getPartFrameData:', data);
      return data;
    },
    /** 获取完整动作帧数据 */
    getFrameData: (state) => (payload) => {
      let data = Object.assign({}, payload);
      Object.keys(data).map(key => {
        console.log(key, data[key])
        let item = data[key];
        if(typeof item === 'string') {
          // @ts-ignore
          let resCode = state.getPartResCode(key);
          // @ts-ignore
          data[key] = state.getPartFrameData(key, data[key], resCode);
        }
      });
      return data;
    },
  },
  actions: {
    /** 更新资源图片 */
    async updateResImg(imgName, reload = false) {
      if(!imgName) return;
      // 检查是否已载入，以及是否强制载入
      if(this.resImgMap.has(imgName) && !reload) return;
      let that = this;
      that.loadImage(that.getResImgURL(imgName)).then(img => {
        that.resImgMap.set(imgName, img);
        //console.log('updateResImg:', imgName, img);
      }).catch(err => {});
    },
    /** 更新资源数据 */
    updateResData() {
      let that = this;
      for(const i in that.res) {
        let code = that.res[i];
        // 跳过已存在的资源
        if(!code || that.resDataMap.has(code)) continue;
        that.loadFile(that.getResXmlURL(code), 'xml').then(xml => {
          let json = that.xml2json(xml);
          that.resDataMap.set(code, json['frame']);
          //console.log('updateResData:', code, json['frame']);
        });
        // 载入通常情况下的图片资源
        that.updateResImg(code + '_0', true);
      }
    },
    /** 重新载入资源数据 */
    reloadResData() {
      this.resDataMap.clear();
      this.updateResData();
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
      let that = this;
      return new Promise((resolve, reject) => {
        if (typeof url !== 'string') reject();
        const xhr = new XMLHttpRequest();
        // 请求成功
        xhr.onload = e => {
          //console.log('loadFile:', xhr);
          that.app.loading.delete(url);
          that.app.loadingErr.delete(url);
          if (type === 'xml') resolve(xhr.responseXML);
          else if (type === 'json') resolve(JSON.parse(xhr.response));
          else resolve(xhr.response);
        };
        // 请求失败
        xhr.onerror = e => {
          console.error('loadFile:', e);
          that.app.loading.delete(url);
          that.app.loadingErr.add(url);
          reject(e);
        };
        // 请求超时
        xhr.ontimeout = e => {
          console.info('loadFile - timeout:', e);
          that.app.loading.delete(url);
          that.app.loadingErr.add(url);
          reject(e);
        };
        xhr.timeout = 42000;
        xhr.open('GET', url, true);
        xhr.send();
        that.app.loading.add(url);
     });
    },
    /** 加载图片image对象 */
    async loadImage(url) {
      let that = this;
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.setAttribute('crossOrigin', 'Anonymous'); // 设置允许跨域，避免污染canvas导致无法输出
        img.onload = () => {
          //console.log('loadImage:', img);
          that.app.loading.delete(url);
          that.app.loadingErr.delete(url);
          resolve(img);
        };
        img.onerror = () => {
          console.error('loadImage:', url);
          that.app.loading.delete(url);
          that.app.loadingErr.add(url);
          reject(url);
        };
        img.src = url;
        that.app.loading.add(url);
      });
    },
    /** 重置载入状态 */
    resetLoadingFlag() {
      this.app.loading.clear();
      this.app.loadingErr.clear();
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

/** 部件帧数据结构参考 */
class PartFrameObj {
  partName = '';
  FarmeName = '';
  resCode = '';
  rootName = '';
  linkSelf = '';
  linkTarget = '';
  img = Image;
  root = PartFrameObj;
  size = { x: 0, y: 0 };
  offset = { x: 0, y: 0 };
  center = { x: 0, y: 0 };
  point = {};
}