import { initialState } from "../initialState";
import { CONNECT_TO_SOCKET ,
     GET_UNCHECKED,
     CHANGE_TEXT,
     GET_MESSAGE,
     SET_USER,
     GET_ERROR,
     CLEAN_MESSAGES,
     GET_MESSAGE_CHECKED, SET_SOCKET} from "../actions/actions";

export const websocketReducer = (state = initialState,action) =>{
    switch(action.type){
        case SET_SOCKET:
            return Object.assign({},state,{socket:action.payload});
        case CONNECT_TO_SOCKET:
            return Object.assign({},state,{connection:action.payload});   
        case CHANGE_TEXT:
             return Object.assign({},state,{text:action.payload});
        case GET_MESSAGE:
            let tmp = state.message.concat([JSON.parse(action.payload)]);
            return  Object.assign({},state,{message:tmp});
        case GET_UNCHECKED:
            let mass = JSON.parse(action.payload.message);
            console.log(mass);
            return Object.assign({},state,{message:mass});
        case SET_USER:
            return  Object.assign({},state,{user:action.payload.chat_user});
        case GET_ERROR:
            return  Object.assign({},state,{error:action.payload});
        case CLEAN_MESSAGES:
            let newMessage = Array.prototype.concat(state.message);
            let num = newMessage.findIndex((el)=>{
                return el.user == action.payload;
            });
            newMessage.splice(num,1);
            // state.message.forEach(el=>{
            //     if(el.user = action.payload){
            //         let tmp = newMessage.indexOf(el);
            //         newMessage.splice(tmp,1);
            //     }
            // });
            return Object.assign({},state,{message:newMessage});;
    default:return state;
    }
    
}
