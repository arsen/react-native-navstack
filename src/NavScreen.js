import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';



export default class NavScreen extends Component {
  static propTypes = {

    route: PropTypes.string.isRequired,

    routeProps: PropTypes.object,

    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),

    transition: PropTypes.oneOfType([
      PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number,
        opacity: PropTypes.number,
        scale: PropTypes.number,
      }),
      PropTypes.bool,
    ]), 

  };
  getStyles() {
    let styles = {
      width: this.props.size.width,
      height: this.props.size.height,
    };
    if (this.props.transition) {
      if (this.props.transition.left) {
        styles.left = this.props.size.width * this.props.transition.left;
      }
      if (this.props.transition.top) {
        styles.top = this.props.size.height * this.props.transition.top;
      }
      if (this.props.transition.opacity) {
        styles.opacity = this.props.transition.opacity;
      }
      if (this.props.transition.scale) {
        styles.transform = [{
          scale: this.props.transition.scale
        }];
      }
    }

    return styles;
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => {
        if (child && this.props.routeProps) {
          return React.cloneElement(child, this.props.routeProps);
        }
        return child;
      }
    );

    return (
      <View style={[styles.screen, this.getStyles()]}>
        {childrenWithProps}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    // borderWidth: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  }
});
