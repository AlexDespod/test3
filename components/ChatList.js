import React, { Component, useEffect, useState } from "react";
import { TouchableOpacity, View, FlatList, Text, Button } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { styles } from "../style/style";
import { src } from "../serversource";
import {
  setChatkey,
  setInterlocutor,
} from "../store/actionCreators/actionCreators";
import { useNavigation } from "@react-navigation/native";

const ChatList = (props) => {
  const user = useSelector((store) => store.user);

  const message = useSelector((store) => store.message);

  const navigation = useNavigation();

  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const createChat = async (name, interlocutor) => {
    const query = await fetch(src + "/fetchserver/chat.php", {
      method: "POST",
      body: JSON.stringify({
        query: "GETCHAT",
        name: name,
        interlocutor: interlocutor,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await query.json();
    if (responseJson.answer == "true") {
      dispatch(setInterlocutor(responseJson.interlocutor));
      dispatch(setChatkey(responseJson.chatkey));
      navigation.navigate("MyChats");
    }
  };

  const getChats = async (name) => {
    const query = await fetch(src + "/fetchserver/chat.php", {
      method: "POST",
      body: JSON.stringify({
        query: "USERCHATS",
        name: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseJson = await query.json();
    if (responseJson.length) setList(responseJson);
  };

  useEffect(() => {
    getChats(user);
  }, []);

  useEffect(() => {
    if (list.length !== 0) getChats(user);
  }, [message]);

  return (
    <View style={styles.containerUser}>
      {list.length ? (
        <FlatList
          data={list}
          renderItem={({ item }) => {
            return (
              <View style={styles.chatlistCon}>
                <Text>{item.interlocutor}</Text>
                {checkMessages(message, item.interlocutor)}
                <Button
                  title="go chat"
                  onPress={() => {
                    createChat(user, item.interlocutor);
                  }}
                />
              </View>
            );
          }}
          keyExtractor={(x) => x.id}
        />
      ) : (
        <Text>you have not any chats</Text>
      )}
    </View>
  );
};

const checkMessages = (mass, name) => {
  let count = 0;
  let uncheckMass = [];
  uncheckMass[name] = { count: count };
  mass.forEach((el) => {
    if (el.sender == name) {
      uncheckMass[name].count++;
    }
  });
  if (uncheckMass[name].count > 0) {
    return <Text>You have {uncheckMass[name].count} messages</Text>;
  } else return <Text>You have any messages</Text>;
};

export default ChatList;
