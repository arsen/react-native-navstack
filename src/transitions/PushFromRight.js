import { Easing } from 'react-native';

export default {
  animation: {
    duration: 250,
    easing: Easing.out(Easing.quad),
  },
  gesture: 'left-to-right',
  progressEnd: (layout) => {
    return layout.width;
  },
  screen1: (progress, layout) => {
    return {
      screen: {
        transform: [
          {
            translateX: progress.interpolate({
              inputRange: [0, layout.width],
              outputRange: [0, -1 * layout.width / 5]
            })
          }
        ],
      },
      overlay: {
        opacity: progress.interpolate({
          inputRange: [0, layout.width],
          outputRange: [0, 0.8]
        })
      }
    };
  },
  screen2: (progress, layout) => {
    return {
      screen: {
        transform: [
          {
            translateX: progress.interpolate({
              inputRange: [0, layout.width],
              outputRange: [layout.width, 0]
            })
          }
        ],
      },
      overlay: {
      }
    };
  },
};