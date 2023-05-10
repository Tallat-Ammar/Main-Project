import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Message from '../components/Message';
import Firestore,{firebase} from '@react-native-firebase/firestore';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import colors from '../config/colors';

function MessageList({route,navigation}) {
    const apart=route.params.apart;
    const [msgList,setMsgList]=useState([]);
    const [fetchDone,setFetchDone]=useState(false);
    useEffect(() => {
        const listref= Firestore().collection('Chat').doc(route.params.apart.Owner);
        listref.get().then(function(doc){
            if (doc.exists) {
                var lst=doc.data().collections;
                var newLst=[];
                lst.forEach(key => {
                    if (key.location == route.params.apart.Location) {
                        newLst.push(key);  
                    }
                });
                setMsgList(newLst);
                setFetchDone(true);
            }
        })
    }, []);
    if (msgList.length==0 && fetchDone) {
        return(
            <SafeAreaView>
                <Text style={{textAlign:'center',justifyContent:'center',top:heightPercentageToDP('3%')}}>You have no new messages</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList  
                keyExtractor={(item) => item.collection}
                data={msgList}
                renderItem={({item}) =>(
                     <Message username={item.customerName} userEmail={item.customerId}  nav={navigation} apartment={apart}  />
                )}/>
            </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})

export default MessageList;
