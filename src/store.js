import { defineStore, acceptHMRUpdate } from 'pinia';
import Res from './data/res.js';

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
    resDataMap: new Map(), // 存放已载入的部件资源数据
    pilot: {
      display: true, 
      res: { bd: '', hd: '', fc: '', fa: '', hr: '', cp: '', cl: '', wp: '', emo: '' },
      part: {
        'p-body': { type: 'pilot', root: 'root', link: 'center', res: 'bd', regex: /.*_body$/ },
        'p-arm': { type: 'pilot', root: 'p-body', link: 'arm', res: 'bd', regex: /.*_arm$/ },
        'p-leg': { type: 'pilot', root: 'p-body', link: 'leg', res: 'bd', regex: /.*_leg$/ },
        'p-weapon': { type: 'pilot', root: 'p-body', link: 'wp', res: 'wp' },
        'p-clothes': { type: 'pilot', root: 'p-body', link: 'neck', res: 'cl', regex: /.*_body$/ },
        'p-sleeve': { type: 'pilot', root: 'p-clothes', link: 'psleeve', res: 'cl', regex: /.*_arm$/ },
        'p-pants': { type: 'pilot', root: 'p-clothes', link: 'pleg', res: 'cl', regex: /.*_leg$/ },
        'p-wing': { type: 'pilot', root: 'p-body', link: 'neck', res: 'cl', regex: /.*_wing$/ },
        'p-head': { type: 'pilot', root: 'p-body', link: 'neck', res: 'hd', regex: /head.*/ },
        'p-horn': { type: 'pilot', root: 'p-head', link: 'brow', res: 'hd', regex: /horn.*_0$/ },
        'p-horn1': { type: 'pilot', root: 'p-head', link: 'brow', res: 'hd', regex: /horn.*_1$/ },
        'p-ear': { type: 'pilot', root: 'p-head', link: 'brow', res: 'hd', regex: /ear.*_0$/ },
        'p-ear1': { type: 'pilot', root: 'p-head', link: 'brow', res: 'hd', regex: /ear.*_1$/ },
        'p-face': { type: 'pilot', root: 'p-head', link: 'brow', res: 'fc', regex: /.*/ },
        'p-facial': { type: 'pilot', root: 'p-head', link: 'brow', res: 'fa', regex: /^((?!.*(_01)).)*$/ },
        'p-facial1': { type: 'pilot', root: 'p-head', link: 'brow', res: 'fa', regex: /.*_01$/ },
        'p-hair': { type: 'pilot', root: 'p-head', link: 'brow', res: 'hr', regex: /hair(?!Lower).*/ },
        'p-hair1': { type: 'pilot', root: 'p-head', link: 'brow', res: 'hr', regex: /hairLower.*/ },
        'p-cap': { type: 'pilot', root: 'p-head', link: 'brow', res: 'cp', regex: /.*/ },
        'p-emotion': { type: 'pilot', root: 'p-head', link: 'brow', res: 'emo', regex: /.*/ },
      },
      order: [],
    },
    mecha: {
      res: { df: '00008', do: '', am: '', dc: '', lp: '', pp: '', rh: '', lh: '' },
      part: {
        'a-body': { root: 'root', link: 'center', res: 'df', regex: /^body_.*/ }, // mount ahead propulsion
        'a-arml': { root: 'a-body', link: 'arml', res: 'df', regex: /^arml_.*/ }, // arml, hl
        'a-armr': { root: 'a-body', link: 'armr', res: 'df', regex: /^armr_.*/ }, // armr, hr
        'a-arms': { root: 'a-body', link: 'arms', res: 'df', regex: /^arms.*/ }, // arms
        'a-legl': { root: 'a-body', link: 'legl', res: 'df', regex: /^legl_.*/ }, // legl
        'a-legr': { root: 'a-body', link: 'legr', res: 'df', regex: /^legr_.*/ }, // legr
        'a-door': { root: 'a-body', link: 'ahead', res: 'do', regex: /.*/ }, // ahead
        'a-door1': { root: 'a-body', link: 'ahead', res: 'do', regex: /.*/ }, // ahead
        'a-armor': { root: 'a-body', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
        'a-skirt': { root: 'a-body', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
        'a-booster': { root: 'a-body', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
        'a-armr1': { root: 'a-body', link: 'armr', res: 'dc', regex: /^armr_.*/ }, // armr, hr
        'a-arml1': { root: 'a-body', link: 'arml', res: 'dc', regex: /^arml.*/ }, // arml, hl
        'a-legl1': { root: 'a-body', link: 'legl', res: 'lp', regex: /.*legl.*/ }, // legl
        'a-legr1': { root: 'a-body', link: 'legr', res: 'lp', regex: /.*legr.*/ }, // legr
        'a-propulsion': { root: 'a-body', link: 'propulsion', res: 'pp', regex: /.*/ }, // propulsion
        'a-weapon': { root: 'a-body', link: 'rh', res: 'rh', regex: /.*/ }, // rh gp
        'a-weapon1': { root: 'a-weapon', link: 'gp', res: 'rh', regex: /.*_\d\d_00$/ }, // gp
        'a-shield': { root: 'a-body', link: 'lh', res: 'lh', regex: /.*/ }, // lh
      },
      order: [],
      act: {},
    },
    avatar: {
      res: { df: '', do: '', am: '', dc: '', lp: '', pp: '', rh: '', lh: '' },
      part: {
        't-body': { type: 'avatar', root: 'root', link: 'center', res: 'df', regex: /.*_bd$/ },
        't-head': { type: 'avatar', root: 't-body', link: 'tneck', res: 'df', regex: /^head.*/ }, // tneck, brow
        't-arml': { type: 'avatar', root: 't-body', link: 'larm', res: 'df', regex: /^arml.*/ }, // larm, hl
        't-armr': { type: 'avatar', root: 't-body', link: 'rarm', res: 'df', regex: /^armr.*/ }, // rarm, hr, fire
        't-leg': { type: 'avatar', root: 't-body', link: 'tneck', res: 'df', regex: /^leg.*/ }, // tneck
        't-head1': { type: 'avatar', root: 't-body', link: 'tneck', res: 'do', regex: /.*/ }, // tneck
        't-body1': { type: 'avatar', root: 't-body', link: 'tneck', res: 'am', regex: /.*_bd$/ }, // tneck, tlarm, trarm
        't-arml1': { type: 'avatar', root: 't-body1', link: 'tlarm', res: 'am', regex: /^arml.*/ }, // tlarm
        't-armr1': { type: 'avatar', root: 't-body1', link: 'trarm', res: 'am', regex: /^armr.*/ }, // trarm
        't-legb': { type: 'avatar', root: 't-body', link: 'tneck', res: 'am', regex: /^leg.*/ }, // tneck
        't-arml2': { type: 'avatar', root: 't-body', link: 'larm', res: 'dc', regex: /^arml.*/ }, // larm
        't-armr2': { type: 'avatar', root: 't-body', link: 'rarm', res: 'dc', regex: /^armr.*/ }, // rarm
        't-legl': { type: 'avatar', root: 't-body', link: 'tneck', res: 'lp', regex: /.*_bdl$/ }, // tneck
        't-legr': { type: 'avatar', root: 't-body', link: 'tneck', res: 'lp', regex: /.*_bdr$/ }, // tneck
        't-cloak': { type: 'avatar', root: 't-body', link: 'tneck', res: 'pp', regex: /.*/ }, // tneck
        't-waeponrf': { type: 'avatar', root: 't-body', link: 'rh', res: 'rh', regex: /^rf_.*/ }, // rh
        't-waeponrb': { type: 'avatar', root: 't-body', link: 'rh', res: 'rh', regex: /^rb_.*/ }, // rh
        't-waeponlf': { type: 'avatar', root: 't-body', link: 'lh', res: 'lh', regex: /^lf_.*/ }, // lh
        't-waeponlb': { type: 'avatar', root: 't-body', link: 'lh', res: 'lh', regex: /^lb_.*/ }, // lh
      },
      order: [],
    },
    dragon: {
      res: { df: '', do: '', am: '', dc: '', lp: '', pp: '', rh: '', lh: '' },
      part: {
      's-body': { type: 'dragon', root: 'root', link: 'center', res: 'df', regex: /^body_.*/ }, // mount
      's-head': { type: 'dragon', root: 's-body', link: 'gneck', res: 'df', regex: /^head.*/ }, // gneck, brow, mouth
      's-eye': { type: 'dragon', root: 's-body', link: 'eye', res: 'df', regex: /^eye.*/ }, // eye
      's-fleg': { type: 'dragon', root: 's-body', link: 'fleg', res: 'df', regex: /.*fleg.*/ }, // fleg
      's-bleg': { type: 'dragon', root: 's-body', link: 'bleg', res: 'df', regex: /.*bleg.*/ }, // bleg
      's-tleg': { type: 'dragon', root: 's-body', link: 'fleg', res: 'df', regex: /.*tleg.*/ }, // fleg
      's-cap': { type: 'dragon', root: 's-body', link: 'gneck', res: 'do', regex: /.*/ }, // gneck, fire
      's-armor': { type: 'dragon', root: 's-body', link: 'navel', res: 'am', regex: /.*/ }, // navel
      's-foot1': { type: 'dragon', root: 's-body', link: 'fleg', res: 'dc', regex: /^fl.*/ }, // fleg
      's-foot2': { type: 'dragon', root: 's-body', link: 'bleg', res: 'dc', regex: /^bl.*/ }, // bleg
      's-tail': { type: 'dragon', root: 's-body', link: 'navel', res: 'lp', regex: /.*/ }, // navel
      's-wing1': { type: 'dragon', root: 's-body', link: 'wr', res: 'pp', regex: /^w_.*/ }, // wr
      's-wing2': { type: 'dragon', root: 's-body', link: 'wl', res: 'pp', regex: /^wb_.*/ }, // wl
      's-weapon': { type: 'dragon', root: 'body', link: 'prh', res: 'rh', regex: /.*/ }, // up prh(pilot)
      's-book': { type: 'dragon', root: 'body', link: 'plh', res: 'lh', regex: /.*/ }, // mount plh(pilot)
      },
      order: [],
    },
    vehicle: {
      res: {},
      part: {},
      order: [],
    },
    order: [
      't-waeponrf', 't-armr2', 't-armr1', 't-armr', 't-waeponrb',
      't-legr', 't-legb', 't-legl', 't-leg',
      't-head1', 't-head', 't-body1', 't-body',
      't-waeponlf', 't-arml2', 't-arml1', 't-arml', 't-waeponlb',
      't-cloak',
  
      's-tail', 's-weapon', 's-wing1', 's-cap',
      's-eye', 's-head',
      's-foot1', 's-foot2', 's-armor', 
      's-fleg', 's-bleg',
      's-body', 's-tleg', 's-book', 's-wing2',
  
      'a-weapon', 'a-arms', 'a-armr1', 'a-armr',  'a-weapon1',
      'a-door',
      'a-skirt', 'a-legr1', 'a-legr',
      'a-armor', 'a-body',
      'a-door1', 
      'a-legl1', 'a-legl', 'a-booster',
      'a-arml1', 'a-arml', 'a-shield',
      'a-propulsion',
  
      'sleeve', 'arm', 'armWeapon', 'weapon',
      'cap', 'hair',
      'facial', 'emotion', 'ear', 'horn',
      'face', 'head',
      'facial1', 'ear1', 'horn1', 
      'pants', 'leg',
      'clothes', 'body', 
      'hair1', 'wing',
    ],
  }),
  getters: {
    /** 获取图标URL */
    getIconURL: (state) => (code) => state.app.resDomain + 'item/' + code + '_icon.png',
    /** 获取资源图片URL */
    getItemResURL: (state) => (name) => state.app.resDomain + 'item/' + name + '.png',
    /** 获取部件定义 */
    /** 获取选取部件的资源数据 */
    getResList: (state) => (partName) => Res[state.edit.type][partName || state.edit.res],
    /** 获取选取部件的资源code */
    getSelectedResCode: (state) => (partName) => state[state.edit.type]['res'][partName || state.edit.res],
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
    /** 获取指定部件资源数据 */
    getPartResData: (state) => {
      return () => {}
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
    /** 远程加载xml并转换为json */
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
        //item.imgURL = this.app.resDomain + item.imgName + '.png';
        item.sizeX = Number(f.getAttribute('sx'));
        item.sizeY = Number(f.getAttribute('sy'));
        item.offsetX = Number(f.getAttribute('x'));
        item.offsetY = Number(f.getAttribute('y'));
        item.centerX = Number(f.getAttribute('cx'));
        item.centerY = Number(f.getAttribute('cy'));
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
    /** 远程加载文件 */
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
        img.setAttribute("crossOrigin",'Anonymous'); // 设置允许跨域，避免污染canvas导致无法输出
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