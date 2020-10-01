import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Text,
  Button,
  Image,
} from "react-native";

import { styles } from "../style/style";
import { src, srcws } from "../serversource";

import { TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import {
  changeText,
  setUser,
  sendMessage,
} from "../store/actionCreators/actionCreators";
import AsyncStorage from "@react-native-community/async-storage";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileSettings: null,
      link: "",
      userslist: [],
      userchats: null,
      userName: this.props.user,
      listone: "",
      message: "",
      interlocutor: "",
    };
  }

  componentDidMount() {
    const { user, connection, setName } = this.props;
    if (user !== "") {
      this.getChats(user);
      this.getProfile(user);
    }

    let mess = {
      chat_user: user,
      type: "GETUSER",
    };
    if (connection === true) {
      this.props.sendMessage(mess);
    }
    if (user !== "") {
      console.log("name is ", user);
    }
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.user === "") {
      this.getChats(this.props.user);
      this.getProfile(this.props.user);
    }
  }
  componentWillUnmount() {
    let mess = {
      chat_user: this.state.userName,
      type: "LEAVEUSER",
    };
    this.props.sendMessage(mess);
  }

  render() {
    // const { text, message, changetext, connection, user } = this.props;

    return (
      <View style={styles.containerUser}>
        {/* <Text>User id : {JSON.stringify(message)}</Text>
        <Text>
          connection : {connection === true && <Text>connected</Text>}
        </Text> */}

        {this.state.profileSettings !== null ? (
          <Image
            source={{
              uri:
                src +
                "/fetchserver/photos.php?key=" +
                this.state.profileSettings.avatar,
            }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <Text>no</Text>
        )}

        <Text>My name : {this.state.userName}</Text>
        {this.state.profileSettings && (
          <Text>About me : {this.state.profileSettings.about}</Text>
        )}
        <Button
          title="go to my chats"
          onPress={() => {
            this.props.navigation.navigate("ChatsList", {
              mass: this.state.userchats,
              username: this.state.userName,
              interlocutor: this.state.interlocutor,
            });
          }}
        />
        <Button
          title="other users"
          onPress={() => {
            this.props.navigation.navigate("PageOfOtherUsers");
          }}
        />
        <Button
          title="logout"
          onPress={() => {
            AsyncStorage.setItem("name", "");
            this.props.setName("");
            this.props.navigation.navigate("Login");
          }}
        />
      </View>
    );
  }

  getProfile = async (name) => {
    const res = await fetch(src + "/fetchserver/profile.php", {
      method: "POST",
      body: JSON.stringify({
        request: "GETSETTINGS",
        name: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const answer = await res.json();
    console.log(answer);
    if (answer.status == "true") {
      this.setState({ profileSettings: answer });
    }
  };

  getChats = (name) => {
    const query = fetch(src + "/fetchserver/chat.php", {
      method: "POST",
      body: JSON.stringify({
        query: "USERCHATS",
        name: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ userchats: responseJson });
      });
  };
}

const mapDispatchToProps = (dispatch) => ({
  changetext: (text) => dispatch(changeText(text)),
  sendMessage: (mass) => dispatch(sendMessage(mass)),
  setName: (name) => dispatch(setUser(name)),
});

const mapStateToProps = (store) => ({
  connection: store.connection,
  message: store.message,
  text: store.text,
  user: store.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
