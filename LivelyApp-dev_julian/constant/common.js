export const IMAGES = {
  LOGO: require('../assets/images/LivelyLogo.png'),
  SPLASH_SCREEN_BG: require('../assets/images/splace_screen_bg.png'),
  BG_SHAPE: require('../assets/images/bg-shape.png'),
  NO_INTERNATE: require('../assets/images/no_internate.jpg'),
};

export const formateHtmlText = html => html?.replace(/<[^>]*>?/gm, '').trim();
