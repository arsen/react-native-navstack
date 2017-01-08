import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  UIManager
} from 'react-native';

import NavEvents from './NavEvents';
import NavScreen from './NavScreen';
import NavScreenTransitions from './transitions';

export default class NavProvider extends Component {
  constructor(props) {
    super(props);

    this.navScreens = {};
    this.layout = false;
    this.state = {
      history: []
    };
  }

  push(route, routeProps, transition) {
    if (!this.navScreens[route]) {
      return;
    }
    let currScreen = false;
    let nextScreen = route;
    if (this.state.history.length > 0) {
      currScreen = this.state.history[this.state.history.length - 1].props.route;
    }
    if (!currScreen) {
      this.setState({
        history: [{
          route,
          routeProps,
          transition: false,
        }]
      });
    }
    else {
      let history = [...this.state.history];
      history.push({
        route,
        routeProps,
        transition
      });
      NavScreenTransitions[transition] &&
        LayoutAnimation.configureNext(NavScreenTransitions[transition].animation);
      this.setState({
        history
      });
    }
  }
  pop() {
    if (this.state.history.length <= 1) {
      return false;
    }
    let history = [...this.state.history];
    let currScreen = history.pop();
    let transition = currScreen.transition;
    NavScreenTransitions[transition] &&
      LayoutAnimation.configureNext(NavScreenTransitions[transition].animation);
    this.setState({
      history
    });
  }

  componentDidMount() {
    React.Children.map(this.props.children,
      (child) => {
        if (child && child.props && child.props.route) {
          this.navScreens[child.props.route] = child;
        }
      }
    );
  }

  onLayout(event) {
    this.layout = event.nativeEvent.layout;
  }

  getScreens() {

  }


  render() {

    return (
      <View style={styles.provider} onLayout={this.onLayout.bind(this)}>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  provider: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});