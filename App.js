import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View,Button,Alert ,Linking} from 'react-native';
import { Provider } from 'react-redux';
import {compose, createStore,applyMiddleware } from 'redux';
import { websocketReducer } from './store/reducers/websocketReducer';
import createSagaMiddleware  from 'redux-saga'
import { rootSaga } from './saga/rootSaga';

import { composeWithDevTools } from 'redux-devtools-extension';
import Routes from './Routes.js'
import {styles} from './style';
import { SET_SOCKET,CREATE_SOCKET } from './store/actions/actions';


const sagaMiddl = createSagaMiddleware();
   

const store = createStore(websocketReducer,composeWithDevTools(applyMiddleware(sagaMiddl)));

sagaMiddl.run(rootSaga);

// store.dispatch({type:CREATE_SOCKET});

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Routes />
      <StatusBar style="auto" />
    </View>
    </Provider>
  );
}


