import React from 'react';
import { View } from 'react-native';
import { TextInput, StyleSheet} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import colors from '../config/colors';


function InputField({pholder, st, setSt, cheight='6', cwidth='85', ...otherProps}) {
    return (
        <View >
        <TextInput
        style={[styles.input, {height: hp(cheight+'%')}, {width: wp(cwidth+'%')} ]}
        placeholder= {pholder}
        onChangeText={st=>setSt(st)}
        defaultValue={st}
        {...otherProps}
        />
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
    },
    input:{
        backgroundColor: colors.inpWhite,
        color:colors.black,
        marginVertical:'2%',
        paddingHorizontal:'2%',
        borderRadius:30,
    }
})

export default InputField;