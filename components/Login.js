import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Button } from "react-native";

import { styles } from "../style/style";
import { TextInput } from "react-native-gesture-handler";
import { src } from "../serversource";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../store/actionCreators/actionCreators";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginUser = () => {
    fetch(src + "/fetchserver/login.php", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setText(responseJson[0]);
        if (responseJson[0] == "true") {
          const StoreSetName = async (name) => {
            try {
              await AsyncStorage.setItem("name", name);
            } catch (error) {
              setText(error);
            }
          };
          dispatch(setUser(responseJson[1].username));
          StoreSetName(responseJson[1].username);
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        } else if (responseJson[0] == "false") setText("uccorrect data");
      });
  };

  return (
    <View style={styles.containerReg}>
      <TextInput
        placeholder="user name"
        style={styles.inputs}
        onChangeText={setName}
      />
      <TextInput
        placeholder="password"
        style={styles.inputs}
        onChangeText={setPassword}
      />
      <Text>{text}</Text>
      <Button title="confirm" style={styles.button} onPress={loginUser} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Registration");
        }}
      >
        <Text>have not accont?</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;
