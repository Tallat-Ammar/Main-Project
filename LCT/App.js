import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import Home from './screens/Home';
import Splash from './screens/Splash';
import PostAd from './screens/PostAd/PostAd';
import EditProfile from './screens/EditProfile';
import AdsList from './screens/AdsList';
import SignupScreen from './screens/SignupScreen';
import AdsDetails from './screens/AdsDetals/AdsDetails';
import DrawerScreen  from './screens/DrawerScreen';
import StripePayment from './screens/StripePayment';
import DestinationAreas from './screens/DestinationScreen';
import Chat from './screens/Chat';
import colors from './config/colors';
import Icon from 'react-native-vector-icons/Ionicons';  
import MessageList from './screens/MessageList';
import MyCustomers from './screens/MyCustomers';
import HotelList from './screens/HotelList';
import { View } from 'native-base';
import DestDetails from './screens/DestDetails';
import Nearby from './screens/Nearby';
import AreaList from './screens/AreaList';
import PlacesDetails from './screens/PlacesDetails/PlacesDetails';

const HomeStack=createStackNavigator();
const DrawerStack=createDrawerNavigator();
let HomeScreenAction =   CommonActions.reset({
  index: 1,
  routes: [{ name: 'Home' },],
})
function DrawerStackfn() {
  return (
  <DrawerStack.Navigator initialRouteName="Home" options={{headerShown:false}} drawerContent={props => <DrawerScreen {...props}/>}>
    <DrawerStack.Screen name="Home" component={Home} options={{headerShown:false}} /> 
  </DrawerStack.Navigator>
   );
}
const App = () => {
  return (
    
      <NavigationContainer>
        <HomeStack.Navigator initialRouteName="Splash" screenOptions={(nav) =>({
           headerRight: () => (
            <Icon
              name="home" color={colors.white} style={{borderColor:"black", paddingRight:"2%",}} size={25}
              onPress={() => nav.navigation.dispatch(HomeScreenAction)}
            />),
          headerStyle: {
            backgroundColor: colors.btnBlue ,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
          },
        })
        }>
          <HomeStack.Screen name='Home' component={DrawerStackfn} options={{headerShown:false}}/>
          <HomeStack.Screen name="Nearby" component={Nearby} />
          <HomeStack.Screen name='Splash' component={Splash} options={{headerShown:false}} />
          <HomeStack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown:false}}/>
          <HomeStack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}}/>
          <HomeStack.Screen name='AdsList' component={AdsList} />
          <HomeStack.Screen name='StripePayment' component={StripePayment} />
          <HomeStack.Screen name='DestinationAreas' component={DestinationAreas} />
          <HomeStack.Screen name='PostAd' component={PostAd} />
          <HomeStack.Screen name='AdsDetails' component={AdsDetails} />
          <HomeStack.Screen name='Chat' component={Chat}/>
          <HomeStack.Screen name="Messages" component={MessageList}/>
          <HomeStack.Screen name="Customers" component={MyCustomers}/>
          <HomeStack.Screen name='HotelList' component={HotelList} />
          <HomeStack.Screen name='DestDetails' component={DestDetails} />
          <HomeStack.Screen name='PlacesDetails' component={PlacesDetails}/> 
          <HomeStack.Screen name='AreaList' component={AreaList} />



          
        </HomeStack.Navigator>
      </NavigationContainer>
    
    );
}
export default App;
