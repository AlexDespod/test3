import { CONNECT_TO_SOCKET,GET_MESSAGE_CHECKED,SET_SOCKET, CHANGE_TEXT, GET_MESSAGE, SET_USER, GET_ERROR, SEND, CLEAN_MESSAGES, GET_UNCHECKED } from "../actions/actions";
export const connectToSocket = (socket) =>({
    type:CONNECT_TO_SOCKET,
    payload:socket
})

export const setSocket = (socket) =>({
    type:SET_SOCKET,
    payload:socket
})

export const changeText = (text) =>({
    type:CHANGE_TEXT,
    payload:text
})

export const newMessage = (mass) =>({
    type:GET_MESSAGE,
    payload:mass
})

export const sendMessage = (mass) =>({
    type:SEND,
    payload:mass
})

export const unchecked = (mass) =>({
    type:GET_UNCHECKED,
    payload:mass
})

export const setUser = (mass) =>({
    type:SET_USER,
    payload:mass
})

export const newError = (err) =>({
    type:GET_ERROR,
    payload:err
})

export const cleanMessages = (name) =>({
    type:CLEAN_MESSAGES,
    payload:name
})

export const checkMessages = (id) =>({
    type:GET_MESSAGE_CHECKED,
    payload:id
})