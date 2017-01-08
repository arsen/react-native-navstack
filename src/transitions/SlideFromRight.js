import { LayoutAnimation } from 'react-native';

export default {
  animation: {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.7,
    },
    delete: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.7,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7,
    },
  },
  currentScreen: {
    left: -0.5,
    opacity: 0.5,
  },
  nextScreen: {
    left: 1,
  },
};