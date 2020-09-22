

import { StyleSheet} from 'react-native';

export const styles=StyleSheet.create({
    container:{
        padding:0,
        flex:1,
        backgroundColor:"rgba(102, 252, 241, 0.4)"
    },
    containerReg:{
        padding:0,
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgba(0, 0, 0, 0.6)"
    },
    containerUser:{
        padding:0,
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    containerTemp:{
        width:"100%",
        alignItems:"center",
        backgroundColor:"rgba(102, 252, 241, 0.4)"
    },

    containerItem:{
                shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        
        alignItems:"center",
        marginTop:20, 
       
        
    },
    tempNavContainer:{
        width:"100%",
        maxHeight:40,
        flexDirection:'row',
        justifyContent:"space-around",
        backgroundColor:"white",
        borderBottomColor:"black",
        borderBottomWidth:2
    },
    tempItem:{
       width:"100%"
    },
    inputs:{
        width:250,
        marginBottom:20,
        borderRadius:5,
        borderColor:"blue",
        borderWidth:2,
        borderStyle:"solid",
        backgroundColor:"white",
        padding:10
    },
    button:{
        width:100,
        height:30,
        backgroundColor:"purple",
        marginTop:30
    },
    chatIntercoluter:{
        height:40,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        borderBottomColor:"black",
        borderBottomWidth:2,
        borderStyle:"solid"
    },
    chatScrollView:{
        flex:1,
    
    },
    chatvievinput:{
        flexDirection:"row",
        width:"100%",
        padding:5,
        borderStyle:"solid",
        borderColor:"black",
        borderWidth:2
    },
    chatInput:{
        width:200,
        padding:5,
        borderStyle:"solid",
        borderTopColor:"black",
        borderTopWidth:2
    },
    sendmess:{
        padding:5,
        height:30,
        backgroundColor:"pink",
        alignItems:"center",
        justifyContent:"center",
    },
    chatlistCon:{
        backgroundColor:"pink",
        margin:20,
        borderColor:"black",
        width:200,
        borderStyle:"solid",
        borderWidth:2,
        alignItems:"center",
        padding:10
    },
    alignLeft:{
        padding:10,
        backgroundColor:"pink",
        display:"flex",
        alignSelf:"flex-start"
    },
    alignRight:{
        padding:10,
        backgroundColor:"pink",
        alignSelf:"flex-end"
    }
});
   