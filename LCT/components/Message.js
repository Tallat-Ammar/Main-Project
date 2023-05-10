import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity  } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default function Message({username,nav,apartment,userEmail}) {
    
    return (
        
        <TouchableOpacity style={styles.item} onPress={()=>{
            apart={
                'Location':apartment.Location,
                'Owner':apartment.Owner,
                'Customer':userEmail,
            };
            nav.navigate('Chat',{apart});
        }
            }>
            <Text style={{padding:'2%', fontSize:hp('2%')}}>{username}</Text>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    item:{
        height:hp('7%'),
        borderBottomColor:'black',
        borderBottomWidth:1,
        marginHorizontal:'3%',
        marginVertical:'1%',
    }
})
