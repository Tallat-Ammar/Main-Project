import React from 'react';
import { View ,StyleSheet,Image} from 'react-native';
import {
    DrawerItem,DrawerContentScrollView
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';  
import {widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../config/colors';
import Logo from '../components/Logo';
import Firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

function DrawerScreen(props) {
    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          auth()
            .signOut()
            .then(() => {
                alert('Your are signed out!');
                props.navigation.replace('SignupScreen');
            });
        //   setloggedIn(false);
          // setuserInfo([]);
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
        <View style={styles.container}>
            <View style={styles.topBorder}>
                <Logo cheight='9' cwidth='45' ctop='10'/>
           </View>
            <DrawerItem
                icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size}/>
                )}
                label="My Rooms"
                onPress={()=>{
                    props.navigation.closeDrawer();
                    props.navigation.navigate('AdsList',{page:"myrooms"})
                }
            }/>
            <DrawerItem
                icon={({color, size}) => (
                <Icon name="checkbox-outline" color={color} size={size}/>
                )}
                label="Reservations"
                onPress={()=>{
                    props.navigation.closeDrawer();
                    props.navigation.navigate('Customers',{owner:auth().currentUser.email})
                }
            }/>
            <DrawerItem
                icon={({color, size}) => (
                <Icon name="person-outline" color={color} size={size}/>
                )}
                label="Profile"
                onPress={() => {
                    // var userData=EditProfileFn();
                    var data={};
                    var user = auth().currentUser;
                    var ref= Firestore().collection('Users').doc(user.email);
                    ref.get().then((docSnapshot) => {
                        if (docSnapshot.exists) {
                            var userData=docSnapshot.data();
                            data={name:userData.Name,email:userData.Email,photo:userData.Image,accountNo:userData.AccountNo,contactNo:userData.PhoneNo,edit:true};
                            props.navigation.closeDrawer();
                            props.navigation.navigate('EditProfile',data);
                        }
                    });
                }}/>
            <DrawerItem
                icon={({color, size}) => (
                <Icon name="call-outline" color={color} size={size}/>
                )}
                label="Contact Us"
                />
            <DrawerItem
                icon={({color, size}) => (
                <Icon name="log-out-outline" color={color} size={size}/>
                )}
                label="Log Out"
                onPress={this.signOut}
                />
        </View>
    );
}
const styles = StyleSheet.create({
    topBorder:{
        backgroundColor:colors.btnBlue,
        height:hp('30%'),
        alignItems:"center",
        justifyContent:"center",
    },
    container:{
        flex:1,
    }
    
})
export default DrawerScreen;