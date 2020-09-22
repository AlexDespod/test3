import { call , put, takeEvery,retry,select } from "redux-saga/effects"
import { eventChannel } from 'redux-saga'
// import { store } from "../store/store"
import { srcws } from "../serversource"
import { connectToSocket,newMessage,unchecked ,newError, setSocket} from "../store/actionCreators/actionCreators"
import { SEND ,GET_MESSAGE_CHECKED, CREATE_SOCKET } from "../store/actions/actions"



export const getSocket = (url) =>{
    const socket = new WebSocket(url);
    return socket;
}

export const connectSocket = function *(socket,url){
    return eventChannel(emmiter=>{

        function removeListeners(socket){
            socket.removeEventListener('message', onMessage);
            socket.removeEventListener('close', onClose);
            socket.removeEventListener('error', onClose);
            socket.removeEventListener("open",onOpen);
          }


        function onOpen (socket){
            emmiter(connectToSocket(true))
            emmiter(setSocket(socket))
           
         }
         onMessage = (e) => {
             let data = JSON.parse(e.data);
             console.log(data);
             switch(data.type){
                case 'UNCHECKED':
                    emmiter(unchecked(data))
                case 'NEWMESSAGE':
                    emmiter(newMessage(data.message))
                
            }
         }
         function onError(socket,e){
             emmiter(newError(e.error));
             socket.close();
         }
         function onClose(socket){
            removeListeners(socket);
             emmiter(connectToSocket(false));
            let interval = setInterval(()=>{
               const readystate = tryConnect(url);
               if(readystate === 1){
                   clearInterval(interval);
               }
             },2000);
         }

         
        function tryConnect(url){
                    let socket =  new WebSocket(url);
                    console.log(socket)
                    socket.addEventListener("open",onOpen.bind(this,socket));
                    socket.addEventListener("close",onClose.bind(this,socket));
                    socket.addEventListener("message",onMessage);
                    socket.addEventListener("error",onError.bind(this,socket));
                    // removeListeners.bind(null,socket);
                    if(socket.readyState === 1){
                        return 1;
                    }     
            }
            
        
    
        tryConnect(url);


        return ()=>{
           
        };
    })
    
    

}

 
export const handlSocket = function *(socket,action){
    yield put(action)
    // switch(action.type){
    //     case 'UNCHECKED':
    //        yield put(action)
    //     case 'NEWMESSAGE':
    //         yield put(action)
    //     case 'CONNECT_TO_SOCKET':
    //         yield put(action);
    // }
}


export const hendlSendedMessage = function *(action){ 
      state = yield select()
      state.socket.send(JSON.stringify(action.payload))
    }
export const checkedMessage = function *(action){
        state = yield select()
        state.socket.send(JSON.stringify(action.payload))
    }