import React, {
  Component,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  View,
  FlatList,
  Text,
} from "react-native";
import { styles } from "../style/style";
import { TextInput } from "react-native-gesture-handler";
import { src } from "../serversource";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  cleanMessages,
  checkMessages,
} from "../store/actionCreators/actionCreators";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MyChats = (props) => {
  const user = useSelector((store) => store.user);
  const chatkey = useSelector((store) => store.currentChatkey);
  const interlocutor = useSelector((store) => store.currentInterlocutor);
  const message = useSelector((store) => store.message);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [massOfMessages, setmassOfMessages] = useState([]);
  const keyboardVerticalOffset = Platform.OS === "ios" ? 65 : 0;
  const input = useRef();
  console.log(input);
  let i = 0;
  let text = "";

  const updateToCheck = {
    type: "UPDATETOCHECK",
    chat_user: user,
    chat_id: chatkey,
  };
  const getMessages = async () => {
    const query = await fetch(src + "/fetchserver/chat.php", {
      method: "POST",
      body: JSON.stringify({
        query: "GETMESSAGES",
        chatid: chatkey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await query.json();
    console.log(responseJson);
    setmassOfMessages(responseJson.reverse());
  };
  const choseAlign = (first) => {
    if (first == interlocutor) {
      return styles.alignLeft;
    } else {
      return styles.alignRight;
    }
  };
  const checkNewMessage = () => {
    if (text !== "") {
      let mess = {
        chat_message: text,
        chat_user: user,
        interlocutor: interlocutor,
        chat_id: chatkey,
        type: "NEWMESSAGETOUSER",
      };
      dispatch(sendMessage(mess));
      input.current.clear();
    }
  };
  useEffect(() => {
    getMessages();
    dispatch(checkMessages(updateToCheck));
    console.log(massOfMessages.length);
  }, []);

  const newPropsMessSet = (element) => {
    let mass = [...massOfMessages];
    mass.unshift({ message: element.message, sender: element.sender });
    setmassOfMessages(mass);
    dispatch(cleanMessages(element.sender));
    dispatch(checkMessages(updateToCheck));
  };
  useEffect(() => {
    if (message.length) {
      message.forEach((element) => {
        if (element.sender === interlocutor) {
          newPropsMessSet(element);
        } else if (element.sender === user) {
          newPropsMessSet(element);
        }
      });
    }
  }, [message]);

  return (
    <View style={styles.containerUser}>
      <View style={styles.chatIntercoluter}>
        <Text>{interlocutor}</Text>
      </View>

      <FlatList
        style={styles.chatScrollView}
        data={massOfMessages}
        renderItem={({ item }) => (
          <View style={{ width: 360, transform: [{ scale: -1 }] }}>
            <Text style={choseAlign(item.sender)}>
              {item.sender + " : " + item.message}
            </Text>
          </View>
        )}
        keyExtractor={() => {
          i++;
          let num = i.toString();
          return num;
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View style={styles.chatvievinput}>
          <TextInput
            placeholder="write message"
            style={styles.chatInput}
            ref={input}
            onChangeText={(data) => {
              text = data;
            }}
          />
          <TouchableOpacity style={styles.sendmess} onPress={checkNewMessage}>
            <Text>send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MyChats;
