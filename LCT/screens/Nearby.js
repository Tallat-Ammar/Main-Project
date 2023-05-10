import React, { Component ,useState, useEffect} from 'react';
import { View, Text,StyleSheet,Modal, Button, Linking} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Marker } from 'react-native-maps';
import {PERMISSIONS, request} from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation';
import {getAllPlaces} from '../controller/GetPlaces';
import {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppButton from '../components/AppButton';
import Icon from 'react-native-vector-icons/Ionicons';  

function DestDetails({route,navigation}){
  const [region, setRegion] = useState({
    latitude: 31.5698,
    longitude: 74.3120,
    latitudeDelta:  0.001,
    longitudeDelta: 0.008,
  });
  const [currentMarker, setcurrentMarker] = useState({
    Title:'None',
  })
  const [places, setPlaces] = useState([])
  const [showModal, setShowModal] = useState(false);
  const onPlacesRecieved=(places)=>{
    setPlaces(places)
}
  requestPermission = async ()=>{
    var resp=await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    if (resp==='granted') {
      locatePosition()
    }
  }
  locatePosition=() =>{
    Geolocation.getCurrentPosition(
      position =>{
        console.log(position)
        let initialPosition={
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta:  0.001,
            longitudeDelta: 0.008,
          }
        setRegion(initialPosition)
      }
    )
  }
  useEffect(() => {
    requestPermission();
    getAllPlaces(onPlacesRecieved)
  }, [])
  var showdesc=(marker)=>{
    console.log(marker);
    setcurrentMarker(marker);
    setShowModal(true)
  }

  return (
   <View style={styles.container}>
     <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}>
            <View style={styles.mapModal}>
              <Text style={styles.title}>{currentMarker.Title}</Text>
              <View style={{flexDirection:'row'}}>
                <Icon name="compass" style={styles.icon} style onPress={() => Linking.openURL('google.navigation:q=100+101')} size={40} color="green"></Icon>
                <Icon name="list-circle" style={styles.icon} style onPress={()=>navigation.navigate('PlacesDetails',{currentMarker}) } size={40} color="yellow"></Icon>
                <Icon name="close-circle-outline" style={styles.icon} style onPress={()=> setShowModal(false)} size={40} color="red"></Icon>
              </View>
              
            </View>
            
          </Modal>
     <MapView
     showsUserLocation={true}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={region}
       onRegionChangeComplete={region => setRegion(region)}
       >
       {places.map((marker,index)=>( 
      <Marker key={index} 
        coordinate={{ latitude: marker.Location._latitude, longitude: marker.Location._longitude}}
        // title={marker.Title}
        // description={'descriptionbtn'}
        onPress={() =>{
          showdesc(marker);
        }}>
      </Marker>
      ))} 
     </MapView>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapModal:{
    padding:10,
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    width:wp('98%'),
    height:hp('15%'),
    marginTop:hp('84%'),
    // marginBottom:hp('5%'),
    marginLeft:wp('1%'),
    backgroundColor: 'rgba(20,20,20,0.9)',
    borderRadius: 20,
    alignItems: 'center',
  },
  title:{
    color:'white',
    fontSize:20
  }
 });
export default DestDetails;