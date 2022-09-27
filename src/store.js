import { defineStore, acceptHMRUpdate, storeToRefs } from 'pinia';
//import { Res, Order, Frame, Action } from './data.js';
import { Res, ResMutiPNG } from './data/res.js';
import { Part, ResPart, PartPattern } from './data/part.js';
import { Order, ResOrder } from './data/order.js';
import { Frame, ResFrame, FramePattern } from './data/frame.js';

const useStore = defineStore('main', {
  state: ()=> ({
    app: {
      url: 'https://tenvi.meow42.cn/avatar-box/index.html',
      resDomain: 'https://tenvi.meow42.cn/res/',
      typeCode: { pilot: 'p', mecha: 'a', avatar: 't', dragon: 's', vehicle: 'v' },
      loading: new Set(), // 记录载入中的资源名称
      loadingErr: new Set(), // 记录载入失败的资源名称
    },
    edit: {
      view: 'parts', // 激活的视图 parts, frame, action, order, files
      type: 'mecha', // 选定的编辑对象类型 pilot, mecha, avatar, dragon, vehicle
      pilot: true,
      partSidebarActive: 0, // 当前的部件选取序号
      showRawImg: false, // 是否显示原始资源图片预览
      autoFold: false, // 是否自动按分组折叠资源
      showAxis: true, // 是否显示坐标轴线
      autoDraw: true, // 是否自动绘制
    },
    canvasSize: {
      S: { width: 256, height: 160, bottom: 20 },
      M: { width: 256, height: 200, bottom: 50 },
      L: { width: 256, height: 256, bottom: 50 },
    },
    resDataMap: new Map(), // 存放已载入的资源Json数据
    resImgMap: new Map(), // 存放已载入的资源图片
    res: {
      p_bd: '00001', p_hd: '00004', p_fc: '00007', p_fa: '', p_hr: '', p_cp: '', p_cl: '', p_wp: '', p_emo: 'emotion02579',
      a_df: '00008', a_do: '', a_am: '', a_dc: '', a_lp: '', a_pp: '', a_rh: '', a_lh: '',
      t_df: '00009', t_do: '', t_am: '', t_dc: '', t_lp: '', t_pp: '', t_rh: '', t_lh: '',
      s_df: '00010', s_do: '', s_am: '', s_dc: '', s_lp: '', s_pp: '', s_rh: '', s_lh: '',
      v_res: 'v0002',
    },
    part: {}, // 存放部件当前动作帧数据
    frame: {}, // 存放帧数据集
    action: {}, // 存放动作数据集
    order: {}, // 存放部件叠放顺序定义数据集
  }),
  getters: {
    /** 获取图标URL */
    getIconURL: (state) => (code) => state.app.resDomain + 'item/' + code + '_icon.png',
    /** 获取资源图片URL */
    getResImgURL: (state) => (name) => state.app.resDomain + 'item/' + name + '.png',
    /** 获取资源XML文件URL */
    getResXmlURL: (state) => (code) => state.app.resDomain + 'item/' + code + '.xml',
    /** 获取资源列表 */
    getResList: (state) => (resName) => {
      if (!Res[resName]) return [];
      let list = [];
      let group = '#';
      Res[resName].map(item => {
        let data = {};
        if (typeof item === 'string') data.id = item;
        else data = Object.assign(data, item);
        // 判断是否切换分组
        let id = String(data.id);
        if (id.length > 1 && id.startsWith('#')) {
          group = String(data.id);
        }
        // 添加分组属性
        if (group) data.group = group;
        list.push(data);
      });
      return list;
    },
    /** 获取部件记录的资源code */
    getPartResCode: (state) => (partName) => {
      if (state.res[partName]) return state.res[partName];
      if (Part[partName]) {
        let resName = Part[partName]['res'];
        return state.res[resName] || '';
      }
      return '';
    },
    /** 获取部件所有帧的名称列表 */
    getPartFrameList: (state) => (partName, regex) => {
      let list = [];
      // @ts-ignore
      let resCode = state.getPartResCode(partName);
      let resData = state.resDataMap.get(resCode);
      if (typeof regex === 'boolean') regex = Part[partName]['regex'] || /.*/;
      if (regex) regex = new RegExp(regex);
      //console.log('getPartFrameList - regex:', Part[partName]['regex'], regex);
      for(const key in resData) {
        //console.log('getPartFrameList:', key, regex.test(key));
        if (regex && !regex.test(key)) continue; // 过滤不符合正则的帧
        list.push(key);
      }
      return list;
    },
    /** 获取部件的动作帧数据 */
    getPartFrameData: (state) => (payload) => {
      let partName = payload['partName'] || '';
      let frameName = payload['frameName'] || '';
      // @ts-ignore
      let resCode = payload['resCode'] || state.getPartResCode(partName) || '';
      let partFix = payload['partFix'] || {};
      let rootName = payload['rootName'] || '';
      let linkSelf = payload['linkSelf'] || '';
      let linkTarget = payload['linkTarget'] || '';
      //装填基本数据
      let data = {};
      data.partName = partName;
      data.FarmeName = frameName;
      data.resCode = resCode;
      // 装填帧数据
      let resData = state.resDataMap.get(resCode);
      let partData = Part[partName];
      if (resData && partData) {
        data.rootName = rootName || partData['root'] || '';
        data.linkSelf = linkSelf || partData['link'] || '';
        data.linkTarget = linkTarget || partData['link'] || '';
        Object.assign(data, resData[frameName]);
      }
      // temp
      if (partName == 's_wpL') data.linkSelf = 'mount';
      // 处理帧数据特殊情况
      if (PartPattern[partName] && PartPattern[partName][frameName]) {
        let pattern = PartPattern[partName][frameName];
        data.offsetX = pattern['offsetX'] || 0;
        data.offsetY = pattern['offsetY'] || 0;
      }
      // 装填Image数据
      if (data['imgName']) {
        data.img = state.resImgMap.get(data['imgName']);
      }
      // 检查数据完整性
      if (data.img) {
        data.loaded = true;
      }
      //console.log('getPartFrameData:', data);
      return data;
    },
    /** 获取完整动作帧数据 */
    getFrameData: (state) => (payload) => {
      let data = Object.assign({}, payload);
      let result = {};
      Object.keys(data).map(key => {
        //console.log('getFrameData:', key, data[key])
        let item = data[key];
        let frameData = {};
        let fPayload = {};
        fPayload.partName = key;
        // 处理乘骑的默认情况
        if (state.edit.type !== 'pilot' && key == 'p_body') {
          fPayload.rootName = state.app.typeCode[state.edit.type] + '_body';
          fPayload.linkSelf = 'mount';
          fPayload.linkTarget = state.edit.type == 'vehicle' ? 'm0' : 'mount';
        }
        // 配置项为简单定义
        if(typeof item === 'string') {
          fPayload.frameName = item;
        }
        // 处理配置项为复杂定义的情况
        else {
          if (item['frameName']) fPayload.frameName = item.frameName;
          if (item['linkSelf']) fPayload.linkSelf = item.linkSelf;
          if (item['linkTarget']) fPayload.linkTarget = item.linkTarget;
        }
        // @ts-ignore 
        frameData = state.getPartFrameData(fPayload);
        // 装载数据
        if (frameData['loaded']) {
          result[key] = frameData;
        }
      });
      return result;
    },
    /** 获取动作帧定义 */
    getFrameMeta: (state) => () => {
      return Frame;
    },
    /** 获取同类部件数据集 */
    getPartsData: (state) => (typeName) => {
      let result = {};
      let typeStr = state.app.typeCode[typeName];
      if (!typeStr) return result;
      typeStr = typeStr + '_';
      for(const key in state.part) {
        if (key.indexOf(typeStr) !== 0) continue;
        result[key] = state.part[key];
      }
      return result;
    },
    /** 获取编辑类型前缀，默认为当前已选取类型 */
    getTypeCode: (state) => (typeName) => {
      typeName = typeName || state.edit.type || '';
      return state.app.typeCode[typeName] || '';
    },
    /** 替换部件叠放顺序数据中的引用项 */
    getOrderReplace: (state) => (orderArray) => {
      let result = orderArray || [];
      for (let i = 0; i < result.length; i++) {
        if (!/^@.*/.test(result[i])) continue;
        let key = result[i].replace('@', '');
        if (!Order[key]) continue;
        result.splice(i, 1, ...Order[key]);
      }
      return result;
    },
    /** 获取部件叠放顺序数据 */
    getOrder: (state) => (name) => {
      if (!name) name = state.edit.type;
      let result = state.order[name] || Order[name] || [];
      // 补全驾驶员部件
      // @ts-ignore
      state.getOrderReplace(result);
      //console.log('getOrder:', result);
      return result;
    },
    /** 获取固定动作帧数据 */
    getFixedFrameByResCode: (state) => (resCode) => {
      let result = {frame: undefined, order: undefined};
      if (!resCode) return result;
      // @ts-ignore
      result.order = state.getOrderReplace(ResOrder[resCode]) || undefined;
      result.frame = ResFrame[resCode] || undefined;
      result.part = ResPart[resCode] || undefined;
      // TODO 驾驶员数据处理
      //console.log('getFixedFrameByResCode:', result, ResFrame[resCode]);
      return result;
    },
    
  },
  actions: {
    /** 解析URL参数并覆盖相关内容 */
    initByURL() {
      // 获取URL参数，并封装到对象
      let search = {};
      let vars = window.location.search.substring(1).split("&");
      vars.map(pair => {
        let kv = pair.split('=');
        search[kv[0]] = kv[1] || undefined;
      });
      console.log('initByURL:', search);
      // 参数覆盖
      if (search['v']) this.edit.view = search.view;
      if (search['t']) this.edit.type = search.type;
      if (search['p']) this.edit.partSidebarActive = Number(search.part) || 0;
      // 清理URL参数
      let url = window.location.href.split('?')[0];
      window.history.replaceState(null, '', url);
    },
    /** 生成当前页面URL */
    getURL() {
      let suffix = '?';
      suffix += `v=${this.edit.view}`;
      suffix += `&t=${this.edit.type}`;
      if (this.edit.view == 'parts') {
        suffix += `&p=${this.edit.partSidebarActive}`;
      }
      return this.app.url + suffix;
    },
    /** 获取部件默认正则规则文本 */
    partRegex2String(partName) {
      let regex = Part[partName]['regex'] || /.*/;
      let str = regex.toString();
      return str.slice(1, str.length-1);
    },
    /** 判断部件可用状态 */
    isPartEnable(partName) {
      if (!partName) return false;
      // 前缀需存在于列表
      let typeStr = this.app.typeCode[this.edit.type];
      if (!typeStr) return false;
      // 前缀是当前所选分类
      typeStr = typeStr + '_';
      if (partName.indexOf(typeStr) === 0) return true;
      if (this.edit.pilot && partName.indexOf('p_') === 0) return true;
      return false;
    },
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
        // 载入图片资源
        let pngCount = 1;
        if (ResMutiPNG[code]) pngCount = ResMutiPNG[code];
        for (let i = 0; i < pngCount; i++) {
          that.updateResImg(code + '_' + i, true);
        }
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
    /** 保存当前数据 */
    saveEditData(key = 'default', ...types) {
      if (!types || types.length < 1) types = ['res', 'part', 'order'];
      types.map(type => {
        this.save(type + '-' + key, {[type]: this[type]});
      });
    },
    /** 读取数据并覆盖当前编辑区 */
    loadEditData(key = 'default', ...types) {
      if (!types || types.length < 1) types = ['res', 'part'];
      //console.log('store.loadEditData:', key, types);
      types.map(type => {
        this.load(type + '-' + key);
      });
    },
    /** 保存编辑相关参数 */
    saveEditConfig() {
      let obj = {
        edit: this.edit
      };
      this.save('editConfig', obj);
    },
    /** 读取编辑相关参数 */
    loadEditConfig() {
      this.load('editConfig');
    },
    /** 对象值缓存到浏览器 */
    save(key, obj, withUpdate = false) {
      if (!localStorage) return undefined;
      obj = Object.assign({}, obj);
      // 是否立刻同步到当前store
      if (withUpdate) this.$patch(obj);
      // 转成字符串并缓存
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
  show = true;
}