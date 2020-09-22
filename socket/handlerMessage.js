import { takeEvery ,all, fork} from 'redux-saga/effects'
import { SEND ,GET_MESSAGE_CHECKED, CONNECT_TO_SOCKET } from '../store/actions/actions'


//  const hendlerMessage = function* hendlerMessage(param){
//     yield takeEvery(SEND,(action)=>{
//         param.socket.send(JSON.stringify(action.payload));
//     })
// }

//  const checkedMessage = function* hendlerMessage(param){
//     yield takeEvery(GET_MESSAGE_CHECKED,(action)=>{
//         param.socket.send(JSON.stringify(action.payload));
//     })
// }


export function* rootSaga(param) {
    yield takeEvery(GET_MESSAGE_CHECKED,hand);
    
    yield takeEvery(SEND,(action)=>{
        param.socket.send(JSON.stringify(action.payload));
    
  })}