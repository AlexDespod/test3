import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Button, Image } from "react-native";
import { connect } from "react-redux";
import { src } from "../serversource";

const PageOfOtherUsers = (props) => {
  const { user, navigation } = props;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getlist = async (name) => {
      const query = await fetch(src + "/fetchserver/chat.php", {
        method: "POST",
        body: JSON.stringify({
          query: "GETLISTOFOTHETUSERS",
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await query.json();
      console.log(res);
      setUsers(res);
    };
    getlist(user);
  }, []);

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
      navigation.navigate("MyChats", {
        chatkey: responseJson.chatkey,
        interlocutor: responseJson.interlocutor,
        userName: user,
      });
    }
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Image
                source={{
                  uri: src + "/fetchserver/photos.php?key=" + item.avatar,
                }}
                style={{ width: 80, height: 80, borderRadius: "100%" }}
              />
              <Text>{item.username}</Text>
              <Button
                title="cretechat"
                onPress={() => {
                  console.log(user, item.username);
                  createChat(user, item.username);
                }}
              />
            </View>
          );
        }}
        keyExtractor={(x) => x.id}
      />
    </View>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
});

export default connect(mapStateToProps, null)(PageOfOtherUsers);
