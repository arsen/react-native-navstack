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

    this.state = {
      layout: false,
      history: [],
      stage: '',
    };

    NavEvents.on('push', (route, routeProps, transition) => {
      this.push(route, routeProps, transition || 'SlideFromRight');
    });

    NavEvents.on('pop', () => {
      this.pop();
    });

  }

  push(route, _routeProps, _transition) {
    if (!this.navScreens[route]) {
      return;
    }
    let routeProps = _routeProps || this.navScreens[route].props.routeProps;
    let transition = _transition || this.navScreens[route].props.transition;
    let newScreen = {
      route,
      routeProps,
      transition: this.state.history.length > 0 ? transition : false,
    };
    if (!newScreen.transition) {
      this.setState({
        history: [newScreen],
        stage: 'initial',
      });
    }
    else {
      let history = [...this.state.history, newScreen];
      this.setState({
        history,
        stage: 'pushStart',
      });
      requestAnimationFrame(() => {
        NavScreenTransitions[transition] &&
          LayoutAnimation.configureNext(NavScreenTransitions[transition].animation);
        this.setState({
          stage: 'push',
        });
      });
    }
  }


  pop() {
    if (this.state.history.length <= 1) {
      return false;
    }
    let currScreen = this.state.history[this.state.history.length - 1];
    let transition = currScreen.transition;
    this.setState({
      stage: 'popStart'
    });
    requestAnimationFrame(() => {
      NavScreenTransitions[transition] &&
        LayoutAnimation.configureNext(NavScreenTransitions[transition].animation);
      this.setState({
        stage: 'pop'
      });
    });
    setTimeout(() => {
      let history = [...this.state.history];
      history.pop();
      this.setState({
        history: history,
        stage: 'popDone'
      });
    }, NavScreenTransitions[transition].animation.duration);
  }

  componentDidMount() {
    let initialRoute;
    React.Children.map(this.props.children,
      (child) => {
        if (child && child.props && child.props.route) {
          if (child.props.initial) {
            initialRoute = child.props.route;
          }
          this.navScreens[child.props.route] = child;
        }
      }
    );
    if (initialRoute) {
      this.push(initialRoute);
    }
  }

  onLayout(event) {
    this.setState({
      layout: event.nativeEvent.layout
    });
  }

  getScreens() {
    if (this.state.history.length === 0 || !this.state.layout) {
      return null;
    }

    let screens = [];
    let index1 = Math.max(this.state.history.length - 2, 0);
    let index2 = Math.max(this.state.history.length - 1, 1);
    let screen1 = this.state.history[index1];
    let screen2 = this.state.history[index2] ? this.state.history[index2] : false;

    let transition = screen2 ? NavScreenTransitions[screen2.transition] : false;
    let screenSize = {
      width: this.state.layout.width,
      height: this.state.layout.height,
    };

    let screen1Transition = transition &&
      (this.state.stage === 'push' || this.state.stage === 'popStart') ? transition.screen1 : false;
    screens.push(React.cloneElement(this.navScreens[screen1.route], {
      key: screen1.route,
      routeProps: screen1.routeProps,
      transition: screen1Transition,
      size: screenSize,
    }));

    if (screen2) {
      let screen2Transition = transition &&
        (this.state.stage === 'pushStart' || this.state.stage === 'pop') ? transition.screen2 : false;
      screens.push(React.cloneElement(this.navScreens[screen2.route], {
        key: screen2.route,
        routeProps: screen2.routeProps,
        transition: screen2Transition,
        size: screenSize,
      }));
    }

    return screens;
  }


  render() {
    return (
      <View style={styles.provider} onLayout={this.onLayout.bind(this)}>
        {this.getScreens()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  provider: {
    // borderWidth: 2,
    // borderColor: 'blue',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});