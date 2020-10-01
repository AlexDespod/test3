import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  Text,
  Button,
} from "react-native";
import { connect } from "react-redux";
import { styles } from "../style/style";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { src } from "../serversource";
import { unchecked } from "../store/actionCreators/actionCreators";
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.route.params.mass,
      userid: this.props.route.params.userid,
      chatkey: "",
      interlocutor: "",
      userName: this.props.route.params.username,
      newMessage: "",
      uncheck: [],
    };
  }

  render() {
    const { message } = this.props;
    return (
      <View style={styles.containerUser}>
        <Text>{this.state.userName}</Text>
        <FlatList
          data={this.state.list}
          renderItem={({ item }) => {
            return (
              <View style={styles.chatlistCon}>
                <Text>{item.interlocutor}</Text>
                {this.checkMessages(message, item.interlocutor)}
                <Button
                  title="go chat"
                  onPress={() => {
                    this.setState({ newMessage: "" });
                    this.createChat(this.state.userName, item.interlocutor);
                  }}
                />
              </View>
            );
          }}
          keyExtractor={(x) => x.id}
        />
      </View>
    );
  }

  checkMessages = (mass, name) => {
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

  createChat = (name, interlocutor) => {
    const query = fetch(src + "/fetchserver/chat.php", {
      method: "POST",
      body: JSON.stringify({
        query: "GETCHAT",
        name: name,
        interlocutor: interlocutor,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.setState({userId:responseJson});
        if (responseJson.answer == "true") {
          this.props.navigation.navigate("MyChats", {
            userid: this.state.userid,
            chatkey: responseJson.chatkey,
            interlocutor: responseJson.interlocutor,
            userName: this.state.userName,
          });
        }
      });
  };
}
const mapDispatchToProps = (dispatch) => ({
  changetext: (text) => dispatch(changeText(text)),
  sendMessage: (mass) => dispatch(sendMessage(mass)),
});

const mapStateToProps = (store) => ({
  connection: store.connection,
  message: store.message,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
