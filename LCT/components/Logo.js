import { View } from 'native-base';
import React from 'react';
import { Image, StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { IMAGEASSETS } from '../assets/images';

function Logo({cheight='20', cwidth='80', ctop='35'}) {
//function Logo() {
    return (
        <Image
        //style={styles.logo}
        style={[styles.logo, {height: hp(cheight+'%')}, {width: wp(cwidth+'%')}, {top: hp(ctop+'%')} ]}
        source={IMAGEASSETS.logo}></Image>
        );
}
const styles = StyleSheet.create({
    logo:{
        position: "absolute",
        resizeMode: "contain" ,
    }
})
export default Logo;