import React from 'react';
import {useState} from 'react';
import {ScrollView,View,StyleSheet, Text,  Linking} from 'react-native';
import PicSlider from  '../../components/PicSlider';
import {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';

function PlacesDetails({navigation,route}){

   const place=route.params.item;
    return (
        
        <ScrollView style={styles.background}> 
          
          <View>
          
          <PicSlider height="30" width="100" imageList={place.Images}>
          </PicSlider>
          </View>
            <View>
            <Text style={styles.title}>
                   {place.Title}
                </Text>

                <Text style={styles.heading}>
                    Area: <Text style={styles.description}>{place.Area}</Text>
                </Text>
                
                <Text style={styles.heading}>
                    Type: <Text style={styles.description}>{place.Category} </Text>
                </Text>
                <Text style={styles.heading}>
                    Description: <Text style={styles.description}>{'\n'}{place.Description} </Text>
                </Text>
            </View>
            <View style={styles.buttons}> 
        <View style={{alignItems:'center'}}>
         <IonIcons size={50} name="compass" color={colors.btnBlue} onPress={() => Linking.openURL('google.navigation:q=100+101')} ></IonIcons>
         <Text>Direction</Text>
         </View>
         </View>
        </ScrollView>
        
      
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:colors.white,
    },
    title:{
      color:colors.darkBlue,
      fontSize: hp('4%'),
      fontWeight:'bold',
      textAlign:'left',
      borderBottomColor:colors.logoBG,
      borderBottomWidth:2,
      paddingBottom:'1%',
      marginBottom:'2%',
  },
  heading:{
      color:colors.black,
      fontSize: hp('3%'),
      textAlign:'left',
      fontWeight:'bold',
      
  },
  buttons:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-evenly',
      marginTop:'3%',
      bottom:hp('1%'),
  },
  description:{
      fontWeight:'normal',
      color:'grey',
      fontStyle:'italic',
      textAlign:'right'

  },
})


export default PlacesDetails;
