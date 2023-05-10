import { Item, View ,Input} from 'native-base';
import React, { useEffect, useState } from 'react';
import {ImageBackground, Text,StyleSheet,FlatList,Alert} from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import SearchBox from '../components/SearchBox';
import { IMAGEASSETS } from '../assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';

function DestinationAreas({navigation,route}) {
  
  const data = [
    {
      title: 'Garhi Shahu',
    },
    {
      title: 'Walled City',
    },
    {
      title: 'Saddar Town',
    },
    {
      title: 'Gulberg',
    },
    {
      title: 'DHA',
    },
    {
      title: 'Wapda Town',
    },
    {
      title: 'Walton',
    },{
      title: 'Allama Iqbal Town',
    },{
      title: 'Model Town',
    },
    {
      title: 'Bahria Town',
    },
    {
      title: 'Johar Town',
    },
    {
      title: 'Canal Road',
    },
    {
      title: 'Township',
    },
    {
      title: 'Jail Road G.O.R. - I',
    },{
      title: 'Shahrah-e-Quaid-e-Azam',
    },
    {
      title: 'Others',
    },
    
  ];
  
  const [search,setSearch]=useState(data);

      return (
       
      <ImageBackground 
        source={IMAGEASSETS.museumBg}
        style={styles.background}>
            <View style={styles.bg}>
            <View style={styles.margin}>
            <SearchBox  list={data} searchStatefn={setSearch}/>
                </View>
                <FlatList
            data={ search }
            renderItem={ ({item}) =>
            <TouchableOpacity onPress={()=>navigation.navigate('AreaList', {areaName: item.title} )}>
              <View style={styles.card}>
               <Text style={styles.TextLayout}  > {item.title} </Text>
              </View>
              </TouchableOpacity> }
         />
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
    },
    bg:{
        flex:1,
        backgroundColor: colors.bgcolor,
        width:'100%',
        height:'100%',
        paddingHorizontal:'5%',
    },
    margin:{
      marginTop:"5%",
    },
    card:{
      width: '100%',
      backgroundColor:colors.cardBg,
      padding: '4%',
        marginTop: '4%',
  },
    GridViewContainer: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      margin: 8,
      marginTop:20,
      backgroundColor:colors.btnBlue,
      borderRadius:20,
     },
   TextLayout: {
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
      color: colors.white,
      padding: 10,
    }
   
})
export default DestinationAreas;
