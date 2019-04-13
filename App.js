/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import TradingListComponent from './components/TradingListComponent';
import RootNavigation from './components/RootNavigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <RootNavigation />
    );
  }
}

