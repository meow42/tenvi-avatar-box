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
  vehicle: {
    car_gun: {
      v_car_body: 'body00',
      v_car_bodyB: 'bodyback',
      v_car_gun: 'gun00',
      v_car_gunB: 'gun01',
      v_car_wheel0: 'wheel00',
      v_car_wheel1: 'wheel00',
      v_car_wheel2: 'wheel00',
      v_car_wheel3: 'wheel00',
    },
    car_1: {
      v_car_body: 'body00',
      v_car_bodyB: 'bodyback',
      v_car_wheel0: 'wheel00_0',
      v_car_wheel1: 'wheel01_0',
      v_car_wheel2: 'wheel02_0',
      v_car_wheel3: 'wheel02_0',
    },
    car_2: {
      v_car_body: 'body0',
      v_car_bodyB: 'bodyback',
      v_car_wheel0: 'wheel00_0',
      v_car_wheel1: 'wheel02_0',
      v_car_wheel2: 'wheel01_0',
      v_car_wheel3: 'wheel02_0',
    },
    motor: {
      v_car_body: 'body00',
      v_car_bodyB: 'bodyback',
      v_car_wheel0: 'wheel00_0',
      v_car_wheel1: 'wheel01_0',
      v_car_wheel2: 'wheel02_0',
      v_car_wheel3: 'wheel03_0',
    },
    sled: {
      v_car_body: 'body0',
      v_car_bodyB: 'bodyback',
      v_car_wheel0: 'wheel00_0',
      v_car_wheel1: 'wheel01_0',
      v_car_wheel2: 'wheel02_0',
      v_car_wheel3: 'wheel03_0',
    },
  },
}

const ResFrame = {
  'v0002': Frame.vehicle.motor,
  'v0001': Frame.vehicle.car_gun,
  'v0025': Frame.vehicle.car_gun,
  'v0026': Frame.vehicle.car_gun,
  'v0003': Frame.vehicle.car_1,
  'v0004': Frame.vehicle.car_1,
  'v0005': Frame.vehicle.car_1,
  'v0015': Frame.vehicle.sled,
  'v0019': Frame.vehicle.car_2,
  'v0024': Frame.vehicle.car_2,
}

export {
  Frame,
  ResFrame
}
