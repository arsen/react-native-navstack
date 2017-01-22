import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';



export default class NavScreen extends Component {
  static propTypes = {
    route: PropTypes.string.isRequired,
    transition: PropTypes.oneOfType([
      PropTypes.shape({
        screen: PropTypes.object,
        overlay: PropTypes.object,
      }),
      PropTypes.bool,
    ]),
    routeProps: PropTypes.object,
    active: PropTypes.bool,
  };

  getStyles() {
    return this.props.transition ? this.props.transition.screen : {};
  }

  getFadeStyles() {
    return this.props.transition ? this.props.transition.overlay : {};
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        if (child && this.props.routeProps) {
          return React.cloneElement(child, {
            navstack: this.props.navstack,
            ...this.props.routeProps
          });
        }
        return child;
      }
    );

    return (
      <Animated.View style={[styles.screen, this.getStyles()]}>
        {childrenWithProps}
        <Animated.View style={[styles.fade, this.getFadeStyles()]} pointerEvents="none" />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fade: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0,
  }
});
