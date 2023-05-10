import { Card, CardItem, Left, Right, Subtitle, Thumbnail, Title } from 'native-base';
import React, { useEffect } from 'react';
import {StyleSheet, View,Alert} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../config/colors';
import PicSlider from '../components/PicSlider';
import IonIcons from 'react-native-vector-icons/Ionicons';
import DeleteAd from '../controller/AdsController/DeleteAd';

function AdsCard({apartment,nav,path,deleteStatefn,deleteState}){
        //const thumbImg=JSON.parse(apartment.Images)
        const deleteAd=()=>{
            var loc=apartment.Location;
            DeleteAd(loc);
            if(deleteState==true){
                deleteStatefn(false);
            }else{
                deleteStatefn(true);
            }
        }
        const alertButton=()=>{
        Alert.alert(
            'Delete Ad',
            'Are you sure you want to delete?',
            [
              {text: 'NO'},
              {text: 'YES', onPress:deleteAd},
            ]
          );
        }
    const EditIcon=() =>{
        if (path=="myrooms") {
            return(<IonIcons size={25} name="create-sharp" color={colors.white} onPress={() => nav.push('PostAd',{apartment,path})} ></IonIcons>);
        } else {
            return null;
        }
    }
    const DeleteIcon=() =>{
        if (path=="myrooms") {
            return(<IonIcons size={25} name="trash-sharp" color={colors.white} onPress={alertButton}></IonIcons>);
        } else {
            return null;
        }
    }
    return (
        <Card style={{ backgroundColor: "transparent" }}>
            <CardItem style={styles.card} button onPress={()=>nav.navigate('AdsDetails',{apartment})}>
                <Left>
                    <PicSlider imageList={apartment.Images} 
                                height="10" width="18" borderRadius={0}></PicSlider>
                {/*<Thumbnail
               source={{uri: thumbImg[0].uri}}
                style={styles.pic}/>*/}
                <View style={styles.details}>
                    <Title style={styles.heading}>{apartment.Title}</Title>
                    <Subtitle><IonIcons size={15} name="bed-sharp"></IonIcons> {apartment.NoOfRooms}</Subtitle>
                    <Subtitle><IonIcons size={15} name="location"></IonIcons> {apartment.Location}</Subtitle>
                </View>
                </Left>
                <Right>
                    <Subtitle style={styles.fare}> ${apartment.Charges}</Subtitle>
                    <View>
                    <EditIcon></EditIcon><DeleteIcon></DeleteIcon>
                    </View>
                </Right>
            </CardItem>
        </Card>
    );
}

const styles = StyleSheet.create({
    card:{
        height:heightPercentageToDP('15%'),
        width: '100%',
        backgroundColor:colors.cardBg,
    },
    pic:{
        width:widthPercentageToDP('18%'),
        height: heightPercentageToDP('10%'),
        marginRight: '5%',
        borderRadius:0,
    },
    details:{
        marginLeft:'7%',
        alignItems: "flex-start",
        top: '-3%',
    },
    heading:{
        fontWeight: 'bold',
        textTransform:'capitalize',
    },
    fare:{
        alignItems:'flex-end',
        fontWeight: 'bold',
        fontSize: heightPercentageToDP('5%'),
    }
})
export default AdsCard;