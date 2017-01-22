import { Easing } from 'react-native';

export default {
  animation: {
    duration: 200,
    easing: Easing.linear,
  },
  progressEnd: (layout) => {
    return 100;
  },
  screen1: (progress, layout) => {
    return {
      screen: {

      },
      overlay: {
        // opacity: progress.interpolate({
        //   inputRange: [0, layout.width],
        //   outputRange: [0, 0.8]
        // })
      }
    };
  },
  screen2: (progress, layout) => {
    return {
      screen: {
        opacity: progress.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1]
        })
      },
      overlay: {
      }
    };
  },
};