import Firestore, { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
export async function getAllAds(roomsRetrevived) {
const roomsList=[];
var snapshot = await firebase.firestore()
.collection('Rooms').get()

 snapshot.forEach((doc)=>{
    roomsList.push(doc.data());
 });
roomsRetrevived(roomsList);

}
