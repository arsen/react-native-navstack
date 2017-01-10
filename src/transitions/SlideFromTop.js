import { LayoutAnimation, Platform } from 'react-native';

export default {
  animation: {
    duration: Platform.OS === 'ios' ? 600 : 700,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7,
    },
  },
  screen1: {
    top: 0 ,
  },
  screen2: {
    top: -1,
  },
};