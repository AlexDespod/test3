

const { srcws } = require("../serversource");
const { CONNECT_TO_SOCKET } = require("../store/actions/actions");
// import { socketMy } from '../App'
const { connectToSocket, newMessage, newError, unchecked, changeText } = require("../store/actionCreators/actionCreators");


export const setSocket = (dispatch) =>{
    let socket = new WebSocket(srcws+":8000/fetchserver/socket.php");
    socket.onopen = () =>{
        dispatch(connectToSocket(true));
    }
    socket.onmessage = (e) => {
        let data = JSON.parse(e.data);
        if(data.type == 'UNCHECKED'){
            dispatch(unchecked(data));
            // dispatch(changeText(data.message));
        }else if(data.type == 'NEWMESSAGE') dispatch(newMessage(data));
        
    }
    socket.onerror = (e) =>{
        dispatch(newError(e.error));
        socket.close();
    }
    socket.onclose = () =>{
        dispatch(connectToSocket(false));
        // setTimeout(()=>{
            
        //   dispatch(connectToSocket())
        // },2000);
    }

    return socket;
}
