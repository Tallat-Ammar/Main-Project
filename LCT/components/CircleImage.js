import React from 'react';
import { Image, StyleSheet,View} from 'react-native';
import {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';

function CircleImage({color,size,image}) {
    return (
        <View style={[styles.circle,{backgroundColor:color,borderRadius:(hp(size)/2),width:hp(size),height:hp(size)}]}>
           <Image style={styles.logo} source={image }></Image>
        </View>
    );
}
const styles = StyleSheet.create({

    circle:{
        justifyContent:"center",
        alignItems:"center",
    },
    logo:{
        position: "absolute",
        width: wp('65%'),
        height: hp('13%'),
        resizeMode:'contain',
    },
})
export default CircleImage;