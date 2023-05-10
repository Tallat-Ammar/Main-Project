import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Header,Item,Input, View, List, Title} from 'native-base';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import colors from '../config/colors';
import IonIcons from 'react-native-vector-icons/Ionicons';

function SearchBox({searchState,searchStatefn,list ,listState}) {   
    const searchFilter=(textToSearch)=>{
        searchStatefn(list.filter(i=>i.Title.toLowerCase().includes(textToSearch.toLowerCase()),),
      )
   };
    return (
        <View rounded searchBar style={styles.view} >
            <Item>
                <IonIcons style={styles.icon} size={30} name="search-outline"></IonIcons>
                    <Input style={styles.search} 
                    placeholder="Search here"  
                    onChangeText={text=> searchFilter(text)}>
                    </Input>
                </Item>
        </View>
        
    );
}

export default SearchBox;
const styles = StyleSheet.create({
    icon:{
        color:colors.black,
        paddingLeft:"3%",
    },
    search:{
        color:colors.black,
    },
    view:{
        backgroundColor:colors.white,
    }
   
    
})