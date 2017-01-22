import { Easing } from 'react-native';

export default {
  animation: {
    duration: 250,
    easing: Easing.out(Easing.quad),
  },
  gesture: 'top-to-bottom',
  progressEnd: (layout) => {
    return layout.height;
  },
  screen1: (progress, layout) => {
    return {
      screen: {
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, layout.height],
              outputRange: [0, 0]
              // outputRange: [0, -1 * layout.height / 5]
            })
          }
        ],
      },
      overlay: {
        opacity: progress.interpolate({
          inputRange: [0, layout.height],
          outputRange: [0, 0.7]
        })
      }
    };
  },
  screen2: (progress, layout) => {
    return {
      screen: {
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, layout.height],
              outputRange: [layout.height, 0]
            })
          }
        ],
      },
      overlay: {
      }
    };
  },
};