import React,{useState,useEffect} from 'react';
import { ImageBackground ,StyleSheet,View,Button,TouchableOpacity,Text,Image} from 'react-native';
import Icon from  '../components/Icon';
import auth from '@react-native-firebase/auth';
import Logo from '../components/Logo';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    } from '@react-native-community/google-signin';
    import stylesheet from '../assets/stylesheet/stylesheet';
import {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IMAGEASSETS } from '../assets/images';
import Firestore from '@react-native-firebase/firestore';

function SignupScreen({navigation}) {
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState(null);
    function onAuthStateChanged(userInfo) {
      setuserInfo(userInfo);
    }
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    }, [loggedIn]);
    useEffect(() => {
      console.log("moving")
      if (userInfo !== null) {
        let data={name:userInfo._user.displayName,email:userInfo._user.email,edit:false, photo:userInfo._user.photoURL};
        navigation.replace('EditProfile',data);//move to home screen
      }
    }, [userInfo]);
    useEffect(() => {
      console.log("anzaal")
      GoogleSignin.configure({
        webClientId:
          '784726338195-haen1toc5ficjmv64ssp31mtet4sa3vk.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });
    }, []);
    _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const {accessToken, idToken} = await GoogleSignin.signIn();
          const googleCredential=auth.GoogleAuthProvider.credential(idToken);
          setloggedIn(true);
          auth().signInWithCredential(googleCredential);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            alert('Cancel');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('PLAY_SERVICES_NOT_AVAILABLE');
            // play services not available or outdated
          } else {
            // some other error happened
            console.log(error)
          }
        }
      };
    

    return (
      <ImageBackground
        source={IMAGEASSETS.backgroundImage}
        style={stylesheet.backgroundImage}>
        <View style={stylesheet.bgView}>
            <Logo ctop='15'/>
            <Text style={styles.text}>
              Sign-up using your gmail
            </Text>
            <View style={styles.sectionContainer}>
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
              />
            </View>
        </View>    
      </ImageBackground>
    );
}
const styles = StyleSheet.create({
    text:{
        color:'#ffffff',
        position:'absolute',
        height: hp('15%'), 
        width:wp('75%'),
        top:hp('60%'),
        left:wp('24%'),
        fontSize:16,
        fontWeight:'bold'
    }
})

export default SignupScreen;
