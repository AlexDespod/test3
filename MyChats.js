import React,{Component} from 'react';
import { TouchableOpacity,Dimensions, View,SafeAreaView,FlatList, Modal,Alert,Text, Button} from 'react-native';
import { styles } from './style';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {src} from './serversource';
import { connect } from 'react-redux';
import { changeText, connectToSocket ,sendMessage,cleanMessages,checkMessages} from './store/actionCreators/actionCreators'
// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;
 class MyChats extends Component{
    constructor(props){
        super(props);
        this.state={
            massOfMessages:[],
            
            myid:this.props.route.params.userid,
            name:this.props.route.params.userName,
            text:'',
            text1:'',
            message:'',
            chatkey:this.props.route.params.chatkey,
            interlocutor:this.props.route.params.interlocutor,
            
        }
    }
    i=0;
    updateToCheck = {
        type:'UPDATETOCHECK',
        chat_user:this.props.route.params.userName,
        chat_id:this.props.route.params.chatkey
    }
    componentDidUpdate(){
        if(this.props.message.length != 0){
            this.props.message.forEach(element => {
                if(element.sender === this.state.interlocutor){
                    let mass = this.state.massOfMessages;
                    let temp = element;
                    mass.push({message:temp.message,sender:temp.sender});
                   
                    this.setState({massOfMessages:mass});
                    this.refs.flatList.scrollToEnd();
                    this.props.cleanMessages(temp.sender);
                    this.props.checkMessages(this.updateToCheck);
                }
                else if (element.sender === this.state.name) {
                    let mass = this.state.massOfMessages;
                    let temp = element;
                    mass.push({message:temp.message,sender:temp.sender});
                   
                    this.setState({massOfMessages:mass});
                    this.refs.flatList.scrollToEnd();
                    this.props.cleanMessages(temp.sender);
                    this.props.checkMessages(this.updateToCheck);
                }
        
            });
        }   
    }


    componentDidMount(){
        
        this.getMessages();
       this.props.checkMessages(this.updateToCheck);
    }

    render(){
        const {text,message} = this.props;
        return(
            <View style={styles.containerUser}>
                <View style={styles.chatIntercoluter}>
                    <Text>{this.state.interlocutor}</Text>
                    <Text>{JSON.stringify(message)}</Text>
                    {/* <Text>{message.length}</Text>  */}
                </View>
                
                <FlatList
                    ref="flatList"
                    style={styles.chatScrollView}
                    data={this.state.massOfMessages}
                    renderItem={({item})=>{
                    return (
                        <View style={{width:360}}>
                            <Text 
                                style={this.choseAlign(item.sender)}
                            >{item.sender+" : " + item.message}</Text>
                        </View>
                    )}}
                    keyExtractor={()=>{
                        this.i++;
                        let num = this.i.toString();
                        return num;
                    }}
                    
                    // getItemLayout= {(data, index) => (
                    //     {length: WIDTH, offset: WIDTH * index, index}
                    //   )}
                    // initialScrollIndex={18}
                />
                    
                    <Text>{this.state.chatkey}</Text>
                
                <View style={styles.chatvievinput}>
                <TextInput 
                    placeholder="write message"
                    style={styles.chatInput}
                    onChangeText = {(data)=>{
                        this.setState({text:data});
                    }}
                    />
                <TouchableOpacity 
                style={styles.sendmess}
                onPress = {()=>{
                    let mess = {
                        chat_message:this.state.text,
                        chat_user:this.state.name,
                        interlocutor:this.state.interlocutor,
                        chat_id:this.state.chatkey,
                        type:"NEWMESSAGETOUSER"
                    }   
                    this.props.sendMessage(mess)
                }
                }
                >
                    <Text>send</Text>
                </TouchableOpacity>
                </View>
                
            </View>
        );
    }
    choseAlign = (first) =>{
        if(first == this.state.interlocutor){
            return styles.alignLeft;
        }
        else {
            return styles.alignRight;
        }
    }

    getMessages = () =>{
        const query = fetch(src+"/fetchserver/chat.php",
        {
        method: 'POST', 
        body:JSON.stringify({
            query:"GETMESSAGES",
            chatid:this.state.chatkey
        }), 
        headers: {
        'Content-Type': 'application/json'
            }
        })
        .then((response)=>
            response.json())
        .then((responseJson)=>{
            this.setState({massOfMessages:responseJson});
        
        })
    }

}


const mapDispatchToProps = (dispatch)=>({
    changetext:(text)=>dispatch(changeText(text)),
    sendMessage:(mass)=>dispatch(sendMessage(mass)),
    cleanMessages:(name)=>dispatch(cleanMessages(name)),
    checkMessages:(id)=>dispatch(checkMessages(id))
});

const mapStateToProps = (store) =>({ 
            connection:store.connection,
            message:store.message,
            text:store.text
})

export default connect(mapStateToProps,mapDispatchToProps)(MyChats)