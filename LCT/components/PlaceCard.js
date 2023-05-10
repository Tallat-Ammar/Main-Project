import { Card, CardItem, Left, Right, Subtitle, Thumbnail, Title } from 'native-base';
import React, { useEffect } from 'react';
import {StyleSheet, View,Alert, Linking} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../config/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';

function PlaceCard({nav, path, place}){
    return (
        <Card style={{ backgroundColor: "transparent" }}>
            <CardItem style={styles.card} button onPress={()=>nav.navigate('PlacesDetails',{item: place}) }>
                <Left>
                <View style={styles.details}>
                    <Title style={styles.heading}>{place.Title}</Title>
                    <Subtitle>Category: {place.Category}</Subtitle>
                </View>
                </Left>
                <Right>
                <View style={{flexDirection:'row'}}>
                    <IonIcon name="compass" style={styles.icon} style onPress={() => Linking.openURL('google.navigation:q=31.5898337+74.3129113')} size={40} color="green"></IonIcon>
                    <IonIcon name="list-circle" style={styles.icon} style onPress={()=>nav.navigate('PlacesDetails',{item: place}) } size={40} color="yellow"></IonIcon>
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
    details:{
        alignItems: "flex-start",
        top: '-3%',
    },
    heading:{
        fontWeight: 'bold',
        textTransform:'capitalize',
    },
    
})
export default PlaceCard;