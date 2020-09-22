import { takeEvery,all, takeLatest, call, fork } from "redux-saga/effects";
import { srcws } from "../serversource";

import { SET_SOCKET ,CREATE_SOCKET,GET_MESSAGE_CHECKED , SEND} from "../store/actions/actions";
import { checkedMessage, connectSocket, handlSocket , hendlSendedMessage } from "./sagas";

export function* rootSaga() {

    let socket = Object.assign({});

    let channel = yield call(connectSocket,socket,srcws + ':8000/fetchserver/socket,php');

    yield takeEvery(channel,handlSocket,socket)
    yield takeEvery(GET_MESSAGE_CHECKED,checkedMessage) 
    yield takeLatest(SEND,hendlSendedMessage);
    
  }