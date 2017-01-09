import { LayoutAnimation } from 'react-native';

export default {
  animation: {
    duration: 400,
    // create: {
    //   type: LayoutAnimation.Types.spring,
    //   property: LayoutAnimation.Properties.opacity,
    //   springDamping: 0.7,
    // },
    // delete: {
    //   type: LayoutAnimation.Types.spring,
    //   property: LayoutAnimation.Properties.opacity,
    //   springDamping: 0.7,
    // },
    update: {
      type: LayoutAnimation.Types.spring,
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