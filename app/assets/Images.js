
import Globals from '../constants/Globals';

export const background = require('./images/background.png');
export const headerLogo = require('./images/headerLogo.png');
export const loginLogo = require('./images/loginLogo.png');
export const logo = require('./images/logo.png');
export const avatar = require('./images/avatar.png');

export const splashBg = Globals.DeviceType === 'Phone' ? require('./images/splashscreen.png') :  require('./images/splashscreen_New.png');

export const bannerImg = Globals.DeviceType === "Phone"? require('./images/mobile-html5-banner.jpg'): require('./images/html5-banner.jpg');

export const action = require('./images/backgrounds/action.jpg');
export const adventure = require('./images/backgrounds/adventure.jpg');
export const arcade = require('./images/backgrounds/arcade.jpg');
export const augmentedReality = require('./images/backgrounds/augmented-reality.jpg');
export const premium = require('./images/backgrounds/premium.jpg');
export const racing = require('./images/backgrounds/racing.jpg');
export const rpg = require('./images/backgrounds/rpg.jpg');
export const rts = require('./images/backgrounds/rts.jpg');
export const sports = require('./images/backgrounds/sports.jpg');
export const utilities = require('./images/backgrounds/utilities.jpg');
export const virtualReality = require('./images/backgrounds/virtual-reality.jpg');
export const html5 = require('./images/html5.png');
