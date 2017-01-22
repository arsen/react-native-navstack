import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';


import NavTransitions from './transitions';

export default class NavProvider extends Component {
  static propTypes = {
    initialRoute: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]).isRequired,
    defaultTransition: PropTypes.string,
  }

  static defaultProps = {
    defaultTransition: 'PushFromRight',
  }

  constructor(props) {
    super(props);
    this.navScreens = {};

    this.state = {
      layout: false,
      progress: new Animated.Value(0),
      history: [],
      action: '',
    };

    this.navstack = {
      push: this.push.bind(this),
      pop: this.pop.bind(this),
    }

    this.gestureProgress = null;
    this.currentTransition = false;
  }
  push(data) {

    let options = Object.assign({
      transition: this.props.defaultTransition,
      routeProps: {}
    }, data);

    let history = [...this.state.history];
    this.currentTransition = NavTransitions[options.transition] || false;
    let progressEnd = this.currentTransition ? this.currentTransition.progressEnd(this.state.layout) : 0;

    if (this.currentTransition) {
      if (history.length > 0) {
        this.state.progress.setValue(0);
      }
      else {
        this.state.progress.setValue(progressEnd)
      }
    }

    history.push(options);
    this.setState({
      history,
      action: 'push'
    });

    this.currentTransition && Animated.timing(this.state.progress, {
      toValue: progressEnd,
      duration: this.currentTransition.animation.duration,
      easing: this.currentTransition.animation.easing
    }).start(() => {
      this.setState({
        action: ''
      });
    });
  }

  pop(gestureData) {
    if (this.state.history.length <= 1) {
      return false;
    }

    let history = [...this.state.history];
    let options = history[history.length - 1];
    let transition = NavTransitions[options.transition] || false;
    let progressEnd = transition ? transition.progressEnd(this.state.layout) : 0;

    transition && !gestureData && this.state.progress.setValue(progressEnd);

    this.setState({ action: 'pop' });

    let duration = transition ? transition.animation.duration : 0;
    if (gestureData) {
      duration = Math.min((progressEnd - this.state.progress.__getValue()) / gestureData.speed, duration);
    }

    if (transition) {
      Animated.timing(this.state.progress, {
        toValue: 0,
        duration: duration,
        easing: transition.animation.easing
      }).start(() => {
        this.gestureProgress = null;
        history.pop();

        options = history[history.length - 1];
        transition = NavTransitions[options.transition] || false;
        progressEnd = transition ? transition.progressEnd(this.state.layout) : 0;
        transition && this.state.progress.setValue(progressEnd);
        this.currentTransition = transition;

        this.setState({
          action: '',
          history,
        });
      });
    }
    else {
      history.pop();
      this.state.progress.setValue(0);
      this.setState({
        action: '',
        history,
      });
    }
  }

  resetGesture() {
    let progressEnd = this.currentTransition.progressEnd(this.state.layout);
    Animated.timing(this.state.progress, {
      toValue: progressEnd,
      duration: this.currentTransition.animation.duration,
      easing: this.currentTransition.animation.easing
    }).start();
  }

  onLayout(event) {
    let layout = {
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    }
    this.setState({ layout });
  }

  getInitialRoute() {
    if (typeof this.props.initialRoute === 'string') {
      return this.props.initialRoute;
    }
    else {
      return this.props.initialRoute();
    }
  }

  componentWillMount() {
    React.Children.map(this.props.children, (child) => {
      this.navScreens[child.props.route] = child;
    });

    this.push({
      route: this.getInitialRoute(),
      routeProps: {},
      transition: false
    })

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (this.currentTransition.gesture === 'left-to-right' && gestureState.moveX <= 50 && gestureState.dy <= 20) {
          return true;
        }
        if (this.currentTransition.gesture === 'top-to-bottom' && gestureState.moveY <= 50 && gestureState.dx <= 20) {
          return true;
        }
        return false;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderGrant: (evt, gestureState) => {
        this.gestureProgress = this.state.progress.__getValue();
        this.gestureProgressEnd = this.currentTransition.progressEnd(this.state.layout);
      },
      onPanResponderMove: (evt, gestureState) => {
        if (this.currentTransition.gesture === 'left-to-right' &&
          gestureState.dx > 0 &&
          gestureState.dx <= this.gestureProgressEnd) {
          this.state.progress.setValue(this.gestureProgress - gestureState.dx);
        }
        if (this.currentTransition.gesture === 'top-to-bottom' &&
          gestureState.dy > 0 &&
          gestureState.dy <= this.gestureProgressEnd) {
          this.state.progress.setValue(this.gestureProgress - gestureState.dy);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('speed', gestureState.vx);
        if (this.currentTransition.gesture === 'left-to-right' &&
          (gestureState.dx >= 100 || gestureState.vx >= 0.3)) {
          let gestureData = {
            speed: gestureState.vx
          }
          this.pop(gestureData);
        }
        else if (this.currentTransition.gesture === 'top-to-bottom' &&
          (gestureState.dy >= 100 || gestureState.vy >= 0.3)) {
          let gestureData = {
            speed: gestureState.vy
          }
          this.pop(gestureData);
        }
        else {
          this.resetGesture();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // console.log('onPanResponderTerminate');
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
    });
  }

  getScreenTransition(transition) {
    return transition ? {
      screen: transition.screen(this.state.progress, this.state.layout),
      overlay: transition.overlay(this.state.progress, this.state.layout)
    } : false;
  }

  getScreens() {
    let screens = [];
    let { history, action } = this.state;
    if (history.length === 0 || !this.state.layout) {
      return null;
    }

    let screen1Route, screen2Route, transition;
    if (history.length === 1) {
      screen1Route = history[history.length - 1];
      transition = NavTransitions[screen1Route.transition] || false;
    }
    else if (history.length >= 2) {
      screen1Route = history[history.length - 2];
      screen2Route = history[history.length - 1];
      transition = NavTransitions[screen2Route.transition] || false;
    }


    for (let i = 0; i < history.length; i++) {
      let options = history[i];
      let props = {
        key: 'route-' + options.route,
        routeProps: options.routeProps,
        navstack: this.navstack,
      };
      if (screen1Route && screen1Route.route == history[i].route) {
        props.active = true;
        if (transition) {
          props.transition = transition.screen1(this.state.progress, this.state.layout);
        }
      }
      if (screen2Route && screen2Route.route == history[i].route) {
        props.active = true;
        if (transition) {
          props.transition = transition.screen2(this.state.progress, this.state.layout);
        }
      }

      let screen = React.cloneElement(this.navScreens[options.route], props);
      screens.push(screen);
    }
    return screens;
  }



  render() {
    return (
      <View style={styles.provider} onLayout={this.onLayout.bind(this)} {...this._panResponder.panHandlers}>
        {this.getScreens()}
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
  },
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});