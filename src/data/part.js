const Part = {
  root: { root: undefined, link: 'center', res: '' },
  p_body: { root: 'root', link: 'center', res: 'p_bd', regex: /.*_body$/ },
  p_arm: { root: 'p_body', link: 'arm', res: 'p_bd', regex: /.*_arm$/ },
  p_leg: { root: 'p_body', link: 'leg', res: 'p_bd', regex: /.*_leg$/ },
  p_bodyX: { root: 'p_body', link: 'neck', res: 'p_cl', regex: /.*_body$/ },
  p_armX: { root: 'p_bodyX', link: 'psleeve', res: 'p_cl', regex: /.*_arm$/ },
  p_legX: { root: 'p_bodyX', link: 'pleg', res: 'p_cl', regex: /.*_leg$/ },
  p_bodyXB: { root: 'p_body', link: 'neck', res: 'p_cl', regex: /.*_wing$/ },
  p_head: { root: 'p_body', link: 'neck', res: 'p_hd', regex: /head.*/ },
  p_horn: { root: 'p_head', link: 'brow', res: 'p_hd', regex: /horn.*_1$/ },
  p_hornB: { root: 'p_head', link: 'brow', res: 'p_hd', regex: /horn.*_0$/ },
  p_ear: { root: 'p_head', link: 'brow', res: 'p_hd', regex: /ear.*_1$/ },
  p_earB: { root: 'p_head', link: 'brow', res: 'p_hd', regex: /ear.*_0$/ },
  p_face: { root: 'p_head', link: 'brow', res: 'p_fc', regex: /.*/ },
  p_faceX: { root: 'p_head', link: 'brow', res: 'p_fa', regex: /.*_01$/ },
  p_faceXB: { root: 'p_head', link: 'brow', res: 'p_fa', regex: /.*_00$/ },
  p_hair: { root: 'p_head', link: 'brow', res: 'p_hr', regex: /hair(?!Lower).*/ },
  p_hairL: { root: 'p_head', link: 'brow', res: 'p_hr', regex: /hairLower.*/ },
  p_headX: { root: 'p_head', link: 'brow', res: 'p_cp' },
  p_headXB: { root: 'p_head', link: 'brow', res: 'p_cp' },
  p_wp: { root: 'p_body', link: 'wp', res: 'p_wp' },
  p_balloon: { root: 'p_body', link: 'wp', res: 'p_wp' },
  p_emo: { root: 'p_head', link: 'brow', res: 'p_emo', regex: /.*/ },
  a_body: { root: 'root', link: 'center', res: 'a_df', regex: /^body_.*/ }, // mount ahead pp
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
  a_pp: { root: 'a_body', link: 'propulsion', res: 'a_pp', regex: /.*/ }, // propulsion, e0
  a_wpR: { root: 'a_body', link: 'rh', res: 'a_rh', regex: /.*/ }, // rh gp
  a_wpRS: { root: 'a_wpR', link: 'gp', res: 'a_rh', regex: /.*_\d\d_00$/ }, // gp
  a_wpL: { root: 'a_body', link: 'lh', res: 'a_lh', regex: /.*/ }, // lh
  t_body: { root: 'root', link: 'center', res: 't_df', regex: /.*_bd$/ },
  t_head: { root: 't_body', link: 'tneck', res: 't_df', regex: /^head.*/ }, // tneck, brow
  t_armL: { root: 't_body', link: 'larm', res: 't_df', regex: /^arml.*/ }, // larm, hl
  t_armR: { root: 't_body', link: 'rarm', res: 't_df', regex: /^armr.*/ }, // rarm, hr, fire
  t_legR: { root: 't_body', link: 'tneck', res: 't_df', regex: /^leg.*/ }, // tneck
  t_headX: { root: 't_body', link: 'tneck', res: 't_do', regex: /.*/ }, // tneck
  t_bodyX: { root: 't_body', link: 'tneck', res: 't_am', regex: /.*_bd$/ }, // tneck, tlarm, trarm
  t_armLX: { root: 't_bodyX', link: 'tlarm', res: 't_am', regex: /(^arml.*|.*al$)/ }, // tlarm
  t_armRX: { root: 't_bodyX', link: 'trarm', res: 't_am', regex: /(^armr.*|.*ar$)/ }, // trarm
  t_legRX: { root: 't_body', link: 'tneck', res: 't_am', regex: /(^leg.*|.*leg$)/ }, // tneck
  t_armLT: { root: 't_body', link: 'larm', res: 't_dc', regex: /^arml.*/ }, // larm
  t_armRT: { root: 't_body', link: 'rarm', res: 't_dc', regex: /^armr.*/ }, // rarm
  t_legLT: { root: 't_body', link: 'tneck', res: 't_lp', regex: /.*_bdl$/ }, // tneck
  t_legRT: { root: 't_body', link: 'tneck', res: 't_lp', regex: /.*_bdr$/ }, // tneck
  t_pp: { root: 't_body', link: 'tneck', res: 't_pp', regex: /.*/ }, // tneck
  t_wpRF: { root: 't_body', link: 'rh', res: 't_rh', regex: /^rf_.*/ }, // rh
  t_wpRB: { root: 't_body', link: 'rh', res: 't_rh', regex: /^rb_.*/ }, // rh
  t_wpLF: { root: 't_body', link: 'lh', res: 't_lh', regex: /^lf_.*/ }, // lh
  t_wpLB: { root: 't_body', link: 'lh', res: 't_lh', regex: /^lb_.*/ }, // lh
  s_body: { root: 'root', link: 'center', res: 's_df', regex: /^body.*/ }, // mount
  s_head: { root: 's_body', link: 'gneck', res: 's_df', regex: /^head.*/ }, // gneck, brow, mouth
  s_eye: { root: 's_body', link: 'eye', res: 's_df', regex: /^eye.*/ }, // eye
  s_legF: { root: 's_body', link: 'fleg', res: 's_df', regex: /.*fleg.*/ }, // fleg
  s_legB: { root: 's_body', link: 'bleg', res: 's_df', regex: /.*bleg.*/ }, // bleg
  s_legL: { root: 's_body', link: 'fleg', res: 's_df', regex: /.*tleg.*/ }, // fleg
  s_headX: { root: 's_body', link: 'gneck', res: 's_do', regex: /.*/ }, // gneck, fire
  s_bodyX: { root: 's_body', link: 'navel', res: 's_am', regex: /.*/ }, // navel
  s_legRX: { root: 's_body', link: 'fleg', res: 's_dc', regex: /^fl.*/ }, // fleg
  s_legLX: { root: 's_body', link: 'bleg', res: 's_dc', regex: /^bl.*/ }, // bleg
  s_tailX: { root: 's_body', link: 'navel', res: 's_lp', regex: /.*/ }, // navel
  s_ppR: { root: 's_body', link: 'wr', res: 's_pp', regex: /^w_.*/ }, // wr
  s_ppL: { root: 's_body', link: 'wl', res: 's_pp', regex: /^wb_.*/ }, // wl
  s_wpR: { root: 'p_body', link: 'prh', res: 's_rh', regex: /.*head.*/ }, // up prh(pilot)
  s_wpRB: { root: 's_wpR', link: 'up', res: 's_rh', regex: /.*grip.*/ }, // up prh(pilot)
  s_wpL: { root: 'p_body', link: 'mount', res: 's_lh', regex: /.*/ }, // mount plh(pilot)
  v_body: { root: 'root', link: 'center', res: 'v_res', regex: /.*/ },
  v_bodyB: { root: 'v_body', link: 'back', res: 'v_res', regex: /.*/ },
  v_car_gun: { root: 'v_body', link: 'g1', res: 'v_res', regex: /.*/ },
  v_car_gunB: { root: 'v_body', link: 'g0', res: 'v_res', regex: /.*/ },
  v_car_wheel0: { root: 'v_body', link: 'w00', res: 'v_res', regex: /.*/ },
  v_car_wheel1: { root: 'v_body', link: 'w01', res: 'v_res', regex: /.*/ },
  v_car_wheel2: { root: 'v_body', link: 'w02', res: 'v_res', regex: /.*/ },
  v_car_wheel3: { root: 'v_body', link: 'w03', res: 'v_res', regex: /.*/ },
  v_car_mouse: { root: 'v_body', link: 'mouse', res: 'v_res', regex: /.*/ },
  v_chair_dog: { root: 'v_body', link: 'dog', res: 'v_res', regex: /.*/ },
  v_chair_ring: { root: 'v_body', link: 'ring', res: 'v_res', regex: /.*/ },
  v_chair_parasol: { root: 'v_body', link: 'parasol', res: 'v_res', regex: /.*/ },
}

const ResPart = {
}

/** 特定动作帧处理 */
const PartPattern = {
  t_headX: {
    'head03': { offsetX: -2 }
  }
}

export {
  Part,
  ResPart,
  PartPattern,
}