import { call, put, takeEvery, retry, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import {
  connectToSocket,
  newMessage,
  unchecked,
  newError,
  setSocket,
  sendMessage,
} from "../store/actionCreators/actionCreators";

export const getSocket = (url) => {
  const socket = new WebSocket(url.link);
  return socket;
};

export const connectSocket = function* (url, store) {
  return eventChannel((emmiter) => {
    function removeListeners(socket) {
      socket.removeEventListener("message", onMessage);
      socket.removeEventListener("close", onClose);
      socket.removeEventListener("error", onClose);
      socket.removeEventListener("open", onOpen);
    }

    function onOpen(socket) {
      emmiter(connectToSocket(true));
      emmiter(setSocket(socket));
      const con = store.getState();
      if (con.user !== "") {
        let mess = {
          chat_user: con.user,
          type: "GETUSER",
        };
        console.log("my con ", socket);
        store.dispatch(sendMessage(mess));
      }
    }
    onMessage = (e) => {
      let data = JSON.parse(e.data);
      console.log(data);
      switch (data.type) {
        case "UNCHECKED":
          emmiter(unchecked(data));
          break;
        case "NEWMESSAGE":
          console.log(data.type);
          emmiter(newMessage(data));
          break;
      }
    };
    function onError(socket, e) {
      emmiter(newError(e.error));
      socket.close();
    }
    function onClose(socket) {
      removeListeners(socket);
      emmiter(connectToSocket(false));
      //
      removeListeners(socket);

      let interval = setInterval(() => {
        const socket = tryConnect(url);
        if (socket.readyState === 1 || socket.readyState === 0) {
          clearInterval(interval);
        }
      }, 2000);
    }

    function tryConnect(url) {
      let socket = new WebSocket(url.link);
      console.log(socket);
      socket.addEventListener("open", onOpen.bind(this, socket));
      socket.addEventListener("close", onClose.bind(this, socket));
      socket.addEventListener("message", onMessage);
      socket.addEventListener("error", onError.bind(this, socket));
      // removeListeners.bind(null,socket);

      return socket;
    }

    tryConnect(url);

    return () => {};
  });
};

export const handlSocket = function* (action) {
  yield put(action);
};

export const hendlSendedMessage = function* (action) {
  state = yield select();
  state.socket.send(JSON.stringify(action.payload));
};
export const checkedMessage = function* (action) {
  state = yield select();
  state.socket.send(JSON.stringify(action.payload));
};
