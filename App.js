import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
// import Root from './src/index';

// AppRegistry.registerComponent('example', () => Root);

import Main from './src/index';

export default class App extends React.Component {
  render() {
    return (
     <Main/>
    );
  }
}
