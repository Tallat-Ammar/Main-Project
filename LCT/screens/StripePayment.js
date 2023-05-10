import React, {useState} from 'react';
import {ScrollView,View, Alert} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import Stripe from 'react-native-stripe-api';
import AppButton from '../components/AppButton';
import { firebase } from '@react-native-firebase/firestore';
import DoReservation from '../controller/AdsController/DoReservation'
import { Text } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import colors from '../config/colors';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export default function StripePayment(props) {
  var user=firebase.auth().currentUser;

  const [values, setValues] = useState({});
  const [error, setError] = useState();
  const showAlert = (alertMsg) =>
  Alert.alert(
    "Attention",
    alertMsg,
    [
      {
        text: "Ok",
        onPress: () =>
        props.navigation.goBack(),
        style: "ok",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        props.navigation.goBack(),
    }
  );
  const saveOnlinePaymentDefaults=(tokenValue)=>{
    var adAvailability=false;
    var reservationTableData={Owner: props.route.params.reservationData.apartmentDetails.Owner, RoomID: props.route.params.reservationData.apartmentDetails.Location, CheckIn:props.route.params.reservationData.inDate, CheckOut: props.route.params.reservationData.outDate, RenterID: user.email , RenterName: user.displayName};
    DoReservation(reservationTableData, adAvailability);
  }

  const _onChange = (formData) => setValues(formData);
  const _onFocus = (field) => console.log('focusing', field);

  const payment = async () => {
    var expiry = values.values.expiry;
    var month = expiry.split('/');
    const apiKey =
      'pk_test_51I5OlbGkYHUqna05zpZxNLOPqU7VabiSekiHuZhYi7akmTNJApDRxOteYgLtiUwehI3T9PDZqHgiTewc43G3huXY00jO1gC9YQ';
    const client = new Stripe(apiKey);
    await client
      .createToken({
        number: values.values.number,
        exp_month: month[0],
        exp_year: month[1],
        cvc: values.values.cvc,
        address_zip: values.values.postalCode,
      })
      .then((value) => {
        const myObjStr = JSON.stringify(value);
        if (myObjStr.includes('An error occured, please try later.')) {
          setError(value.error);
          showAlert(error);
        } else {
          saveOnlinePaymentDefaults(value);
          showAlert("Payment Successfull");
        }
      })
      .catch((error) => showAlert(error));
  };
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: 20,
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}>
        <CreditCardInput
          autoFocus
          requiresName
          requiresCVC
          requiresPostalCode
          validColor={'black'}
          invalidColor={'red'}
          placeholderColor={'darkgray'}
          onFocus={_onFocus}
          onChange={_onChange}
        />
        <View>
          <Text style={styles.heading}>Reservation Details</Text>
          <Text style={{paddingLeft:'2%'}}><Text style={styles.attr}>Title: </Text> {props.route.params.reservationData.apartmentDetails.Title}</Text>
          <Text style={{paddingLeft:'2%'}}><Text style={styles.attr}>Location: </Text> {props.route.params.reservationData.apartmentDetails.Location}</Text>
          <Text style={{paddingLeft:'2%'}}><Text style={styles.attr}>Owner: </Text> {props.route.params.reservationData.apartmentDetails.Owner}</Text>
          <Text style={{paddingLeft:'2%'}}><Text style={styles.attr}>CheckIn: </Text> {props.route.params.reservationData.inDate}</Text>
          <Text style={{paddingLeft:'2%'}}><Text style={styles.attr}>CheckOut: </Text> {props.route.params.reservationData.outDate}</Text>
          <Text style={{paddingLeft:'2%'}}><Text style={styles.attr}>Total days of stay:</Text> {props.route.params.reservationData.daysOfStay}</Text>
          <Text style={{paddingLeft:'2%'}}><Text style={styles.attr}>Price: </Text> {props.route.params.reservationData.totalFare}</Text>
        </View>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <AppButton
            width={'60%'}
            title="Payment"
            titlecolor={'white'}
            onPress={() => payment()}
          />
        </View>
        
      </ScrollView>
    </>
  );
}

const styles=StyleSheet.create({
  heading:{
    fontSize:heightPercentageToDP('4%'),
    color:colors.black,
    textAlign:'center',
    marginVertical: '3%',
},
attr:{
  margin: '2%',
  fontWeight: 'bold',
}
})