import { LayoutAnimation } from 'react-native';

export default {
  animation: {
    duration: 400,
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