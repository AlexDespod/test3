import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { View, Text, Image, FlatList, Button, TextInput } from "react-native";
import { src } from "../serversource";
import * as ImagePicker from "expo-image-picker";
function setProfile(props) {
  console.log(props.route.params.name);
  const { name } = props.route.params;
  const [image, setImage] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [helper, setHelper] = useState(0);
  let textAbout;

  const selectImage = async () => {
    if (Platform.OS === "ios") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
        if (!result.cancelled) {
          setImage(result);
        }
      }
    }
  };

  const sendProfile = async (data) => {
    if (data.avatar === null) {
      setHelper("load a avatar");
      return;
    }
    const query = await fetch(src + "/fetchserver/profile.php", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const answer = await query.json();
    console.log(answer);
    setAnswer(answer);
  };

  const AnswerFunc = () => {
    if (answer.status === "true") {
      return (
        <>
          <Text>Success</Text>
          <Button
            title="go login"
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          />
        </>
      );
    } else return <Text>{answer.error}</Text>;
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, alignContent: "center" }}
      >
        <Text>{name}</Text>
        <View
          style={{
            width: 200,
            height: 200,
            margin: 20,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {image === 0 ? (
            <Text>image did not selected</Text>
          ) : (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <Button title="set img" onPress={selectImage} />
        <TextInput
          onChangeText={(data) => {
            textAbout = data;
          }}
        />
        <Button
          title="send prof"
          onPress={() => {
            console.log(props.name);
            sendProfile({
              request: "SETPROFILE",
              avatar: image,
              about: textAbout,
              name: name,
            });
          }}
        />
        {helper !== 0 && <Text>{helper}</Text>}
        {answer !== 0 && <AnswerFunc />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default setProfile;
