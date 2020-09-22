
import React,{ Component ,useEffect} from 'react';
import { Text, View,Button,Alert ,Linking,Image} from 'react-native';
import {styles} from './style';
export default class Temp extends Component{
    constructor(props){
        super(props);
        this.state={
            link:"",
            height:null,
            imgFoo:null,
            heightFoo:null
        }
       
    }
   
    
     componentDidMount(){
        Image.getSize(this.props.route.params.link, (width,height)=>{
            this.setState({imgFoo:width,height:height});
            this.setState({heightFoo:Math.floor(this.state.height*(375/this.state.imgFoo))});
    });
    }
   

    render(){
        
            return( 

            <View style={styles.containerTemp}>
               
                <View style={styles.tempItem}>
                
                    <Image 
                        source={{uri:this.props.route.params.link}}
                        
                        style={{ resizeMode:"contain",height:this.state.heightFoo}}
                    />
                    
                </View>
            </View>

            );
        };
}