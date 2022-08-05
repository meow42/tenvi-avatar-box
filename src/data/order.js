const Order = {
  pilot: [],
  mecha: [
    'a_wpR', 'a_armRX', 'a_armS', 'a_armR', 'a_wpRS', 
    'a_head', 'a_headS',
    'a_legRX', 'a_legR',
    'a_bodyX', 'a_body', 
    'a_legLX', 'a_legL',
    'a_armLX', 'a_armL', 'a_wpL',
    'a_pp',
  ],
  avatar: [
    't_wpRF', 't_armRT', 't_armRX', 't_armR', 't_wpRB', 
    't_legRT', 't_legRX', 't_legR',
    't_headX', 't_head', 
    't_legLT', 't_bodyX', 't_body',  
    't_wpLF', 't_armLT', 't_armLX', 't_armL', 't_wpLB', 
    't_pp',     
  ],
  dragon: [
    's_eye', 's_head', 
    's_legF', 's_legB', 
    's_body', 's_legT',

    's_headX', 's_bodyX', 's_legFX', 's_legBX', 's_tailX', 's_ppR', 's_ppL', 's_wpR', 's_wpL',
  ],
  vehicle: [
    'v_car_body', 'v_car_wheel2', 'v_car_wheel3', 
    'v_car_bodyB', 'v_car_wheel0', 'v_car_wheel1', 
    
    'v_chair_ring', 'v_chair_dog', 'v_chair', 'v_chair_parasol'
  ],
  v_car_2: [
    'v_car_body', 'v_car_wheel1', 'v_car_wheel3', 
    'v_car_bodyB', 'v_car_wheel0', 'v_car_wheel2', 
  ],
  v_car_gun: [
    'v_car_wheel2', 'v_car_wheel3', 
    'v_car_body', 'v_car_bodyB', 
    'v_car_wheel0', 'v_car_wheel1', 
    'v_car_gun', 'v_car_gunB', 
  ],
  v_motor: [
    'v_car_wheel3', 'v_car_wheel2',
    'v_car_body', 'v_car_bodyB', 
    'v_car_wheel1', 'v_car_wheel0', 
  ],
  v_sled: [
    'v_car_wheel3', 'v_car_wheel1', 
    'v_car_body', 'v_car_bodyB', 
    'v_car_wheel2', 'v_car_wheel0', 
  ],
  v_mouse: [
    'v_car_wheel1', 
    'v_car_mouse', 'v_car_body', 'v_car_bodyB', 
    'v_car_wheel0', 
  ],
  all: [
    't_wprf', 't_armr2', 't_armr1', 't_armr', 't_wprb',
    't_legr', 't_legb', 't_legl', 't_leg',
    't_head1', 't_head', 't_body1', 't_body',
    't_wplf', 't_arml2', 't_arml1', 't_arml', 't_wplb',
    't_pp',
  
    's_tail', 's_wpR', 's_pp1', 's_headX',
    's_eye', 's_head',
    's_foot1', 's_foot2', 's_armor', 
    's_fleg', 's_bleg',
    's_body', 's_tleg', 's_wpL', 's_pp2',
  
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

const ResOrder = {
  'v0002': Order.v_motor,
  'v0001': Order.v_car_gun,
  'v0025': Order.v_car_gun,
  'v0026': Order.v_car_gun,
  'v0015': Order.v_sled,
  'v0019': Order.v_car_2,
  'v0024': Order.v_mouse,
}

export {
  Order,
  ResOrder
}
