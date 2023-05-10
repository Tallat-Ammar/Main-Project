import { View ,Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import {ImageBackground, StyleSheet,FlatList} from 'react-native';
import colors from '../config/colors';
import SearchBox from '../components/SearchBox';
import { IMAGEASSETS } from '../assets/images';
import IonIcons from 'react-native-vector-icons/Ionicons';
import HRList from '../components/HRList';
import { ScrollView } from 'react-native-gesture-handler';

function HotelList({navigation,route}) {

    let hotel={};
    var objhotel=[];
    for(let i=0;i<10;i++){
        hotel={Title:('Hotel'+i)}
        objhotel.push(hotel)
    }
    const [hotelList,setHotelList]=useState(objhotel);
    const [search,setSearch]=useState(objhotel)


    return (
    <ImageBackground 
          source={IMAGEASSETS.museumBg}
          style={styles.background}>
          <View style={styles.bg}>
              <View style={styles.margin}>
                <SearchBox  list={hotelList} searchStatefn={setSearch}/>
              </View>  
              <FlatList 
                keyExtractor={(item)=>item.Title}
                data={search}
                renderItem={({item})=>(
                  <HRList 
                    hotel={item} 
                    nav={navigation} 
                  ></HRList>)}/>
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
      marginVertical:'5%',
    }
})
export default HotelList;
