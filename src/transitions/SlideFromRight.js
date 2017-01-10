import { LayoutAnimation, Platform } from 'react-native';

export default {
  animation: {
    duration: Platform.OS === 'ios' ? 400 : 700,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7,
    },
  },
  screen1: {
    left: 0 ,
  },
  screen2: {
    left: 1,
  },
};