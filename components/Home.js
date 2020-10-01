import React,{Component} from 'react'
import { TouchableOpacity, View,SafeAreaView,FlatList, Modal,Alert,Text} from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';


import {styles} from '../style/style';


export const src =  "https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0&query=cars&per_page=10";
let mass=[];

export default class Home extends Component{
    constructor(props){
        super(props);
         this.state={
            link:[],
            id:null     
         }  
         
         
     }
    
     
    
  
  

   async componentDidMount(){
      let response = await fetch(src);
      let json = await response.json();
      
      for(let i=0;i<json.length;i++){
         mass.push(json[i]);
      }
      this.setState({link:mass});
   }
   
   
   
   render(){
    return (
       <View style={styles.container}>
         
      <SafeAreaView >
      <FlatList
        data={this.state.link}
        renderItem={({item})=>{
         return (
            <TouchableOpacity onPress={() =>{this.props.navigation.navigate('Temp',{link:item.urls.raw})} } 
            style={[styles.containerItem]}>
            <Image
               source={{uri:item.urls.raw}}
               indicator={Progress}
               indicatorProps={{
                 size: 80,
                 borderWidth: 0,
                 color: 'rgba(200, 200, 200, 1)',
                 unfilledColor: 'rgba(100, 100, 100, 1)'
               }}
              
                style={{width:300,height:300}}
            />
            <Text style={{width:300,
               textAlign:"center",
               fontSize:16,
               backgroundColor:"white",
               paddingBottom:10,
               paddingTop:10,
               paddingHorizontal:10
              
            }}>{item.alt_description}</Text> 
          </TouchableOpacity>
   
         );
        }}
        keyExtractor={(x)=>x.id}
        
      />
    </SafeAreaView>
    </View>
     
     )
   }
   
}
 