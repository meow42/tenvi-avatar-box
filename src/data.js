const Res = {
  a_df: [
    { id: '00008', cn: '' },
    { id: '00159', cn: '' },
    { id: '00160', cn: '' }, { id: '|' },
    { id: '00182', cn: '' },
    { id: '00183', cn: '' },
    { id: '00184', cn: '' },
    { id: '00185', cn: '' },
  ]
}

const Part = {
  p_body: { root: undefined, link: 'center', res: 'bd', regex: /.*_body$/ },
  p_arm: { root: 'p_body', link: 'arm', res: 'bd', regex: /.*_arm$/ },
  p_leg: { root: 'p_body', link: 'leg', res: 'bd', regex: /.*_leg$/ },
  p_wp: { root: 'p_body', link: 'wp', res: 'wp' },
  p_clothes: { root: 'p_body', link: 'neck', res: 'cl', regex: /.*_body$/ },
  p_sleeve: { root: 'p_clothes', link: 'psleeve', res: 'cl', regex: /.*_arm$/ },
  p_pants: { root: 'p_clothes', link: 'pleg', res: 'cl', regex: /.*_leg$/ },
  p_wing: { root: 'p_body', link: 'neck', res: 'cl', regex: /.*_wing$/ },
  p_head: { root: 'p_body', link: 'neck', res: 'hd', regex: /head.*/ },
  p_horn: { root: 'p_head', link: 'brow', res: 'hd', regex: /horn.*_0$/ },
  p_hornS: { root: 'p_head', link: 'brow', res: 'hd', regex: /horn.*_1$/ },
  p_ear: { root: 'p_head', link: 'brow', res: 'hd', regex: /ear.*_0$/ },
  p_earS: { root: 'p_head', link: 'brow', res: 'hd', regex: /ear.*_1$/ },
  p_face: { root: 'p_head', link: 'brow', res: 'fc', regex: /.*/ },
  p_fa: { root: 'p_head', link: 'brow', res: 'fa', regex: /^((?!.*(_01)).)*$/ },
  p_faS: { root: 'p_head', link: 'brow', res: 'fa', regex: /.*_01$/ },
  p_hair: { root: 'p_head', link: 'brow', res: 'hr', regex: /hair(?!Lower).*/ },
  p_hairL: { root: 'p_head', link: 'brow', res: 'hr', regex: /hairLower.*/ },
  p_cap: { root: 'p_head', link: 'brow', res: 'cp' },
  p_emo: { root: 'p_head', link: 'brow', res: 'emo', regex: /.*/ },
  a_body: { root: undefined, link: 'center', res: 'a_df', regex: /^.*/ }, // mount ahead pp
  a_armL: { root: 'a_body', link: 'arml', res: 'a_df', regex: /^arml_.*/ }, // arml, hl
  a_armR: { root: 'a_body', link: 'armr', res: 'a_df', regex: /^armr_.*/ }, // armr, hr
  a_armS: { root: 'a_body', link: 'arms', res: 'a_df', regex: /^arms.*/ }, // arms
  a_legL: { root: 'a_body', link: 'legl', res: 'a_df', regex: /^legl_.*/ }, // legl
  a_legR: { root: 'a_body', link: 'legr', res: 'a_df', regex: /^legr_.*/ }, // legr
  a_head: { root: 'a_body', link: 'ahead', res: 'a_do', regex: /.*/ }, // ahead
  a_headS: { root: 'a_body', link: 'ahead', res: 'a_do', regex: /.*/ }, // ahead
  a_bodyX: { root: 'a_body', link: 'ahead', res: 'a_am', regex: /.*/ }, // ahead
  a_bodyXS: { root: 'a_body', link: 'ahead', res: 'a_am', regex: /.*/ }, // ahead
  a_bodyXB: { root: 'a_body', link: 'ahead', res: 'a_am', regex: /.*/ }, // ahead
  a_armRX: { root: 'a_body', link: 'armr', res: 'a_dc', regex: /^armr_.*/ }, // armr, hr
  a_armLX: { root: 'a_body', link: 'arml', res: 'a_dc', regex: /^arml.*/ }, // arml, hl
  a_legLX: { root: 'a_body', link: 'legl', res: 'a_lp', regex: /.*legl.*/ }, // legl
  a_legRX: { root: 'a_body', link: 'legr', res: 'a_lp', regex: /.*legr.*/ }, // legr
  a_pp: { root: 'a_body', link: 'pp', res: 'a_pp', regex: /.*/ }, // pp
  a_wp: { root: 'a_body', link: 'rh', res: 'a_rh', regex: /.*/ }, // rh gp
  a_wpGP: { root: 'a_wp', link: 'gp', res: 'a_rh', regex: /.*_\d\d_00$/ }, // gp
  a_shield: { root: 'a_body', link: 'lh', res: 'a_lh', regex: /.*/ }, // lh
  t_body: { root: undefined, link: 'center', res: 't_df', regex: /.*_bd$/ },
  t_head: { root: 't_body', link: 'tneck', res: 't_df', regex: /^head.*/ }, // tneck, brow
  t_armL: { root: 't_body', link: 'larm', res: 't_df', regex: /^arml.*/ }, // larm, hl
  t_armR: { root: 't_body', link: 'rarm', res: 't_df', regex: /^armr.*/ }, // rarm, hr, fire
  t_leg: { root: 't_body', link: 'tneck', res: 't_df', regex: /^leg.*/ }, // tneck
  t_headX: { root: 't_body', link: 'tneck', res: 't_do', regex: /.*/ }, // tneck
  t_bodyX: { root: 't_body', link: 'tneck', res: 't_am', regex: /.*_bd$/ }, // tneck, tlarm, trarm
  t_armLT: { root: 't_bodyX', link: 'tlarm', res: 't_am', regex: /^arml.*/ }, // tlarm
  t_armRT: { root: 't_bodyX', link: 'trarm', res: 't_am', regex: /^armr.*/ }, // trarm
  t_legX: { root: 't_body', link: 'tneck', res: 't_am', regex: /^leg.*/ }, // tneck
  t_armLX: { root: 't_body', link: 'larm', res: 't_dc', regex: /^arml.*/ }, // larm
  t_armRX: { root: 't_body', link: 'rarm', res: 't_dc', regex: /^armr.*/ }, // rarm
  t_legL: { root: 't_body', link: 'tneck', res: 't_lp', regex: /.*_bdl$/ }, // tneck
  t_legR: { root: 't_body', link: 'tneck', res: 't_lp', regex: /.*_bdr$/ }, // tneck
  t_pp: { root: 't_body', link: 'tneck', res: 't_pp', regex: /.*/ }, // tneck
  t_wpRF: { root: 't_body', link: 'rh', res: 't_rh', regex: /^rf_.*/ }, // rh
  t_wpRB: { root: 't_body', link: 'rh', res: 't_rh', regex: /^rb_.*/ }, // rh
  t_wpLF: { root: 't_body', link: 'lh', res: 't_lh', regex: /^lf_.*/ }, // lh
  t_wpLB: { root: 't_body', link: 'lh', res: 't_lh', regex: /^lb_.*/ }, // lh
  s_body: { root: undefined, link: 'center', res: 's_df', regex: /^.*/ }, // mount
  s_head: { root: 's_body', link: 'gneck', res: 's_df', regex: /^head.*/ }, // gneck, brow, mouth
  s_eye: { root: 's_body', link: 'eye', res: 's_df', regex: /^eye.*/ }, // eye
  s_legF: { root: 's_body', link: 'fleg', res: 's_df', regex: /.*fleg.*/ }, // fleg
  s_legB: { root: 's_body', link: 'bleg', res: 's_df', regex: /.*bleg.*/ }, // bleg
  s_legT: { root: 's_body', link: 'fleg', res: 's_df', regex: /.*tleg.*/ }, // fleg
  s_cap: { root: 's_body', link: 'gneck', res: 's_do', regex: /.*/ }, // gneck, fire
  s_bodyX: { root: 's_body', link: 'navel', res: 's_am', regex: /.*/ }, // navel
  s_legFX: { root: 's_body', link: 'fleg', res: 's_dc', regex: /^fl.*/ }, // fleg
  s_footBX: { root: 's_body', link: 'bleg', res: 's_dc', regex: /^bl.*/ }, // bleg
  s_tailX: { root: 's_body', link: 'navel', res: 's_lp', regex: /.*/ }, // navel
  s_ppR: { root: 's_body', link: 'wr', res: 's_pp', regex: /^w_.*/ }, // wr
  s_ppL: { root: 's_body', link: 'wl', res: 's_pp', regex: /^wb_.*/ }, // wl
  s_wp: { root: 'p_body', link: 'prh', res: 's_rh', regex: /.*/ }, // up prh(pilot)
  s_book: { root: 'p_body', link: 'plh', res: 's_lh', regex: /.*/ }, // mount plh(pilot)
}

const Order = {
  pilot: [],
  mecha: [
    'a_armS',
    'a_armR',
    'a_legR',
    'a_body',
    'a_legL',
    'a_armL',
  ],
  avatar: [],
  dragon: [],
  vehicle: [],
  all: [
    't_wprf', 't_armr2', 't_armr1', 't_armr', 't_wprb',
    't_legr', 't_legb', 't_legl', 't_leg',
    't_head1', 't_head', 't_body1', 't_body',
    't_wplf', 't_arml2', 't_arml1', 't_arml', 't_wplb',
    't_pp',
  
    's_tail', 's_wp', 's_pp1', 's_cap',
    's_eye', 's_head',
    's_foot1', 's_foot2', 's_armor', 
    's_fleg', 's_bleg',
    's_body', 's_tleg', 's_book', 's_pp2',
  
    'mechaWeapon', 'a_arms', 'a_armr1', 'a_armr',  'mechaWeapon1',
    'mechaDoor',
    'mechaSkirt', 'a_legr1', 'a_legr',
    'a_armor', 'a_body',
    'mechaDoor1', 
    'a_legl1', 'a_legl', 'a-booster',
    'a_arml1', 'a_arml', 'mechaShield',
    'a-pp',
  
    'sleeve', 'arm', 'armWeapon', 'wp',
    'cap', 'hair',
    'fa', 'emotion', 'ear', 'horn',
    'face', 'head',
    'fa1', 'ear1', 'horn1', 
    'pants', 'leg',
    'clothes', 'p_body', 
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
      a_body: 'body_stand1_0',
      a_armL: 'arml_001',
      a_armR: 'armr_002',
      a_legL: 'legl_001',
      a_legR: 'legr_002',
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
