import React, {useState, useEffect} from 'react'
import Firestore,{firebase} from '@react-native-firebase/firestore';
import { View, FlatList,Text,SafeAreaView } from 'react-native';
import Customers from '../components/Customers';

export default function MyCustomers({route,navigation}) {
    const [customerList,setCustomerList]= useState([]);
    const [fetchDone,setFetchDone]=useState(false);
    useEffect(() => {
        console.log(route.params.owner);
        const listref= Firestore().collection('Reservations').where("Owner", "==", route.params.owner);
        listref.get().then(function(querySnapshot) {
            var cList=[];
            querySnapshot.forEach(function(doc) {
                cList.push(doc.data());
            });
            setCustomerList(cList);
            setFetchDone(true);
        })
    }, [])
    if (customerList.length==0 && fetchDone) {
        return(
            <SafeAreaView>
                <Text style={{textAlign:'center',justifyContent:'center'}}>You have no Reservations</Text>
            </SafeAreaView>
        )
    }
    else{
        return (
            <FlatList
                keyExtractor={(item)=>item.RoomID}
                data={customerList}
                renderItem={({item})=>(
                    <Customers
                        customerName={item.CustomerName}
                        roomId={item.RoomID}
                        checkIn={item.CheckIn}
                        checkOut={item.CheckOut} />
                )}
            />
        )
    }
    
}
