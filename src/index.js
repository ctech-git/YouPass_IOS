import React, { Component, useEffect } from 'react';

import { YellowBox } from 'react-native';
import { Provider, connect } from 'react-redux';
import store from './store/index';
import Routes from './routes';

YellowBox.ignoreWarnings([
  'Calling `getNode()`',
  'Remote debugger is in a '
]);

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}


export default App;