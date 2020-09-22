import React,{Component} from 'react';
import { TouchableOpacity, View,SafeAreaView,FlatList, Modal,Alert,Text, Button} from 'react-native';
import {styles} from './style';
import { TextInput } from 'react-native-gesture-handler';
import {src} from './serversource';

export default class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
            userName:'',
            email:'',
            password:'',
            isRegistred:''
        }
    }
    registrateUser = ()=>{
        const name = this.state.userName;
        const email = this.state.email;
        const password = this.state.password;
       const query = fetch(src+"/fetchserver/registration.php",
       {
        method: 'POST', 
         body:JSON.stringify({
            name:name,
            email:email,
            password:password
        }), 
        headers: {
          'Content-Type': 'application/json'
        }
     })
     .then((response)=>
        response.json())
     .then((responseJson)=>{
        if(responseJson[0]=="false"){
            this.setState({isRegistred:'that user already exist'})
         }
         else if(responseJson[0]=="true"){
            this.props.navigation.navigate('Login',{});
        }
     })
    }

    render(){
        return(
            <View style={styles.containerReg}>
                <TextInput
                    placeholder="user name"
                    style={styles.inputs}
                    onChangeText={(data)=>{this.setState({userName:data})}}
                />
                 <TextInput
                    placeholder="email"
                    style={styles.inputs}
                    onChangeText={(data)=>{this.setState({email:data})}}
                />
                 <TextInput
                    placeholder="password"
                    style={styles.inputs}
                    onChangeText={(data)=>{this.setState({password:data})}}
                />
                <Text>{this.state.isRegistred}</Text>
                <Button
                    onPress={()=>{if(this.state.userName!='' && this.state.email!='' && this.state.password!=''){
                        this.registrateUser()}
                        else{
                            this.setState({isRegistred:'you did not fill in all fields'})
                        }
                    }}
                    title='confirm'
                    style={styles.button}
                />
                <TouchableOpacity
                    style={{marginTop:20}}
                    onPress={()=>{this.props.navigation.navigate('Login',{})}}
                    >
                    <Text>have you been registred?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
