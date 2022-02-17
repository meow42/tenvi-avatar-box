const Res = {
  pilot: {
  },
  mecha: {
    df: [
      { id: '00008', cn: '' },
      { id: '00159', cn: '' },
      { id: '00160', cn: '' }, { id: '|' },
      { id: '00182', cn: '' },
      { id: '00183', cn: '' },
      { id: '00184', cn: '' },
      { id: '00185', cn: '' },
    ]
  },
  avatar: {
  },
  dragon: {
  },
  vehicle: {
  },
}

const Part = {
  mechaBody: { root: 'root', link: 'center', res: 'df', regex: /^body_.*/ }, // mount ahead propulsion
  mechaArmL: { root: 'mechaBody', link: 'arml', res: 'df', regex: /^arml_.*/ }, // arml, hl
  mechaArmR: { root: 'mechaBody', link: 'armr', res: 'df', regex: /^armr_.*/ }, // armr, hr
  mechaArmS: { root: 'mechaBody', link: 'arms', res: 'df', regex: /^arms.*/ }, // arms
  mechaLegL: { root: 'mechaBody', link: 'legl', res: 'df', regex: /^legl_.*/ }, // legl
  mechaLegR: { root: 'mechaBody', link: 'legr', res: 'df', regex: /^legr_.*/ }, // legr
  mechaDoor: { root: 'mechaBody', link: 'ahead', res: 'do', regex: /.*/ }, // ahead
  mechaDoorX: { root: 'mechaBody', link: 'ahead', res: 'do', regex: /.*/ }, // ahead
  mechaArmor: { root: 'mechaBody', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
  mechaSkirt: { root: 'mechaBody', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
  mechabooster: { root: 'mechaBody', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
  mechaArmr1: { root: 'mechaBody', link: 'armr', res: 'dc', regex: /^armr_.*/ }, // armr, hr
  mechaArml1: { root: 'mechaBody', link: 'arml', res: 'dc', regex: /^arml.*/ }, // arml, hl
  mechaLegl1: { root: 'mechaBody', link: 'legl', res: 'lp', regex: /.*legl.*/ }, // legl
  mechaLegr1: { root: 'mechaBody', link: 'legr', res: 'lp', regex: /.*legr.*/ }, // legr
  mechaPropulsion: { root: 'mechaBody', link: 'propulsion', res: 'pp', regex: /.*/ }, // propulsion
  mechaWeapon: { root: 'mechaBody', link: 'rh', res: 'rh', regex: /.*/ }, // rh gp
  mechaWeaponGP: { root: 'mechaWeapon', link: 'gp', res: 'rh', regex: /.*_\d\d_00$/ }, // gp
  mechaShield: { root: 'mechaBody', link: 'lh', res: 'lh', regex: /.*/ }, // lh
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
}

const Order = {
  pilot: [],
  mecha: [],
  avatar: [],
  dragon: [],
  vehicle: [],
  all: [
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
  
    'mechaWeapon', 'mechaArms', 'mechaArmr1', 'mechaArmr',  'mechaWeapon1',
    'mechaDoor',
    'mechaSkirt', 'mechaLegr1', 'mechaLegr',
    'mechaArmor', 'mechaBody',
    'mechaDoor1', 
    'mechaLegl1', 'mechaLegl', 'a-booster',
    'mechaArml1', 'mechaArml', 'mechaShield',
    'a-propulsion',
  
    'sleeve', 'arm', 'armWeapon', 'weapon',
    'cap', 'hair',
    'facial', 'emotion', 'ear', 'horn',
    'face', 'head',
    'facial1', 'ear1', 'horn1', 
    'pants', 'leg',
    'clothes', 'body', 
    'hair1', 'wing',
  ]
}

export {
  Res,
  Part,
  Order,
}
