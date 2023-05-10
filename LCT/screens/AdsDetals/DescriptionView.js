import React from 'react';
import {useState} from 'react';
import { View, TouchableHighlight,Modal,Image,TouchableOpacity,Text, StyleSheet, Linking } from 'react-native';
import {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../config/colors';
import AppButton from '../../components/AppButton';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { firebase } from '@react-native-firebase/firestore';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons';  
function DescriptionView({apartment,route,navigation}) {
   
    const apart=route.params.apartment;
    var user=firebase.auth().currentUser;
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    function setChatNav(){
        if(user.email==route.params.apartment.Owner){
            navigation.navigate('Messages',{apart})
        }
        else{
            navigation.navigate('Chat',{apart})
        }
    }
    const [ReservationModal, setReservationModal] = useState(false);
    
    const [flag, setFlag] = useState(false);
    
   
    
    const doReservation=()=>{
        var NoOfDays=(checkOut.getTime()-checkIn.getTime())/86400000;
        var price=NoOfDays*route.params.apartment.Charges;
       var reservationData={apartmentDetails: route.params.apartment, totalFare: price, daysOfStay: NoOfDays, inDate: checkIn.toDateString(), outDate: checkOut.toDateString()} //checkIn, outDate: checkOut }
       setReservationModal(false);
       navigation.navigate("StripePayment", {reservationData});
     };
     const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
      
      
      const handleConfirm = (date) => {
        console.log(date.toDateString());
        if(flag == false){
          setCheckIn(new Date(date));
        hideDatePicker();
        setFlag(true);
        }
        if((flag == true)){
        setCheckOut(new Date(date));
        hideDatePicker();
        setFlag(false);
        }
      };
      
   
    return (
        <View>
        <View style={styles.detailContainer}>
            <Modal
          animationType="slide"
          transparent={true}
          visible={ReservationModal}>
         
          <View style={styles.modal2}>

                    <Icon name="close-outline" style={styles.icon} style onPress={()=> setReservationModal(false)} size={40} color="black"></Icon>
              <View style={styles.chkInchkOutBTn}>  
                    <View>
                      <AppButton title="Check In" width='25'    onPress={showDatePicker}></AppButton>
                      <Text style={styles.date}>{checkIn.toDateString()}</Text>
                      <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode='date'
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                          minimumDate={new Date()}/>
                   </View>
                   <View>
                    <AppButton title="Check Out" width='30' onPress={showDatePicker}></AppButton>
                    <Text style={styles.date}>{checkOut.toDateString()}</Text>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode='date'
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        minimumDate={new Date(checkIn)}/>
                  </View>
              </View>    
              <AppButton title="Proceed to Payment" width='60' onPress={doReservation}></AppButton>
            
            </View>
        </Modal>

            <View>
                <Text style={styles.title}>
                    {apartment.Title}
                </Text>

                <Text style={styles.heading}>
                    Location: <Text style={styles.description}>{apartment.Location}</Text>
                </Text>
                
                <Text style={styles.heading}>
                    Charges: <Text style={styles.description}>{apartment.Charges} </Text>
                </Text>
                <Text style={styles.heading}>
                    No of Rooms: <Text style={styles.description}>{apartment.NoOfRooms}</Text>
                </Text>
                <Text style={styles.heading}>
                    Description: <Text style={styles.description}>{'\n'}{apartment.Description} </Text>
                </Text>
            </View>
        </View>
        <View style={styles.buttons}> 
        <View style={{alignItems:'center'}}>
         <IonIcons size={50} name="compass" color={colors.btnBlue} onPress={() => Linking.openURL('google.navigation:q=100+101')} ></IonIcons>
         <Text>Direction</Text>
         </View>
     <View style={{alignItems:'center'}}>
       <IonIcons size={50}  name="chatbubbles-sharp" color={colors.btnBlue} onPress={setChatNav} ></IonIcons>
       <Text>Ask a question</Text>
     </View>
     {
         user.email!=apartment.Owner?(
            <View style={{alignItems:'center'}}>
            <IonIcons size={50}  name="bed-sharp" color={colors.btnBlue} onPress={()=> setReservationModal(true)} ></IonIcons>
            <Text>Reserve Room</Text>
          </View>
         ):<View/>
     }
     </View>
      </View>
    );
}
const styles = StyleSheet.create({
    detailContainer:{
        justifyContent:'center',
        padding:'4%'
    },
    title:{
        color:colors.darkBlue,
        fontSize: hp('5%'),
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
    modal2:{
        flex:0.7,
        width:wp('75%'),
        marginTop:hp('25%') ,
        marginBottom:hp('25%'),
        marginLeft:wp('13%'),
        padding:'3%',
        backgroundColor: colors.gray,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent:'center',
    },
    chkInchkOutBTn:{
    flex:1,
    flexDirection:'row',
    justifyContent:"space-evenly"
    },
    date:{
    padding:wp('1%'),
    margin: wp('2%'),
    fontSize:15,
    color:colors.white,
    },
    btn:{
    flex:1,
    flexDirection:'row',
    justifyContent:"center",
    marginTop:'3%',
    },

    
    
})
export default DescriptionView;