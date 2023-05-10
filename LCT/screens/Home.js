import React from 'react';
import CircleImage from '../components/CircleImage';
import {ImageBackground,StyleSheet, View,Button} from 'react-native';
import Circle from '../components/Circle';
import {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';  
import {IMAGEASSETS} from "../assets/images";
import stylesheet from '../assets/stylesheet/stylesheet';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function Home({route, navigation}) {
    var show = () => {
        console.warn(route);
    };
    return (
        <ImageBackground style={stylesheet.backgroundImage}  source={IMAGEASSETS.backgroundImage} resizeMode="stretch">
            <View style={stylesheet.bgView} resizeMode="contain">
                <View style={styles.icon}>
                    <Icon name="menu-outline" size={50} color="white" onPress={() => navigation.toggleDrawer()}></Icon> 
                    {/* <Button title="My Rooms" onPress={()=>navigation.navigate('AdsList',{page:"myrooms"})} ></Button> */}
                </View>
                <View style={styles.nearby}>
                    <Circle fn={()=>navigation.navigate('Nearby')} title="Nearby Attractions" color={colors.cardBg} size="25%" ></Circle>
                </View> 
                <View style={styles.logo}>
                    <CircleImage color={colors.logoBG} size="40%" image={IMAGEASSETS.logo}/>
                </View>
                <View style={styles.destinations}>
                    <Circle fn={()=>navigation.navigate('DestinationAreas')} title="Destinations" color={colors.destBtnBg} size="20%" />
                </View>
                <View style={styles.reservations}>
                    <Circle fn={()=>navigation.navigate('AdsList',{page:"allRooms"})} title="Reservations" color={colors.reservBtnBg} size="25%"></Circle>
                </View> 
            </View>
        </ImageBackground>
        );
}
const styles = StyleSheet.create({
    nearby:{
        position:"absolute",
        top:hp('4%'),
        right:wp('10%'),
    },
    destinations:{
        position:"absolute",
        top:hp('19%'),
        left:wp('3%'),
    },
    reservations:{
        position:"absolute",
        bottom:hp('4%'),
        left:wp('9%'),
    },
    logo:{
        justifyContent: "center",
        alignItems:"center",
        position:"absolute",
        bottom:hp('27%'),
        right:wp("5%"),
    },
    icon:{
        position:"absolute",
        top:hp('1%'),
        left:wp('2%')
    }
})
export default Home;