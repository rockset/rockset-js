const BaseColors = {
  // Shades and Tints / White to Black
  shade1: 'rgba(0,0,0,0.1)',
  // shade2: 'rgba(0,0,0,0.2)',
  black: 'rgba(0,0,0,1)', //Don't use if possible

  // Dark background for light text
  dark: 'rgba(39, 45, 51, 1)',
  white: 'rgba(255,255,255,1)',
  gray: 'rgba(190,190,190,1)',
  // red: 'rgba(255,0,0,1)',
  // green: 'rgba(0,255,0,1)',
  // yellow: 'rgba(255,255,0,1)',
  purple: 'rgba(128,0,128,1)',

  // Grays
  gray1: 'rgba(23,39,53,1)', //172735
  gray2: 'rgba(27,40,52,0.2)', //1b2834
  gray3: 'rgba(27,40,52,1)', //1b2834
  gray4: 'rgba(90,104,114,0.5)', //5a6872
  gray4_1: 'rgba(95,104,112,0.6)', //5f6870
  gray5: 'rgba(95,104,112,1)', //5f6870
  gray6: 'rgba(159,164,169,1)', //9fa4a9
  gray7: 'rgba(172,179,184,1)', //acb3b8
  gray8: 'rgba(205,209,212,1)', //cdd1d4
  gray9: 'rgba(207,215,223,1)', //cfd7df
  gray10: 'rgba(218,223,226,0.5)', //dadfe2
  gray11: 'rgba(218,223,226,1)', //dadfe2
  gray12: 'rgba(223,227,230,1)', //dfe3e6
  gray13: 'rgba(235,236,237,1)', //ebeced
  gray14: 'rgba(236,236,236,1)', //ececec
  gray15: 'rgba(242,242,242,1)', //f2f2f2
  gray16: 'rgba(248,248,248,1)', //f8f8f8

  // Blues
  blue1: 'rgba(0, 94, 145, 1)', //005e91
  blue2: 'rgba(0, 145, 255, 1)', //0091ff
  blue3: 'rgba(4,124,192,1)', //047CC0
  blue4: 'rgba(19,79,119,1)', //134F77
  blue5: 'rgba(20,83,126,1)', //14537e
  blue6: 'rgba(20,84,126,1)', //14547e
  blue7: 'rgba(23,93,141,1)', //175d8d
  blue8: 'rgba(24,104,152,1)', //186898
  blue8_1: 'rgba(38, 67, 87, 1)', //264357
  blue9: 'rgba(90,104,114,1)', //5a6872
  blue10: 'rgba(90,170,250,0.3)', //5aaafa
  blue11: 'rgba(90,170,250,1)', //5aaafa
  blue12: 'rgba(141,211,199,1)', //8dd3c7
  blue13: 'rgba(222,237,247,0.4)', //deedf7
  blue14: 'rgba(222,237,247,1)', //deedf7
  blue15: 'rgba(225,237,246,1)', //e1edf6
  blue16: 'rgba(230,235,241,1)', //e6ebf1
  blue17: 'rgba(237,246,250,1)', //edf6fa
  blue18: 'rgba(238,244,253,1)', //eef4fd
  blue19: 'rgba(242,248,252,1)', //f2f8fc
  blue20: 'rgba(244,247,248,0.5)', //f4f7f8
  blue21: 'rgba(244,247,248,1)', //f4f7f8
  blue22: 'rgba(244,247,251,1)', //f4f7fb

  // Purples
  purple1: 'rgba(98,54,255,1)', //6236ff
  purple2: 'rgba(104,0,153,1)', //680099
  // purple3: 'rgba(188,128,189,1)', //bc80bd
  // purple4: 'rgba(190,186,218,1)', //bebada

  // Reds
  red1: 'rgba(178,19,36,1)', //b21324
  red2: 'rgba(187,0,0,1)', //bb0000
  // red3: 'rgba(189,20,39,1)', //bd1427
  // red4: 'rgba(205,52,54,1)', //cd3436
  red5: 'rgba(224,24,45,0.2)', //e0182d
  red6: 'rgba(224,24,45,1)', //e0182d
  // red7: 'rgba(235,28,38,1)', //eb1c26

  // Yellows
  yellow1: 'rgba(239,193,0,1)', //efc100
  // yellow2: 'rgba(254,253,229,1)', //fefde5

  // Greens
  // green1: 'rgba(0,180,160,1)', //00b4a0
  green2: 'rgba(40,180,84,1)', //28b454
  green3: 'rgba(90,167,0,1)', //5aa700
  green4: 'rgba(179,222,105,1)', //b3de69

  // Oranges
  // orange1: 'rgba(250,117,90,1)', //fa755a
  // orange2: 'rgba(251,128,114,1)', //fb8072
  // orange3: 'rgba(253,180,98,1)', //fdb462

  // Pinks
  pink1: 'rgba(252,205,229,1)', //fccde5
};

const ContextColors = {
  border: BaseColors.gray11,
  status: {
    info: BaseColors.blue11,
    success: BaseColors.green3,
    warning: BaseColors.yellow1,
    danger: BaseColors.red6,
    beta: BaseColors.purple2,
    earlyAccess: BaseColors.purple1,
  },
  text: {
    primary: BaseColors.gray3,
    link: BaseColors.blue8,
    label: BaseColors.blue9,
  },
};

const Fonts = {
  sizes: {
    h1: '20px',
    h2: '18px',
    h3: '16px',
    h4: '14px',
    h5: '12px',
    modalHeader: '28px',
    content: '14px',
    overlayHeader: '28px',
  },
  families: {
    ssp: 'Source Sans Pro',
    scp: 'Source Code Pro',
  },
  weights: {
    lighter: 200,
    light: 300,
    medium: 400,
    semiBold: 600,
    bold: 800,
  },
};

export const pebbleTheme = {
  baseColors: BaseColors,
  contextColors: ContextColors,
  fonts: Fonts,
};
