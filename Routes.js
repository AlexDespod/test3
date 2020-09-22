import React,{ Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Temp from './Temp';
import Registration from './Registration';
import Login from './Login';
import UserPage from './UserPage';
import MyChats from './MyChats';
import ChatList from './ChatList';


class Routes extends Component{
   constructor(props){
      super(props);
      this.state={
         
      }
      Stack=createStackNavigator();
   }
  
  


   render(){
      return(
         <NavigationContainer>
            <Stack.Navigator initialRouteName="Registration">
               <Stack.Screen name="Registration" component={Registration} />
               <Stack.Screen name="Login" component={Login} />
               <Stack.Screen name="UserPage" component={UserPage} />
               <Stack.Screen name="MyChats" component={MyChats} />
               <Stack.Screen name="ChatsList" component={ChatList} />
               <Stack.Screen name="Home" component={Home} />
               <Stack.Screen name="Temp" component={Temp} />
            </Stack.Navigator>
         </NavigationContainer>
         
  
      );
   }
    
}
 export default Routes;