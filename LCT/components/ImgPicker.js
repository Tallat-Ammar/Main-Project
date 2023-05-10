import React, { useState , useEffect} from 'react';
import{ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../config/colors';
import { List } from 'native-base';
import { Alert } from 'react-native';

function ImgPicker({onImagesPicked}) {
    var imageList=[];
    const options={
        mediaType: 'photo',
        multiple:true,
        compressImageQuality: 0.7,
        maxFiles:4,
        maxWidth: 800,
        maxHeight: 500,
    }
    const pickImageHandler=()=>{
        ImagePicker.openPicker(options).then(response => {
            response.map(image=>{
                imageList.push({
                    uri: image.path,
                })
            })
            onImagesPicked(imageList);
        })
        .catch((error)=>{
            console.log('ImagePicker Error: ', error.message);
        });
    }
    /*const removeImage=(uri=>{
        imageList.filter(imageUri=>imageUri!=uri)
    })
    const onRemove=(uri=>{
        Alert.alert('Delete','Are you sure to delete it?', [
            {text: 'Yes', onPress:()=>removeImage(uri)},
            {text:'No'}
        ])
    })*/
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={pickImageHandler}>
            <View style={styles.imgbg}> 
            <ImageBackground 
                 style={styles.img}>
                    <View  style={styles.icon}>
                    <IonIcons name="camera" size={35}></IonIcons>
                    </View></ImageBackground>
            </View>
        </TouchableWithoutFeedback>
        </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
    },
    imgbg:{
        height:heightPercentageToDP('25%'),
        width: widthPercentageToDP('85%'),
        backgroundColor: colors.inpWhite,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center',
        marginVertical: '3%',
        overflow:'hidden',
    },
    img:{
        height:'100%',
        width: '100%',
        resizeMode:'contain',
    },
    icon:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
export default ImgPicker;