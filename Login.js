import React,{Component} from 'react';
import { TouchableOpacity, View,SafeAreaView,FlatList, Modal,Alert,Text, Button} from 'react-native';
import {styles} from './style';
import { TextInput } from 'react-native-gesture-handler';
import {src} from './serversource';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            text:'',
            isLogined:true
        }
    }
    
    loginUser = ()=>{
        const name=this.state.name;
        const password=this.state.password;
       const query = fetch(src+"/fetchserver/login.php",
       {
        method: 'POST', 
         body:JSON.stringify({
            name:name,
            password:password
        }), 
        headers: {
          'Content-Type': 'application/json'
        }
     })
     .then((response)=>
        response.json())
     .then((responseJson)=>{
         this.setState({text:responseJson[0]})
         if(responseJson[0]=="true"){    
            this.props.navigation.navigate('UserPage',{mass:responseJson});
         }else if(responseJson[0]=="false")this.setState({text:"uccorrect data"})
     })
    }
    render(){
        return(
            <View style={styles.containerReg}>
                <TextInput
                    placeholder="user name"
                    style={styles.inputs}
                    onChangeText={(data)=>{this.setState({name:data})}}
                />
                 <TextInput
                    placeholder="password"
                    style={styles.inputs}
                    onChangeText={(data)=>{this.setState({password:data})}}
                />
                <Text>{this.state.text}</Text>
                <Button
                    title='confirm'
                    style={styles.button}
                    onPress={()=>{this.loginUser()}}
                />
            </View>
        );
    }
}




 