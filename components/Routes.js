import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import Home from "./Home";
// import Temp from "./Temp";
import Registration from "./Registration";
import Login from "./Login";
import UserPage from "./UserPage";
import MyChats from "./MyChats";
import ChatList from "./ChatList";
import setProfile from "./setProfile";
import PageOfOtherUsers from "./pageOfOtherUsers";
import { setUser } from "../store/actionCreators/actionCreators";
import AsyncStorage from "@react-native-community/async-storage";
import { Text } from "react-native";

const Routes = (props) => {
  const Stack = createStackNavigator();
  const [username, setUserName] = useState(null);
  const dispatch = useDispatch();
  const StoreGetName = async () => {
    const res = await AsyncStorage.getItem("name");
    console.log("name is ", res);
    if (res !== null) {
      dispatch(setUser(res));
      setUserName(res);
    } else {
      setUserName("");
    }
  };
  useEffect(() => {
    StoreGetName();
  }, []);
  return (
    <>
      {username !== null ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={username !== "" ? "UserPage" : "Login"}
          >
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen
              name="PageOfOtherUsers"
              component={PageOfOtherUsers}
            />
            <Stack.Screen name="setProfile" component={setProfile} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="UserPage" component={UserPage} />
            <Stack.Screen name="MyChats" component={MyChats} />
            <Stack.Screen name="ChatsList" component={ChatList} />
            {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Temp" component={Temp} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Text>Loading</Text>
      )}
    </>
  );
};

const mapStateToProps = (store) => ({
  user: store.user,
});

export default connect(mapStateToProps, null)(Routes);
