import React, { useState, useEffect } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import InputField from '../components/InputField';
import colors from '../config/colors';
import {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IMAGEASSETS } from '../assets/images';
import stylesheet from '../assets/stylesheet/stylesheet';
import PostUsers from '../controller/AdsController/PostUsers';
import Firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';  

function EditProfile({route, navigation}) {
    const [userName, setUsr]=useState(route.params.name);
    const [email, setMail]=useState(route.params.email);
    const [contact, setContact]=useState('');
    function Users() {
        var data={name:route.params.name,email:route.params.email/*,acc:accountNum*/,num:contact,photo:route.params.photo};
        PostUsers(data).then(function() {
            navigation.replace("Home");
        }) 
    }
    var currentUser= Firestore().collection('Users').doc(route.params.email);
    currentUser.get()
    .then((docSnapshot) => {
        if (docSnapshot.exists && route.params.edit == false){
                navigation.replace("Home");
        }
        else {
            if (docSnapshot.exists && route.params.edit == true) {
                setAccontNum(route.params.accountNo);
                setContact(route.params.contactNo);
            }
        }
    })
    return (
        <ImageBackground
        source={IMAGEASSETS.backgroundImage} style={stylesheet.backgroundImage}>
            <View style={stylesheet.bgView}>
                <View style={styles.icon}>
                        <Icon name="arrow-back-sharp" size={40} color="white" onPress={() => navigation.goBack()}></Icon> 
                </View>
                <Text style={styles.heading}>Edit Profile</Text>
            {/* <ImgPicker/> */}
                <Image style={{height:100, width:100,borderRadius:50}} source={{uri:route.params.photo}} />
                <InputField pholder='name' st={userName} setSt={setUsr} editable={false} ></InputField>
                <InputField pholder='email' st={email} setSt={setMail} keyboardType="email-address" editable={false}></InputField>
                <InputField pholder='Contact number' st={contact} setSt={setContact} keyboardType="numeric" ></InputField>
                <AppButton title="Update" onPress={Users}></AppButton>
            </View>
         </ImageBackground>
    );
}

const styles=StyleSheet.create({
    heading:{
        fontSize:hp('6%'),
        color:colors.white,
        textAlign:'center',
        marginVertical: '3%',
    },
    icon:{
        position:"absolute",
        top:hp('1%'),
        left:wp('2%')
    } 
})
export default EditProfile;