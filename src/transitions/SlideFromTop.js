import { LayoutAnimation } from 'react-native';

export default {
  animation: {
    duration: 550,
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