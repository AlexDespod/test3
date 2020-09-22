import React,{Component} from 'react';
import { TouchableOpacity, View,SafeAreaView,FlatList, Modal,Alert,Text, Button} from 'react-native';
import { styles } from './style';
import {src, srcws} from './serversource';

import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { changeText, connectToSocket ,sendMessage} from './store/actionCreators/actionCreators'


class UserPage extends Component{
    constructor(props){
        super(props);
        this.state={
            userslist:[],
            userId:'',
            userchats:'',
            userName:'',
            selected:'',
            listone:'',
            message:'',
            interlocutor:'',
            userCon:'aaaa',
            userCon2:'bbbb',
            text:''
        }
        
    }
    
   
   
    componentDidMount(){
        this.setState({userId:this.props.route.params.mass[1].id,userName:this.props.route.params.mass[1].username});
        this.listOfUsers(this.props.route.params.mass[1].username);
        this.getChats(this.props.route.params.mass[1].username);
        let mess = {
            chat_user:this.props.route.params.mass[1].username,
            type:"GETUSER"
        }
        this.props.sendMessage(mess)
    }

    // componentDidUpdate(prevProps){
    //     if( prevProps.connection == false && this.props.connection == true){
    //         this.props.sendMessage(mess);
    //     }
    // }

    componentWillUnmount(){
        let mess = {
            chat_user:this.props.route.params.mass[1].username,
            type:"LEAVEUSER"
        }
        this.props.sendMessage(mess)
        // this.props.connection.send(JSON.stringify(mess));
        // this.props.connection.close();
    }
    

    
    render(){
        const {text,message,changetext,connection}=this.props;
        return(
            <View style={styles.containerUser}>
                <Text>User id : {JSON.stringify(message)}</Text>
                <Text>connection : {connection === true && <Text>connected</Text>}</Text>
                <Text>User id : {this.state.userId}</Text>
                <Text>User name : {this.state.userName}</Text>
                <TextInput
                    style={{width:100,height:30}}
                    
                />
                <Button
                title="send"
                onPress={()=>{changetext("bad")}}
                />
                <Button
                title='go to my chats'
                onPress={()=>{
                    this.props.navigation.navigate('ChatsList',{
                        mass:this.state.userchats,
                        username:this.state.userName,
                        userid:this.state.userId, 
                        interlocutor:this.state.interlocutor,
                        });
                }}
                />
               
                <FlatList
                    data={this.state.userslist}
                    renderItem={({item})=>{
                    return (
                        <View>
                            <Text>{item.username}</Text>
                            <Button
                            title='cretechat'
                            onPress={()=>{
                                this.createChat(this.state.userName,item.username)}                              
                            }
                            
                            />
                            <Text>{this.state.selected}</Text>
                        </View>
                    )}}
                    keyExtractor={(x)=>x.id}
                />
                
            </View>
        );
    }
    createChat=(name,interlocutor)=>{
        const query = fetch(src+"/fetchserver/chat.php",
        {
        method: 'POST', 
        body:JSON.stringify({
            query:"GETCHAT",
            name:name,
            interlocutor:interlocutor
        }), 
        headers: {
        'Content-Type': 'application/json'
            }
        })
        .then((response)=> response.json())
        .then((responseJson)=>{
            // this.setState({userId:responseJson});
        if(responseJson.answer=="true"){
            
            this.props.navigation.navigate('MyChats',{
                userid:this.state.userId,
                chatkey:responseJson.chatkey,
                interlocutor:responseJson.interlocutor,
                userName:this.state.userName
                });
        }
        })
        }
    
        getChats=(name)=>{
            
            
            // this.setState({userId:UserName});
            const query = fetch(src+"/fetchserver/chat.php",
            {
            method: 'POST', 
            body:JSON.stringify({
                query:"USERCHATS",
                name:name,
                
            }), 
            headers: {
            'Content-Type': 'application/json'
                }
            })
            .then((response)=>
                response.json())
            .then((responseJson)=>{
                this.setState({userchats:responseJson});          
            
            })
            }
    
    
    listOfUsers=(name)=>{
            
            
            const query = fetch(src+"/fetchserver/chat.php",
            {
            method: 'POST', 
            body:JSON.stringify({
                query:"GETLIST",
                name:name
            }), 
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then((response)=>
            response.json())
        .then((responseJson)=>{
    
            this.setState({ userslist:responseJson})
        })
    }
    
}


const mapDispatchToProps = (dispatch)=>({
    changetext:(text)=>dispatch(changeText(text)),
    sendMessage:(mass)=>dispatch(sendMessage(mass)),
});

const mapStateToProps = (store) =>({ 
            connection:store.connection,
            message:store.message,
            text:store.text
})

export default connect(mapStateToProps,mapDispatchToProps)(UserPage)