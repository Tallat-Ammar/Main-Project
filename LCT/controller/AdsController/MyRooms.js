import Firestore, { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
export async function MyRooms(roomsRetrevived) {
var user=firebase.auth().currentUser;

const roomsList=[];
var snapshot = await firebase.firestore()
.collection('Rooms').where("Owner", "==", user.email).get()

 snapshot.forEach((doc)=>{
    roomsList.push(doc.data());
 });
roomsRetrevived(roomsList);

}