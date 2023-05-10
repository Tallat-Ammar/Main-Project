import React, { useEffect, useState } from 'react';
import { Card, CardItem, Left, Right, Subtitle, Thumbnail, Title } from 'native-base';
import { ImageBackground, FlatList,StyleSheet, View,Alert } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';
import {getAreaPlaces} from '../controller/getAreaPlaces';
import PlaceCard from '../components/PlaceCard';
import SearchBox from '../components/SearchBox';
import { IMAGEASSETS } from '../assets/images';

export default function AreaList({navigation, route}){
    var area=route.params.areaName;

    const [search,setSearch]=useState([]);
    const onPlaceRetrieved=(placeList)=>{
      setSearch(placeList)
     }
  
  useEffect(() => {
    getAreaPlaces(area,onPlaceRetrieved)
    },[]);

    return(
        <ImageBackground 
        source={IMAGEASSETS.museumBg}
        style={styles.background}>
            <View style={styles.bg}>
            <View style={styles.margin}>
        <SearchBox  list={search} searchStatefn={setSearch}/>
                </View>
        <FlatList 
            keyExtractor={(item)=>item.Location}
            data={search}
            renderItem={({item})=>(
                <PlaceCard
                place={item} 
                nav={navigation}
                path={route}></PlaceCard>                  
                      )}/>
        
        </View>
        </ImageBackground>
    )
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
})

