import {compose, createStore,applyMiddleware } from 'redux';
import { websocketReducer } from './reducers/websocketReducer';
import createSagaMiddleware  from 'redux-saga'
import { rootSaga } from '../saga/rootSaga';
import { setSocket } from './actionCreators/actionCreators';
import { composeWithDevTools } from 'redux-devtools-extension';



    const sagaMiddl = createSagaMiddleware();
   

    const store = createStore(websocketReducer,composeWithDevTools(applyMiddleware(sagaMiddl)));

    sagaMiddl.run(rootSaga,{store});

    store.dispatch(setSocket());
    

