import React, { Component, createRef } from "react";
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
import { connect } from "react-redux";
import {
  changeText,
  connectToSocket,
  sendMessage,
  cleanMessages,
  checkMessages,
} from "../store/actionCreators/actionCreators";

class MyChats extends Component {
  constructor(props) {
    super(props);
    this._flatList = createRef();
    this.state = {
      massOfMessages: [],

      name: this.props.route.params.userName,
      text1: "",
      message: "",
      chatkey: this.props.route.params.chatkey,
      interlocutor: this.props.route.params.interlocutor,
      dimensions: undefined,
    };
  }
  i = 0;
  text = "";

  updateToCheck = {
    type: "UPDATETOCHECK",
    chat_user: this.props.route.params.userName,
    chat_id: this.props.route.params.chatkey,
  };
  componentDidUpdate() {
    const { interlocutor, name } = this.state;
    const { message, cleanMessages, checkMessages } = this.props;
    if (message.length != 0) {
      message.forEach((element) => {
        if (element.sender === interlocutor) {
          let mass = this.state.massOfMessages;
          mass.unshift({ message: element.message, sender: element.sender });
          this.setState({ massOfMessages: mass });

          cleanMessages(element.sender);
          checkMessages(this.updateToCheck);
        } else if (element.sender === name) {
          let mass = this.state.massOfMessages;
          mass.unshift({ message: element.message, sender: element.sender });
          this.setState({ massOfMessages: mass });

          cleanMessages(element.sender);
          checkMessages(this.updateToCheck);
        }
      });
    }
  }

  componentDidMount() {
    this.getMessages();
    this.props.checkMessages(this.updateToCheck);
    console.log(this.state.massOfMessages.length);
  }

  render() {
    const keyboardVerticalOffset = Platform.OS === "ios" ? 65 : 0;
    const { text, message } = this.props;
    return (
      <View style={styles.containerUser}>
        <View style={styles.chatIntercoluter}>
          <Text>{this.state.interlocutor}</Text>
          <Text>{JSON.stringify(message)}</Text>
        </View>

        <FlatList
          ref={this._flatList}
          style={styles.chatScrollView}
          data={this.state.massOfMessages}
          onLayout={this.onLayout}
          renderItem={({ item }) => {
            return (
              <View style={{ width: 360, transform: [{ scale: -1 }] }}>
                <Text style={this.choseAlign(item.sender)}>
                  {item.sender + " : " + item.message}
                </Text>
              </View>
            );
          }}
          keyExtractor={() => {
            this.i++;
            let num = this.i.toString();
            return num;
          }}
        />

        {/* <Text>{this.state.chatkey}</Text> */}
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          //   style={styles.container}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={styles.chatvievinput}>
            <TextInput
              placeholder="write message"
              style={styles.chatInput}
              ref="input"
              onChangeText={(data) => {
                this.text = data;
              }}
            />
            <TouchableOpacity
              style={styles.sendmess}
              onPress={() => {
                let mess = {
                  chat_message: this.text,
                  chat_user: this.state.name,
                  interlocutor: this.state.interlocutor,
                  chat_id: this.state.chatkey,
                  type: "NEWMESSAGETOUSER",
                };
                this.props.sendMessage(mess);
                this.refs.input.clear();
              }}
            >
              <Text>send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  choseAlign = (first) => {
    if (first == this.state.interlocutor) {
      return styles.alignLeft;
    } else {
      return styles.alignRight;
    }
  };

  getMessages = () => {
    const query = fetch(src + "/fetchserver/chat.php", {
      method: "POST",
      body: JSON.stringify({
        query: "GETMESSAGES",
        chatid: this.state.chatkey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ massOfMessages: responseJson.reverse() });
      });
  };
}

const mapDispatchToProps = (dispatch) => ({
  changetext: (text) => dispatch(changeText(text)),
  sendMessage: (mass) => dispatch(sendMessage(mass)),
  cleanMessages: (name) => dispatch(cleanMessages(name)),
  checkMessages: (id) => dispatch(checkMessages(id)),
});

const mapStateToProps = (store) => ({
  connection: store.connection,
  message: store.message,
  text: store.text,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyChats);
