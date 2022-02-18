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
  pilot_body: { root: undefined, link: 'center', res: 'bd', regex: /.*_body$/ },
  pilot_arm: { root: 'pilot_body', link: 'arm', res: 'bd', regex: /.*_arm$/ },
  pilot_leg: { root: 'pilot_body', link: 'leg', res: 'bd', regex: /.*_leg$/ },
  pilot_weapon: { root: 'pilot_body', link: 'wp', res: 'wp' },
  pilot_clothes: { root: 'pilot_body', link: 'neck', res: 'cl', regex: /.*_body$/ },
  pilot_sleeve: { root: 'pilot_clothes', link: 'psleeve', res: 'cl', regex: /.*_arm$/ },
  pilot_pants: { root: 'pilot_clothes', link: 'pleg', res: 'cl', regex: /.*_leg$/ },
  pilot_wing: { root: 'pilot_body', link: 'neck', res: 'cl', regex: /.*_wing$/ },
  pilot_head: { root: 'pilot_body', link: 'neck', res: 'hd', regex: /head.*/ },
  pilot_horn: { root: 'pilot_head', link: 'brow', res: 'hd', regex: /horn.*_0$/ },
  pilot_hornS: { root: 'pilot_head', link: 'brow', res: 'hd', regex: /horn.*_1$/ },
  pilot_ear: { root: 'pilot_head', link: 'brow', res: 'hd', regex: /ear.*_0$/ },
  pilot_earS: { root: 'pilot_head', link: 'brow', res: 'hd', regex: /ear.*_1$/ },
  pilot_face: { root: 'pilot_head', link: 'brow', res: 'fc', regex: /.*/ },
  pilot_facial: { root: 'pilot_head', link: 'brow', res: 'fa', regex: /^((?!.*(_01)).)*$/ },
  pilot_facialS: { root: 'pilot_head', link: 'brow', res: 'fa', regex: /.*_01$/ },
  pilot_hair: { root: 'pilot_head', link: 'brow', res: 'hr', regex: /hair(?!Lower).*/ },
  pilot_hairL: { root: 'pilot_head', link: 'brow', res: 'hr', regex: /hairLower.*/ },
  pilot_cap: { root: 'pilot_head', link: 'brow', res: 'cp' },
  pilot_emo: { root: 'pilot_head', link: 'brow', res: 'emo', regex: /.*/ },
  macha_body: { root: undefined, link: 'center', res: 'df', regex: /^.*/ }, // mount ahead propulsion
  macha_armL: { root: 'macha_body', link: 'arml', res: 'df', regex: /^arml_.*/ }, // arml, hl
  macha_armR: { root: 'macha_body', link: 'armr', res: 'df', regex: /^armr_.*/ }, // armr, hr
  macha_armS: { root: 'macha_body', link: 'arms', res: 'df', regex: /^arms.*/ }, // arms
  macha_legL: { root: 'macha_body', link: 'legl', res: 'df', regex: /^legl_.*/ }, // legl
  macha_legR: { root: 'macha_body', link: 'legr', res: 'df', regex: /^legr_.*/ }, // legr
  mecha_door: { root: 'macha_body', link: 'ahead', res: 'do', regex: /.*/ }, // ahead
  mecha_doorS: { root: 'macha_body', link: 'ahead', res: 'do', regex: /.*/ }, // ahead
  macha_armor: { root: 'macha_body', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
  mecha_skirt: { root: 'macha_body', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
  mecha_booster: { root: 'macha_body', link: 'ahead', res: 'am', regex: /.*/ }, // ahead
  macha_armRX: { root: 'macha_body', link: 'armr', res: 'dc', regex: /^armr_.*/ }, // armr, hr
  macha_armLX: { root: 'macha_body', link: 'arml', res: 'dc', regex: /^arml.*/ }, // arml, hl
  macha_legLX: { root: 'macha_body', link: 'legl', res: 'lp', regex: /.*legl.*/ }, // legl
  macha_legRX: { root: 'macha_body', link: 'legr', res: 'lp', regex: /.*legr.*/ }, // legr
  mecha_propulsion: { root: 'macha_body', link: 'propulsion', res: 'pp', regex: /.*/ }, // propulsion
  mecha_weapon: { root: 'macha_body', link: 'rh', res: 'rh', regex: /.*/ }, // rh gp
  mecha_weaponGP: { root: 'mecha_weapon', link: 'gp', res: 'rh', regex: /.*_\d\d_00$/ }, // gp
  mecha_shield: { root: 'macha_body', link: 'lh', res: 'lh', regex: /.*/ }, // lh
  avatar_body: { root: undefined, link: 'center', res: 'df', regex: /.*_bd$/ },
  avatar_head: { root: 'avatar_body', link: 'tneck', res: 'df', regex: /^head.*/ }, // tneck, brow
  avatar_armL: { root: 'avatar_body', link: 'larm', res: 'df', regex: /^arml.*/ }, // larm, hl
  avatar_armR: { root: 'avatar_body', link: 'rarm', res: 'df', regex: /^armr.*/ }, // rarm, hr, fire
  avatar_leg: { root: 'avatar_body', link: 'tneck', res: 'df', regex: /^leg.*/ }, // tneck
  avatar_headX: { root: 'avatar_body', link: 'tneck', res: 'do', regex: /.*/ }, // tneck
  avatar_bodyX: { root: 'avatar_body', link: 'tneck', res: 'am', regex: /.*_bd$/ }, // tneck, tlarm, trarm
  avatar_armLT: { root: 'avatar_bodyX', link: 'tlarm', res: 'am', regex: /^arml.*/ }, // tlarm
  avatar_armRT: { root: 'avatar_bodyX', link: 'trarm', res: 'am', regex: /^armr.*/ }, // trarm
  avatar_legX: { root: 'avatar_body', link: 'tneck', res: 'am', regex: /^leg.*/ }, // tneck
  avatar_armLX: { root: 'avatar_body', link: 'larm', res: 'dc', regex: /^arml.*/ }, // larm
  avatar_armRX: { root: 'avatar_body', link: 'rarm', res: 'dc', regex: /^armr.*/ }, // rarm
  avatar_legL: { root: 'avatar_body', link: 'tneck', res: 'lp', regex: /.*_bdl$/ }, // tneck
  avatar_legR: { root: 'avatar_body', link: 'tneck', res: 'lp', regex: /.*_bdr$/ }, // tneck
  avatar_cloak: { root: 'avatar_body', link: 'tneck', res: 'pp', regex: /.*/ }, // tneck
  avatar_waeponRF: { root: 'avatar_body', link: 'rh', res: 'rh', regex: /^rf_.*/ }, // rh
  avatar_waeponRB: { root: 'avatar_body', link: 'rh', res: 'rh', regex: /^rb_.*/ }, // rh
  avatar_waeponLF: { root: 'avatar_body', link: 'lh', res: 'lh', regex: /^lf_.*/ }, // lh
  avatar_waeponLB: { root: 'avatar_body', link: 'lh', res: 'lh', regex: /^lb_.*/ }, // lh
  dragon_body: { root: undefined, link: 'center', res: 'df', regex: /^.*/ }, // mount
  dragon_head: { root: 'dragon_body', link: 'gneck', res: 'df', regex: /^head.*/ }, // gneck, brow, mouth
  dragon_eye: { root: 'dragon_body', link: 'eye', res: 'df', regex: /^eye.*/ }, // eye
  dragon_legF: { root: 'dragon_body', link: 'fleg', res: 'df', regex: /.*fleg.*/ }, // fleg
  dragon_legB: { root: 'dragon_body', link: 'bleg', res: 'df', regex: /.*bleg.*/ }, // bleg
  dragon_legT: { root: 'dragon_body', link: 'fleg', res: 'df', regex: /.*tleg.*/ }, // fleg
  dragon_cap: { root: 'dragon_body', link: 'gneck', res: 'do', regex: /.*/ }, // gneck, fire
  dragon_bodyX: { root: 'dragon_body', link: 'navel', res: 'am', regex: /.*/ }, // navel
  dragon_legFX: { root: 'dragon_body', link: 'fleg', res: 'dc', regex: /^fl.*/ }, // fleg
  dragon_footBX: { root: 'dragon_body', link: 'bleg', res: 'dc', regex: /^bl.*/ }, // bleg
  dragon_tailX: { root: 'dragon_body', link: 'navel', res: 'lp', regex: /.*/ }, // navel
  dragon_wingR: { root: 'dragon_body', link: 'wr', res: 'pp', regex: /^w_.*/ }, // wr
  dragon_wingL: { root: 'dragon_body', link: 'wl', res: 'pp', regex: /^wb_.*/ }, // wl
  dragon_weapon: { root: 'pilot_body', link: 'prh', res: 'rh', regex: /.*/ }, // up prh(pilot)
  dragon_book: { root: 'pilot_body', link: 'plh', res: 'lh', regex: /.*/ }, // mount plh(pilot)
}

const Order = {
  pilot: [],
  mecha: [
    'macha_armS',
    'macha_armR',
    'macha_legR',
    'macha_body',
    'macha_legL',
    'macha_armL',
  ],
  avatar: [],
  dragon: [],
  vehicle: [],
  all: [
    'avatar_waeponrf', 'avatar_armr2', 'avatar_armr1', 'avatar_armr', 'avatar_waeponrb',
    'avatar_legr', 'avatar_legb', 'avatar_legl', 'avatar_leg',
    'avatar_head1', 'avatar_head', 'avatar_body1', 'avatar_body',
    'avatar_waeponlf', 'avatar_arml2', 'avatar_arml1', 'avatar_arml', 'avatar_waeponlb',
    'avatar_cloak',
  
    'dragon_tail', 'dragon_weapon', 'dragon_wing1', 'dragon_cap',
    'dragon_eye', 'dragon_head',
    'dragon_foot1', 'dragon_foot2', 'dragon_armor', 
    'dragon_fleg', 'dragon_bleg',
    'dragon_body', 'dragon_tleg', 'dragon_book', 'dragon_wing2',
  
    'mechaWeapon', 'macha_arms', 'macha_armr1', 'macha_armr',  'mechaWeapon1',
    'mechaDoor',
    'mechaSkirt', 'macha_legr1', 'macha_legr',
    'macha_armor', 'macha_body',
    'mechaDoor1', 
    'macha_legl1', 'macha_legl', 'a-booster',
    'macha_arml1', 'macha_arml', 'mechaShield',
    'a-propulsion',
  
    'sleeve', 'arm', 'armWeapon', 'weapon',
    'cap', 'hair',
    'facial', 'emotion', 'ear', 'horn',
    'face', 'head',
    'facial1', 'ear1', 'horn1', 
    'pants', 'leg',
    'clothes', 'pilot_body', 
    'hair1', 'wing',
  ]
}

const Frame = {
  pilot: {
    stand: {},
    run: {},
    walk: {},
    jump_1: {},
    jump_2: {},
    fall: {},
    down: {},
    crawl: {},
    attack: {},
    call_pre: {},
    call_end: {},
    ride: {},
    mount: {},
    make: {},
    readyspell_1: {},
    spellcast_1: {},
    readyspell_2: {},
    spellcast_2: {},
    mount_1: {},
    mount_2: {},
    fish: {},
    sit: {},
    hit: {},
    hit_pow: {},
    die: {},
    stand_proud: {},
    applaud: {},
    greet: {},
    laugh: {},
    board: {},
    beckon: {},
    love: {},
    cry: {},
    shy: {},
  },
  macha: {
    stand1_0: {
      macha_body: 'stand1_0',
      macha_armL: 'arml_001',
      macha_armR: 'armr_002',
      macha_legL: 'legl_001',
      macha_legR: 'legr_002',
    },
    stand1_1: {},
    run0: {},
    run1: {},
    run2: {},
    run3: {},
    run4: {},
    run5: {},
    walk0: {},
    walk1: {},
    jumpdown: {},
    jumpup: {},
    open: {},
    down: {},
    flydown: {},
    flyup: {},
    
    astand: {},
    aalert0: {},
    aalert1: {},
    aalert2: {},
    aalert3: {},
    aalert4: {},
    aguard_0: {},
    areadyspell: {},
    ashoot1_1: {},
    ashoot1_2: {},
    ashoot1_3: {},
    ashoot2_1: {},
    ashoot2_2: {},
    ashoot2_3: {},
    ashoot2_5: {},
    aspellcast1_1: {},
    aspellcast1_2: {},
    aspellcast1_3: {},
    aswingrh1_0: {},
    aswingrh1_1: {},
    aswingrh1_2: {},
    aswingrh2_0: {},
    aswingrh2_1: {},
    aswingrh2_2: {},
    aswingrh3_0: {},
    aswingrh3_1: {},
    aswingrh3_2: {},
    aswingsp1_2: {},
    aswingsp1_3: {},
    aswingsp2_2: {},
    aswingsp2_3: {},
    aswingth1_2: {},
    aswingth2_0: {},
    aswingth2_1: {},
    aswingth2_2: {},
    aswingth2_3: {},
    aswingth3_0: {},
    aswingth3_1: {},
    aswingth3_2: {},
    aswingth3_3: {},
    aunarmed1_0: {},
    aunarmed1_1: {},
    aunarmed1_2: {},
    aunarmed1_3: {},
    
    galert0: {},
    galert1: {},
    galert2: {},
    galert3: {},
    galert4: {},
    gguard_0: {},
    greadyspell: {},
    gshoot1_1: {},
    gshoot1_2: {},
    gshoot1_3: {},
    gshoot2_1: {},
    gshoot2_2: {},
    gshoot2_3: {},
    gshoot2_5: {},
    gshootsp1_1: {},
    gshootsp1_2: {},
    gshootsp1_3: {},
    gshootsp1_4: {},
    gshootsp1_5: {},
    gspellcast1_1: {},
    gspellcast1_2: {},
    gspellcast1_3: {},
    gswingrh1_0: {},
    gswingrh1_1: {},
    gswingrh1_2: {},
    gswingrh2_0: {},
    gswingrh2_1: {},
    gswingrh2_2: {},
    gswingrh3_0: {},
    gswingrh3_1: {},
    gswingrh3_2: {},
    gswingsp1_1: {},
    gswingsp1_2: {},
    gswingsp1_3: {},
    gswingsp2_1: {},
    gswingsp2_2: {},
    gswingsp2_3: {},
    gswingth1_0: {},
    gswingth1_1: {},
    gswingth1_2: {},
    gswingth1_3: {},
    gswingth2_0: {},
    gswingth2_1: {},
    gswingth2_2: {},
    gswingth2_3: {},
    gswingth3_0: {},
    gswingth3_1: {},
    gswingth3_2: {},
    gswingth3_3: {},
    gunarmed1_0: {},
    gunarmed1_1: {},
    gunarmed1_2: {},
    gunarmed1_3: {},
  },
}

const Action = {}

export {
  Res,
  Part,
  Order,
  Frame,
  Action,
}
