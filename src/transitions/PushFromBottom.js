import { LayoutAnimation } from 'react-native';

export default {
  animation: {
    duration: 250,
    update: {
      type: LayoutAnimation.Types.easeIn,
      springDamping: 0.7,
    },
  },
  screen1: {
    top: -0.3,
  },
  screen2: {
    top: 1,
  },
};