import React, { Component } from 'react'
import { Text, View ,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../config/colors';

function HRList({hotel,nav}){
        return (
            <TouchableOpacity style={styles.list} onPress={()=>nav.navigate('DestDetails')}>
                <Text style={styles.text}> {hotel.Title} </Text>
            </TouchableOpacity>
        );
}
const styles = StyleSheet.create({
    list:{
        backgroundColor: colors.cardBg,
        paddingHorizontal:'4%',
        paddingVertical:'3%',
        marginVertical:'2%',
        borderRadius:30,
        justifyContent:'center'
    },
    text:{
        color:colors.white,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
    }
})
export default HRList;