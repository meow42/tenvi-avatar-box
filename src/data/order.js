const Order = {
  pilot: [
    '@p_arm', '@p_leg', '@p_body',
    /*
    'p_balloon', 'p_emo',
    'p_armX', 'p_arm', 'p_wp', 'p_legX', 'p_leg', 
    'p_faceX', 'p_horn', 'p_hornB', 'p_headX', 'p_face', 'p_ear', 'p_hair', 'p_head', 'p_faceXB', 'p_earB',
    'p_bodyX', 'p_body', 'p_bodyXB', 'p_hairL', 'p_headXB',
    */
  ],
  p_arm: [
    'p_balloon', 'p_emo',
    'p_armX', 'p_arm', 
  ],
  p_leg: [
    'p_wp', 'p_legX', 'p_leg', 
  ],
  p_body: [
    'p_faceX', 'p_horn', 'p_hornB', 'p_headX', 'p_face', 'p_ear', 'p_hair', 'p_head', 'p_faceXB', 'p_earB',
    'p_bodyX', 'p_body', 'p_bodyXB', 'p_hairL', 'p_headXB',
  ],
  mecha: [
    'a_wpR', 'a_armRX', 'a_armS', 'a_armR', 'a_wpRS', 
    'a_head', 'a_headS',
    'a_legRX', 'a_legR',
    'a_bodyX', 'a_body', 
    '@p_arm', '@p_leg', '@p_body',
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
    's_ppR', 
    's_wpR', '@p_arm', 's_wpRB', '@p_leg', 
    's_tailX', 's_headX', 's_eye', 's_head', 
    's_legRX', 's_legF', 's_legLX', 's_legB',  
    's_bodyX', 's_body', 's_legL',
    's_wpL', '@p_body',
    's_ppL', 
  ],
  vehicle: [
    'v_body', 'v_car_wheel2', 'v_car_wheel3', 
    '@p_arm', '@p_leg', '@p_body', 'v_bodyB', 
    'v_car_wheel0', 'v_car_wheel1', 
  ],
  v_car_2: [
    'v_body', 'v_car_wheel1', 'v_car_wheel3', 
    '@p_arm', '@p_leg', '@p_body','v_bodyB', 
    'v_car_wheel0', 'v_car_wheel2', 
  ],
  v_car_gun: [
    'v_car_wheel2', 'v_car_wheel3', 
    'v_body', 'v_bodyB', 
    '@p_arm', '@p_leg', '@p_body', 
    'v_car_wheel0', 'v_car_wheel1', 
    'v_car_gun', 'v_car_gunB', 
  ],
  v_motor: [
    'v_car_wheel3', 'v_car_wheel2',
    'v_body', '@p_arm', '@p_leg', '@p_body', 'v_bodyB', 
    'v_car_wheel1', 'v_car_wheel0', 
  ],
  v_sled: [
    'v_car_wheel3', 'v_car_wheel1', 
    'v_body', '@p_arm', '@p_leg', '@p_body', 'v_bodyB', 
    'v_car_wheel2', 'v_car_wheel0', 
  ],
  v_mouse: [
    'v_car_wheel1', 'v_car_mouse', 
    'v_body', '@p_arm', '@p_leg', '@p_body', 'v_bodyB', 
    'v_car_wheel0', 
  ],
  v_chair: [
    'v_chair_ring', 'v_chair_dog', 
    '@p_arm', '@p_leg', '@p_body',
    'v_body', 'v_chair_parasol'
  ],
}

const ResOrder = {
  'v0002': Order.v_motor,
  'v0001': Order.v_car_gun,
  'v0025': Order.v_car_gun,
  'v0026': Order.v_car_gun,
  'v0015': Order.v_sled,
  'v0019': Order.v_car_2,
  'v0024': Order.v_mouse,
  'v0016': Order.v_chair,
  'v0017': Order.v_chair,
  'v0018': Order.v_chair,
  'v0020': Order.v_chair,
  'v0021': Order.v_chair,
  'v0022': Order.v_chair,
  'v0023': Order.v_chair,
}

export {
  Order,
  ResOrder
}
