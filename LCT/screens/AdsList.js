import { Item, View ,Input} from 'native-base';
import React, { useEffect, useState } from 'react';
import {ImageBackground, StyleSheet,FlatList} from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import AdsCard from '../components/AdsCard';
import SearchBox from '../components/SearchBox';
import { IMAGEASSETS } from '../assets/images';
import {getAllAds} from '../controller/AdsController/GetAllAds';
import {MyRooms} from '../controller/AdsController/MyRooms';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';

function AdsList({navigation,route}) {
  
    const [search,setSearch]=useState([]);
    const [roomsList,setRoomsList]=useState([]);
    const [deleteAd,isDeletedAd]=useState(false);
    const onRoomsRecieved=(roomsList)=>{
      setRoomsList(roomsList)
      setSearch(roomsList)
  }
  
  useEffect(() => {
    if(route.params.page=="allRooms"){
      getAllAds(onRoomsRecieved)
    }
    else{
      MyRooms(onRoomsRecieved)
    }
    }, [deleteAd]);
    
      return (
       
      <ImageBackground 
        source={IMAGEASSETS.museumBg}
        style={styles.background}>
            <View style={styles.bg}>
                <AppButton title='Post your Ad' onPress={()=>navigation.navigate('PostAd',{apartment:""})}></AppButton>
                <View style={styles.margin}>
                  <SearchBox  list={roomsList} searchStatefn={setSearch}/>
                </View>
                <FlatList 
                    keyExtractor={(item)=>item.Location}
                    data={search}
                    renderItem={({item})=>(
                      <AdsCard 
                      apartment={item} 
                      nav={navigation} 
                      path={route.params.page} 
                      deleteStatefn={isDeletedAd} 
                      deleteState={deleteAd}></AdsCard>                  )}/>
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
      marginBottom:"2%",
    }
})
export default AdsList;
