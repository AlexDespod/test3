import AsyncStorage from "@react-native-community/async-storage";
import {
  takeEvery,
  all,
  put,
  takeLatest,
  call,
  fork,
} from "redux-saga/effects";
import { srcws } from "../serversource";

import { GET_MESSAGE_CHECKED, SEND } from "../store/actions/actions";
import {
  checkedMessage,
  connectSocket,
  handlSocket,
  hendlSendedMessage,
} from "./sagas";

export function* rootSaga(store) {
  let channel = yield call(
    connectSocket,
    { link: srcws + ":8000/fetchserver/socket.php" },
    store
  );

  yield takeEvery(channel, handlSocket);
  yield takeEvery(GET_MESSAGE_CHECKED, checkedMessage);
  yield takeLatest(SEND, hendlSendedMessage);
}
