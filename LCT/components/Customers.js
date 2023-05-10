import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Customers({customerName,checkIn,checkOut,roomId}) {
    return (
        <View style={styles.item}>
            <Text style={{fontWeight:'bold'}}>Customer Name:    {customerName}</Text>
            <Text>Check In Date:        {checkIn}</Text>
            <Text>Check Out Date:     {checkOut}</Text>
            <Text>Room ID:                 {roomId}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    item:{
        flex:1,
        margin:hp('1%'),
        padding:hp('3%'),
        borderColor:'black',
        borderWidth:1,
        borderRadius:hp('2%')
    }
})

