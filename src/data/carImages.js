const IMAGES = {
  yarisativ: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/2022_Toyota_Yaris_ATIV_Smart.png/960px-2022_Toyota_Yaris_ATIV_Smart.png',
  camry: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/2025_Toyota_Camry_Hybrid_XSE_%28United_States%29_front_view.png/960px-2025_Toyota_Camry_Hybrid_XSE_%28United_States%29_front_view.png',
  fortuner_grsport: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/2021_Toyota_Fortuner_GR_Sport_2.8_4WD.jpg/960px-2021_Toyota_Fortuner_GR_Sport_2.8_4WD.jpg',
};

export function carImage(code) {
  return IMAGES[code] || null;
}
