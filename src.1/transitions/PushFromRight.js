import { LayoutAnimation } from 'react-native';

export default {
  animation: {
    duration: 200,
    update: {
      type: LayoutAnimation.Types.easeIn,
      springDamping: 0.7,
    },
  },
  screen1: {
    left: -0.5,
    opacity: 1,
  },
  screen2: {
    left: 1,
  },
};