import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP,
  } from 'react-native-responsive-screen';
import colors from '../../config/colors';
const styles=StyleSheet.create({
    backgroundImage:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
      
    },
    bgView:{
        flex:1,
        backgroundColor: colors.bgcolor,
        justifyContent: "center",
        alignItems:'center',
        width:'100%',
        height:'100%',
    },
    heading:{
        fontSize:hp('6%'),
        color:colors.white,
        textAlign:'center'
    },
});
export default styles;