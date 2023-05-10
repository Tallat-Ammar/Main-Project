import React,{useState} from 'react';
import{ ImageBackground, SafeAreaView, Switch, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import InputField from '../../components/InputField';
import ImgPicker from '../../components/ImgPicker';
import AppButton from '../../components/AppButton';
import {Formik} from 'formik';
import { firebase } from '@react-native-firebase/firestore';
//import styles from './style';
import PicSlider from '../../components/PicSlider';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGEASSETS } from '../../assets/images';
import * as yup from'yup';
import colors from '../../config/colors';
import stylesheet from '../../assets/stylesheet/stylesheet';
import PostAds from '../../controller/AdsController/PostAds';


const adValidationScheme=yup.object({
    title: yup.string().required().min(5),
    location: yup.string().required(),
    Description: yup.string().required().min(10),
    charges: yup.string().required().test('is-num','Rent should only be numeric',(val)=>{
        return parseInt(val)>0;
    }),
    noOfRooms:yup.string().required().test('is-num','No. of rooms should only be numeric',(val)=>{
        return parseInt(val)>0;
    }),
    images: yup.array().of(yup.object().shape({uri: yup.string().required()})).min(1).required(),
    availability: yup.bool().required(),
})
function PostAd({route,navigation}){
    var user=firebase.auth().currentUser;
    const owner=user.email;
    const location=route.params.apartment.Location;
    const desc=route.params.apartment.Description;
    const images=route.params.apartment.Images;
    const rent=route.params.apartment.Charges;
    const title=route.params.apartment.Title;
    const availability=route.params.apartment.IsAvailable;
    const rooms=route.params.apartment.NoOfRooms;

    const postMyAd=(adData)=>{
        var edit=route.params.path;
        var data={
            Charges: adData.charges, Description: adData.Description, images: adData.images,  IsAvailable: adData.availability, Location:adData.location, NoOfRooms: adData.noOfRooms, Title: adData.title,email:user.email, //,account: accountNum, //owner: current User
        };  
        PostAds(data,edit);
        navigation.goBack('AdsList',{page:edit});
        }
    return(
        <ImageBackground source={IMAGEASSETS.backgroundImage} style={stylesheet.backgroundImage}>        
        
            <ScrollView style={styles.bg}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={stylesheet.bgView}>
                <Text style={stylesheet.heading}>Post Your Add</Text>
                <Formik
                initialValues={{title: title, Description: desc, noOfRooms: rooms, charges: rent, owner: owner, availability: availability, images: images, location: location }}
                validationSchema={adValidationScheme}
                onSubmit={(values)=>{
                    postMyAd(values);
                }}>
                    {(props)=>(
                        <View>
                            <InputField
                            st={props.values.title}
                            pholder='Title'
                            setSt={props.handleChange('title')}
                            onBlur={props.handleBlur('title')}></InputField>
                            <Text style={styles.error}>{props.touched.title && props.errors.title}</Text>
                            <InputField 
                            st={props.values.noOfRooms} 
                            setSt={props.handleChange('noOfRooms')} 
                            pholder='No. of Rooms' 
                            keyboardType="numeric"
                            onBlur={props.handleBlur('noOfRooms')}></InputField>
                            <Text style={styles.error}>{props.touched.noOfRooms && props.errors.noOfRooms}</Text>
                            <InputField 
                            cheight='20' 
                            st={props.values.Description} 
                            setSt={props.handleChange('Description')} 
                            pholder='Description'
                            multiline
                            onBlur={props.handleBlur('Description')}></InputField>
                            <Text style={styles.error}>{props.touched.Description && props.errors.Description}</Text>
                            <InputField 
                            st={props.values.charges} 
                            setSt={props.handleChange('charges')} 
                            pholder='Rent' 
                            keyboardType="numeric"
                            onBlur={props.handleBlur('charges')}></InputField>
                            <Text style={styles.error}>{props.touched.charges && props.errors.charges}</Text>
                            <InputField 
                            st={props.values.owner} 
                            setSt={props.handleChange('owner')} 
                            pholder='Owner' 
                            editable={false}></InputField>
                            {
                                route.params.path=="myrooms"?
                                <InputField 
                                st={props.values.location} 
                                setSt={props.handleChange('location')} 
                                onBlur={props.handleBlur('location')} 
                                pholder='Location' editable={false}></InputField>        
                                :
                                <InputField st={props.values.location} 
                                setSt={props.handleChange('location')} 
                                onBlur={props.handleBlur('location')} 
                                pholder='Location'></InputField>
                            }
                            <Text style={styles.error}>{props.touched.location && props.errors.location}</Text>
                            <View style={styles.checkBoxBg}>
                            <Text style={{color: colors.black, fontSize:15}} >Is the apartment available?</Text>
                            <Switch
                            trackColor={{ false: colors.gray, true: colors.cardBg }}
                            thumbColor={props.values.availability ? colors.btnBlue : colors.white}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => {
                                props.setFieldValue('availability', value);
                            }}
                            onBlur={props.handleBlur('availability')}
                            value={props.values.availability}
                            />
                            </View>
                            <Text style={styles.error}>{props.touched.availability && props.errors.availability}</Text>
                            {props.values.images?.length>0?(
                                <PicSlider imageList={props.values.images} 
                                height="25" width="85" borderRadius={10}></PicSlider>
                            ):(<ImgPicker onImagesPicked={(imageList)=>{
                                props.setFieldValue('images', imageList, false);
                            }}/>)
                            }
                            <Text style={styles.error}>{props.touched.images && props.errors.images}</Text>
                            <AppButton title="Submit Ad" onPress={props.handleSubmit}></AppButton>
            
                        </View>
                    )}
                </Formik>
                </View></TouchableWithoutFeedback>
            </ScrollView>
        </ImageBackground>
        
    )
}
const styles=StyleSheet.create({
    image:{
        flex:1,
        resizeMode: "cover",
    },
    bg:{
        flex:1,
        width:'100%',
        height:'100%',
    },
    checkBoxBg:{
        flexDirection:'row', 
        justifyContent:'space-around',
        backgroundColor:colors.inpWhite,
        borderRadius:30,
        marginVertical:'2%',
        alignItems:'center',
    },
    error:{
        color:colors.yellow,
        marginHorizontal:'5%'
    }
})
export default PostAd;
