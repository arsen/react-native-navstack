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

export default class NavProvider extends Component {

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